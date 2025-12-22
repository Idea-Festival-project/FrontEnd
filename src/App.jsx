import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Nickname from './components/Nickname/Nickname'
import MainLayout from './components/MainLayout'
import Community from './components/Community/Community'
import Home from './components/Home/Home'
import Problems from './components/Problems/Problems'
import Ranking from './components/Ranking/Ranking'
import MyPage from './components/Mypage/Mypage'


function App() {
  return (
    
    <Routes >
      <Route path='/' element={<Navigate to='/login' replace /> } />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/nickname' element={<Nickname />} />

      <Route element={<MainLayout />}>
        <Route path='/home' element={<Home />} />
        <Route path='/community' element={<Community />} />
        <Route path='/problems' element={<Problems />} />
        <Route path='/ranking' element={<Ranking />} />
        <Route path='/MyPage' element={<MyPage />} />
      </Route>
      <Route path='*' element={<h1>페이지를 찾을 수 없습니다 404</h1>} />
    </Routes>
  )
}

export default App
