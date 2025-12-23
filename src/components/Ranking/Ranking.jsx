import { useState } from 'react';
import styles from './Ranking.module.css'
import { BiTrophy } from "react-icons/bi";
import { PiMedalBold } from "react-icons/pi";
import { FaStar } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";

function Ranking() {
  
  const [ranking, setRanking] = useState([
    {
      place : '1',
      name : '이의빈',
      point : '4800',
      streak : '20',
    },

    {
      place : '2',
      name : '정종윤',
      point : '3500',
      streak : '13',
    },

    {
      place : '3',
      name : '유휘영',
      point : '2500',
      streak : '10',
    },
  ])

  const first = ranking[0] || { name: '-', point: '0' };
  const second = ranking[1] || { name: '-', point: '0' };
  const third = ranking[2] || { name: '-', point: '0' };

  return (
    <div className={styles.HomePage}>
      <div className={styles.TitleText}>
        <h1>랭킹</h1>
        <p>누가 제일 앞서 있을까요?</p>
      </div>

      <div className={styles.RankingDashboard}>
        <div className={styles.PlaceBox}>
          <div className={styles.Profile}></div>
          <div className={`${styles.Bar} ${styles.SecondPlace}`}>
            <PiMedalBold size={45} color='white'/>
          </div>
          <div className={styles.TextGroup}>
            <h3>{second.name}</h3>
            <p>{second.point}점</p>                 
          </div>
        </div>

        <div className={styles.PlaceBox}>
          <div className={styles.Profile}></div>
          <div className={`${styles.Bar} ${styles.FirstPlace}`}>
            <BiTrophy size={55} color='white' />
          </div>
          <div className={styles.TextGroup}>
            <h3>{first.name}</h3>
            <p>{first.point}점</p>                 
          </div>
        </div>

        <div className={styles.PlaceBox}>
          <div className={styles.Profile}></div>
          <div className={`${styles.Bar} ${styles.ThirdPlace}`}>
            <PiMedalBold size={45} color='white'/>
          </div>
          <div className={styles.TextGroup}>
            <h3>{third.name}</h3>
            <p>{third.point}점</p>                 
          </div>
        </div>

      </div>

      <div className={styles.RankingList}>
        {ranking.map((rak, idx) => {
          return(
        <div key={idx} className={styles.RankingListItem}> 
          <p className={styles.RankingPlace}>{rak.place}</p>
          <div className={styles.UserInfoGroup}>
            <div className={styles.RankingListProfile}>
              {/*프로필 이미지*/}
            </div>
            <div>
              <h3>{rak.name}</h3>
              <div className={styles.UserStackBox}>
                <div className={styles.UserStack}>
                  <FaStar color='rgb(248, 198, 90)' />
                  <p>{rak.point}점</p>                
                </div>
                <div className={styles.UserStack}>
                  <FaArrowTrendUp color='rgb(104, 104, 104)' />
                  <p>{rak.streak}문제</p>                
                </div>   
              </div>
            </div>            
          </div>
          <div style={{flexGrow : '3'}} />
        </div>
        )
        })}
      </div>
    </div>
  )
}

export default Ranking