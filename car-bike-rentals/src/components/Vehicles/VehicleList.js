import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Vehicles.css';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const url = 'http://localhost:5000';
  const defaultImage = 'https://via.placeholder.com/150'; // URL of the default image

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await axios.get(`${url}/api/vehicles`);
        setVehicles(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <div className="vehicle-list">
      <h2>Available Vehicles</h2>
      <div className="vehicles">
        {vehicles.map(vehicle => (
          <div key={vehicle._id} className="vehicle">
            <div className="vehicle-content">
              <h3>{vehicle.name}</h3>
              <img
                src={vehicle.imageUrl ? vehicle.imageUrl : defaultImage}
                alt={vehicle.name}
                className="vehicle-image"
              />
              <p>{vehicle.description}</p>
            </div>
            <Link to={`/vehicle/${vehicle._id}`} className="details-button">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleList;
