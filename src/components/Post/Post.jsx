import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Post.module.css';

const Post = () => {
  const navigate = useNavigate();
  const [selectedTag, setSelectedTag] = useState('ALL');
  const [content, setContent] = useState('');

  const tags = ['ALL', 'C', 'JAVA', 'PYTHON'];

  // 게시글 제출 핸들러
  const handleSubmit = () => {
    if (!content.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }

    const postData = {
      tag: selectedTag,
      content: content,
      date: new Date().toISOString(),
    };

    console.log('제출된 데이터:', postData);
    
    // TODO: axios 또는 fetch를 이용한 API 호출 로직이 들어갈 자리입니다.
    // 예: await axios.post('/api/posts', postData);

    alert('게시글이 등록되었습니다!');
    navigate('/community'); // 등록 후 이동
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
            />
          </div>

          {/* 하단 버튼 섹션 */}
          <div className={styles.ActionButtons}>
            <button
              className={styles.CancelBtn}
              onClick={() => navigate('/community')}
            >
              취소
            </button>
            <button 
              className={styles.SubmitBtn}
              onClick={handleSubmit}
              disabled={!content.trim()} // 내용 없으면 버튼 비활성화 시각화 가능
            >
              게시하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
