import React, { useState } from 'react';
import styles from './Friend.module.css'

function Friend() {
  const [activeTab, setActiveTab] = useState('내 친구');

  const friends = [
    {
      name: '코딩마스터',
      tier: 'Gold I',
      avatar: '👨‍💻',
      solvedProblems: 342,
      streak: 15,
    },
    {
      name: '알고리즘러버',
      tier: 'Silver III',
      avatar: '👨‍💻',
      solvedProblems: 289,
      streak: 12,
    },
    {
      name: 'Python사랑',
      tier: 'Silver II',
      avatar: '🐍',
      solvedProblems: 198,
      streak: 8,
    },
    {
      name: 'Java고수',
      tier: 'Bronze I',
      avatar: '☕',
      solvedProblems: 156,
      streak: 5,
    },
  ];

  const friendRequests = [
    {
      name: 'React개발자',
      tier: 'Gold III',
      avatar: '⚛️',
      solvedProblems: 425,
      streak: 20,
    },
    {
      name: 'C++전문가',
      tier: 'Platinum V',
      avatar: '💎',
      solvedProblems: 567,
      streak: 30,
    },
    {
      name: 'JS마스터',
      tier: 'Silver I',
      avatar: '🎯',
      solvedProblems: 234,
      streak: 7,
    },
  ];

  const suggestedFriends = [
    {
      name: 'DataScience',
      tier: 'Gold II',
      avatar: '📊',
      solvedProblems: 389,
      streak: 18,
    },
    {
      name: 'Algorithm짱',
      tier: 'Silver IV',
      avatar: '🧮',
      solvedProblems: 201,
      streak: 9,
    },
    {
      name: 'Backend고수',
      tier: 'Gold IV',
      avatar: '🖥️',
      solvedProblems: 312,
      streak: 14,
    },
  ];

  const renderContent = () => {
    switch(activeTab) {
      case '내 친구':
        return (
          <div className={styles.friendsList}>
            {friends.map((friend, index) => (
              <div key={index} className={styles.friendCard}>
                <div className={styles.friendInfo}>
                  <div className={styles.avatarSection}>
                    <div className={styles.avatar}>{friend.avatar}</div>
                    <div className={styles.nameSection}>
                      <h3 className={styles.friendName}>{friend.name}</h3>
                      <p className={styles.tier}>{friend.tier}</p>
                    </div>
                  </div>
                </div>
                
                <div className={styles.statsSection}>
                  <div className={styles.stat}>
                    <div className={styles.statValue}>{friend.solvedProblems}</div>
                    <div className={styles.statLabel}>해결한 문제</div>
                  </div>
                  <div className={styles.stat}>
                    <div className={styles.statValue}>{friend.streak}</div>
                    <div className={styles.statLabel}>연속 일수</div>
                  </div>
                </div>

                <div className={styles.actions}>
                  <button className={styles.profileButton}>프로필 보기</button>
                  <button className={styles.removeButton}>👤</button>
                </div>
              </div>
            ))}
          </div>
        );

      case '친구 요청':
        return (
          <div className={styles.friendsList}>
            {friendRequests.map((request, index) => (
              <div key={index} className={styles.friendCard}>
                <div className={styles.friendInfo}>
                  <div className={styles.avatarSection}>
                    <div className={styles.avatar}>{request.avatar}</div>
                    <div className={styles.nameSection}>
                      <h3 className={styles.friendName}>{request.name}</h3>
                      <p className={styles.tier}>{request.tier}</p>
                    </div>
                  </div>
                </div>
                
                <div className={styles.statsSection}>
                  <div className={styles.stat}>
                    <div className={styles.statValue}>{request.solvedProblems}</div>
                    <div className={styles.statLabel}>해결한 문제</div>
                  </div>
                  <div className={styles.stat}>
                    <div className={styles.statValue}>{request.streak}</div>
                    <div className={styles.statLabel}>연속 일수</div>
                  </div>
                </div>

                <div className={styles.actions}>
                  <button className={styles.profileButton}>수락</button>
                  <button className={styles.removeButton}>거절</button>
                </div>
              </div>
            ))}
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
              />
              <button className={styles.searchButton}>검색</button>
            </div>
            
            <h3 className={styles.suggestedTitle}>추천 친구</h3>
            <div className={styles.friendsList}>
              {suggestedFriends.map((friend, index) => (
                <div key={index} className={styles.friendCard}>
                  <div className={styles.friendInfo}>
                    <div className={styles.avatarSection}>
                      <div className={styles.avatar}>{friend.avatar}</div>
                      <div className={styles.nameSection}>
                        <h3 className={styles.friendName}>{friend.name}</h3>
                        <p className={styles.tier}>{friend.tier}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.statsSection}>
                    <div className={styles.stat}>
                      <div className={styles.statValue}>{friend.solvedProblems}</div>
                      <div className={styles.statLabel}>해결한 문제</div>
                    </div>
                    <div className={styles.stat}>
                      <div className={styles.statValue}>{friend.streak}</div>
                      <div className={styles.statLabel}>연속 일수</div>
                    </div>
                  </div>

                  <div className={styles.actions}>
                    <button className={styles.profileButton}>친구 추가</button>
                  </div>
                </div>
              ))}
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
          onClick={() => setActiveTab('내 친구')}
        >
          내 친구 (4)
        </button>
        <button 
          className={`${styles.tab} ${activeTab === '친구 요청' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('친구 요청')}
        >
          친구 요청 (3)
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