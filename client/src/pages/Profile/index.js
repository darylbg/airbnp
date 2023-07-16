import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Profile.css';
import Login from '../login/Login'
import { useSelector} from 'react-redux';

import EditProfileForm from '../../components/EditProfileComponent';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../../utils/queries';

const Profile = () => {
  const { data } = useQuery(QUERY_USER);
  //const [currentUser, setCurrentUser] =useState()
  const { auth } = useSelector((state) => state);
  const currentUser = auth.user;
  console.log(currentUser);
  //let currentUser;
  
  if(data) {
    //currentUser = data.user;
    // setCurrentUser(data.user)
  }
  return (
    <Container className='profile-wrap' fluid="md">
      {currentUser&&data ? (
      <>
        <Row className='profile-heading-row'>
            <Col md='auto' className='prof-img-col'>
              <div className='profile-img-wrapper'>
                <img className='profile-img' alt='profile' src=  {currentUser.image}></img>
              </div>
            </Col>
            <Col className='prof-text-col'>
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
        <Row className='form-row'>
          <Col sm='auto' className='prof-form'>
            <h5>Edit your details</h5>
            <EditProfileForm userObj={currentUser} />
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
