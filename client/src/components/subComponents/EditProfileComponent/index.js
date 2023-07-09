import React, { useState } from 'react';
import { useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import { UPDATE_USER } from "../../../utils/mutations";
import { updateUserDetails } from "../../../reducers/userReducer";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import ImageUpload from '../../subComponents/imageUpload.js';

const Profile = () => {
  const [inputDisable, setInputDisable] = useState(true);
  const [firstName, setFirstName] = useState('Daryl');
  const [lastName, setLastName] = useState('Blough');
  const [username, setUsername] = useState('dazza');
  const [imageUrl, setImageUrl] = useState(''); // State to hold the image URL

  const handleInputDisable = (e) => {
    e.preventDefault();
    setInputDisable(!inputDisable);
    console.log(username);
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

  const handleEditProfile = () => {
    setInputDisable(!inputDisable);
    // build this out
  };

  return (
    <Form>
      <FloatingLabel controlId="floatingEditProfile1" label="First Name">
        <Form.Control
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={handleFirstNameChange}
          disabled={inputDisable}
        />
      </FloatingLabel>
      <br />
      <FloatingLabel controlId="floatingEditProfile2" label="Last Name">
        <Form.Control
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={handleLastNameChange}
          disabled={inputDisable}
        />
      </FloatingLabel>
      <br />
      <FloatingLabel controlId="floatingEditProfile3" label="Username">
        <Form.Control
          type="text"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
          disabled={inputDisable}
        />
      </FloatingLabel>
      <br />
      <ImageUpload onUpload={setImageUrl} handleInputDisable={handleInputDisable} inputDisable={inputDisable} />
      <Button 
        type='button' 
        variant="secondary" 
        onClick={handleInputDisable}>
        Edit details
      </Button>
      <Button
        type='button'
        className={inputDisable ? 'd-none' : 'd-block'}
        variant="primary"
        style={{ float: 'right' }}
        onClick={handleEditProfile}
      >
        Save
      </Button>
    </Form>
  );
};

export default Profile;