import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './components/Login' // 임시 코드
import Register from './components/Register' // 임시 코드

function App() {
  return (
    <>
      <Routes >
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  )
}

export default App
