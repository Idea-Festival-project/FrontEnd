import { useState } from 'react'
import styles from './Home.module.css'
import { LuTarget } from "react-icons/lu";
import { BiTrophy } from "react-icons/bi";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaRegCalendar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";

function Home() {
  const [username, setUsername] = useState('류수연')
  const todaySolvedGoals = 3
  const [todaySolved, setTodaySolved] = useState(2)
  const progress = Math.floor(todaySolved / todaySolvedGoals * 100)
  const totalSolved = 0
  const totalCorrectRate = 0
  const [todayRecommendProblems, setTodayRecommendProblems] = useState([
    {
      title : '두 수의 합 구하기',
      difficulty : 'easy',
      point : 100,
    },
    {
      title : '이진 트리 구현하기',
      difficulty : 'medium',
      point : 500,
    }
  ])
  
  const difficultyMap = {
    easy : '쉬움',
    medium : '보통',
    hard : '어려움',
  }

const difficultyStyleMap = {
  easy: {
    backgroundColor: 'rgb(193, 255, 192)',
    color: 'rgb(3, 187, 0)',
  },
  medium: {
    backgroundColor: 'rgb(255, 243, 205)',
    color: 'rgb(202, 138, 4)',
  },
  hard: {
    backgroundColor: 'rgb(254, 226, 226)',
    color: 'rgb(220, 38, 38)',
  },
}


  return(
    <div className={styles.HomePage}>
      <div className={styles.Greeting}>
        <h1>안녕하세요, {username}님!</h1>
        <p>오늘은 무슨 문제를 풀어볼까요?</p>
      </div>

      <div className={styles.TopDashboard}>

        <div className={styles.TodayGoalsCard}>
          <div className={styles.TodayGoalsStatusBox}>
            <div className={styles.TodayGoalsStatusIconBox}>
              <LuTarget size={30} color='orange' />
            </div>
            <div>
              <h3>오늘의 목표</h3>
              <p>{todaySolved}/{todaySolvedGoals} 문제</p>
            </div>
            <div style={{flexGrow : '3'}} />
            <h2>{progress}%</h2>
          </div>
          <div className={styles.PercentageBox}>
            <div className={styles.Percentage}>
              <div style={{backgroundColor : 'rgb(248, 198, 90)', height : '100%', borderRadius : '10px', width : `${progress}%`}} />
            </div>
          </div>
            <div className={styles.Remaining}>
              <p>{todaySolved === 3 ? "오늘 목표를 달성했어요!" : `${todaySolvedGoals - todaySolved}개만 더 풀면 목표를 달성해요!`}</p>
            </div>          
        </div>

        <div className={styles.UserStatusCard}>
          <div className={styles.TotalSolved}>
            <div>
              <p>해결한 문제 수</p>
              <h2>{totalSolved}</h2>
            </div>
            <div style={{flexGrow : '3'}}></div>
            <BiTrophy size={35} color='rgb(235, 218, 65)'/>
          </div>
          <div className={styles.TotalCorrectRate}>
            <div>
              <p>정답률</p>
              <h2>{totalCorrectRate}%</h2>
            </div>
            <div style={{flexGrow : '3'}}></div>
            <FaArrowTrendUp size={35} color='rgb(103, 239, 108)'/>
          </div>
        </div>
      </div>
      
      <div className={styles.TodayRecommendProblemCard}>
        <div className={styles.TodayRecommendProblemTextBox}>
          <FaRegCalendar size={25} />
          <h3>오늘의 추천 문제</h3>
        </div>
        <div style={{height : '25%'}} />
        <div className={styles.TodayRecommendProblemGroup}>
          {todayRecommendProblems.map((problem) => (
            <div className={styles.TodayRecommendProblemsBox}>
              <div
                key={problem.title}
                className={styles.TodayRecommendProblemItem}
              >
                <div className={styles.ProblemInfo}>
                  <h3>{problem.title}</h3>
                  <div className={styles.DifficultyBox} style={difficultyStyleMap[problem.difficulty]}>
                    <p>
                      {difficultyMap[problem.difficulty] ?? '난이도를 불러오지 못 했어요'}
                    </p>                    
                  </div>
                </div>
                <div className={styles.PointBox}>
                  <FaStar size={25}/>
                  <p>{problem.point}</p>
                </div>
              </div>
            </div>
          ))}        
        </div>

      </div>
    </div>
  )
}

export default Home