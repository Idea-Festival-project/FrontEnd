import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Problems.module.css";

function Problems() {
  const [problemList, setProblemList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const getTierClass = (tierStr) => {
    if (!tierStr) return "";
    const baseTier = tierStr.split(" ")[0].toLowerCase();
    return styles[baseTier] || "";
  };

  /**
   * 데이터 페칭 함수
   */
  const fetchProblems = async (page, fetchMore = false) => {
    try {
      if (fetchMore) setSyncing(true);
      else setLoading(true);
      setError(null); // 에러 초기화

      const token = localStorage.getItem("accessToken");
      
      // headers 설정: 토큰이 있으면 보내고 없으면 안 보냄 (permitAll 모드 대응)
      const config = {
        params: { 
          start: 1000, 
          end: 40000, 
          page: page, 
          size: 20,
          fetchMore: fetchMore 
        }
      };

      if (token) {
        config.headers = { Authorization: `Bearer ${token}` };
      }

      const response = await axios.get("http://localhost:8080/api/CodingGo/problem", config);

      // 데이터 구조 안전하게 받기 (Spring Data Page 객체 구조 대응)
      const data = response.data;
      setProblemList(data?.content || []);
      setTotalPages(data?.totalPages || 0);
      setTotalElements(data?.totalElements || 0);
      
      if (fetchMore && data?.content?.length > 0) {
        alert("데이터 동기화를 성공했습니다!");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      // 403 Forbidden인 경우와 일반 에러 구분
      if (err.response?.status === 403) {
        setError("접근 권한이 없습니다. (Security 설정을 확인하세요)");
      } else {
        setError("문제를 불러오지 못했습니다. 서버가 켜져 있는지 확인하세요.");
      }
    } finally {
      setLoading(false);
      setSyncing(false);
    }
  };

  // 페이지 변경 시마다 호출
  useEffect(() => {
    fetchProblems(currentPage);
    window.scrollTo(0, 0);
  }, [currentPage]);

  // '다음' 버튼 클릭 핸들러
  const handleNextPage = () => {
    if (currentPage >= totalPages - 1 || totalElements === 0) {
      if (window.confirm("다음 페이지 데이터가 없습니다. 백준에서 문제를 동기화할까요?")) {
        fetchProblems(currentPage, true);
      }
    } else {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToBaekjoon = (problemId) => {
    window.open(`https://www.acmicpc.net/problem/${problemId}`, "_blank");
  };

  // 로딩 중 표시 (동기화 중일 때는 리스트를 보여주기 위해 제외)
  if (loading && !syncing) {
    return <div className={styles.problemsPage}><div className={styles.loader}>데이터 로딩 중...</div></div>;
  }

  return (
    <div className={styles.problemsPage}>
      <div className={styles.headerContainer}>
        <div>
          <h1 className={styles.problemsTitle}>문제 목록</h1>
          <p className={styles.problemsDesc}>
            {totalElements === 0 
              ? "현재 등록된 문제가 없습니다. 동기화 버튼을 눌러주세요." 
              : `현재 ${totalElements}개의 문제가 있습니다. (페이지: ${currentPage + 1}/${totalPages})`}
          </p>
        </div>
        <button 
          className={styles.syncBtn} 
          onClick={() => fetchProblems(currentPage, true)}
          disabled={syncing}
        >
          {syncing ? "백준에서 가져오는 중..." : "🔄 데이터 강제 동기화"}
        </button>
      </div>

      {/* 에러 메시지 표시 */}
      {error && <div className={styles.errorMessage}>{error}</div>}

      <div className={styles.problemListContainer}>
        {problemList && problemList.length > 0 ? (
          problemList.map((p) => (
            <div key={p.problemId} className={`${styles.problemCard} ${p.isSolved ? styles.solvedCard : ""}`}>
              <div className={styles.problemLeft}>
                <div>
                  <span className={styles.problemId}>{p.problemId}</span>
                  <span className={styles.problemTitle}>{p.title}</span>
                  {p.isSolved && <span className={styles.solvedText}>[풀이완료]</span>}
                </div>
                <div className={styles.problemTags}>
                  <span className={`${styles.tierTag} ${getTierClass(p.tier)}`}>
                    {p.tier || "Unrated"}
                  </span>
                  {p.tags && <span className={styles.linkText}>#{p.tags.split(',')[0]}</span>}
                  <span className={styles.pointInfo}>
                    {p.isSolved ? "💰 포인트 획득 완료" : `🎁 보상: ${p.rewardPoint || 0}P`}
                  </span>
                </div>
              </div>
              <div className={styles.problemRight}>
                {p.isSolved && <div className={styles.solvedIcon}>✓</div>}
                <button className={styles.solveBtn} onClick={() => goToBaekjoon(p.problemId)}>
                  {p.isSolved ? "다시 풀기" : "문제 풀기"}
                </button>
              </div>
            </div>
          ))
        ) : (
          !loading && (
            <div className={styles.noData}>
              표시할 문제가 없습니다. 백준 동기화가 필요합니다.
            </div>
          )
        )}
      </div>

      {/* 페이징 UI */}
      {totalPages > 0 && (
        <div className={styles.pagination}>
          <button disabled={currentPage === 0} onClick={() => setCurrentPage(0)} className={styles.pageBtn}>처음</button>
          <button disabled={currentPage === 0} onClick={() => setCurrentPage(prev => prev - 1)} className={styles.pageBtn}>이전</button>
          
          {[...Array(totalPages)].map((_, i) => (
             <button
               key={i}
               className={`${styles.pageBtn} ${currentPage === i ? styles.activePage : ""}`}
               onClick={() => setCurrentPage(i)}
             >
               {i + 1}
             </button>
          )).slice(Math.max(0, currentPage - 2), Math.min(totalPages, currentPage + 3))}

          <button 
            onClick={handleNextPage} 
            className={`${styles.pageBtn} ${(currentPage >= totalPages - 1 || totalElements === 0) ? styles.fetchMoreBtn : ""}`}
          >
            { (currentPage >= totalPages - 1 || totalElements === 0) ? "데이터 더 가져오기" : "다음" }
          </button>
        </div>
      )}
    </div>
  );
}

export default Problems;