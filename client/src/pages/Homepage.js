import React from 'react'
import LocalListings from '../components/LocalListings/LocalListings'
import { NavLink } from 'react-router-dom';


const Homepage = () => {
  return (
    <div className='container' style={{width: '100%', justifyContent: 'center', display: 'flex', backgroundColor: "red" }}>
      <LocalListings />    
    </div>
  )
}

export default Homepage
