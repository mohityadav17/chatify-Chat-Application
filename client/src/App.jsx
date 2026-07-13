import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import getcurrentUser from './customhooks/currentUser'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile'
import getOtherUsers from './customhooks/getotherusers'

function App() {
  getcurrentUser()
  getOtherUsers()
  const {userData} = useSelector(state=>state.user)
  return (
    <Routes>
     
      <Route path ='/login' element={!userData?<Login/>:<Navigate to="/"/>}/>
      <Route path ='/signup' element={!userData?<Signup/>:<Navigate to="/profile"/>}/>
      <Route path ='/' element={userData?<Home/>:<Navigate to="/login"/>}/>
      <Route path ='/profile' element={userData?<Profile/>:<Navigate to="/signup"/>}/>
    </Routes>
  )
}

export default App

