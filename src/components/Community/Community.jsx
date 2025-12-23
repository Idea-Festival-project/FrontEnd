import { useState, useEffect } from 'react'
import styles from './Community.module.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Community() {
  const [communityPosts, setCommunityPosts] = useState([]);
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

  // 4. 게시글 삭제
  const deletePost = async (postId) => {
    if (!confirm('정말로 이 게시글을 삭제하시겠습니까?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/${postId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      alert('게시글이 삭제되었습니다.');
      fetchPosts();
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
      alert('게시글 삭제에 실패했습니다.');
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
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); // 카드 클릭 이벤트 방지
                    deletePost(post.post_id);
                  }}
                  className={styles.DeleteBtn}
                >
                  삭제
                </button>
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
          ))
        )}
      </div>
    </div>
  );
}

export default Community;