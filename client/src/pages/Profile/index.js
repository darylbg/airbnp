import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Profile.css';

import EditProfileForm from '../../components/subComponents/EditProfileComponent';

const Profile = () => {

  return (
    <Container fluid="md">
      <Row className='profile-heading-row'>
        <Col md='auto'>
          <div className='profile-img-wrapper'>
            <img className='profile-img' src="https://res.cloudinary.com/darylb/image/upload/v1688912273/zw9lqdl8rija11an5pcw.png"></img>
          </div>
          </Col>
          <Col>
            <h1>Profile</h1>
            <h3>Daryl Blough</h3>
            <h3>darylxcuf@gmail.com</h3>
        </Col>
      </Row>
      <Row>
        <Col sm='auto'>
          <h5>Edit your details</h5>
          <EditProfileForm />
        </Col>
      </Row>
    </Container>
  )
}

export default Profile
