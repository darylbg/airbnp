import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import { LOGIN } from "../../../utils/mutations";
import { login_user } from "../../../reducers/authReducer";

import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
import { EyeSlash, Eye } from 'react-bootstrap-icons';

function LoginForm({ handleTogglePassword, passwordVisible}) {

  const navigate = useNavigate();
  const [login] = useMutation(LOGIN);
  const [alertShow, setAlertShow] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const submitHandler = async () => {
    setValues({ ...values });
    const { email, password } = values;
    if (!email || !password) {
      console.log("Please Fill All the Fields");
      setValues({ ...values });
      return;
    }
    try {
      const { data } = await login({
        variables: { email, password },
      });
      console.log(data.login.user);
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
      localStorage.setItem("id_token", data.login.token);
      console.log(`Welcome Back! ${data.login.user.username} is now logged in`);

      setValues({ ...values });
      navigate("/");
    } catch (error) {
      console.log(error);
      setValues({ ...values });
      setAlertShow(true);
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
            <InputGroup.Text onClick={handleTogglePassword}>
                {passwordVisible ? <Eye /> : <EyeSlash />}
            </InputGroup.Text>
        </InputGroup>
        <div style={{width: '100%'}}>
        <Button 
        style={{display: 'inline-block'}}
          variant='primary' 
          onClick={submitHandler}
        >
          Login
        </Button>
            <Alert 
              show={alertShow}
              key='success' 
              variant='danger' 
              style={{ display: 'inline-block', float: 'right' }}>
                Incorrect details try again
            </Alert>       
        </div>
    </Form>
  )
};

export default LoginForm;
