// src/components/Layout/Header.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './Header.css';

const Header = () => {
  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    // Optionally, redirect or perform other actions after logout
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo-link">
          <h1 className="logo">Car/Bike Rentals</h1>
        </Link>
        <nav>
          <ul>
            {currentUser ? (
              <>
                <li id='profile'><Link to="/profile">Profile</Link></li>
                <li><button onClick={handleLogout}>Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
