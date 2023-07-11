import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import LocalListings from '../../components/LocalListings/LocalListings'


const Homepage = () => {
  return (
    <div className='container' style={{width: '100%', justifyContent: 'center', display: 'flex' }}>
      <LocalListings />    
    </div>
  )
}

export default Homepage
