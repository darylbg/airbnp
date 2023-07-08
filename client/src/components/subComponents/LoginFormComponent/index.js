import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useMutation } from "@apollo/client";
import { LOGIN } from "../../../utils/mutations";
import { login_user } from "../../../reducers/authReducer";

import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { EyeSlash, Eye } from 'react-bootstrap-icons';

function LoginForm({ handleTogglePassword, passwordVisible}) {
  const [login] = useMutation(LOGIN);

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
      // navigate("/");
    } catch (error) {
      console.log(error);
      setValues({ ...values });
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
        <Button 
          variant='primary' 
          onClick={submitHandler}
        >
          Login
        </Button>
    </Form>
  )
};

export default LoginForm;
