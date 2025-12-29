import { useState, useEffect } from 'react'
import styles from './Community.module.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Community() {
  const [communityPosts, setCommunityPosts] = useState([
    {
      post_id: 1,
      author: {
        username: '의빈',
        profile_image_url: 'https://i.imgur.com/placeholder1.jpg'
      },
      category: 'C',
      content: '이번 알고리즘 문제 너무 어려운데 혹시 힌트 있나요?',
      comment_count: 5,
      created_at: new Date(Date.now() - 30 * 60000).toISOString() // 30분 전
    },
    {
      post_id: 2,
      author: {
        username: '현진',
        profile_image_url: 'https://i.imgur.com/placeholder2.jpg'
      },
      category: 'JAVA',
      content: '백준 골드 달성했습니다! 다들 화이팅하세요~',
      comment_count: 12,
      created_at: new Date(Date.now() - 2 * 3600000).toISOString() // 2시간 전
    },
    {
      post_id: 3,
      author: {
        username: '휘영',
        profile_image_url: 'https://i.imgur.com/placeholder3.jpg'
      },
      category: 'PYTHON',
      content: '오늘 스터디 같이 하실 분 계신가요?',
      comment_count: 3,
      created_at: new Date(Date.now() - 5 * 3600000).toISOString() // 5시간 전
    },
    {
      post_id: 4,
      author: {
        username: '수연',
        profile_image_url: 'https://i.imgur.com/placeholder4.jpg'
      },
      category: 'C',
      content: 'DP 문제 접근 방법 좀 알려주실 수 있나요?',
      comment_count: 8,
      created_at: new Date(Date.now() - 86400000).toISOString() // 1일 전
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();


  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  // 1. 게시글 전체 조회
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/posts', {
        params: {
          page: currentPage,
          limit: 10
        },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data.status === 'ok') {
        setCommunityPosts(response.data.data.posts);
        setTotalPages(response.data.data.totalPages);
      }
    } catch (error) {
      console.error('게시글을 불러오는데 실패했습니다:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}분 전`;
    if (diffHours < 24) return `${diffHours}시간 전`;
    if (diffDays === 1) return '어제';
    return `${diffDays}일 전`;
  };

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  if (loading) {
    return (
      <div className={styles.MainBox}>
        <div className={styles.loading}>로딩 중...</div>
      </div>
    );
  }

  return (
    <div className={styles.MainBox}>
      <div className={styles.HeaderBox}>
        <h1>게시판</h1>
        <p className={styles.SubText}>다른 사용자들과 같이 해결해보세요!</p>
        <button className={styles.PostBtn} onClick={() => navigate('/post')}>글쓰기</button>
      </div>

      <div className={styles.PostList}>
        {communityPosts.length === 0 ? (
          <div className={styles.emptyState}>게시글이 없는 것 같아요. 첫 게시글을 작성해보세요!</div>
        ) : (
          communityPosts.map((post) => (
            <div 
              key={post.post_id} 
              className={styles.PostCard}
              onClick={() => handlePostClick(post.post_id)}
            >
              <div className={styles.PostHeader}>
                <img 
                  src={post.author.profile_image_url || '/assets/default-profile.png'} 
                  alt="profile" 
                  className={styles.Avatar} 
                />
                <div className={styles.AuthorInfo}>
                  <span className={styles.Author}>{post.author.username}</span>
                  <span className={styles.Time}>{formatTime(post.created_at)}</span>
                </div>
              </div>
              <div className={styles.CategoryBadge}>{post.category}</div>
              <p className={styles.PostContent}>{post.content}</p>
              <div className={styles.PostFooter}>
                <span>💬 {post.comment_count}</span>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className={styles.Pagination}>
        <button 
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          이전
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button 
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default Community;