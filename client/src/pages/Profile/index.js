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
            <img className='profile-img' src='https://media.gq.com/photos/645956c367d4264086a5d77f/16:9/w_2352,h_1323,c_limit/Screen%20Shot%202023-05-08%20at%204.07.48%20PM.png'></img>
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
