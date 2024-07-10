import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const url = 'http://localhost:5000';

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await axios.get(`${url}/api/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setCurrentUser({ ...res.data, token });
        } catch (err) {
          console.error(err);
          localStorage.removeItem('token'); // Clear token if profile fetch fails
        }
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('token');
    window.location.href = '/'; // Redirect to the home page after logout
  };

  return (
    <AuthContext.Provider value={{ currentUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
