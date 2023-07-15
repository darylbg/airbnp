import React from 'react'
import LoginRegister from '../../components/LoginRegisterComponent'
import "./Login.css"

const Login = () => {
  return (
    <div className='container login-register-page'>
      <h2>Welcome to Airbnp</h2>
      <h4>Gotta go like... right now?</h4>
      <h5>Never worry again about where that available bathroom 
        is we got you covered. Login or Register to view our 
        extensive list of residential bathrooms available for 
        you to use right now.</h5>
      <LoginRegister />
    </div>
  )
}

export default Login