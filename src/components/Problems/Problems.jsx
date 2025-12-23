import { useState } from "react";
import styles from './Problems.module.css';
import { FaCheck } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';


function Problems() {
  const navigate = useNavigate();
  
  const handleSolveProblem = (problemId) => {
    navigate(`/problemsSolved/${problemId}`);
  };

  const [filter, setFilter] = useState("전체");

  const problemList = [
    {
      "id": 1,
      "title": "두 수의 합",
      "difficulty": "쉬움",
      "category": "배열",
      "timeLimit": 1,
      "score": 100,
      "solved": true
    },
    {
      "id": 2,
      "title": "팰린드롬 확인",
      "difficulty": "쉬움",
      "category": "문자열",
      "timeLimit": 1,
      "score": 100,
      "solved": false
    },
    {
      "id": 3,
      "title": "이진 탐색",
      "difficulty": "보통",
      "category": "탐색",
      "timeLimit": 2,
      "score": 150,
      "solved": false
    },
    {
      "id": 4,
      "title": "최단 거리",
      "difficulty": "어려움",
      "category": "그래프",
      "timeLimit": 3,
      "score": 300,
      "solved": false
    },
  ];

  const filteredProblems =
    filter === "전체"
      ? problemList
      : problemList.filter((p) => p.difficulty === filter);

    const difficultyClassMap = {
      "쉬움": styles.easy,
      "보통": styles.medium,
      "어려움": styles.hard,
    };

  return (
    <div className={styles.problemsPage}>
      <h1 className={styles.problemsTitle}>문제</h1>
      <p className={styles.problemsDesc}>2025년 최신 알고리즘 문제를 풀어보세요</p>

      <div className={styles.filterRow}>
        {["전체", "쉬움", "보통", "어려움"].map((level) => (
          <button
            key={level}
            className={`${styles.filterBtn} ${filter === level ? styles.active : ""}`}
            onClick={() => setFilter(level)}
          >
            {level}
          </button>
        ))}
      </div>

      <div className={styles.problemList}>
        {filteredProblems.map((p) => (
          <div className={styles.problemCard} key={p.id}>
            <div className={styles.problemLeft}>
              <div className={styles.problemTitle}>{p.title}</div>
              <div className={styles.problemTags}>
                {/* 난이도에 따른 동적 클래스 적용 */}
                <span className={`${styles.tag} ${difficultyClassMap[p.difficulty] || ''}`}>
                  {p.difficulty}
                </span>
                <span className={`${styles.tag} ${styles.category}`}>{p.category}</span>
                <span className={styles.time}>⏱ {p.timeLimit}초</span>
              </div>
              <div className={styles.score}>⭐ {p.score}점</div>
            </div>

            <div className={styles.problemRight}>
              {p.solved && <div className={styles.solvedIcon}><FaCheck /></div>}
              <button className={styles.solveBtn}
              onClick={() => handleSolveProblem(p.id)}
              >
                {p.solved ? "다시 풀기" : "문제 풀기"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Problems;
