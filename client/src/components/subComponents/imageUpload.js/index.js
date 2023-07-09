import React, { useRef, useState } from "react";
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

const ImageUpload = ({ handleInputDisable, inputDisable, onUpload }) => {
    const CLOUDINARY_NAME = process.env.REACT_APP_CLOUDINARY_NAME;
    // console.log(CLOUDINARY_NAME);

    const [ validUpload, setValidUpload ] = useState(true);
    const [ message, setMessage ] = useState('');

    const fileInputRef = useRef(null);

    const processFile = async (e) => {
        const file = e.target.files[0];
    
        // Check file type
        if (!file.type.startsWith("image/")) {
          console.log("Invalid file type. Please select an image.");
          setValidUpload(false);
          setMessage('Invalid file type. Please select an image.');
          if(fileInputRef.current) {
            fileInputRef.current.value = null
          }
          return;
        }
    
        // Check file size
        const fileSizeInMB = file.size / (1024 * 1024);
        const maxSizeInMB = 10; // Maximum allowed file size in MB
        if (fileSizeInMB > maxSizeInMB) {
          console.log(`File size exceeds the maximum limit of ${maxSizeInMB}MB.`);
          setValidUpload(false);
          setMessage(`File size exceeds the maximum limit of ${maxSizeInMB}MB.`);
          if(fileInputRef.current) {
            fileInputRef.current.value = null
          }
          return;
          return;
        }
    
        const formdata = new FormData();
        formdata.append("file", file);
        formdata.append("cloud_name", CLOUDINARY_NAME);
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
        console.log(JSON.stringify(imageUrl));
        onUpload(imageUrl); // Pass the image URL to the parent component

        setValidUpload(true);
        setMessage('');
      };
  
    return (
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Upload profile image</Form.Label>
        <Form.Control 
          ref={fileInputRef}
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
    );
  };

export default ImageUpload;