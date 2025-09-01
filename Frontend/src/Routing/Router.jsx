import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Welcome from '../Pages/Welcome'
import Login from '../Pages/Login'
import Register from '../Pages/Register'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router