import React, { useCallback, useReducer, useState } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import Input from '../FormElements/Input';
import { validate, VALIDATOR_REQUIRE } from '../../utils/validators';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

const EditListing = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      price: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
    },
    isValid: false,
  });

  const [modalShow, setModalShow] = useState(false);

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({ type: 'INPUT_CHANGE', value, isValid, inputId: id });
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formState.isValid) {
      return;
    }

    // form submission logic
    // console.log('Form submitted:', formState.inputs);

    
    setModalShow(false);
  };

  return (
    <>
      <Button className="bg-dark new-button" variant="primary" onClick={() => setModalShow(true)}>
  Edit
</Button>

      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Form onSubmit={submitHandler}>
          <Modal.Header closeButton>
            <Modal.Title>Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={6}>
                <Input
                  id="Street"
                  element="input"
                  type="text"
                  placeholder="Street"
                  label="Street"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter a valid street"
                  onInput={inputHandler}
                />
              </Col>
              <Col sm={6}>
                <Input
                  id="Postcode"
                  element="input"
                  type="text"
                  placeholder="Postcode"
                  label="Postcode"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter a valid postcode"
                  onInput={inputHandler}
                />
              </Col>
              <Col sm={6}>
                <Input
                  id="Number"
                  element="input"
                  type="text"
                  placeholder="Number"
                  label="Number"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter a valid property number"
                  onInput={inputHandler}
                />
              </Col>
              <Col sm={6}>
                <Input
                  id="Price"
                  element="input"
                  type="text"
                  placeholder="Price"
                  label="Price"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter a valid title"
                  onInput={inputHandler}
                />
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <Input
                  id="Title"
                  element="input"
                  type="text"
                  placeholder="Title"
                  label="Title"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter a valid title"
                  onInput={inputHandler}
                />

                <Input
                  id="Description"
                  element="input"
                  type="text"
                  placeholder="Description"
                  label="Description"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter a valid description"
                  onInput={inputHandler}
                />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className='d-flex justify-content-between'>
            <Button variant="danger">
                Delete
            </Button>
            <Button type="submit" disabled={!formState.isValid}>
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default EditListing;