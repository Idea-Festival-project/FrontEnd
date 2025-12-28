import { useState, useEffect } from 'react';
import styles from './Friend.module.css'
import { FaXmark } from "react-icons/fa6";

function Friend() {
  const [activeTab, setActiveTab] = useState('내 친구');
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchUsername, setSearchUsername] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (activeTab === '내 친구') {
      fetchFriends();
    } else if (activeTab === '친구 요청') {
      fetchFriendRequests();
    }
  }, [activeTab, currentPage]);

  // 1. 내 친구 목록 조회
  const fetchFriends = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/friends?page=${currentPage}&limit=10`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      
      if (result.status === 'ok') {
        const acceptedFriends = result.data.friends.filter(
          friend => friend.status === 'accepted'
        );
        setFriends(acceptedFriends);
        setTotalPages(result.data.total_pages);
      }
    } catch (error) {
      console.error('친구 목록을 불러오는데 실패했습니다:', error);
    } finally {
      setLoading(false);
    }
  };

  // 3. 받은 친구 요청 조회
  const fetchFriendRequests = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/friends/request/received', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      
      if (result.status === 'ok') {
        setFriendRequests(result.data.requests || []);
      }
    } catch (error) {
      console.error('친구 요청을 불러오는데 실패했습니다:', error);
    } finally {
      setLoading(false);
    }
  };

  // 2. 친구 요청 보내기
  const sendFriendRequest = async (friendId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/friends/request', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          friend_id: friendId
        })
      });
      
      const result = await response.json();
      
      if (result.data && result.data.status === 'pending') {
        alert('친구 요청을 보냈습니다!');
        setSearchResults(prev => 
          prev.map(user => 
            user.user_id === friendId 
              ? { ...user, requestSent: true } 
              : user
          )
        );
      }
    } catch (error) {
      console.error('친구 요청 전송 실패:', error);
      alert('친구 요청을 보내는데 실패했습니다.');
    }
  };

  // 4. 친구 요청 수락
  const acceptFriendRequest = async (friendId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/friends/request/received/${friendId}/accept`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        alert('친구 요청을 수락했습니다!');
        fetchFriendRequests();
        fetchFriends();
      }
    } catch (error) {
      console.error('친구 요청 수락 실패:', error);
      alert('친구 요청 수락에 실패했습니다.');
    }
  };

  // 5. 친구 요청 거절
  const rejectFriendRequest = async (friendId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/friends/request/received/${friendId}/reject`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        alert('친구 요청을 거절했습니다.');
        fetchFriendRequests();
      }
    } catch (error) {
      console.error('친구 요청 거절 실패:', error);
      alert('친구 요청 거절에 실패했습니다.');
    }
  };

  // 6. 친구 삭제
  const removeFriend = async (friendshipId) => {
    if (!confirm('정말로 친구를 삭제하시겠습니까?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/friends/${friendshipId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        alert('친구를 삭제했습니다.');
        fetchFriends();
      }
    } catch (error) {
      console.error('친구 삭제 실패:', error);
      alert('친구 삭제에 실패했습니다.');
    }
  };

  // 7. 친구 검색
  const searchUsers = async () => {
    if (!searchUsername.trim()) {
      alert('검색할 사용자 이름을 입력해주세요.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/friends/search?friend_id=${searchUsername}&limit=20`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      
      if (result.status === 'ok') {
        setSearchResults(result.data.user || []);
      }
    } catch (error) {
      console.error('사용자 검색 실패:', error);
      alert('사용자 검색에 실패했습니다.');
    }
  };

  const renderContent = () => {
    if (loading) {
      return <div className={styles.loading}>로딩 중...</div>;
    }

    switch(activeTab) {
      case '내 친구':
        return (
          <>
            <div className={styles.friendsList}>
              {friends.length === 0 ? (
                <div className={styles.emptyState}>친구가 없는 것 같아요.. 친구 찾기에서 친구를 찾아보세요!</div>
              ) : (
                friends.map((friend) => (
                  <div key={friend.user_id} className={styles.friendCard}>
                    <div className={styles.friendInfo}>
                      <div className={styles.avatarSection}>
                        <div className={styles.avatar}>
                          {friend.profile_image_url ? (
                            <img src={friend.profile_image_url} alt={friend.nickname} />
                          ) : (
                            '👤'
                          )}
                        </div>
                        <div className={styles.nameSection}>
                          <h3 className={styles.friendName}>{friend.nickname}</h3>
                          <p className={styles.tier}>@{friend.username}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.statsSection}>
                      <div className={styles.stat}>
                        <div className={styles.statValue}>-</div>
                        <div className={styles.statLabel}>해결한 문제</div>
                      </div>
                      <div className={styles.stat}>
                        <div className={styles.statValue}>-</div>
                        <div className={styles.statLabel}>연속 일수</div>
                      </div>
                    </div>

                    <div className={styles.actions}>
                      <button className={styles.profileButton}>프로필 보기</button>
                      <button 
                        className={styles.removeButton}
                        onClick={() => removeFriend(friend.friendship_id)}
                      >
                        <FaXmark />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* 페이지네이션 추가 */}
            {totalPages > 1 && (
              <div className={styles.pagination}>
                <button 
                  className={styles.pageButton}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  이전
                </button>
                <span className={styles.pageInfo}>
                  {currentPage} / {totalPages}
                </span>
                <button 
                  className={styles.pageButton}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  다음
                </button>
              </div>
            )}
          </>
        );

      case '친구 요청':
        return (
          <div className={styles.friendsList}>
            {friendRequests.length === 0 ? (
              <div className={styles.emptyState}>친구 요청이 없는 것 같네요.. 먼저 요청을 보내는건 어떨까요?</div>
            ) : (
              friendRequests.map((request) => (
                <div key={request.user_id} className={styles.friendCard}>
                  <div className={styles.friendInfo}>
                    <div className={styles.avatarSection}>
                      <div className={styles.avatar}>
                        {request.profile_image_url ? (
                          <img src={request.profile_image_url} alt={request.nickname} />
                        ) : (
                          '👤'
                        )}
                      </div>
                      <div className={styles.nameSection}>
                        <h3 className={styles.friendName}>{request.nickname}</h3>
                        <p className={styles.tier}>@{request.username}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.statsSection}>
                    <div className={styles.stat}>
                      <div className={styles.statValue}>-</div>
                      <div className={styles.statLabel}>해결한 문제</div>
                    </div>
                    <div className={styles.stat}>
                      <div className={styles.statValue}>-</div>
                      <div className={styles.statLabel}>연속 일수</div>
                    </div>
                  </div>

                  <div className={styles.actions}>
                    <button 
                      className={styles.profileButton}
                      onClick={() => acceptFriendRequest(request.friend_id)}
                    >
                      수락
                    </button>
                    <button 
                      className={styles.removeButton}
                      onClick={() => rejectFriendRequest(request.friend_id)}
                    >
                      거절
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        );

      case '친구 찾기':
        return (
          <div className={styles.searchSection}>
            <div className={styles.searchBox}>
              <input 
                type="text" 
                placeholder="사용자 이름으로 검색..." 
                className={styles.searchInput}
                value={searchUsername}
                onChange={(e) => setSearchUsername(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && searchUsers()}
              />
              <button className={styles.searchButton} onClick={searchUsers}>검색</button>
            </div>
            
            {searchResults.length > 0 && (
              <div className={styles.friendsList}>
                {searchResults.map((user) => (
                  <div key={user.user_id} className={styles.friendCard}>
                    <div className={styles.friendInfo}>
                      <div className={styles.avatarSection}>
                        <div className={styles.avatar}>
                          {user.profile_image_url ? (
                            <img src={user.profile_image_url} alt={user.nickname} />
                          ) : (
                            '👤'
                          )}
                        </div>
                        <div className={styles.nameSection}>
                          <h3 className={styles.friendName}>{user.nickname}</h3>
                          <p className={styles.tier}>@{user.username}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.statsSection}>
                      <div className={styles.stat}>
                        <div className={styles.statValue}>-</div>
                        <div className={styles.statLabel}>해결한 문제</div>
                      </div>
                      <div className={styles.stat}>
                        <div className={styles.statValue}>-</div>
                        <div className={styles.statLabel}>연속 일수</div>
                      </div>
                    </div>

                    <div className={styles.actions}>
                      {user.is_friend ? (
                        <button className={styles.profileButton} disabled>
                          이미 친구
                        </button>
                      ) : user.friendship_status ? (
                        <button className={styles.profileButton} disabled>
                          요청 완료
                        </button>
                      ) : (
                        <button 
                          className={styles.profileButton}
                          onClick={() => sendFriendRequest(user.user_id)}
                        >
                          친구 추가
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.FriendsPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>친구</h1>
        <p className={styles.subtitle}>친구들과 함께 코딩 실력을 키워보세요</p>
      </div>

      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === '내 친구' ? styles.tabActive : ''}`}
          onClick={() => {
            setActiveTab('내 친구');
            setCurrentPage(1); // 탭 변경 시 페이지 초기화
          }}
        >
          내 친구 ({friends.length})
        </button>
        <button 
          className={`${styles.tab} ${activeTab === '친구 요청' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('친구 요청')}
        >
          친구 요청 ({friendRequests.length})
        </button>
        <button 
          className={`${styles.tab} ${activeTab === '친구 찾기' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('친구 찾기')}
        >
          친구 찾기
        </button>
      </div>

      {renderContent()}
    </div>
  );
}

export default Friend;