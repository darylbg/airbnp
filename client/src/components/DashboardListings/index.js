import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_LISTING, DELETE_LISTING } from "../../utils/mutations";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  Button,
  Alert,
  Modal,
} from "react-bootstrap";
import { Check } from "react-bootstrap-icons";
import { AddressAutofill } from "@mapbox/search-js-react";
import Geocode from "react-geocode";
import "./DashboardListings.css";

function DashboardListings({ listing, setListingValidate, setListingValidateMsg }) {
  const [show, setShow] = useState(false);
  const [addressLine1, setAddressLine1] = useState(listing.address);
  const [addressLine2, setAddressLine2] = useState("");
  const [addressLevel1, setAddressLevel1] = useState("");
  const [addressLevel2, setAddressLevel2] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  // const [addressValue, setAddressValue] = useState(listing.address);

  const [imageUrlInput, setImageUrlInput] = useState(listing.image);
  const [validUpload, setValidUpload] = useState(true);
  const [message, setMessage] = useState("");

  const [smShow, setSmShow] = useState(false);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [values, setValues] = useState({
    title: listing.title,
    description: listing.description,
    address: listing.address,
    price: listing.price,
    lat: listing.lat,
    lng: listing.lng,
    image: imageUrlInput,
    isAvailable: listing.isAvailable,
    //   userId: auth.user.userId
  });

  const fullAddress = `${addressLine1}+${addressLine2}+${addressLevel1}+${addressLevel2}+${country}+${postalCode}`;

  const [updateListing] = useMutation(UPDATE_LISTING);
  const [removeListing] = useMutation(DELETE_LISTING);

  Geocode.setApiKey("AIzaSyAibEqEhSqm5drveDG8x92BLTJ-Xm1kya4");

  const listingUpdateHandler = async (e) => {
    e.preventDefault();
    const response = await Geocode.fromAddress(fullAddress);
    const { lat, lng } = response.results[0].geometry.location;

    try {
      const { data: updatedData } = await updateListing({
        variables: {
          listingId: listing._id,
          listingData: { ...values, lat, lng },
        },
      });
      console.log(listing._id);
      console.log("Updated data:", updatedData);
      setListingValidate(true);
      setListingValidateMsg('Successfully updated listing');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteListing = async () => {
    try {
      await removeListing({
        variables: {
          listingId: listing._id,
        },
      });
      console.log("Successfully deleted listing");
      setSmShow(false);
      setListingValidate(true);
      setListingValidateMsg('Successfully deleted listing');
    } catch (error) {
      console.log(error);
    }
  };

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
      <Col xs={12} lg={8} className="edit-listings-col">
        <Card className="edit-listings-card">
          <div className="row no-gutters">
            <div className="col-md-4">
              <Card.Img
                src={listing.image}
                className="edit-listings-img"
                alt="Card image"
              />
            </div>
            <div className="col-md-8">
              <Card.Body>
                <Card.Title>{listing.title}</Card.Title>
                {/* <Card.Text> */}
                <Form onSubmit={listingUpdateHandler}>
                  <Form.Group>
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label="Set this bathroom as available or unavailable to book"
                      checked={values.isAvailable}
                      onChange={(e) =>
                        setValues({ ...values, isAvailable: e.target.checked })
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="my new listing"
                      value={values.title}
                      onChange={(e) =>
                        setValues({ ...values, title: e.target.value })
                      }
                    />
                  </Form.Group>
                  <br />
                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Very nice and clean"
                      value={values.description}
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
                          placeholder="Set new address"
                          type="text"
                          autoComplete="address-line1"
                          onChange={(e) => setAddressLine1(e.target.value)}
                        />
                      </AddressAutofill>
                      <div className="mb-3 list-modal-address">
                        <span>
                          {addressLine1} {addressLine2}
                        </span>
                        <span autoComplete="address-line2">
                          {addressLevel1} {addressLevel2}
                        </span>
                        <span>{postalCode}</span>
                        <span style={{ textTransform: "uppercase" }}>
                          {country}
                        </span>
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
                      value={values.price}
                      onChange={(e) => {
                        const price = parseInt(e.target.value); // Convert the value to an integer
                        setValues({
                          ...values,
                          price: isNaN(price) ? 0 : price,
                        }); // Set the price as an integer or 0 if the value is not a valid number
                      }}
                    />
                  </InputGroup>
                  <br />
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload new image</Form.Label>
                    <Form.Control type="file" onChange={processFile} />
                    <br />
                    <Alert
                      className={validUpload ? "d-none" : "block"}
                      variant="danger"
                    >
                      {message}
                    </Alert>
                  </Form.Group>
                  <Button
                    className="edit-listing-button"
                    type="submit"
                    variant="primary"
                    style={{}}
                  >
                    <Check />
                    Save updates
                  </Button>
                  <Button
                    onClick={() => setSmShow(true)}
                    className="me-2"
                    variant="danger"
                  >
                    x Delete Listing
                  </Button>
                  <Modal
                    size="sm"
                    show={smShow}
                    onHide={() => setSmShow(false)}
                    aria-labelledby="example-modal-sizes-title-sm"
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="example-modal-sizes-title-sm">
                        Are you sure you want to delete this listing?
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Button
                        onClick={handleDeleteListing}
                        variant="danger"
                        className="delete-listing-confirm"
                        data-id={listing._id}
                      >
                        Delete
                      </Button>
                    </Modal.Body>
                  </Modal>
                </Form>
                {/* </Card.Text> */}
              </Card.Body>
            </div>
          </div>
        </Card>
      </Col>
    </>
  );
}

export default DashboardListings;
