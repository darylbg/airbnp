import React from 'react'
import { useState } from 'react';

import LoginForm from '../subComponents/LoginFormComponent';
import RegisterForm from '../subComponents/RegisterFormComponent';
import './LoginRegisterComponent.css';

function LoginRegister() {

    const [passwordVisible, setPasswordVisible] = useState(false);
  
    const handleTogglePassword = () => {
      setPasswordVisible(!passwordVisible);
    };

  return (
    <div className="container-fluid login-register-container">
        <ul className="nav nav-tabs login-register-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Login</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Register</button>
            </li>
        </ul>
        <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                <LoginForm handleTogglePassword={handleTogglePassword} passwordVisible={passwordVisible} />
            </div>
            <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
                <RegisterForm handleTogglePassword={handleTogglePassword} passwordVisible={passwordVisible} />
            </div>
        </div> 
    </div>
  )
}

export default LoginRegister;