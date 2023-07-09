import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Inputs from '../FormElements/Inputs';
import { validate, VALIDATOR_REQUIRE } from '../../utils/validators';

const NewListing = () => {
  return (
    <Form>
      <Row>
        <Col sm={6}>
          <Inputs 
            element="input" 
            type="text" 
            placeholder="Title" 
            label="Title" 
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title" />
        </Col>
        <Col sm={6}>
          <Inputs 
            element="input" 
            type="text" 
            placeholder="Address" 
            label="Address" 
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid Adress" />
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <Inputs 
          element="input" 
          type="text" placeholder="Price" 
          label="Price" 
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid Price"/>

          <Inputs 
          type="text" 
          placeholder="Description" 
          label="Description" 
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid description"/>
        </Col>
      </Row>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default NewListing;