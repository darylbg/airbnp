import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../../../utils/mutations";
import { register_user } from "../../../reducers/authReducer";

import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
import { EyeSlash, Eye } from 'react-bootstrap-icons';


function RegisterForm({ handleTogglePassword, passwordVisible}) {

    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
    });

    const [register] = useMutation(REGISTER);

    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState('danger'); 

    const dispatch = useDispatch();

    const submitHandler = async () => {
        const { firstName, lastName, username, email, password } = values;
        if (!firstName || !lastName || !username || !email || !password) {
            console.log('registration error maybe field missing or incomplete');
            setAlertVariant('danger'); // Set alert variant to 'danger' for unsuccessful submission
            setShowAlert(true);
            return;
        }

        try {
            const { data } = await register({
                variables: { userData: { ...values } },
            });

            const userData = {
                token: data.register.token,
                userId: data.register.user._id,
                firstName: data.register.user.firstName,
                lastName: data.register.user.lastName,
                username: data.register.user.username,
                email: data.register.user.email
            };
            dispatch(register_user(userData));
            // localStorage.setItem('id_token', data.register.token);
            console.log(`hi there ${data.register.user.username}`);

            // Reset the form values to initial empty state
            setValues({
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                password: '',
            });
            setAlertVariant('success'); // Set alert variant to 'success' for successful submission
            setShowAlert(true);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Form>
            <FloatingLabel controlId="floatingRegisterInput1" label="First Name" className="mb-3">
                <Form.Control 
                    type="text" 
                    placeholder="John" 
                    onChange={(e) => setValues({ ...values, firstName: e.target.value })}
                />
            </FloatingLabel>
            <FloatingLabel controlId="floatingRegisterInput2" label="Last Name" className="mb-3">
                <Form.Control 
                    type="text" 
                    placeholder="Doe" 
                    onChange={(e) => setValues({ ...values, lastName: e.target.value })}
                />
            </FloatingLabel>
            <FloatingLabel controlId="floatingRegisterInput3" label="Username" className="mb-3">
                <Form.Control 
                    type="text" 
                    placeholder="johnDoe" 
                    onChange={(e) => setValues({ ...values, username: e.target.value })}
                />
            </FloatingLabel>
            <FloatingLabel controlId="floatingRegisterInput4" label="Email address" className="mb-3">
                <Form.Control 
                    type="email" 
                    placeholder="name@example.com" 
                    onChange={(e) => setValues({ ...values, email: e.target.value })}
                />
            </FloatingLabel>
            <InputGroup  className="mb-3">
                <FloatingLabel controlId="floatingRegisterInput5" label="Password">
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
                <Button variant='primary' onClick={submitHandler} style={{display: 'inline-block', marginRight: '10px'}}>Register</Button>
                {showAlert && (
                    <Alert key='success' variant={alertVariant} style={{ display: 'inline-block', float: 'right' }}>
                        {alertVariant === 'success' ? 'Success!' : 'Error!'} This is an alert message.
                    </Alert>
                )}
            </div>
        </Form>
    )
};

export default RegisterForm;


