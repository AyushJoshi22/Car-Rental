// src/routes/vehicles.js
const express = require('express');
const router = express.Router();
const { getVehicles, getVehicle, createVehicle } = require('../controllers/vehicleController');
const auth = require('../middleware/auth');

router.get('/', getVehicles);
router.get('/:id', getVehicle);
router.post('/', auth, createVehicle);

module.exports = router;
