import { useState } from 'react'
import styles from './Home.module.css'
import { LuTarget } from "react-icons/lu";
import { BiTrophy } from "react-icons/bi";
import { FaArrowTrendUp } from "react-icons/fa6";

function Home() {
  const [username, setUsername] = useState('류수연')
  const todaySolvedGoals = 3
  const [todaySolved, setTodaySolved] = useState(0)
  const progress = Math.floor(todaySolved / todaySolvedGoals * 100)
  const totalSolved = 0
  const totalCorrectRate = 0


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
      
    </div>
  )
}

export default Home