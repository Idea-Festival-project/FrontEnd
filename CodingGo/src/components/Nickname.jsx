import { useState } from 'react'
import styles from './Nickname.module.css'
import Logo from '../assets/CodingGo-logo.png'

function Nickname() {
  const [userId, setUserId] = useState('')
  // const [isDuplication, setIsDuplication] = useState(false)

  const changeUserId = (e) => {
    setUserId(e.target.value)
  }

  // const usernameDuplication = () => {
    
  // }

  return (
    <div className={styles.MainBox}>
      <div className={styles.LogoBox}>
        <img src={Logo}/>
      </div>
      <div className={styles.InputBox}>
        <h3>Coding Go에서 사용하실 아이디를 입력해주세요.</h3>

        <div className={styles.InputBoxItem}>
          <input 
          type='text' 
          placeholder='아이디를 입력해주세요.' 
          value={userId}
          onChange={changeUserId} />
          <button
          type='button'
          className={styles.IsDuplicationBtn}
          //onClick={usernameDuplication}
          >중복 확인
          </button>
        </div>

      </div>
      <div className={styles.MainFooter}>
        <button
        type='button'
        className={styles.MainFooterBtn}>
        다음
        </button>
      </div>

    </div>
  )
}

export default Nickname