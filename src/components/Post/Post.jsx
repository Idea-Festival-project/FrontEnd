import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Post.module.css';
import axios from 'axios';

const tags = ['전체', '도움요청', '피드백', '잡담'];

const Post = () => {
  const navigate = useNavigate();
  const [selectedTag, setSelectedTag] = useState('전체');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  // 2. 게시글 작성
  const handleSubmit = async () => {
    if (!content.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }

    if (selectedTag === '전체') {
      alert('태그를 선택해주세요.');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/write', 
        {
          category: selectedTag,
          content: content
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.status === 'ok') {
        alert('게시글이 등록되었습니다!');
        navigate('/community');
      }
    } catch (error) {
      console.error('게시글 작성 실패:', error);
      if (error.response) {
        alert(`게시글 작성에 실패했습니다: ${error.response.data.message || '알 수 없는 오류'}`);
      } else {
        alert('게시글 작성에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.PostPage}>
      <button
        className={styles.BackNavBtn}
        onClick={() => navigate(-1)}
      >
        <span className={styles.Arrow}>←</span> 돌아가기
      </button>

      <h1 className={styles.FormTitle}>새 글 작성</h1>
      <p className={styles.FormSubtitle}>
        커뮤니티에 공유할 내용을 작성하세요
      </p>
      
      <div className={styles.PostWrapper}>
        <div className={styles.WriteCard}>
          {/* 태그 선택 섹션 */}
          <div className={styles.InputGroup}>
            <label className={styles.LabelText}>태그</label>
            <div className={styles.TagContainer}>
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={`${styles.TagBox} ${
                    selectedTag === tag ? styles.Active : ''
                  }`}
                  onClick={() => setSelectedTag(tag)}
                  disabled={loading}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* 내용 입력 섹션 */}
          <div className={styles.InputGroup}>
            <label className={styles.LabelText}>내용</label>
            <textarea
              className={styles.ContentArea}
              placeholder="내용을 입력하세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* 하단 버튼 섹션 */}
          <div className={styles.ActionButtons}>
            <button
              className={styles.CancelBtn}
              onClick={() => navigate('/community')}
              disabled={loading}
            >
              취소
            </button>
            <button 
              className={styles.SubmitBtn}
              onClick={handleSubmit}
              disabled={!content.trim() || selectedTag === '전체' || loading}
            >
              {loading ? '게시 중...' : '게시하기'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;