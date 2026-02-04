const Infrastructure = require('../models/Infrastructure');
const Union = require('../models/Union');

// Get all infrastructure
exports.getAllInfrastructure = async (req, res) => {
  try {
    const { type, union } = req.query;
    let query = {};

    if (type) query.type = type;
    if (union) query.union = union;

    const infrastructure = await Infrastructure.find(query)
      .populate('union', 'name bengaliName');
    res.json(infrastructure);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get infrastructure by union
exports.getInfrastructureByUnion = async (req, res) => {
  try {
    const infrastructure = await Infrastructure.find({ union: req.params.unionId })
      .populate('union', 'name bengaliName')
      .sort({ type: 1 });
    res.json(infrastructure);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create infrastructure (admin only)
exports.createInfrastructure = async (req, res) => {
  try {
    const { type, name, union, description, coordinates, address, condition, images } = req.body;

    const unionExists = await Union.findById(union);
    if (!unionExists) {
      return res.status(404).json({ error: 'Union not found' });
    }

    const infrastructure = new Infrastructure({
      type,
      name,
      union,
      description,
      location: {
        type: 'Point',
        coordinates: coordinates
      },
      address,
      condition: condition || 'Good',
      images: images || []
    });

    await infrastructure.save();
    res.status(201).json(infrastructure);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update infrastructure
exports.updateInfrastructure = async (req, res) => {
  try {
    const infrastructure = await Infrastructure.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!infrastructure) {
      return res.status(404).json({ error: 'Infrastructure not found' });
    }

    res.json(infrastructure);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete infrastructure
exports.deleteInfrastructure = async (req, res) => {
  try {
    const infrastructure = await Infrastructure.findByIdAndDelete(req.params.id);
    if (!infrastructure) {
      return res.status(404).json({ error: 'Infrastructure not found' });
    }
    res.json({ message: 'Infrastructure deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get infrastructure summary by union
exports.getInfrastructureSummary = async (req, res) => {
  try {
    const { unionId } = req.params;
    
    const summary = await Infrastructure.aggregate([
      { $match: { union: require('mongoose').Types.ObjectId(unionId) } },
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
