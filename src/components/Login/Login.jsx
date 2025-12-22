import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiEye, FiEyeOff } from "react-icons/fi";
import styles from './Login.module.css'
import Logo from '../../assets/CodingGo-logo.png'
import axios from 'axios'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [EmPwErrMsg, setEmPwErrMsg] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/login', {
        email: email,
        password: password,
      });

      const { accessToken, refreshToken} = res.data

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      navigate('/home', { replace : true})

    } catch (err) {
      console.error("로그인 오류", err.response?.data || err.message)
      const serverMessage = err.response?.data?.message;
      setEmPwErrMsg(serverMessage || "로그인 중 오류가 발생했습니다")
    }
  }

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
      <form className={styles.MainBox} onSubmit={handleLogin}>
        <div className={styles.LogoBox}>
          <img src={Logo} alt='CodingGo 로고'/>
        </div>
        <div className={styles.InputBox}>

          <div className={styles.InputBoxItem}>
            <p>이메일</p>
            <input 
            type='email' 
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
        <div>
          <p style={{fontSize : '14px', color : 'rgb(239, 22, 22)'}}>{EmPwErrMsg}</p>
        </div>

        </div>
        <div className={styles.MainFooter}>
            <button
            type='submit'
            className={styles.MainFooterBtn}
            >
            다음
            </button>  
          <div className={styles.MainFooterB}>
            <div className={styles.MainFooterTextGroup}>
              <p>회원가입을 아직 하지 않으셨나요?</p>
              <p>|</p>
              <Link to='/register' className={styles.Link}>회원가입</Link>  
            </div>
            <div className={styles.NotIn}></div>
          </div>
        </div>
      </form>
  )
}

export default Login