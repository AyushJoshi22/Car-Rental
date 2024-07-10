import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './User.css';
import { AuthContext } from '../../contexts/AuthContext'; // Import AuthContext

const BookingHistory = () => {
  const { currentUser } = useContext(AuthContext); // Use AuthContext to get currentUser
  const [bookings, setBookings] = useState([]);
  const url = 'http://localhost:5000';

  useEffect(() => {
    const fetchBookings = async () => {
      if (!currentUser) return; // Ensure currentUser exists

      const token = currentUser.token; // Get token from currentUser
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}` // Include token in Authorization header
          }
        };
        const res = await axios.get(`${url}/api/bookings`, config); // Pass config with token
        setBookings(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBookings();
  }, [currentUser]); // Depend on currentUser to re-fetch bookings when it changes

  return (
    <div className="booking-history">
      <h2>Booking History</h2>
      <div className="bookings">
        {bookings.map(booking => (
          <div key={booking._id} className="booking">
            <h3>Vehicle: {booking.vehicle.name}</h3>
            <p>Start Date: {new Date(booking.startDate).toLocaleDateString()}</p>
            <p>End Date: {new Date(booking.endDate).toLocaleDateString()}</p>
            <p>Total Price: ${booking.totalPrice}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingHistory;
