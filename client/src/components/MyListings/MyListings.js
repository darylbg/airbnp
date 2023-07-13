import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import toilet1 from '../../utils/Images/King.webp';
import toilet2 from '../../utils/Images/Dirty.webp';
import toilet3 from '../../utils/Images/royal-style-gold-toilet-5.jpg';
import toilet4 from '../../utils/Images/toilet.webp';
import toilet5 from '../../utils/Images/Large_Bathroom.webp';
import LocalListings from '../LocalListings/LocalListings';
import NewListingsModal from '../NewListing/NewListingModal';
import EditListing from '../EditListing/EditListing';


const MyListings = () => {
  return (
    <Container style={{ width: '100vh' }}>
      <Row>
        <h2 className="text-center p-3">Manage Listings</h2>
      </Row>
      <Row>
        {listings.map((listing, index) => (
          <Col key={listing.title} xs={12} sm={6} md={4} className="mb-4">
            <Card style={{ width: '13rem' }}>
              <Card.Img variant="top" src={listing.image} alt={listing.title} style={{ height: '10rem' }} />
              <Card.Body>
                <Card.Title className="small-text text-center">{listing.title}</Card.Title>
                <Card.Text className="small-text text-center">{listing.description}</Card.Text>
                <div className="d-flex justify-content-center">
                  <EditListing />
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
        <Col className='d-flex flex-column align-item-center justify-content-center'>
          <NewListingsModal />
        </Col>
      </Row>
    </Container>
  );
};

export default MyListings;