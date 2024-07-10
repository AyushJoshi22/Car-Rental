// Example of adjusted Checkout.js component
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Booking.css';
import { loadStripe } from '@stripe/stripe-js';

const Checkout = () => {
  const [booking, setBooking] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const url = 'http://localhost:5000';

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const res = await axios.get(`${url}/api/bookings/latest`, config);
        setBooking(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBooking();
  }, []);

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const res = await axios.post(`${url}/api/bookings/checkout`, { bookingId: booking._id }, config);
      const { client_secret } = res.data;

      const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
      const { error } = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: stripe.elements.getElement('card'),
          billing_details: {
            name: 'Customer Name',
          },
        }
      });

      if (error) {
        console.error(error);
        alert('Payment failed');
      } else {
        alert('Payment successful');
      }
    } catch (err) {
      console.error(err);
      alert('Payment failed');
    }
  };

  if (!booking) return <div>Loading...</div>;

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      <p>Vehicle: {booking.vehicle.name}</p>
      <p>Start Date: {booking.startDate}</p>
      <p>End Date: {booking.endDate}</p>
      <p>Total Price: Rs.{booking.totalPrice}</p>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default Checkout;
