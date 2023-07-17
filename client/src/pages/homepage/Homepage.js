import React from "react";
import AllListings from "../../components/AllListings";
import Map from "../../components/Map/Map";
import BookListingById from "../../components/MyListings/BookListingById";

const Homepage = () => {
  return (
    <div className="home-wrapper">
      <Map />
      <div
      //   className='container'
      //   style={{ width: "100%", justifyContent: "center", display: "flex" }}
      >
        {/* <AllListings /> */}
      </div>
    </div>
  );
};

export default Homepage;