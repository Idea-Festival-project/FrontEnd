
import { useEffect, useState } from 'react'
import styles from './MyPage.module.css'
import { FaStar } from 'react-icons/fa6'
import { BiTrophy } from "react-icons/bi"
import { IoSettingsOutline } from "react-icons/io5"
import axios from 'axios'
import ProfileSettingModal from './ProfileSettingModal'

function MyPage() {
  const [totalPoint, setTotalPoint] = useState(0)
  const [totalSuccessProblem, setTotalSuccessProblem] = useState(0)
  const [userName, setUserName] = useState(null)
  const [profileImgUrl, setProfileImgUrl] = useState(() => {
    return localStorage.getItem('profileImage') || '/Atti_noma.png'
  })
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    async function getUserInfo() {
      try {
        const res = await axios.get('/my')
        setTotalSuccessProblem(res.data.status.total_problems)
        setTotalPoint(res.data.status.total_points)
        setUserName(res.data.nickname)
        const savedProfile = localStorage.getItem('profileImage')
        if (savedProfile) {
          setProfileImgUrl(savedProfile)
        }
      } catch (err) {
        console.error(err)
      }
    }
    getUserInfo()
  }, [])

  return (
    <div className={styles.HomePage}>
      <div className={styles.TextSettGroup}>
        <div className={styles.TitleText}>
          <h1>마이페이지</h1>
          <p>지금까지 진행한 활동을 살펴보세요!</p>
        </div>

        <div style={{ flexGrow: 1 }} />

        <button
          className={styles.SettingBox}
          onClick={() => setIsModalOpen(true)}
        >
          <IoSettingsOutline size={26} />
        </button>
      </div>

      <div className={styles.ProfileCard}>
        <div className={styles.ProfileImg}>
          <img src={profileImgUrl} alt="profile" />
        </div>

        <div className={styles.UserInfoBox}>
          <h2>{userName ?? '-'}</h2>
          <p>Bronze</p>
        </div>
      </div>

      <div className={styles.UserStatusCard}>
        <div className={styles.UserStatusItems}>
          <FaStar size={30} color='rgb(248, 198, 90)' />
          <h3>{totalPoint}</h3>
          <p>총 포인트</p>
        </div>

        <div className={styles.UserStatusItems}>
          <BiTrophy size={30} color='rgb(248, 198, 90)' />
          <h3>{totalSuccessProblem}</h3>
          <p>해결한 문제 수</p>
        </div>
      </div>

      {isModalOpen && (
        <ProfileSettingModal
          onClose={() => setIsModalOpen(false)}
          currentPoints={totalPoint || 1000}
          onSelect={(img) => {
            setProfileImgUrl(img)
            localStorage.setItem('profileImage', img)
            setIsModalOpen(false)
          }}
        />
      )}
    </div>
  )
}

export default MyPage