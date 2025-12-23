import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ProblemsSolved.module.css'

function ProblemSolve() {
  const { id } = useParams(); // URL에서 문제 ID 받아오기
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [activeTab, setActiveTab] = useState('문제');
  const [testResults, setTestResults] = useState(null);

  const problem = {
    id: 1,
    title: "두 수의 합",
    difficulty: "쉬움",
    category: "배열",
    timeLimit: 1,
    score: 100,
    description: `정수 배열 nums와 정수 target이 주어졌을 때, nums에서 두 수를 더해 target이 되는 두 수의 인덱스를 배열로 반환하세요.

각 입력에는 정확히 하나의 해답만 존재하며, 같은 원소를 두 번 사용할 수 없습니다.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "nums[0] + nums[1] = 2 + 7 = 9이므로, [0, 1]을 반환합니다."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "nums[1] + nums[2] = 2 + 4 = 6이므로, [1, 2]를 반환합니다."
      }
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "정확히 하나의 해답만 존재합니다."
    ]
  };

  const handleRunCode = () => {
    setTestResults({
      passed: 2,
      total: 3,
      cases: [
        { input: "[2,7,11,15], 9", expected: "[0,1]", actual: "[0,1]", passed: true },
        { input: "[3,2,4], 6", expected: "[1,2]", actual: "[1,2]", passed: true },
        { input: "[3,3], 6", expected: "[0,1]", actual: "null", passed: false }
      ]
    });
  };

  const handleSubmit = () => {
    alert('제출되었습니다!');
  };

  const handleBackToList = () => {
    navigate('/problems');
  };

  return (
    <div className={styles.container}>
      {/* 헤더 */}
      <div className={styles.header}>
        <button className={styles.backBtn} onClick={handleBackToList}>
          ← 문제 목록
        </button>
        <div className={styles.headerInfo}>
          <h1 className={styles.problemTitle}>{problem.title}</h1>
          <div className={styles.headerTags}>
            <span className={`${styles.tag} ${styles.difficultyTag}`}>{problem.difficulty}</span>
            <span className={`${styles.tag} ${styles.categoryTag}`}>{problem.category}</span>
            <span className={styles.headerMeta}>
              ⏱ {problem.timeLimit}초
            </span>
            <span className={styles.headerMeta}>
              ⭐ {problem.score}점
            </span>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className={styles.mainContent}>
        {/* 왼쪽: 문제 설명 */}
        <div className={styles.leftPanel}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${activeTab === '문제' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('문제')}
            >
              문제
            </button>
            <button
              className={`${styles.tab} ${activeTab === '제출 기록' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('제출 기록')}
            >
              제출 기록
            </button>
          </div>

          {activeTab === '문제' ? (
            <div className={styles.problemContent}>
              <h3 className={styles.sectionTitle}>문제 설명</h3>
              <p className={styles.description}>{problem.description}</p>

              <h3 className={styles.sectionTitle}>예제</h3>
              {problem.examples.map((ex, idx) => (
                <div key={idx} className={styles.exampleBox}>
                  <div className={styles.exampleItem}>
                    <strong>입력:</strong> {ex.input}
                  </div>
                  <div className={styles.exampleItem}>
                    <strong>출력:</strong> {ex.output}
                  </div>
                  <div className={styles.exampleExplanation}>
                    <strong>설명:</strong> {ex.explanation}
                  </div>
                </div>
              ))}

              <h3 className={styles.sectionTitle}>제약 조건</h3>
              <ul className={styles.constraintList}>
                {problem.constraints.map((constraint, idx) => (
                  <li key={idx} className={styles.constraintItem}>{constraint}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className={styles.problemContent}>
              <h3 className={styles.sectionTitle}>제출 기록</h3>
              <p className={styles.emptyState}>아직 제출한 기록이 없습니다.</p>
            </div>
          )}
        </div>

        {/* 오른쪽: 코드 에디터 */}
        <div className={styles.rightPanel}>
          <div className={styles.editorHeader}>
            <select className={styles.languageSelect}>
              <option>JavaScript</option>
              <option>Python</option>
              <option>Java</option>
              <option>C++</option>
            </select>
          </div>

          <textarea
            className={styles.codeEditor}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="// 여기에 코드를 작성하세요
function twoSum(nums, target) {
  // 코드를 작성하세요
}"
          />

          {/* 테스트 결과 */}
          {testResults && (
            <div className={styles.testResults}>
              <div className={styles.testResultHeader}>
                <h4 className={styles.testResultTitle}>
                  테스트 결과: {testResults.passed}/{testResults.total} 통과
                </h4>
              </div>
              <div className={styles.testCases}>
                {testResults.cases.map((test, idx) => (
                  <div key={idx} className={styles.testCase}>
                    <div className={styles.testCaseHeader}>
                      <span className={test.passed ? styles.testPassed : styles.testFailed}>
                        {test.passed ? '✓' : '✗'} 테스트 케이스 {idx + 1}
                      </span>
                    </div>
                    <div className={styles.testCaseBody}>
                      <div>입력: {test.input}</div>
                      <div>예상 출력: {test.expected}</div>
                      <div>실제 출력: {test.actual}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 하단 버튼 */}
          <div className={styles.editorFooter}>
            <button className={styles.runBtn} onClick={handleRunCode}>
              ▶ 코드 실행
            </button>
            <button className={styles.submitBtn} onClick={handleSubmit}>
              제출하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemSolve;