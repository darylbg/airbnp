import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import toilet1 from '../../utils/Images/King.webp';
import toilet2 from '../../utils/Images/Dirty.webp';
import toilet3 from '../../utils/Images/royal-style-gold-toilet-5.jpg';
import toilet4 from '../../utils/Images/toilet.webp';
import toilet5 from '../../utils/Images/Large_Bathroom.webp';
import LocalListings from '../LocalListings/LocalListings';
import NewListingsModal from '../NewListing/NewListingModal';

const listings = [
  {
    title: 'Posh Toilet',
    address: 'post road, birimingham',
    description: 'Posh and clean',
    image: toilet1,
  },
  {
    title: 'Dirty Toilet',
    address: 'post road, birimingham',
    description: 'Old and dirty',
    image: toilet2,
  },
  {
    title: 'Toilet',
    address: 'post road, birimingham',
    description: 'King of toilets',
    image: toilet3,
  },
  {
    title: 'shower and toilet',
    address: 'post road, birimingham',
    description: 'wash yo self',
    image: toilet4,
  },
  {
    title: 'TOLet',
    address: 'post road, birimingham',
    description: 'Posh andfgfgfg clean',
    image: toilet5,
  },
];

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
                  <Button variant="dark">Edit</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
        <Col className='d-flex justify-content-center w-100'>
          <NewListingsModal />
        </Col>
      </Row>
    </Container>
  );
};

export default MyListings;