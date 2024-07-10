import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './User.css';
import { AuthContext } from '../../contexts/AuthContext';
import BookingHistory from './BookingHistory'; // Import BookingHistory component

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const url = 'http://localhost:5000';

  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUser) return; // Handle edge case where currentUser is not set

      const token = currentUser.token; // Adjust based on your AuthContext structure
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const res = await axios.get(`${url}/api/auth/profile`, config);
        setProfile(res.data);
      } catch (err) {
        console.error('Profile fetch error:', err);
        // Handle error gracefully, e.g., clear profile state or show error message
      }
    };

    fetchProfile();
  }, [currentUser]); // Depend on currentUser to re-fetch profile when user changes

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="profile">
      <h2>Profile</h2>
      <p>Email: {profile.email}</p>
      {/* Add more profile details as needed */}
      
      {/* Render BookingHistory component */}
      <BookingHistory />
    </div>
  );
};

export default Profile;
