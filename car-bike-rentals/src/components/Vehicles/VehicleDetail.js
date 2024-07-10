// src/components/Vehicles/VehicleDetail.js

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Vehicles.css';

const VehicleDetail = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const url = 'http://localhost:5000';
  const defaultImage = 'https://via.placeholder.com/150'; // URL of the default image
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await axios.get(`${url}/api/vehicles/${id}`);
        setVehicle(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchVehicle();
  }, [id]);

  const handleBookButtonClick = () => {
    navigate(`/book/${id}`); // Navigate to the booking form page (/book/:vehicleId) when button is clicked
  };

  if (!vehicle) return <div>Loading...</div>;

  return (
    <div className="vehicle-detail">
      <h2>{vehicle.name}</h2>
      <img
        src={vehicle.imageUrl ? vehicle.imageUrl : defaultImage}
        alt={vehicle.name}
        className="vehicle-image"
      />
      <p>{vehicle.description}</p>
      <p>Price: Rs.{vehicle.price} per day</p>
      <button onClick={handleBookButtonClick}>Book Now</button>
    </div>
  );
};

export default VehicleDetail;
