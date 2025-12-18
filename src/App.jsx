import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Nickname from './components/Nickname/Nickname'
import MainLayout from './components/MainLayout'
import Community from './components/Community/Community'
import Home from './components/Home/Home'

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
      </Route>
    </Routes>
  )
}

export default App
