import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import { LOGIN } from "../../../utils/mutations";
import { login_user } from "../../../reducers/authReducer";
import Auth from '../../../utils/auth';

import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
import { EyeSlash, Eye } from 'react-bootstrap-icons';
import './login.css'

function LoginForm({ handleTogglePassword, passwordVisible}) {

  const navigate = useNavigate();
  const [login] = useMutation(LOGIN);
  const [alertShow, setAlertShow] = useState(false);
  const [alertMessage, setAlertMessage] = useState('')

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    setValues({ ...values });
    const { email, password } = values;
    if (!email || !password) {
      setAlertMessage('Please fill all the fields');
      setAlertShow(true);
      setValues({ ...values });
      return;
    } 

    try {
      const { data } = await login({
        variables: { email, password },
      });
      dispatch(
        login_user({
          token: data.login.token,
          userId: data.login._id,
          username: data.login.username,
          firstName: data.login.firstName,
          lastName: data.login.lastName,
          email: data.login.email,
          listings: data.login.listings
        })
      );
      Auth.login(data.login.token);

      setValues({ ...values });
      // navigate("/");
    } catch (error) {
      setValues({ ...values });
      setAlertShow(true);
      setAlertMessage('Incorrect email or password');
    }
  };

  return (
    // use login details email: testing@testing.com password: testing
    <Form style={{paddingTop: '100px'}}>
        <FloatingLabel controlId="floatingLoginInput1" label="Email address" className="mb-3">
        <Form.Control 
          type="email" 
          placeholder="name@example.com"
          onChange={(e) => setValues({ ...values, email: e.target.value })} 
        />
        </FloatingLabel>
        <InputGroup  className="mb-3">
            <FloatingLabel controlId="floatingLoginInput2" label="Password">
            <Form.Control 
              type={passwordVisible ? 'text' : 'password'} 
              placeholder="Password" 
              onChange={(e) => setValues({ ...values, password: e.target.value })} 
            />
            </FloatingLabel>
            <InputGroup.Text 
              onClick={handleTogglePassword}
              style={{cursor: 'pointer', ':hover': {cursor: 'hand'}}}
            >
                {passwordVisible ? <Eye /> : <EyeSlash />}
            </InputGroup.Text>
        </InputGroup>
        <div style={{width: '100%'}}>
        <Alert 
              show={alertShow}
              key='success' 
              variant='danger' 
            >
                {alertMessage}
            </Alert>
        <Button className="login-button" variant='primary' onClick={submitHandler}>
          Login
        </Button>       
        </div>
    </Form>
  )
};

export default LoginForm;
