import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Inputs from '../FormElements/Inputs';

const NewListing = () => {
  return (
    <Form>
      <Row>
        <Col sm={6}>
          <Inputs element="input" type="text" placeholder="Title" label="Title" />
        </Col>
        <Col sm={6}>
          <Inputs element="input" type="text" placeholder="Address" label="Address" />
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <Inputs element="input" type="text" placeholder="Price" label="Price" />
          <Inputs type="text" placeholder="Description" label="Description" />
        </Col>
      </Row>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default NewListing;