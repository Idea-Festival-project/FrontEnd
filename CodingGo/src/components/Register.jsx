import { useState } from 'react'
import { FiEye, FiEyeOff } from "react-icons/fi";
import styles from './Register.module.css'
import Logo from '../assets/CodingGo-logo.png'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordToggle, setPasswordToggle] = useState('password')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const [PasswordConfirmToggle, setPasswordConfirmToggle] = useState('password')
  const [gender, setGender] = useState('none')


  const changeEmail = (e) => {
    setEmail(e.target.value)
  }

  const changePassword = (e) => {
    setPassword(e.target.value)
  }

  const showPasswordChange = (e) => {
    setShowPassword(prev => !prev)
    setPasswordToggle(passwordToggle == 'password' ? 'text' : 'password')
  }

  const changePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value)
  }  

  const showPasswordConfirmChange = (e) => {
    setShowPasswordConfirm(prev => !prev)
    setPasswordConfirmToggle(PasswordConfirmToggle == 'password' ? 'text' : 'password')
  }

    const selectGender = (selectedGender) => {
    setGender(selectedGender)
    console.log(selectedGender)
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
          type={passwordToggle} 
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


        <div className={styles.InputBoxItem}>
          <p>비밀번호 확인</p>
          <input 
          type={PasswordConfirmToggle} 
          placeholder='비밀번호를 다시 입력해주세요' 
          value={passwordConfirm}
          onChange={changePasswordConfirm} />
          <button
          type='button'
          className={styles.ShowPasswordBtn}
          onClick={showPasswordConfirmChange}>
            {showPasswordConfirm ? <FiEye size={18} color='gray'/> : <FiEyeOff size={18} color='gray' />}
          </button>
        </div>

        </div>
        <div className={styles.MainFooter}>
          <button
          type='button'
          className={styles.MainFooterBtn}>
          다음
          </button>
          <div className={styles.MainFooterB}>
          </div>
        </div>
      </div>
  )
}

export default Register