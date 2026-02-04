const PollingStation = require('../models/PollingStation');
const Union = require('../models/Union');

// Get all polling stations
exports.getAllPollingStations = async (req, res) => {
  try {
    const stations = await PollingStation.find()
      .populate('union', 'name bengaliName');
    res.json(stations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get polling stations by union
exports.getStationsByUnion = async (req, res) => {
  try {
    const stations = await PollingStation.find({ union: req.params.unionId })
      .populate('union', 'name bengaliName');
    res.json(stations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create polling station (admin only)
exports.createPollingStation = async (req, res) => {
  try {
    const { name, address, union, coordinates, booth, contactPerson, contactPhone, accessibility } = req.body;

    const unionExists = await Union.findById(union);
    if (!unionExists) {
      return res.status(404).json({ error: 'Union not found' });
    }

    const station = new PollingStation({
      name,
      address,
      union,
      location: {
        type: 'Point',
        coordinates: coordinates
      },
      booth,
      contactPerson,
      contactPhone,
      accessibility,
      verified: false
    });

    await station.save();
    res.status(201).json(station);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update polling station
exports.updatePollingStation = async (req, res) => {
  try {
    const station = await PollingStation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!station) {
      return res.status(404).json({ error: 'Station not found' });
    }

    res.json(station);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Verify polling station
exports.verifyPollingStation = async (req, res) => {
  try {
    const station = await PollingStation.findByIdAndUpdate(
      req.params.id,
      { verified: true },
      { new: true }
    );

    if (!station) {
      return res.status(404).json({ error: 'Station not found' });
    }

    res.json(station);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete polling station
exports.deletePollingStation = async (req, res) => {
  try {
    const station = await PollingStation.findByIdAndDelete(req.params.id);
    if (!station) {
      return res.status(404).json({ error: 'Station not found' });
    }
    res.json({ message: 'Station deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
