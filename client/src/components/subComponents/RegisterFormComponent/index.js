import React from 'react';

import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { EyeSlash, Eye } from 'react-bootstrap-icons';


function RegisterForm({ handleTogglePassword, passwordVisible}) {
    return (
        <Form>
            <FloatingLabel controlId="floatingRegisterInput1" label="First Name" className="mb-3">
                <Form.Control type="text" placeholder="John" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingRegisterInput2" label="Last Name" className="mb-3">
                <Form.Control type="text" placeholder="Doe" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingRegisterInput3" label="Username" className="mb-3">
                <Form.Control type="text" placeholder="johnDoe" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingRegisterInput4" label="Email address" className="mb-3">
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
            <Button type="submit">Register</Button>
        </Form>
        // <form>
        //     <div className="form-floating mb-3">
        //         <input type="text" className="form-control" id="firstNameInput" placeholder="John"></input>
        //         <label for="firstNameInput">First Name</label>
        //     </div>
        //     <div className="form-floating mb-3">
        //         <input type="text" className="form-control" id="lastNameInput" placeholder="Doe"></input>
        //         <label for="lastNameInput">Last Name</label>
        //     </div>
        //     <div className="form-floating mb-3">
        //         <input type="text" className="form-control" id="usernameInput" placeholder="username"></input>
        //         <label for="usernameInput">Username</label>
        //     </div>
        //     <div className="form-floating mb-3">
        //         <input type="email" className="form-control" id="emailInput" placeholder="example@example.com"></input>
        //         <label for="emailInput">Email</label>
        //     </div>
        //     <div className="input-group mb-3">
        //         <div className="form-floating">
        //             <input type={passwordVisible ? 'text' : 'password'} className="form-control" id="passwordRegisterInput" placeholder="Password"></input>
        //             <label for="passwordLoginInput">Password</label>
        //         </div>
        //         <span className="input-group-text password-toggle" id="password-toggle" onClick={handleTogglePassword}><i className={passwordVisible ? 'bi-eye-fill' : 'bi-eye-slash-fill'} id="passwordIcon"></i></span>
        //     </div>
        //     <div className="mb-3">
        //         <button type="submit" className="btn btn-primary">Register</button>
        //     </div>
        // </form>
    )
};

export default RegisterForm;


