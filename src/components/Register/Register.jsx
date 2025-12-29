import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiEye, FiEyeOff } from "react-icons/fi";
import styles from './Register.module.css'
import Logo from '../../assets/CodingGo-logo.png'
import axios from 'axios'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const [nickname, setNickname] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [timer, setTimer] = useState(0)
  const navigate = useNavigate()

  // 타이머 관리
  useEffect(() => {
    let interval = null
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1)
      }, 1000)
    } else if (timer === 0 && isCodeSent) {
      setIsCodeSent(false)
    }
    return () => clearInterval(interval)
  }, [timer, isCodeSent])

  const changeEmail = (e) => {
    setEmail(e.target.value)
    setIsEmailVerified(false)
    setIsCodeSent(false)
  }

  const changePassword = (e) => {
    setPassword(e.target.value)
  }

  const showPasswordChange = () => {
    setShowPassword(prev => !prev)
  }

  const changePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value)
  }

  const showPasswordConfirmChange = () => {
    setShowPasswordConfirm(prev => !prev)
  }

  const changeNickname = (e) => {
    setNickname(e.target.value)
  }

  const changeVerificationCode = (e) => {
    setVerificationCode(e.target.value)
  }

  // 이메일 인증 코드 발송
  const sendVerificationCode = async () => {
    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    try {
      await axios.post(
        `http://localhost:8080/api/CodingGo/auth/email?email=${encodeURIComponent(email)}`
      );
      alert('인증 코드가 발송되었습니다. 이메일을 확인해주세요.');
      setIsCodeSent(true);
      setTimer(300); // 5분 타이머
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || '인증 코드 발송 실패');
    }
  }

  // 인증 코드 확인
  const verifyCode = () => {
    if (!verificationCode) {
      alert('인증 코드를 입력해주세요.');
      return;
    }
    if (verificationCode.length !== 6) {
      alert('인증 코드는 6자리입니다.');
      return;
    }
    setIsEmailVerified(true);
    setTimer(0);
    alert('인증 코드가 확인되었습니다. 회원가입을 진행해주세요.');
  }

  const handleNext = async () => {
    if (!isEmailVerified) {
      alert('이메일 인증을 완료해주세요.');
      return;
    }

    if (!nickname.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    if (nickname.length < 2 || nickname.length > 20) {
      alert('닉네임은 2~20자 사이여야 합니다.');
      return;
    }

    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (password.length < 8) {
      alert('비밀번호는 8자 이상이어야 합니다.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:8080/api/CodingGo/auth/signup',
        {
          email: email,
          password: password,
          nickname: nickname,
          code: verificationCode
        }
      );
      alert('회원가입이 완료되었습니다!');
      navigate('/login');
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || '회원가입 실패';
      alert(errorMessage);
    }
  }

  // 타이머 포맷팅 (mm:ss)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className={styles.MainBox}>
      <div className={styles.LogoBox}>
        <img src={Logo} alt="CodingGoLogo" />
      </div>
      <div className={styles.InputBox}>
        <div className={styles.InputBoxItem}>
          <p>이메일</p>
          <div className={styles.EmailInputGroup}>
            <input 
              type='email' 
              placeholder='이메일을 입력해주세요.' 
              value={email}
              onChange={changeEmail}
              disabled={isEmailVerified}
            />
            <button
              type='button'
              className={styles.VerificationBtn}
              onClick={sendVerificationCode}
              disabled={isEmailVerified || isCodeSent}
            >
              {isEmailVerified ? '인증완료' : isCodeSent ? '재발송' : '인증'}
            </button>
          </div>
        </div>

        {isCodeSent && !isEmailVerified && (
          <div className={styles.InputBoxItem}>
            <p>인증 코드 {timer > 0 && <span className={styles.Timer}>({formatTime(timer)})</span>}</p>
            <div className={styles.EmailInputGroup}>
              <input 
                type='text' 
                placeholder='인증 코드 6자리를 입력해주세요.' 
                value={verificationCode}
                onChange={changeVerificationCode}
                maxLength={6}
              />
              <button
                type='button'
                className={styles.VerificationBtn}
                onClick={verifyCode}
              >
                확인
              </button>
            </div>
          </div>
        )}

        <div className={styles.InputBoxItem}>
          <p>닉네임</p>
          <input 
            type='text' 
            placeholder='닉네임을 입력해주세요 (2~20자)' 
            value={nickname}
            onChange={changeNickname}
            maxLength={20}
          />
        </div>

        <div className={styles.InputBoxItem}>
          <p>비밀번호</p>
          <input 
            type={showPassword ? 'text' : 'password'} 
            placeholder='비밀번호를 입력해주세요 (8자 이상)' 
            value={password}
            onChange={changePassword} 
          />
          <button
            type='button'
            className={styles.ShowPasswordBtn}
            onClick={showPasswordChange}
          >
            {showPassword ? <FiEye size={18} color='gray'/> : <FiEyeOff size={18} color='gray' />}
          </button>
        </div>

        <div className={styles.InputBoxItem}>
          <p>비밀번호 확인</p>
          <input 
            type={showPasswordConfirm ? 'text' : 'password'} 
            placeholder='비밀번호를 다시 입력해주세요' 
            value={passwordConfirm}
            onChange={changePasswordConfirm} 
          />
          <button
            type='button'
            className={styles.ShowPasswordBtn}
            onClick={showPasswordConfirmChange}
          >
            {showPasswordConfirm ? <FiEye size={18} color='gray'/> : <FiEyeOff size={18} color='gray' />}
          </button>
        </div>
      </div>

      <div className={styles.MainFooter}>
        <button
          type='button'
          className={styles.MainFooterBtn}
          onClick={handleNext}
        >
          회원가입
        </button>
        <div className={styles.MainFooterB}>
          <div className={styles.MainFooterTextGroup}>
            <p>이미 회원가입 한 계정이 있으신가요?</p>
            <p>|</p>
            <Link to='/login' className={styles.Link}>로그인</Link>
          </div>
          <div className={styles.NotIn}></div>
        </div>
      </div>
    </div>
  )
}

export default Register