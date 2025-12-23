import { useState } from 'react'
import styles from './Community.module.css'
import { useNavigate } from 'react-router-dom'

function Community() {

  const [communityPosts, setCommunityPosts] = useState([
  {
    "id": 1,
    "author": "코딩마스터",
    "profileImg": "/assets/profile1.png",
    "title": "두 수의 합 문제 해설",
    "content": "HashMap을 사용하면 O(n)에 효율적으로 해결할 수 있습니다. 반복문을 두 번 돌릴 필요가 없어요!",
    "time": "2시간 전",
    "comments": 8,
  },
  {
    "id": 2,
    "author": "알고리즘러버",
    "profileImg": "/assets/profile2.png",
    "title": "연속 7일 달성 완료!",
    "content": "드디어 1주일 연속으로 문제를 풀었습니다. 내일은 '그래프' 알고리즘에 도전해보려고 합니다. 응원해주세요!",
    "time": "5시간 전",
    "comments": 15,
  },
  {
    "id": 3,
    "author": "자바스크립트초보",
    "profileImg": "/assets/profile3.png",
    "title": "배열 메서드 filter 질문",
    "content": "filter를 쓸 때 조건이 여러 개면 어떻게 처리하는 게 가장 깔끔한가요? 고수님들 도와주세요!",
    "time": "어제",
    "comments": 12,
  },
  {
    "id": 4,
    "author": "개발왕",
    "profileImg": "/assets/profile4.png",
    "title": "최단 거리 알고리즘 꿀팁",
    "content": "다익스트라 알고리즘 구현할 때 우선순위 큐를 활용하면 시간 복잡도를 줄일 수 있습니다.",
    "time": "3일 전",
    "comments": 22,
  }
])

  const navigate = useNavigate()

  return (
    <div className={styles.MainBox}>
      <div className={styles.HeaderBox}>
        <h1>게시판</h1>
        <p className={styles.SubText}>다른 사용자들과 같이 해결해보세요!</p>
        <button className={styles.PostBtn} onClick={() => navigate('/post')}>글쓰기</button>

      </div>

      {/* 2. HeaderBox 아래, 여기에 데이터 리스트를 출력하는 코드를 넣으세요 */}
      <div className={styles.PostList}>
        {communityPosts.map((post) => (
          <div key={post.id} className={styles.PostCard}>
            <div className={styles.PostHeader}>
              <img src={post.profileImg} alt="profile" className={styles.Avatar} />
              <div className={styles.AuthorInfo}>
                <span className={styles.Author}>{post.author}</span>
                <span className={styles.Time}>{post.time}</span>
              </div>
            </div>
            <h2 className={styles.PostTitle}>{post.title}</h2>
            <p className={styles.PostContent}>{post.content}</p>
            <div className={styles.PostFooter}>
              <span>💬 {post.comments}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Community