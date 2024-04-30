import React from 'react'
import { Login } from './Login'
import { Register } from './Register'


import { useState } from 'react'


export const LoginRegister = () => {
  
    let [isLogin,setLogin] = useState(true);
  
    return (
    <>
        { isLogin ? <Login setLogin={setLogin}/> : <Register setLogin={setLogin}/> }            
    </>
  )
}
