import React, { useState } from 'react';
import { useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import { UPDATE_USER } from "../../../utils/mutations";
import { updateUserDetails } from "../../../reducers/userReducer";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import ImageUpload from '../../subComponents/imageUpload.js';
import { useDispatch } from 'react-redux';

const Profile = ({userObj}) => {
  const [inputDisable, setInputDisable] = useState(true);
  const [firstNameInput, setFirstNameInput] = useState(String(userObj.firstName));
  const [lastNameInput, setLastNameInput] = useState(String(userObj.lastName));
  const [usernameInput, setUsernameInput] = useState(String(userObj.username));
  const [imageUrlInput, setImageUrlInput] = useState(String(userObj.image)); 
  console.log(`first name: ${firstNameInput}`);

  const handleInputDisable = (e) => {
    e.preventDefault();
    setInputDisable(!inputDisable);
    // console.log(username);
  };

  const handleFirstNameChange = (e) => {
    setFirstNameInput(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastNameInput(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsernameInput(e.target.value);
  };

  const [update_user] = useMutation(UPDATE_USER);
  const dispatch = useDispatch();

  const handleEditProfile = async (e) => {
    e.preventDefault();
    setInputDisable(!inputDisable);
    if (!firstNameInput || !lastNameInput || !usernameInput) {
      console.log('please fill out all fields to update');
      return;
    }
    try {
      const { data } = await update_user({
        variables: {
          updateUserDetails: { 
            firstName: firstNameInput,
            lastName: lastNameInput,
            username: usernameInput,
            image: imageUrlInput
           }
        },
      });
      console.log(`new profile data: ${JSON.stringify(data)}`);
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <Form>
      <FloatingLabel controlId="floatingEditProfile1" label="First Name">
        <Form.Control
          type="text"
          placeholder='First Name'
          value={firstNameInput}
          onChange={handleFirstNameChange}
          disabled={inputDisable}
        />
      </FloatingLabel>
      <br />
      <FloatingLabel controlId="floatingEditProfile2" label="Last Name">
        <Form.Control
          type="text"
          placeholder="Last Name"
          value={lastNameInput}
          onChange={handleLastNameChange}
          disabled={inputDisable}
        />
      </FloatingLabel>
      <br />
      <FloatingLabel controlId="floatingEditProfile3" label="Username">
        <Form.Control
          type="text"
          placeholder="Username"
          value={usernameInput}
          onChange={handleUsernameChange}
          disabled={inputDisable}
        />
      </FloatingLabel>
      <br />
      <ImageUpload 
        onUpload={setImageUrlInput} 
        handleInputDisable={handleInputDisable} 
        inputDisable={inputDisable} 
        value={userObj.image}
      />
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