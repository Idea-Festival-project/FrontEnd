import { useEffect, useState } from 'react';
import styles from './Ranking.module.css'
import { BiTrophy } from "react-icons/bi";
import { PiMedalBold } from "react-icons/pi";
import { FaStar } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";
import axios from 'axios';

function Ranking() {
  const [ranking, setRanking] = useState([
    { 
      rank: 1, 
      nickname: '의빈', 
      streak: 1500,
      profileImage: 'https://i.imgur.com/placeholder1.jpg' // 실제 이미지 URL로 교체 필요
    },
    { 
      rank: 2, 
      nickname: '현진', 
      streak: 1200,
      profileImage: 'https://i.imgur.com/placeholder2.jpg' // 실제 이미지 URL로 교체 필요
    },
    { 
      rank: 3, 
      nickname: '휘영', 
      streak: 1000,
      profileImage: 'https://i.imgur.com/placeholder3.jpg' // 실제 이미지 URL로 교체 필요
    }
  ])
  const first = ranking[0] || { nickname: '-', streak: '0' };
  const second = ranking[1] || { nickname: '-', streak: '0' };
  const third = ranking[2] || { nickname: '-', streak: '0' };


  useEffect(() => {
    async function RankingInfo() {
      try{
        const res = await axios.get('/ranking');
        setRanking(res.data.data.rankings)
      } catch (err) {
        console.error('랭킹 데이터를 불러오는 중 오류가 발생했습니다', err.message)
      }
    }

    RankingInfo();
  }, [])


  return (
    <div className={styles.HomePage}>
      <div className={styles.TitleText}>
        <h1>랭킹</h1>
        <p>누가 제일 앞서 있을까요?</p>
      </div>

      <div className={styles.RankingDashboard}>
        <div className={styles.PlaceBox}>
          <div className={styles.Profile}>
            {second.profileImage && <img src={second.profileImage} alt={second.nickname} />}
          </div>
          <div className={`${styles.Bar} ${styles.SecondPlace}`}>
            <PiMedalBold size={45} color='white'/>
          </div>
          <div className={styles.TextGroup}>
            <h3>{second.nickname}</h3>
            <p>{second.streak}포인트</p>                 
          </div>
        </div>

        <div className={styles.PlaceBox}>
          <div className={styles.Profile}>
            {first.profileImage && <img src={first.profileImage} alt={first.nickname} />}
          </div>
          <div className={`${styles.Bar} ${styles.FirstPlace}`}>
            <BiTrophy size={55} color='white' />
          </div>
          <div className={styles.TextGroup}>
            <h3>{first.nickname}</h3>
            <p>{first.streak}포인트</p>                 
          </div>
        </div>

        <div className={styles.PlaceBox}>
          <div className={styles.Profile}>
            {third.profileImage && <img src={third.profileImage} alt={third.nickname} />}
          </div>
          <div className={`${styles.Bar} ${styles.ThirdPlace}`}>
            <PiMedalBold size={45} color='white'/>
          </div>
          <div className={styles.TextGroup}>
            <h3>{third.nickname}</h3>
            <p>{third.streak}포인트</p>                 
          </div>
        </div>

      </div>

      <div className={styles.RankingList}>
        {ranking.length === 0 ? <h3>아무도 랭킹에 오르지 못 했어요. 지금이 기회에요!</h3> : ranking.map((rak, idx) => {
          return(
        <div key={idx} className={styles.RankingListItem}> 
          <p className={styles.RankingPlace}>{rak.rank}</p>
          <div className={styles.UserInfoGroup}>
            <div className={styles.RankingListProfile}>
              {rak.profileImage && <img src={rak.profileImage} alt={rak.nickname} />}
            </div>
            <div>
              <h3>{rak.nickname}</h3>
              <div className={styles.UserStackBox}>
                <div className={styles.UserStack}>
                  <FaArrowTrendUp color='rgb(104, 104, 104)' />
                  <p>{rak.streak}포인트</p>                
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