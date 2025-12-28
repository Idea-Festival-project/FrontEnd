import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaSpinner, FaExclamationCircle } from 'react-icons/fa';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import styles from './AIFeedback.module.css';

export default function AIFeedbackPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); // URL에서 문제 ID 가져오기
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 문제별 예시 피드백 데이터
  const getExampleFeedback = (problemId, code) => {
    const feedbacks = {
      '1000': {
        aiComments: [
          `문제 ${problemId}번 (A+B) 코드 분석이 완료되었습니다!`,
          '입출력 처리가 정확하게 구현되었습니다.',
          '두 정수를 더하는 로직이 명확합니다.',
          '다음 문제로 넘어갈 준비가 되었습니다!'
        ]
      },
      '1003': {
        aiComments: [
          `문제 ${problemId}번 (피보나치 함수) 분석 결과입니다.`,
          '동적 계획법 또는 메모이제이션을 활용하신 점이 좋습니다.',
          '재귀 함수의 호출 횟수를 효율적으로 계산했습니다.',
          '시간 복잡도 최적화가 잘 되어 있습니다.'
        ]
      },
      '1008': {
        aiComments: [
          `문제 ${problemId}번 (A/B) 코드를 검토했습니다.`,
          '부동소수점 처리가 정확합니다.',
          '나눗셈 연산의 정밀도를 적절히 고려하셨습니다.',
          '좋은 코드입니다!'
        ]
      },
      '1012': {
        aiComments: [
          `문제 ${problemId}번 (유기농 배추) 분석이 완료되었습니다.`,
          'BFS 또는 DFS 알고리즘 구현이 적절합니다.',
          '인접한 배추 그룹을 찾는 로직이 명확합니다.',
          '그래프 탐색 알고리즘 활용이 우수합니다.'
        ]
      },
      '1193': {
        aiComments: [
          `문제 ${problemId}번 (분수찾기) 코드를 검토했습니다.`,
          '지그재그 패턴을 잘 파악하여 구현했습니다.',
          '수학적 규칙을 코드로 잘 변환했습니다.',
          '효율적인 알고리즘입니다!'
        ]
      },
      '1543': {
        aiComments: [
          `문제 ${problemId}번 (문서 검색) 분석 결과입니다.`,
          '문자열 검색 알고리즘이 적절하게 구현되었습니다.',
          '중복되지 않게 검색하는 로직이 명확합니다.',
          '문자열 처리 능력이 우수합니다!'
        ]
      }
    };

    return feedbacks[problemId] || {
      aiComments: [
        `문제 ${problemId}번에 대한 코드 분석이 완료되었습니다!`,
        '코드 구조가 잘 작성되어 있습니다.',
        '알고리즘 로직이 명확합니다.',
        '좋은 풀이입니다!'
      ]
    };
  };

  useEffect(() => {
    // AI가 코드를 분석하여 피드백 생성
    const analyzeCode = async () => {
      try {
        setLoading(true);
        setError(null);

        // ProblemsSolved에서 전달받은 코드와 문제 정보
        const submittedCode = location.state?.code || '';
        const problemTitle = location.state?.problemTitle || '';

        if (!submittedCode) {
          setError('제출된 코드를 찾을 수 없습니다.');
          setLoading(false);
          return;
        }

        // TODO: 실제 AI 분석 API 호출
        // 아래 코드는 AI API가 준비되면 주석을 해제하고 예시 데이터 부분을 제거하세요
        /*
        const response = await fetch('/api/ai/analyze-code', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            problemId: id,
            code: submittedCode,
            problemTitle: problemTitle
          })
        });

        if (!response.ok) {
          throw new Error('AI 분석 API 호출 실패');
        }

        const aiResult = await response.json();
        setFeedback({
          problemId: id,
          aiComments: aiResult.comments || [],
          score: aiResult.score,
          suggestions: aiResult.suggestions || []
        });
        */

        // 임시 데이터: 문제 ID에 맞는 예시 피드백 제공
        // AI API가 준비되면 위의 주석 처리된 코드를 사용하세요
        setTimeout(() => {
          const exampleFeedback = getExampleFeedback(id, submittedCode);
          setFeedback({
            problemId: id,
            problemTitle: problemTitle,
            codeLength: submittedCode.length,
            ...exampleFeedback
          });
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error('AI 분석 중 오류 발생:', error);
        setError('AI 분석 중 오류가 발생했습니다. 다시 시도해주세요.');
        setLoading(false);
      }
    };

    analyzeCode();
  }, [id, location.state]);

  const navigateToProblem = () => {
    navigate(`/problemsSolved/${id}`);
  };

  const navigateToProblemList = () => {
    navigate('/problems');
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <FaSpinner className={styles.spinner} />
          <p className={styles.loadingText}>AI가 코드를 분석하고 있습니다...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h1 className={styles.title}>AI 피드백</h1>
          </div>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <FaExclamationCircle className={styles.cardIcon} style={{ color: '#e74c3c' }} />
              <h3 className={styles.cardTitle}>오류 발생</h3>
            </div>
            <p className={styles.errorText}>{error}</p>
            <div className={styles.actionButtons}>
              <button 
                className={`${styles.button} ${styles.buttonPrimary}`}
                onClick={() => navigate(`/problemsSolved/${id}`)}
              >
                문제로 돌아가기
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!feedback || !feedback.aiComments) {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h1 className={styles.title}>AI 피드백</h1>
          </div>
          <div className={styles.card}>
            <p className={styles.errorText}>피드백을 불러올 수 없습니다.</p>
            <div className={styles.actionButtons}>
              <button 
                className={`${styles.button} ${styles.buttonPrimary}`}
                onClick={navigateToProblemList}
              >
                문제 목록으로
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* 헤더 */}
        <div className={styles.header}>
          <h1 className={styles.title}>AI 피드백</h1>
          {feedback.problemTitle && (
            <p className={styles.problemInfo}>문제: {feedback.problemTitle} (ID: {id})</p>
          )}
        </div>

        {/* AI 코멘트 */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <FaCheckCircle className={styles.cardIcon} />
            <h3 className={styles.cardTitle}>AI 분석 결과</h3>
          </div>
          <div className={styles.commentsList}>
            {feedback.aiComments.map((comment, index) => (
              <div key={index} className={styles.commentItem}>
                <FaCheckCircle className={styles.commentIcon} />
                <p className={styles.commentText}>{comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className={styles.actionButtons}>
          <button 
            className={`${styles.button} ${styles.buttonSecondary}`}
            onClick={navigateToProblem}
          >
            문제로 돌아가기
          </button>
          <button 
            className={`${styles.button} ${styles.buttonPrimary}`}
            onClick={navigateToProblemList}
          >
            문제 목록으로
          </button>
        </div>
      </div>
    </div>
  );
}