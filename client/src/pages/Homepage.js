import React from 'react'
import LocalListings from '../components/LocalListings/LocalListings'
import { NavLink } from 'react-router-dom';


const Homepage = () => {
  return (
    <div className='vh-100 bg-success d-flex align-items-md-center justify-content-sm-center'>
      <LocalListings />
    </div>
  )
}

export default Homepage
