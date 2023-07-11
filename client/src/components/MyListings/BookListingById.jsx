import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import toilet1 from "../../utils/Images/King.webp";

const listings = [
  {
    id: 1,
    title: "Posh Toilet",
    address: "post road, birimingham",
    description: "Posh and clean",
    image: toilet1,
    price: 12,
  },
];

function BookListingById() {
  const [date, setDate] = useState(new Date());
  const onChange = date => {
    setDate(date);
  };
  return (
    <>
      <h1 className='text-center'>BookListing</h1>
      <Link className='btn btn-primary ms-3 my-3' to='/'>
        Go Back
      </Link>

      <Row className='py-5'>
        <Col md={4} className='ms-5'>
          <Image src={toilet1} alt={listings.title} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>Posh Toilet</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Price:</Col>
                <Col>
                  <strong>£12</strong>
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>Address: Birmingham City Center </ListGroup.Item>

            <ListGroup.Item>
              Description: Lorem ipsum dolor sit amet consectetur, adipisicing
              elit. Maxime libero ducimus quibusdam consequuntur, voluptates
              possimus eligendi necessitatibus eius qui impedit rerum quisquam
              fugiat sapiente facere iste amet ea consectetur expedita.
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <Calendar onChange={onChange} value={date} />
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button className='btn-block' type='button'>
                  Book
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default BookListingById;
