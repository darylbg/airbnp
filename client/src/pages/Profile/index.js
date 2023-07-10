import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Profile.css';
import Login from '../login/Login'

import EditProfileForm from '../../components/EditProfileComponent';
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
              <img className='profile-img' alt='profile' src={currentUser.image}></img>
            </div>
            </Col>
            <Col>
              <div className='profile-header-text'>
                <h1>Profile</h1>
                <div className='profile-header-name'>
                  <h3>{currentUser.firstName}</h3>{' '}
                  <h3>{currentUser.lastName}</h3>
                  <h4>{currentUser.email}</h4>
                </div>
              </div>
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
