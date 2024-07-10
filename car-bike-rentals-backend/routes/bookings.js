// src/routes/bookings.js
const express = require('express');
const router = express.Router();
const { createBooking, getLatestBooking, getUserBookings, checkoutBooking } = require('../controllers/bookingController');
const auth = require('../middleware/auth');

router.post('/', auth, createBooking);
router.get('/latest', auth, getLatestBooking);
router.get('/', auth, getUserBookings);
router.post('/checkout', auth, checkoutBooking);

module.exports = router;
