import React from "react";
import LocalListings from "../../components/LocalListings/LocalListings";
import Map from "../../components/Map/Map";
import BookListingById from "../../components/MyListings/BookListingById";

const Homepage = () => {
  return (
    <>
      <Map />
      <div
        className='container'
        style={{ width: "100%", justifyContent: "center", display: "flex" }}
      >
        <hr />
        
        <LocalListings />
      </div>
    </>
  );
};

export default Homepage;
