import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Problems.module.css";
import { useNavigate } from "react-router-dom";


function Problems() {
  const navigate = useNavigate()
  const [problemList, setProblemList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProblemData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(
          "/solved/api/v3/problem/lookup",
          {
            params: { problemIds: "1000,1003,1012,1008,1193,1543" },
          }
        );

        if (Array.isArray(response.data)) {
          setProblemList(response.data);
          console.log(response.data)
        } else {
          setProblemList([]);
        }
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "문제를 불러오는 데 실패했습니다."
        );
        setProblemList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProblemData();
  }, []);

  const getTierName = (level) => {
    if (level === 0) return "Unrated";

    const tiers = ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Ruby"];
    const tierIdx = Math.floor((level - 1) / 5);
    const tierNum = 5 - ((level - 1) % 5);

    return `${tiers[tierIdx]} ${tierNum}`;
  };

  const getTierClass = (level) => {
    if (level >= 1 && level <= 5) return styles.bronze;
    if (level >= 6 && level <= 10) return styles.silver;
    if (level >= 11 && level <= 15) return styles.gold;
    if (level >= 16 && level <= 20) return styles.platinum;
    if (level >= 21 && level <= 25) return styles.diamond;
    if (level >= 26 && level <= 30) return styles.ruby;
    return "";
  };

  if (loading) {
    return (
      <div className={styles.problemsPage}>
        <div className={styles.loading}>데이터를 불러오는 중입니다.</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.problemsPage}>
        <div className={styles.error}>
          <p>오류: {error}</p>
          <p>잠시 후 다시 시도해주세요</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.problemsPage}>
      <h1 className={styles.problemsTitle}>문제 목록</h1>
      <p className={styles.problemsDesc}>solved.ac 문제</p>

      <div className={styles.problemList}>
        {problemList.length === 0 ? (
          <div className={styles.emptyMessage}>
            문제를 불러오지 못 했어요
          </div>
        ) : (
          problemList.map((p) => (
            <div className={styles.problemCard} key={p.problemId}>
              <div className={styles.problemLeft}>
                <div className={styles.problemTitle}>
                  <span className={styles.problemId}>
                    {p.problemId}번{" "}
                  </span>
                  {p.titleKo}
                </div>

                <div className={styles.problemTags}>
                  <span
                    className={`${styles.tierTag} ${getTierClass(p.level)}`}
                  >
                    {getTierName(p.level)}
                  </span>
                </div>
              </div>

              <div className={styles.problemRight}>
                <button
                  className={styles.solveBtn}
                  onClick={() => navigate(`/problemsSolved/${p.problemId}`)}
                >
                  문제 풀기
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Problems;
