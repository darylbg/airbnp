import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CloseButton from "react-bootstrap/CloseButton";
import { InputGroup, Row, Col, Alert } from "react-bootstrap";
import { CREATE_LISTING } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import "./AddListingComponent.css";
import Modal from "react-modal";

import { AddressAutofill } from "@mapbox/search-js-react";
import Geocode from "react-geocode";

function AddListing() {
  const [show, setShow] = useState(false);
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [addressLevel1, setAddressLevel1] = useState("");
  const [addressLevel2, setAddressLevel2] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const [imageUrlInput, setImageUrlInput] = useState("");
  const [validUpload, setValidUpload] = useState(true);
  const [message, setMessage] = useState("");

  const fullAddress = `${addressLine1} ${addressLine2} ${addressLevel1} ${addressLevel2} ${country} ${postalCode}`;
  // console.log(fullAddress);
  const [values, setValues] = useState({
    title: "",
    description: "",
    address: "",
    price: 0,
    lat: null,
    lng: null,
    image: "",
    // userId: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [createListing] = useMutation(CREATE_LISTING);
  Geocode.setApiKey("AIzaSyAibEqEhSqm5drveDG8x92BLTJ-Xm1kya4");

  const listingSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await Geocode.fromAddress(fullAddress);
      const { lat, lng } = response.results[0].geometry.location;

      const { title, description, price, image } = values;

      const { data } = await createListing({
        variables: {
          listingData: {
            title,
            description,
            address: fullAddress,
            price,
            lat,
            lng,
            image: image,
            // userId: auth.user.userId,
          },
        },
      });

      setAddressLine1("");
      setAddressLine2("");
      setAddressLevel1("");
      setAddressLevel2("");
      setCountry("");
      setPostalCode("");

      setValues({
        title: "",
        description: "",
        address: "",
        price: 0,
        lat: null,
        lng: null,
        image: "",
        // userId: "",
      })

      handleClose();
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

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
      maxWidth: "500px",
    },
    overlay: {
      // Add your custom styles here
    },
  };

  // image handling
  const processFile = async (e) => {
    const file = e.target.files[0];

    // Check file type
    if (!file.type.startsWith("image/")) {
      setValidUpload(false);
      setMessage("Invalid file type. Please select an image.");
      return;
    }

    // Check file size
    const fileSizeInMB = file.size / (1024 * 1024);
    const maxSizeInMB = 10; // Maximum allowed file size in MB
    if (fileSizeInMB > maxSizeInMB) {
      setValidUpload(false);
      setMessage(`File size exceeds the maximum limit of ${maxSizeInMB}MB.`);
      return;
    }

    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("cloud_name", process.env.REACT_APP_CLOUDINARY_NAME);
    formdata.append("upload_preset", "vzrpgeu5");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/darylb/auto/upload`,
      {
        method: "post",
        mode: "cors",
        body: formdata,
      }
    );

    const json = await res.json();
    const imageUrl = json.secure_url;
    setImageUrlInput(imageUrl);
    setValues({ ...values, image: imageUrl }); // Update the image URL state
    console.log(imageUrl);
    setValidUpload(true);
    setMessage("");
  };

  return (
    <>
      <div>
        <Button variant="primary" onClick={openModal}>
          + Add Listing
        </Button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={false}
        style={modalStyle}
        contentLabel="Example Modal"
      >
        <Form onSubmit={listingSubmitHandler}>
          {/* <Row> */}
          <h3>Add new listing</h3>
          <Form.Group>
            <Form.Label>Title</Form.Label>
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
                  onChange={(e) => setAddressLine1(e.target.value)}
                />
              </AddressAutofill>
              <div className="mb-3 list-modal-address">
                <span>
                  {addressLine1} {addressLine2}
                </span>
                <span>
                  {addressLevel1} {addressLevel2}
                </span>
                <span>{postalCode}</span>
                <span style={{ textTransform: "uppercase" }}>{country}</span>
                <span></span>
              </div>
              <Col sm={6} className="d-none">
                <Form.Control
                  name="apartment"
                  placeholder="Apartment number"
                  type="text"
                  autoComplete="address-line2"
                  onChange={(e) => setAddressLine2(e.target.value)}
                />
              </Col>
              <Col sm={6} className="d-none">
                <Form.Control
                  name="city"
                  placeholder="City"
                  type="text"
                  autoComplete="address-level2"
                  onChange={(e) => setAddressLevel2(e.target.value)}
                />
              </Col>
              <Form.Control
                name="state"
                placeholder="State"
                type="text"
                autoComplete="address-level1"
                onChange={(e) => setAddressLevel1(e.target.value)}
                className="d-none"
              />
              <Col sm={6} className="d-none">
                <Form.Control
                  name="country"
                  placeholder="Country"
                  type="text"
                  autoComplete="country"
                  onChange={(e) => setCountry(e.target.value)}
                />
              </Col>
              <Col sm={6} className="d-none">
                <Form.Control
                  name="postcode"
                  placeholder="Postcode"
                  type="text"
                  autoComplete="postal-code"
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </Col>
            </Row>
          </Form.Group>
          {/* <br /> */}
          <InputGroup>
            <InputGroup.Text>Price: £</InputGroup.Text>
            <Form.Control
              type="number"
              step="0.01"
              placeholder="Enter price"
              // value={price}
              onChange={(e) => {
                const price = parseInt(e.target.value); // Convert the value to an integer
                setValues({ ...values, price: isNaN(price) ? 0 : price }); // Set the price as an integer or 0 if the value is not a valid number
              }}
            />
          </InputGroup>
          <br />
          {/* <Form.Group controlId="addListingformFile" className="mb-3">
            <Form.Label>Upload a photo</Form.Label>
            <Form.Control type="file" />
          </Form.Group> */}
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload new profile image</Form.Label>
            <Form.Control
              type="file"
              onChange={processFile}
              // disabled={inputDisable}
            />
            <br />
            <Alert
              className={validUpload ? "d-none" : "block"}
              variant="danger"
            >
              {message}
            </Alert>
          </Form.Group>
          <Button className="" type="submit" variant="primary" style={{}}>
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
