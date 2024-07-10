const Vehicle = require('../models/Vehicle');

exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ msg: 'Vehicle not found' });
    }
    res.json(vehicle);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.createVehicle = async (req, res) => {
  const { name, description, price, imageUrl } = req.body;

  try {
    const newVehicle = new Vehicle({
      name,
      description,
      price,
      imageUrl,
    });

    const vehicle = await newVehicle.save();
    res.json(vehicle);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
