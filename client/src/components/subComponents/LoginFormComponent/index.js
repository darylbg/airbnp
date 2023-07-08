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
  )
};

export default LoginForm;
