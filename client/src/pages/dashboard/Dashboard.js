import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import LocalListings from "../../components/LocalListings/LocalListings";
// import MyListings from "../../components/MyListings/MyListings";
// import NewListingModal from "../../components/NewListing/NewListingModal";
import Login from "../login/Login";
import { useQuery, useLazyQuery } from "@apollo/client";
import { QUERY_USER } from "../../utils/queries";
import AddListing from "../../components/AddListingComponent";
import DashboardListings from "../../components/DashboardListings";
import { useSelector } from "react-redux";
import { QUERY_LISTING_BY_USER_ID } from "../../utils/queries";
import Button from "react-bootstrap/Button";
import './Dashboard.css'

const Dashboard = () => {
  const { auth } = useSelector((state) => state);

  const { data: dataListing } = useQuery(QUERY_LISTING_BY_USER_ID);
  console.log(dataListing?.getListingByUserId);
  const listings = dataListing?.getListingByUserId || [];
  const reversedListings = [...listings].reverse();
  // console.log(listings);
  const { data } = useQuery(QUERY_USER);
  let currentUser;

  if (data) {
    currentUser = data.user;
    // console.log(data.user);
  }

  return (
    <Container className="">
      {currentUser ? (
        <>
          <Row>
            <AddListing />
          </Row>
          <Row className="listings-row">
            <h2 className="update-listings-title">Update my listings</h2>
            {reversedListings.map((listing) => (
              <DashboardListings key={listing.id} listing={listing} />
            ))}
          </Row>
          <Row>
            <Col xs={4} sm={4}></Col>
            <Col xs={4} sm={4}>
              {/* <MyListings /> */}
            </Col>
          </Row>
        </>
      ) : (
        <Row>
          <h2>Please log in to view your dashboard</h2>
          <Login />
        </Row>
      )}
    </Container>
  );
};

export default Dashboard;
