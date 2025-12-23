import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ProblemsSolved.module.css';

function ProblemsSolved() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [code, setCode] = useState('');

  // 🔹 문제 데이터 (하드코딩)
  const problems = {
    1000: {
      title: "A+B",
      difficulty: "bronze",
      description: "두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오.",
      examples: [{ input: "1 2", output: "3" }],
      constraints: ["0 < A, B < 10"]
    },

    1003: {
      title: "피보나치 함수",
      difficulty: "silver",
      description:
        "피보나치 함수를 호출했을 때 0과 1이 각각 몇 번 출력되는지 구하는 프로그램을 작성하시오.",
      examples: [{ input: "3\n0\n1\n3", output: "1 0\n0 1\n1 2" }],
      constraints: ["0 ≤ N ≤ 40"]
    },

    1008: {
      title: "A/B",
      difficulty: "bronze",
      description: "두 정수 A와 B를 입력받은 다음, A/B를 출력하는 프로그램을 작성하시오.",
      examples: [{ input: "1 3", output: "0.33333333333333333333" }],
      constraints: ["0 < A, B < 10"]
    },

    1012: {
      title: "유기농 배추",
      difficulty: "silver",
      description:
        "배추들이 인접해 있는 군락의 개수를 구하여 필요한 배추흰지렁이의 수를 출력한다.",
      examples: [{ input: "1\n5 3 6\n0 2\n1 2\n2 2\n3 2\n4 2\n4 0", output: "2" }],
      constraints: ["1 ≤ M, N ≤ 50", "0 ≤ K ≤ 2500"]
    },

    1193: {
      title: "분수찾기",
      difficulty: "bronze",
      description:
        "지그재그로 나열된 분수들 중 X번째 분수를 구하는 프로그램을 작성하시오.",
      examples: [{ input: "14", output: "2/4" }],
      constraints: ["1 ≤ X ≤ 10,000,000"]
    },

    1400: {
      title: "??? (가상의 문제)",
      difficulty: "silver",
      description:
        "문제 1400번은 아직 구체화되지 않은 예시 문제입니다. 로직 구현 연습용이에요오.",
      examples: [{ input: "예제 입력", output: "예제 출력" }],
      constraints: ["연습용 문제"]
    },

    1543: {
      title: "문서 검색",
      difficulty: "silver",
      description:
        "문서에서 특정 단어가 중복되지 않게 몇 번 등장하는지 세는 프로그램을 작성하시오.",
      examples: [
        {
          input: "abababa\naba",
          output: "2"
        }
      ],
      constraints: ["문서와 단어의 길이는 2500 이하"]
    },

    1674: {
      title: "도시 분할 계획",
      difficulty: "gold",
      description:
        "도시를 두 개의 마을로 분할할 때 유지비의 합이 최소가 되도록 하시오.",
      examples: [{ input: "7 12\n1 2 3\n...", output: "8" }],
      constraints: ["1 ≤ N ≤ 100,000"]
    }
  };

  const problem = problems[id];

  if (!problem) {
    return (
      <div className={styles.container}>
        <h2>존재하지 않는 문제예요오… 😢</h2>
        <button onClick={() => navigate('/problems')}>
          문제 목록으로 돌아가기
        </button>
      </div>
    );
  }

  const handleSubmit = () => {
    alert('제출되었습니다!');
    navigate('/problems');
  };

  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate('/problems')}>
          ← 문제 목록
        </button>

        <div className={styles.headerInfo}>
          <h1 className={styles.problemTitle}>{problem.title}</h1>
          <div className={styles.headerTags}>
            <span className={`${styles.tag} ${styles.difficultyTag}`}>
              {problem.difficulty}
            </span>
            <span className={styles.headerMeta}>
              ⭐ {problem.score}점
            </span>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className={styles.mainContent}>
        {/* 왼쪽 */}
        <div className={styles.leftPanel}>
          <div className={styles.problemContent}>
            <h3 className={styles.sectionTitle}>문제 설명</h3>
            <p className={styles.description}>{problem.description}</p>

            <h3 className={styles.sectionTitle}>예제</h3>
            {problem.examples.map((ex, idx) => (
              <div key={idx} className={styles.exampleBox}>
                <div className={styles.exampleItem}>
                  <strong>입력:</strong>
                  <pre>{ex.input}</pre>
                </div>
                <div className={styles.exampleItem}>
                  <strong>출력:</strong>
                  <pre>{ex.output}</pre>
                </div>
                <div className={styles.exampleExplanation}>
                  <strong>설명:</strong> {ex.explanation}
                </div>
              </div>
            ))}

            <h3 className={styles.sectionTitle}>제약 조건</h3>
            <ul className={styles.constraintList}>
              {problem.constraints.map((c, idx) => (
                <li key={idx} className={styles.constraintItem}>{c}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* 오른쪽 */}
        <div className={styles.rightPanel}>
          <div className={styles.editorHeader}>
            <select className={styles.languageSelect}>
              <option>C</option>
              <option>C++</option>
              <option>Java</option>
              <option>Python</option>
            </select>
          </div>

          <textarea
            className={styles.codeEditor}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="// 여기에 코드를 작성하세요"
          />

          <div className={styles.editorFooter}>
            <button className={styles.submitBtn} onClick={handleSubmit}>
              제출하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemsSolved;
