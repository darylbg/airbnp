import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import { LOGIN } from "../../../utils/mutations";
import { login_user } from "../../../reducers/authReducer";
import { user_listings } from '../../../reducers/listingsReducer'
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
      console.log(data);
      dispatch(
        login_user({
          token: data.login.token,
          userId: data.login.user._id,
          username: data.login.user.username,
          firstName: data.login.user.firstName,
          lastName: data.login.user.lastName,
          email: data.login.user.email,
          listings: data.login.user.listings
        }),
        // user_listings({
        //   address: data.login.user.listings.address,
        //   address: data.login.user.listings.description,
        //   address: data.login.user.listings.image,
        //   address: data.login.user.listings.lat,
        //   address: data.login.user.listings.lng,
        //   address: data.login.user.listings.price,
        //   address: data.login.user.listings.title,
        //   address: data.login.user.listings.userId,
        //   address: data.login.user.listings.notifications,
        //   address: data.login.user.listings.ratings,


        // })
      );
      Auth.login(data.login.token);
        navigate('/');
     

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
