import { useEffect, useState } from 'react';
import styles from './Ranking.module.css'
import { BiTrophy } from "react-icons/bi";
import { PiMedalBold } from "react-icons/pi";
import { FaStar } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";
import axios from 'axios';

function Ranking() {
  const [ranking, setRanking] = useState([])
  const first = ranking[0] || { nickname: '-', problems_solved: '0' };
  const second = ranking[1] || { nickname: '-', problems_solved: '0' };
  const third = ranking[2] || { nickname: '-', problems_solved: '0' };


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
          <div className={styles.Profile}></div>
          <div className={`${styles.Bar} ${styles.SecondPlace}`}>
            <PiMedalBold size={45} color='white'/>
          </div>
          <div className={styles.TextGroup}>
            <h3>{second.nickname}</h3>
            <p>{second.problems_solved}개</p>                 
          </div>
        </div>

        <div className={styles.PlaceBox}>
          <div className={styles.Profile}></div>
          <div className={`${styles.Bar} ${styles.FirstPlace}`}>
            <BiTrophy size={55} color='white' />
          </div>
          <div className={styles.TextGroup}>
            <h3>{first.nickname}</h3>
            <p>{first.problems_solved}개</p>                 
          </div>
        </div>

        <div className={styles.PlaceBox}>
          <div className={styles.Profile}></div>
          <div className={`${styles.Bar} ${styles.ThirdPlace}`}>
            <PiMedalBold size={45} color='white'/>
          </div>
          <div className={styles.TextGroup}>
            <h3>{third.nickname}</h3>
            <p>{third.problems_solved}개</p>                 
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
              {/*프로필 이미지*/}
            </div>
            <div>
              <h3>{rak.nickname}</h3>
              <div className={styles.UserStackBox}>
                <div className={styles.UserStack}>
                  <FaStar color='rgb(248, 198, 90)' />
                  <p>{rak.problems_solved}개</p>                
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