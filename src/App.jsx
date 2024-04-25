import React from 'react';
import './App.css'
import { Form, Route, Routes } from 'react-router-dom'
import NotFound from './pages/404'
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'


function App() {
  if (process.env.APP_ENV) {
    console.log("Environment: " + process.env.APP_ENV)
  }
  
  if (process.env.APP_DEBUG) {
    console.log("Debug enabled")
  }

  Logger.debug('App root component')

  return (
    <Routes>
      <Route path='*' element={<NotFound />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* <Route path="/barberos" element={<BarberosList />} />
      <Route path="/barberos/:id" element={<BarberosView />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/servicio" element={<Servicio/>} />
      <Route path="/servicios/:id" element={<Servicios />} />
      <Route path="/cita" element={<Cita/>} />
      <Route path="/citas/:id" element={<Citas/>} /> */}
    </Routes>
  )
}

export default App
