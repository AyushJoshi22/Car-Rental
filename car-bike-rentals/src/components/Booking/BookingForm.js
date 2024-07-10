// src/components/Booking/BookingForm.js
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './Booking.css';

const BookingForm = () => {
  const { vehicleId } = useParams();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const url = 'http://localhost:5000';
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // Ensure token is stored correctly
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      await axios.post(`${url}/api/bookings`, { vehicleId, startDate, endDate }, config);
      navigate('/checkout');
    } catch (err) {
      console.error(err);
      alert('Booking failed');
    }
  };

  return (
    <div className="booking-form">
      <h2>Book a Vehicle</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Book</button>
      </form>
    </div>
  );
};

export default BookingForm;
