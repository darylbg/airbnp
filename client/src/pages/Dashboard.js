import React from 'react'
import ListingsForm from '../components/NewListing/NewListing'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NewListing from '../components/NewListing/NewListing';
import LocalListings from '../components/LocalListings/LocalListings';
import MyListings from '../components/MyListings/MyListings';

const Dashboard = () => {
  return (
   <Container className='d-flex justify-content-center'>
    <Row>
      <Col xs={4} sm={4}>
        <NewListing />
      </Col>
      <Col xs={4} sm={4}>
        <MyListings />
      </Col>
    </Row>
   </Container>
  )
}

    export default Dashboard