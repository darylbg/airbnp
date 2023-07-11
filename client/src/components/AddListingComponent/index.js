import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CloseButton from "react-bootstrap/CloseButton";
import { FloatingLabel, InputGroup, Row, Col } from "react-bootstrap";
import { ADD_LISTING } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import "./AddListingComponent.css";
import Modal from "react-modal";

import { AddressAutofill } from "@mapbox/search-js-react";
import Geocode from "react-geocode";

function AddListing() {
  const [show, setShow] = useState(false);
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [addressLevel1, setAddressLevel1] = useState('');
  const [addressLevel2, setAddressLevel2] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  
  const fullAddress = `${addressLine1} ${addressLine2} ${addressLevel1} ${addressLevel2} ${country} ${postalCode}`
  console.log(fullAddress);
  const [values, setValues] = useState({
    title: "",
    description: "",
    address: "",
    price: "",
    lat: null,
    lng: null,
    image: "",
    price: null,
    userId: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log(`this is auth ${auth.user.userId}`);

  const addListing = useMutation(ADD_LISTING);

  const listingSubmitHandler = async (e) => {
    const { title, description, address, price } = values;
    e.preventDefault();
    // if (!title || !address || !price) {
    //   console.log("fill out all required fields");
    //   return;
    // }
    try {
      const { data } = await addListing({
        variables: {
          listingData: {
            title: setValues.title,
            description: setValues.description,
            address: setValues.address,
            price: setValues.price,
            lat: setValues.lat,
            lng: setValues.lng,
            image: setValues.image,
            price: setValues.price,
            userId: auth.user._id,
          },
        },
      });
      console.log(data);
    } catch (error) {}

    handleClose();
  };

  const [address, setAddress] = useState("");

  const handleChange = (event) => {
    setAddress(event.target.value);
  };

  const [searchAddress, setSearchAddress] = useState("");

  const handleAddressChange = (event) => {
    setSearchAddress(event.target.value);
  };
  Geocode.setApiKey("AIzaSyAibEqEhSqm5drveDG8x92BLTJ-Xm1kya4");
  Geocode.fromAddress("Eiffel Tower").then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      // console.log(`coordinates: ${lat}, ${lng}`);
    },
    (error) => {
      // console.error(error);
    }
  );

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Define the modal styles and accessibility options
  const modalStyle = {
    content: {
      // Add your custom styles here
    },
    overlay: {
      // Add your custom styles here
    },
  };

  return (
    <>
      <Button variant="primary" onClick={openModal}>
        + Add Listing
      </Button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyle}
        contentLabel="Example Modal"
      >
        <Form onSubmit={listingSubmitHandler}>
          {/* <Row> */}
          <Form.Group>
            <Form.Label>Add new Listing</Form.Label>
            <Form.Control
              type="text"
              placeholder="my new listing"
              // value={title}
              onChange={(e) => setValues({ ...values, title: e.target.value })}
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
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Row>
              <Form.Label>Address</Form.Label>
              <AddressAutofill accessToken="pk.eyJ1IjoiZGF6emExMjMiLCJhIjoiY2xqcjZzc2Y5MGN5NTNncWpsZ3ByZG9tciJ9.N_FhIXIqTaKbq03NukHGYQ">
                <Form.Control
                  name="address"
                  placeholder="Search address"
                  type="text"
                  autoComplete="address-line1"
                  onChange={(e) =>
                    setAddressLine1(e.target.value )
                  }
                />
              </AddressAutofill>
              <Col sm={6}>
                <Form.Control
                  name="apartment"
                  placeholder="Apartment number"
                  type="text"
                  autoComplete="address-line2"
                  onChange={(e) =>
                    setAddressLine2(e.target.value )
                  }
                />
              </Col>
              <Col sm={6}>
                <Form.Control
                  name="city"
                  placeholder="City"
                  type="text"
                  autoComplete="address-level2"
                  onChange={(e) =>
                    setAddressLevel2(e.target.value )
                  }
                />
              </Col>
              <Form.Control
                name="state"
                placeholder="State"
                type="text"
                autoComplete="address-level1"
                onChange={(e) =>
                  setAddressLevel1(e.target.value )
                }
              />
              <Col sm={6}>
                <Form.Control
                  name="country"
                  placeholder="Country"
                  type="text"
                  autoComplete="country"
                  onChange={(e) =>
                    setCountry(e.target.value )
                  }
                />
              </Col>
              <Col sm={6}>
                <Form.Control
                  name="postcode"
                  placeholder="Postcode"
                  type="text"
                  autoComplete="postal-code"
                  onChange={(e) =>
                    setPostalCode(e.target.value )
                  }
                />
              </Col>
            </Row>
          </Form.Group>
          <br />
          <InputGroup>
            <InputGroup.Text>Price: £</InputGroup.Text>
            <Form.Control
              type="number"
              step="0.01"
              placeholder="Enter price"
              // value={price}
              onChange={(e) => setValues({ ...values, price: e.target.value })}
            />
          </InputGroup>
          <br />
          <Form.Group controlId="addListingformFile" className="mb-3">
            <Form.Label>Upload a photo</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          <Button
            className="register-button"
            type="submit"
            variant="primary"
            style={{}}
          >
            Add Listing
          </Button>
        </Form>

        <CloseButton
          className="close-listing-modal"
          onClick={closeModal}
        ></CloseButton>
      </Modal>
    </>
  );
}

export default AddListing;
