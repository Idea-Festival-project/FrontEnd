import { useState, useEffect } from 'react';
import styles from './Friend.module.css';
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

  // 임시 더미 친구 데이터
  const mockFriends = [
    { user_id: 1, friendship_id: 101, nickname: '의빈', username: 'uibin', profile_image_url: null, solvedProblems: 12, streakDays: 5 },
    { user_id: 2, friendship_id: 102, nickname: '현진', username: 'hyunjin', profile_image_url: null, solvedProblems: 8, streakDays: 3 },
    { user_id: 3, friendship_id: 103, nickname: '수연', username: 'sooyeon', profile_image_url: null, solvedProblems: 20, streakDays: 10 },
    { user_id: 4, friendship_id: 104, nickname: '휘영', username: 'hwiyoung', profile_image_url: null, solvedProblems: 5, streakDays: 1 },
  ];

  useEffect(() => {
    if (activeTab === '내 친구') {
      // 실제 API 대신 임시 데이터 사용
      setLoading(true);
      setTimeout(() => {
        setFriends(mockFriends);
        setTotalPages(1);
        setLoading(false);
      }, 500);
    } else if (activeTab === '친구 요청') {
      // 친구 요청 임시 비움
      setFriendRequests([]);
    }
  }, [activeTab, currentPage]);

  const removeFriend = (friendshipId) => {
    if (!confirm('정말로 친구를 삭제하시겠습니까?')) return;
    setFriends(prev => prev.filter(f => f.friendship_id !== friendshipId));
    alert('친구를 삭제했습니다.');
  };

  const renderContent = () => {
    if (loading) {
      return <div className={styles.loading}>로딩 중...</div>;
    }

    switch(activeTab) {
      case '내 친구':
        return (
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
                      <div className={styles.statValue}>{friend.solvedProblems}</div>
                      <div className={styles.statLabel}>해결한 문제</div>
                    </div>
                    <div className={styles.stat}>
                      <div className={styles.statValue}>{friend.streakDays}</div>
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
        );

      case '친구 요청':
        return (
          <div className={styles.friendsList}>
            {friendRequests.length === 0 ? (
              <div className={styles.emptyState}>친구 요청이 없는 것 같네요.. 먼저 요청을 보내는건 어떨까요?</div>
            ) : null}
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
                onKeyPress={(e) => e.key === 'Enter' && alert('검색 기능은 API 연결 필요')}
              />
              <button className={styles.searchButton} onClick={() => alert('검색 기능은 API 연결 필요')}>검색</button>
            </div>
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
            setCurrentPage(1);
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
