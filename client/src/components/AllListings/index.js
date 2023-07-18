import React from "react";
import { useQuery } from "@apollo/client";
import "./LocalList.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {Star} from 'react-bootstrap-icons'
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { QUERY_GET_ALL_LISTINGS } from "../../utils/queries";

const AllListings = () => {
  const { data: allListingsData } = useQuery(QUERY_GET_ALL_LISTINGS);
  // console.log(allListingsData);

  return (
    <div className="homepage-cards">
      {allListingsData?.getAllListings?.map((listing, index) => {
        return (
          <Card className='homepage-card' key={index}>
            <Link className="homepage-card-link">
            <Card.Img variant="top" src={listing.image} />
            <div className="gradient-overlay">
              <Card.Text className="homepage-card-price">£ {listing.price}</Card.Text>
              <p  className="homepage-card-rating"><Star/> 4.5/5</p>
              <div 
              className="homepage-card-indicator" 
              style={listing.isAvailable ? {backgroundColor: '#00FF00',
  boxShadow: '0px 0px 10px rgba(5, 247, 5, 0.7)'} : {backgroundColor: 'grey',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.7)'}}></div>
            </div>
            
            <Card.Body>
            <Card.Title className="homepage-card-title" style={{overflow: 'break-word'}}>{listing.title}</Card.Title>
              <Card.Text className="homepage-card-text">{listing.description}</Card.Text>
              <Card.Text className="homepage-card-text" style={listing.isAvailable ? {color: '#15d475'} : {color: 'grey'}}>{listing.isAvailable ? 'Available to book' : 'Unavailable at this time'}</Card.Text>
            </Card.Body>
            </Link>
          </Card>
        );
      })}
    </div>
  );
};

export default AllListings;
