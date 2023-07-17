import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Checkout from './Checkout'
import {useSelector} from "react-redux"
import { useNavigate } from 'react-router-dom'


function CheckoutWrapper({tripDuration, addressCard, priceCard}) {
  const user = useSelector(state => state.auth.user)
  
  const navigate = useNavigate()
    const [modal , setModal] = useState(false)
  return (
    <div className="checkout-wrapper">
    <h3 className="card-h4"> {addressCard} </h3>

    <div className="price-checkout-wrapper">
      <h4 className="card-h4"> £{priceCard} </h4>

      <button id="reserve-button" onClick={() =>{ user.userId ? setModal(true): navigate("/login")}}> Reserve </button>
    {modal && ReactDOM.createPortal( <Checkout 
                                      tripDuration={tripDuration} 
                                      price={priceCard} 
                                      close={() => setModal(false)}
                                      />, 
                                      document.querySelector("#root"))}
    </div>
  </div>
  )
}

export default CheckoutWrapper