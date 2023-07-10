import React from 'react'
import LoginRegister from '../../components/LoginRegisterComponent'
import "./Login.css"

const Login = () => {
  return (
    <div className='container' style={{width: '100%', justifyContent: 'center', display: 'flex' }}>
      <LoginRegister />
    </div>
  )
}

export default Login