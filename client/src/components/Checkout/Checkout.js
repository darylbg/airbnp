import React, { useEffect, useState } from 'react';
import './Checkout.css';
import {PaymentElement, Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import _stripe from  'stripe';
import { Button } from 'react-bootstrap';
import { CREATE_NOTIFICATION } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import { useSelector } from "react-redux";
import dayjs from 'dayjs';

const stripe = _stripe('sk_test_51GXDSuI0cBafPFQ7Ysi0Qbvvim9TtNs0l9hH3398K0Y7E5ZGBJknRN9Wrb6MwJ91iMnu55C0DD7alMpJlMuUcrqN00raI3GZI7');

const stripePromise = loadStripe('pk_test_doIfqdnODmzgg00kfQcj9wHj00ld9K3l0D');


function Checkout({idCard, tripDuration, price , close}) {
  const createNotification = useMutation(CREATE_NOTIFICATION);
  const { auth } = useSelector((state) => state);

  const notification = async (e) => {
    // e.preventDefault();
    try {
    const newNotification = await createNotification({
      variables: {
        arrivingBy: tripDuration,
        createdAt: dayjs().format('YYYY-MM-DD HH:mm'),
        listingId: idCard,
        // userId: auth.user.userId
      }});
      console.log(newNotification);
      } catch (error) {
        console.log(error)
      }
  }

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

      {!paid && <Button onClick={
        () => {setPaid(true); 
        setPaymentIntent({}); 
        notification()}}
        >Pay</Button>}
      {paid && <Button onClick={close}>Done</Button>}
       
    </div>

   </div>
  )
}

export default Checkout