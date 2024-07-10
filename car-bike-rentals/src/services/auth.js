// src/services/auth.js
import api from './api';

export const login = async (email, password) => {
  const res = await api.post('/auth/login', { email, password });
  localStorage.setItem('token', res.data.token);
  return res.data;
};

export const register = async (email, password) => {
  const res = await api.post('/auth/register', { email, password });
  return res.data;
};

export const fetchProfile = async () => {
  const token = localStorage.getItem('token');
  const res = await api.get('/auth/profile', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
