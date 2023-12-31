import React from 'react'
import { useState } from 'react';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import TabContainer from 'react-bootstrap/esm/TabContainer';

import LoginForm from '../subComponents/LoginFormComponent';
import RegisterForm from '../subComponents/RegisterFormComponent';
import './LoginRegisterComponent.css';

function LoginRegister() {

    const [passwordVisible, setPasswordVisible] = useState(false);
  
    const handleTogglePassword = (e) => {
      e.preventDefault();
      setPasswordVisible(!passwordVisible);
    };

  return (
    <div>
      <TabContainer>
      <Tabs className="login-register-tabs" defaultActiveKey="first">
        <Tab className='login-register-tab' eventKey="first" title="Login" >
          <LoginForm handleTogglePassword={handleTogglePassword} passwordVisible={passwordVisible} />
        </Tab>
        <Tab className='login-register-tab' eventKey="second" title="Register">
          <RegisterForm handleTogglePassword={handleTogglePassword} passwordVisible={passwordVisible} />
        </Tab>
      </Tabs>
      </TabContainer>
    </div>
  )
}

export default LoginRegister;