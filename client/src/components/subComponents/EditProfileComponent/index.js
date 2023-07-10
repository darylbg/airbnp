import React, { useState } from 'react';
import { useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import { UPDATE_USER } from "../../../utils/mutations";
import { updateUserDetails } from "../../../reducers/userReducer";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Alert from 'react-bootstrap/Alert';

import { useDispatch } from 'react-redux';

const Profile = ({ userObj }) => {
  const [inputDisable, setInputDisable] = useState(true);
  const [firstNameInput, setFirstNameInput] = useState(String(userObj.firstName));
  const [lastNameInput, setLastNameInput] = useState(String(userObj.lastName));
  const [usernameInput, setUsernameInput] = useState(String(userObj.username));
  const [imageUrlInput, setImageUrlInput] = useState(String(userObj.image));
  const [validUpload, setValidUpload] = useState(true);
  const [message, setMessage] = useState('');

  const handleInputDisable = (e) => {
    e.preventDefault();
    setInputDisable(!inputDisable);
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
    if (!firstNameInput.trim() || !lastNameInput.trim() || !usernameInput.trim()) {
      return;
    }
    try {
      const { data } = await update_user({
        variables: {
          firstName: firstNameInput.trim().toString(),
          lastName: lastNameInput.trim().toString(),
          image: imageUrlInput.trim().toString()
        },
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const processFile = async (e) => {
    const file = e.target.files[0];

    // Check file type
    if (!file.type.startsWith("image/")) {
      setValidUpload(false);
      setMessage('Invalid file type. Please select an image.');
      return;
    }

    // Check file size
    const fileSizeInMB = file.size / (1024 * 1024);
    const maxSizeInMB = 10; // Maximum allowed file size in MB
    if (fileSizeInMB > maxSizeInMB) {
      setValidUpload(false);
      setMessage(`File size exceeds the maximum limit of ${maxSizeInMB}MB.`);
      return;
    }

    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("cloud_name", process.env.REACT_APP_CLOUDINARY_NAME);
    formdata.append("upload_preset", 'vzrpgeu5');

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/darylb/auto/upload`,
      {
        method: "post",
        mode: "cors",
        body: formdata
      }
    );

    const json = await res.json();
    const imageUrl = json.secure_url;
    setImageUrlInput(imageUrl); // Update the image URL state

    setValidUpload(true);
    setMessage('');
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
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Upload profile image</Form.Label>
        <Form.Control
          type="file"
          onChange={processFile}
          disabled={inputDisable}
        />
        <br />
        <Alert
          className={validUpload ? 'd-none' : 'block'}
          variant='danger'
        >
          {message}
        </Alert>
      </Form.Group>
      <Button
        type='button'
        variant="secondary"
        onClick={handleInputDisable}
      >
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
