import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FloatingLabel, InputGroup } from 'react-bootstrap';
import { ADD_LISTING } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

import { AddressAutofill } from '@mapbox/search-js-react';
import Geocode from "react-geocode";

function AddListing() {
  const [show, setShow] = useState(false);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [address, setAddress] = useState('');
//   const [apartment, setApartment] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [zipCode, setZipCode] = useState('');
//   const [price, setPrice] = useState('');

const [values, setValues] = useState({
    title: '',
    description: '',
    address: '',
    price: ''
});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log(auth);

  const addListing = useMutation(ADD_LISTING);

  const handleSaveChanges = async (e) => {
    const { title, description, address, price } = values;
    e.preventDefault();
    if (!title || !address || !price) {
        console.log('fill out all required fields');
        return
    }

    try {
        const { data } = await addListing({
            variables: {listingData: { ...values }}
        });

        const listingData = {

        }
    } catch (error) {
        
    }
    

    handleClose();
  };

  const [address, setAddress] = useState('');

  const handleChange = (event) => {
    setAddress(event.target.value);
  };

  const [searchAddress, setSearchAddress] = useState('');

  const handleAddressChange = (event) => {
    setSearchAddress(event.target.value);
  };
  Geocode.setApiKey("AIzaSyAibEqEhSqm5drveDG8x92BLTJ-Xm1kya4");
  Geocode.fromAddress("Eiffel Tower").then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      console.log(`coordinates: ${lat}, ${lng}`);
    },
    (error) => {
      console.error(error);
    }
  );

  return (
    <>
      <div>
        <Form>
        <AddressAutofill accessToken="pk.eyJ1IjoiZGF6emExMjMiLCJhIjoiY2xqcjZzc2Y5MGN5NTNncWpsZ3ByZG9tciJ9.N_FhIXIqTaKbq03NukHGYQ">
                <Form.Control
                name="address" placeholder="Address" type="text"
                autoComplete="address"
                />
              </AddressAutofill>
                <Form.Control
                name="apartment" placeholder="Apartment number" type="text"
                autoComplete="address-line2"
                />
                <Form.Control
                name="city" placeholder="City" type="text"
                autoComplete="address-level2"
                />
                <Form.Control
                name="state" placeholder="State" type="text"
                autoComplete="address-level1"
                />
                <Form.Control
                name="country" placeholder="Country" type="text"
                autoComplete="country"
                />
                <Form.Control
                name="postcode" placeholder="Postcode" type="text"
                autoComplete="postal-code"
                />
            </Form>
      </div>
      <Button variant="primary" onClick={handleShow}>
        + Add a listing
      </Button>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>New Listing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="my new listing"
                // value={title}
                onChange={(e) => setValues({ ...values, title: e.target.value})}
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Very nice and clean"
                // value={description}
                onChange={(e) => setValues({ ...values, description: e.target.value})}
              />
            </Form.Group>
            <br />
            <AddressAutofill accessToken="pk.eyJ1IjoiZGF6emExMjMiLCJhIjoiY2xqcjZzc2Y5MGN5NTNncWpsZ3ByZG9tciJ9.N_FhIXIqTaKbq03NukHGYQ">
                <Form.Control
                name="address" placeholder="Address" type="text"
                autoComplete="address-line1"
                />
              </AddressAutofill>
                <Form.Control
                name="apartment" placeholder="Apartment number" type="text"
                autoComplete="address-line2"
                />
                <Form.Control
                name="city" placeholder="City" type="text"
                autoComplete="address-level2"
                />
                <Form.Control
                name="state" placeholder="State" type="text"
                autoComplete="address-level1"
                />
                <Form.Control
                name="country" placeholder="Country" type="text"
                autoComplete="country"
                />
                <Form.Control
                name="postcode" placeholder="Postcode" type="text"
                autoComplete="postal-code"
                />
            <br />
            <InputGroup>
              <InputGroup.Text>Price: £</InputGroup.Text>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="Enter price"
                // value={price}
                onChange={(e) => setValues({ ...values, price: e.target.value})}
              />
            </InputGroup>
            <br />
            <Form.Group controlId="addListingformFile" className="mb-3">
              <Form.Label>Upload a photo</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddListing;
