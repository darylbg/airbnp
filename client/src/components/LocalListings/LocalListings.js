import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import toilet1 from '../../utils/Images/King.webp';
import toilet2 from '../../utils/Images/Dirty.webp';
import toilet3 from '../../utils/Images/royal-style-gold-toilet-5.jpg';
import toilet4 from '../../utils/Images/toilet.webp';
import toilet5 from '../../utils/Images/Large_Bathroom.webp';

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

const LocalListings = () => {
  return (
    <Container className="d-flex align-items-end fixed-bottom p-4">
      <div className="Listings-card p-5">
        <Row>
          {listings.map((listing) => (
            <Col className="d-flex align-items-center  justify-content-center flex-column" key={listing.title}>
              <Card style={{ width: '13rem' }}>
              <Card.Img variant="top" src={listing.image} alt={listing.title} style={{ height: '10rem' }} />
                <Card.Body>
                  <Card.Title className="small-text text-center">{listing.title}</Card.Title>
                  <Card.Text className="small-text text-center">{listing.description}</Card.Text>
                  <div className='d-flex justify-content-center'>
                    <Button variant="dark">Use</Button>
                  </div>                  
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default LocalListings;