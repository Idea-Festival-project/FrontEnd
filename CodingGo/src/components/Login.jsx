import { useState } from 'react'
import { FiEye, FiEyeOff } from "react-icons/fi";
import styles from './Login.module.css'
import Logo from '../assets/CodingGo-logo.png'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)


  const changeEmail = (e) => {
    setEmail(e.target.value)
  }

  const changePassword = (e) => {
    setPassword(e.target.value)
  }

  const showPasswordChange = () => {
    setShowPassword(prev => !prev)
  }

  return (
      <div className={styles.MainBox}>
        <div className={styles.LogoBox}>
          <img src={Logo}/>
        </div>
        <div className={styles.InputBox}>

          <div className={styles.InputBoxItem}>
            <p>이메일</p>
            <input 
            type='text' 
            placeholder='이메일을 입력해주세요.' 
            value={email}
            onChange={changeEmail} />
          </div>

        <div className={styles.InputBoxItem}>
          <p>비밀번호</p>
          <input 
          type={showPassword ? 'text' : 'password'} 
          placeholder='비밀번호를 입력해주세요' 
          value={password}
          onChange={changePassword} />
          <button
          type='button'
          className={styles.ShowPasswordBtn}
          onClick={showPasswordChange}>
            {showPassword ? <FiEye size={18} color='gray'/> : <FiEyeOff size={18} color='gray' />}
          </button>
        </div>

        </div>
        <div className={styles.MainFooter}>
          <button
          type='button'
          className={styles.MainFooterBtn}>
          확인
          </button>
          <div className={styles.MainFooterB}>
            {/* <div className={styles.MainFooterTextGroup}>
              <p>회원가입을 아직 하지 않으셨나요?</p>
              <p>|</p>
              <p><a>회원가입</a></p>  
            </div> */}
            <div className={styles.NotIn}></div>
          </div>
        </div>
      </div>
  )
}

export default Login