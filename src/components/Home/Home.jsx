import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css'
import { LuTarget } from "react-icons/lu";
import { BiTrophy } from "react-icons/bi";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaRegCalendar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import axios from 'axios';

function Home() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('종윤')
  const [todaySolved, setTodaySolved] = useState(0)
  const [totalSolved, setTotalSolved] = useState(0)
  const [totalCorrectRate, setTotalCorrectRate] = useState(0)
  const todaySolvedGoals = 3
  const progress = Math.floor(todaySolved / todaySolvedGoals * 100)

  const [todayRecommendProblems, setTodayRecommendProblems] = useState([
    { id: 1, title: '두 수의 합 구하기', difficulty: 'easy', point: 100 },
    { id: 2, title: '이진 트리 구현하기', difficulty: 'medium', point: 500 }
  ]);

  const difficultyMap = { easy: '쉬움', medium: '보통', hard: '어려움' };
  const difficultyStyleMap = {
    easy: { backgroundColor: 'rgb(193, 255, 192)', color: 'rgb(3, 187, 0)' },
    medium: { backgroundColor: 'rgb(255, 243, 205)', color: 'rgb(202, 138, 4)' },
    hard: { backgroundColor: 'rgb(254, 226, 226)', color: 'rgb(220, 38, 38)' },
  };

  useEffect(() => {
    async function getUserStatus() {
      try {
        // 주소는 백엔드 구현 상황에 맞춰 수정 (예: /api/CodingGo/my)
        const res = await axios.get('http://localhost:8080/api/CodingGo/my'); 
        
        // 데이터가 없어도 죽지 않게 ?. 사용
        setUsername(res.data?.nickname || '사용자');
        setTotalSolved(res.data?.status?.total_problems || 0);
        setTodaySolved(res.data?.status?.today_solved || 0);
      } catch (err) {
        console.error('데이터를 불러오지 못했습니다.', err.message);
      }
    }
    getUserStatus();
  }, []);

  return (
    <div className={styles.HomePage}>
      <div className={styles.Greeting}>
        <h1>안녕하세요, {username || '-'}님!</h1>
        <p>오늘은 무슨 문제를 풀어볼까요?</p>
      </div>

      <div className={styles.TopDashboard}>
        <div className={styles.TodayGoalsCard}>
          <div className={styles.TodayGoalsStatusBox}>
            <LuTarget size={30} color='orange' />
            <div>
              <h3>오늘의 목표</h3>
              <p>{todaySolved}/{todaySolvedGoals} 문제</p>
            </div>
            <div style={{ flexGrow: '3' }} />
            <h2>{progress}%</h2>
          </div>
          <div className={styles.PercentageBox}>
            <div className={styles.Percentage}>
              <div style={{ backgroundColor: 'rgb(248, 198, 90)', height: '100%', borderRadius: '10px', width: `${progress}%` }} />
            </div>
          </div>
          <div className={styles.Remaining}>
            <p>{todaySolved >= 3 ? "오늘 목표를 달성했어요!" : `${todaySolvedGoals - todaySolved}개만 더 풀면 목표를 달성해요!`}</p>
          </div>
        </div>

        <div className={styles.UserStatusCard}>
          <div className={styles.TotalSolved}>
            <div>
              <p>해결한 문제 수</p>
              <h2>{totalSolved}</h2>
            </div>
            <div style={{ flexGrow: '3' }}></div>
            <BiTrophy size={35} color='rgb(235, 218, 65)' />
          </div>
          <div className={styles.TotalCorrectRate}>
            <div>
              <p>정답률</p>
              <h2>{totalCorrectRate}%</h2>
            </div>
            <div style={{ flexGrow: '3' }}></div>
            <FaArrowTrendUp size={35} color='rgb(103, 239, 108)' />
          </div>
        </div>
      </div>

      <div className={styles.TodayRecommendProblemCard}>
        <div className={styles.TodayRecommendProblemTextBox}>
          <FaRegCalendar size={25} />
          <h3>오늘의 추천 문제</h3>
        </div>
        <div className={styles.TodayRecommendProblemGroup}>
          {todayRecommendProblems.map((problem) => (
            <div key={problem.id} className={styles.TodayRecommendProblemsBox}>
              <div className={styles.TodayRecommendProblemItem} onClick={() => navigate('/problems')}>
                <div className={styles.ProblemInfo}>
                  <h3>{problem.title}</h3>
                  <div className={styles.DifficultyBox} style={difficultyStyleMap[problem.difficulty]}>
                    <p>{difficultyMap[problem.difficulty]}</p>
                  </div>
                </div>
                <div className={styles.PointBox}>
                  <FaStar size={25} /><p>{problem.point}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home;