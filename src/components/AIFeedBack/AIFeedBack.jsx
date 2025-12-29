import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRobot, FaCheckCircle, FaUndo, FaSpinner, FaLightbulb, FaArrowRight, FaCode } from 'react-icons/fa';
// 💡 주의: 파일명 대문자 'B'를 꼭 확인하세요!
import styles from './AIFeedBack.module.css';

export default function AIFeedbackPage() {
  const navigate = useNavigate();
  const [inputCode, setInputCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!inputCode.trim()) {
      alert("분석할 코드를 입력해주세요!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8080/api/CodingGO/code-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: inputCode }),
      });

      if (!response.ok) {
        throw new Error("서버 응답 오류 (백엔드 상태를 확인하세요)");
      }

      const data = await response.json();
      
      // 백엔드 데이터 구조에 맞춰 상태 저장
      setFeedback({
        comments: data.comments || ["코드 가독성이 우수합니다."],
        tip: data.tip || "로직을 더 세분화하면 유지보수가 쉬워집니다.",
        score: data.score || 90
      });

    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 로딩 화면
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <FaSpinner className={styles.spinner} />
          <p className={styles.loadingText}>AI 엔진이 코드를 심층 분석하고 있습니다...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        
        <header className={styles.header}>
          <div className={styles.titleGroup}>
            <div className={styles.iconCircle}>
              <FaRobot className={styles.mainIcon} />
            </div>
            <div>
              <h1 className={styles.title}>AI Code Review</h1>
              <p className={styles.subtitle}>당신의 코드를 한 단계 더 진화시키세요.</p>
            </div>
          </div>
        </header>

        {error && <div className={styles.errorBanner}>⚠️ {error}</div>}

        {!feedback ? (
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <FaCode className={styles.sectionIcon} />
              <h3 className={styles.cardTitle}>분석할 코드를 입력하세요</h3>
            </div>
            
            <div className={styles.editorWrapper}>
              <div className={styles.editorHeader}>
                <div className={`${styles.dot} ${styles.dotRed}`} />
                <div className={`${styles.dot} ${styles.dotYellow}`} />
                <div className={`${styles.dot} ${styles.dotGreen}`} />
              </div>
              <textarea
                className={styles.codeEditor}
                placeholder="// 분석하고 싶은 코드를 여기에 복사해서 붙여넣으세요..."
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
              />
            </div>

            <button className={styles.analyzeBtn} onClick={handleAnalyze}>
              분석 시작하기 <FaArrowRight style={{ marginLeft: '10px' }} />
            </button>
          </div>
        ) : (
          <div className={styles.resultSection}>
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <FaCheckCircle className={styles.cardIcon} />
                <h3 className={styles.cardTitle}>분석 리포트</h3>
                <div className={styles.scoreWrapper}>
                  <div className={styles.scoreLabel}>AI SCORE</div>
                  <div className={styles.scoreValue}>{feedback.score}</div>
                </div>
              </div>

              <div className={styles.feedbackGrid}>
                {feedback.comments.map((comment, index) => (
                  <div key={index} className={styles.feedbackItem}>
                    <FaCheckCircle className={styles.itemIcon} />
                    <p className={styles.commentText}>{comment}</p>
                  </div>
                ))}
                <div className={styles.tipBox}>
                  <FaLightbulb className={styles.tipIcon} />
                  <p className={styles.tipText}><strong>PRO TIP:</strong> {feedback.tip}</p>
                </div>
              </div>
            </div>

            <div className={styles.buttonGroup}>
              <button className={styles.resetBtn} onClick={() => setFeedback(null)}>
                <FaUndo /> 다시 입력하기
              </button>
              <button className={styles.listBtn} onClick={() => navigate('/problems')}>
                문제 목록으로 이동
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}