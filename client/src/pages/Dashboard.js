import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LocalListings from '../components/LocalListings/LocalListings';
import MyListings from '../components/MyListings/MyListings';
import NewListingModal from '../components/NewListing/NewListingModal'
import Login from './Login';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';


const Dashboard = () => {

  const { data } = useQuery(QUERY_USER);
  let currentUser;  

  if(data) {
    currentUser = data.user;
  }

  return (
   <Container className='d-flex justify-content-center'>
    {currentUser ? (
    <Row>
      <Col xs={4} sm={4}>
      </Col>
      <Col xs={4} sm={4}>
        <MyListings />
      </Col>
    </Row>
    ):(
      <Row>
        <h2>Please log in to view your dashboard</h2>
        <Login />
      </Row>
    )}
   </Container>
  )
}

    export default Dashboard