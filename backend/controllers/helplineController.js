const Helpline = require('../models/Helpline');

// Get all helplines
exports.getAllHelplines = async (req, res) => {
  try {
    const helplines = await Helpline.find().sort({ category: 1 });
    res.json(helplines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get helplines by category
exports.getHelplinesByCategory = async (req, res) => {
  try {
    const helplines = await Helpline.find({ category: req.params.category });
    res.json(helplines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create helpline (admin only)
exports.createHelpline = async (req, res) => {
  try {
    const { name, category, number, description, availability } = req.body;

    const helpline = new Helpline({
      name,
      category,
      number,
      description,
      availability
    });

    await helpline.save();
    res.status(201).json(helpline);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update helpline
exports.updateHelpline = async (req, res) => {
  try {
    const helpline = await Helpline.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!helpline) {
      return res.status(404).json({ error: 'Helpline not found' });
    }

    res.json(helpline);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete helpline
exports.deleteHelpline = async (req, res) => {
  try {
    const helpline = await Helpline.findByIdAndDelete(req.params.id);
    if (!helpline) {
      return res.status(404).json({ error: 'Helpline not found' });
    }
    res.json({ message: 'Helpline deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
