import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Profile.css';
import Login from '../../pages/Login'

import EditProfileForm from '../../components/subComponents/EditProfileComponent';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';

const Profile = () => {
  const { data } = useQuery(QUERY_USER);
  let currentUser;

  if(data) {
    currentUser = data.user;
  }
  return (
    <Container fluid="md">
      {currentUser ? (
      <>
        <Row className='profile-heading-row'>
          <Col md='auto'>
            <div className='profile-img-wrapper'>
              <img className='profile-img' src={currentUser.image}></img>
            </div>
            </Col>
            <Col>
              <h1>Profile</h1>
              <h3>{currentUser.firstName}</h3><h3>{currentUser.lastName}</h3>
              <h3>{currentUser.email}</h3>
          </Col>
        </Row>
        <Row>
          <Col sm='auto'>
            <h5>Edit your details</h5>
            <EditProfileForm userObj={currentUser}/>
          </Col>
        </Row>
      </>
      ) 
      : (
        <div>
          <h2>Please log in to view your profile</h2>
          <Login />
        </div>
      )}
    </Container>
  )
}

export default Profile
