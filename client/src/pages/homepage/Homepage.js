import React from "react";
import AllListings from "../../components/AllListings";
import Map from "../../components/Map/Map";
import BookListingById from "../../components/MyListings/BookListingById";

const Homepage = () => {
  return (
    <>
      <Map />
      <div
      //   className='container'
      //   style={{ width: "100%", justifyContent: "center", display: "flex" }}
      >
        <AllListings />
      </div>
    </>
  );
};

export default Homepage;
