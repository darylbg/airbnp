import React, { useEffect, useState } from 'react';
import './Checkout.css';
import {PaymentElement, Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import _stripe from  'stripe'

const stripe = _stripe('sk_test_51GXDSuI0cBafPFQ7Ysi0Qbvvim9TtNs0l9hH3398K0Y7E5ZGBJknRN9Wrb6MwJ91iMnu55C0DD7alMpJlMuUcrqN00raI3GZI7');



// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_doIfqdnODmzgg00kfQcj9wHj00ld9K3l0D');


function Checkout({price , close}) {
    const [paymentIntent , setPaymentIntent] = useState({})
    console.log(price)
    async function GetPaymentIntent(){
       const pi = await stripe.paymentIntents.create({
        amount: price * 100,
        currency: 'gbp',
        payment_method_types: ['card'],
      })
      console.log(pi)
        setPaymentIntent(pi )
    }
    const [paid , setPaid] = useState(false)
    useEffect(()=>{
      GetPaymentIntent()
    }, [])
    const options = {
        // passing the client secret obtained from the server
        clientSecret: paymentIntent.client_secret,
      };
  return (
   <div className="checkout">
    <button className='close-btn' onClick={close}>x</button>
    <div className="inner">
        <h2>Payment</h2>
    {paymentIntent.id && <>
      <Elements stripe={stripePromise} options={options}>
        <PaymentElement />
        </Elements></>}
        {
          paid && <p>Booking successful</p>
        }

      {!paid && <button onClick={() => {setPaid(true); setPaymentIntent({})}}>Pay</button>}
      {paid && <button onClick={close}>Done</button>}
       
    </div>

   </div>
  )
}

export default Checkout