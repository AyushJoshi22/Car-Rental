// src/controllers/bookingController.js
const Booking = require('../models/Booking');
const Vehicle = require('../models/Vehicle');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);



exports.createBooking = async (req, res) => {
  const { vehicleId, startDate, endDate } = req.body;
  // console.log(req.body);
  try {
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ msg: 'Vehicle not found' });
    }

    const totalPrice = vehicle.price * ((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));

    const newBooking = new Booking({
      user: req.user.id,
      vehicle: vehicleId,
      startDate,
      endDate,
      totalPrice,
    });

    const booking = await newBooking.save();
    res.json(booking);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getLatestBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ user: req.user.id }).sort({ _id: -1 }).populate('vehicle');
    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('vehicle');
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.checkoutBooking = async (req, res) => {
  const { bookingId } = req.body;
  const frontend_url = "http://localhost:3000";

  try {
    const booking = await Booking.findById(bookingId).populate('vehicle');
    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: booking.totalPrice * 100,
      currency: 'usd',
      description: `Booking Payment for ${booking.vehicle.name}`,
      metadata: { integration_check: 'accept_a_payment' },
    });

    booking.paymentIntentId = paymentIntent.id;
    await booking.save();

    res.json({ client_secret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};