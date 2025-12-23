import { useState } from 'react'
import styles from './MyPage.module.css'
import { FaStar } from 'react-icons/fa6'
import { BiTrophy } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";

function MyPage() {
  const [needExp, setNeedExp] = useState(1000)
  const [nowExp, setNowExp] = useState(250)
  const expPercentage = nowExp / needExp * 100
  const [totalPoint, setTotalPoint] = useState(1000)
  const [totalSuccessProblem, setTotalSuccessProblem] = useState(0)

  return(
    <div className={styles.HomePage}>
      <div className={styles.TextSettGroup}>
        <div className={styles.TitleText}>
          <h1>마이페이지</h1>
          <p>지금까지 진행한 활동을 살펴보세요!</p>
        </div>
        <div style={{flexGrow : '3'}} />
        <div className={styles.SettingBox}>      
          <IoSettingsOutline size={30} />
        </div>
      </div>

      <div className={styles.ProfileCard}>
        <div className={styles.ProfileImg}>

        </div>
        <div className={styles.UserInfoBox}>
          <div className={styles.UserNameLv}>
            <h2>나</h2>
            <div>
              <h5>LV.1</h5>
            </div>
          </div>
          <p>전체 랭킹 중 #-</p>
        </div>
        <div className={styles.PercentageBox}>
          <div className={styles.ExpTextGroup}>
            <p>경험치</p>
            <div style={{flexGrow : '3'}} />
            <p>{`${nowExp} / ${needExp}`}</p>
          </div>
          <div className={styles.Percentage}>
            <div style={{backgroundColor : 'rgb(248, 198, 90)', height : '100%', borderRadius : '10px', width : `${expPercentage}%`}} />
          </div>
          <p className={styles.NextLvNdText}>{`다음 레벨까지 필요한 경험치 ${needExp - nowExp}`}</p>
        </div>
      </div>
      <div className={styles.UserStatusCard}>
        <div className={styles.UserStatusItems}>
          <FaStar size={30} color='rgb(248, 198, 90)' />
          <h3>{`${totalPoint}`}</h3>
          <p>총 포인트</p>
        </div>

        <div className={styles.UserStatusItems}>
          <BiTrophy size={30} color='rgb(248, 198, 90)' />
          <h3>{`${totalSuccessProblem}`}</h3>
          <p>해결한 문제 수</p>
        </div>
      </div>
    </div>
  )
}

export default MyPage