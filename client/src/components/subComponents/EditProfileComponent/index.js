import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';

const Profile = () => {
  const [inputDisable, setInputDisable] = useState(true);
  const [firstName, setFirstName] = useState('Daryl');
  const [lastName, setLastName] = useState('Blough');
  const [username, setUsername] = useState('dazza');

  const handleInputDisable = () => {
    setInputDisable(!inputDisable);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSave = () => {
    // Perform save logic here
    setInputDisable(!inputDisable);
  };

  return (
    <Form>
        <FloatingLabel controlId="floatingEditProfile1" label="First Name" className="">
            <Form.Control
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={handleFirstNameChange}
                disabled={inputDisable}
            />
        </FloatingLabel>
        <br />
        <FloatingLabel controlId="floatingEditProfile2" label="Last Name" className="">
        <Form.Control
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={handleLastNameChange}
            disabled={inputDisable}
        />
        </FloatingLabel>
        <br />
        <FloatingLabel controlId="floatingEditProfile3" label="Username" className="">
        <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            disabled={inputDisable}
        />
        </FloatingLabel>
        <br />
        <Button variant="secondary" onClick={handleInputDisable}>
            Edit details
        </Button>
        <Button
            className={inputDisable ? 'd-none' : 'd-block'}
            variant="primary"
            style={{ float: 'right' }}
            onClick={handleSave}
        >
            Save
        </Button>
    </Form>
  );
};

export default Profile;
