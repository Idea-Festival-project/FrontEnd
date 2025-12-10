import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Register from './components/Register'
import Nickname from './components/Nickname'

function App() {
  return (
    
    <Routes >
      <Route path='/' element={<Navigate to='/login' replace /> } />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/nickname' element={<Nickname />} />
    </Routes>
  )
}

export default App
