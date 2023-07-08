import React from 'react';

import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { EyeSlash, Eye } from 'react-bootstrap-icons';

function LoginForm({ handleTogglePassword, passwordVisible}) {
  return (
    <Form style={{paddingTop: '100px'}}>
        <FloatingLabel controlId="floatingLoginInput1" label="Email address" className="mb-3">
        <Form.Control type="email" placeholder="name@example.com" />
        </FloatingLabel>
        <InputGroup  className="mb-3">
            <FloatingLabel controlId="floatingLoginInput2" label="Password">
            <Form.Control type={passwordVisible ? 'text' : 'password'} placeholder="Password" />
            </FloatingLabel>
            <InputGroup.Text onClick={handleTogglePassword}>
                {passwordVisible ? <Eye /> : <EyeSlash />}
            </InputGroup.Text>
        </InputGroup>
        <Button type="submit">Login</Button>
    </Form>
    // <form>
    //     <div className="form-floating mb-3">
    //         <input type="email" className="form-control" id="emailLoginInput" placeholder="name@example.com"></input>
    //         <label for="emailLoginInput">Email address</label>
    //     </div>
    //     <div className="input-group mb-3">
    //         <div className="form-floating">
    //             <input type={passwordVisible ? 'text' : 'password'} className="form-control" id="passwordLoginInput" placeholder="Password"></input>
    //             <label for="passwordLoginInput">Password</label>
    //         </div>
    //         <span className="input-group-text password-toggle" id="password-toggle" onClick={handleTogglePassword}><i className={passwordVisible ? 'bi-eye-fill' : 'bi-eye-slash-fill'} id="passwordIcon"></i></span>
    //     </div>
    //     <div className="mb-3">
    //         <button type="submit" className="btn btn-primary">Login</button>
    //     </div>
    // </form>
  )
};

export default LoginForm;
