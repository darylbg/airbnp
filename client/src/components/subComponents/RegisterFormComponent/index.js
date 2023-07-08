import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { SIGNUP } from "../../../utils/mutations";
import { signup_user } from "../../../reducers/authReducer";

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
                <FloatingLabel controlId="floatingRegisterInput5" label="Password">
                <Form.Control type={passwordVisible ? 'text' : 'password'} placeholder="Password" />
                </FloatingLabel>
                <InputGroup.Text onClick={handleTogglePassword}>
                    {passwordVisible ? <Eye /> : <EyeSlash />}
                </InputGroup.Text>
            </InputGroup>
            <Button type="submit">Register</Button>
        </Form>
    )
};

export default RegisterForm;


