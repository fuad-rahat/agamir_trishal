const Problem = require('../models/Problem');
const Union = require('../models/Union');

// Get all problems
exports.getAllProblems = async (req, res) => {
  try {
    const { union, category, status, isElectionDay } = req.query;
    let query = {};

    if (union) query.union = union;
    if (category) query.category = category;
    if (status) query.status = status;
    if (isElectionDay !== undefined) query.isElectionDay = isElectionDay === 'true';

    const problems = await Problem.find(query)
      .populate('union', 'name bengaliName')
      .populate('pollingStation', 'name address')
      .sort({ createdAt: -1 });

    res.json(problems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get problems by union
exports.getProblemsByUnion = async (req, res) => {
  try {
    const problems = await Problem.find({ 
      union: req.params.unionId,
      status: { $in: ['approved', 'in-progress', 'resolved'] }
    })
    .populate('union', 'name bengaliName')
    .sort({ upvotes: -1, createdAt: -1 });

    res.json(problems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create problem (public)
exports.createProblem = async (req, res) => {
  try {
    const { title, description, category, union, coordinates, images, isElectionDay, pollingStation } = req.body;

    // Validate union exists
    const unionExists = await Union.findById(union);
    if (!unionExists) {
      return res.status(404).json({ error: 'Union not found' });
    }

    const problem = new Problem({
      title,
      description,
      category,
      union,
      location: {
        type: 'Point',
        coordinates: coordinates
      },
      images: images || [],
      isAnonymous: true,
      isElectionDay: isElectionDay || false,
      pollingStation: pollingStation || null,
      status: 'pending'
    });

    await problem.save();
    await unionExists.updateOne({ $inc: { problemCount: 1 } });

    res.status(201).json(problem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update problem status (admin only)
exports.updateProblemStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const problem = await Problem.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: new Date() },
      { new: true }
    );

    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }

    res.json(problem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Upvote problem
exports.upvoteProblem = async (req, res) => {
  try {
    const problem = await Problem.findByIdAndUpdate(
      req.params.id,
      { $inc: { upvotes: 1 } },
      { new: true }
    );

    if (!problem) {
      return res.status(404).json({ error: 'Problem not found' });
    }

    res.json(problem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get problem statistics
exports.getProblemStats = async (req, res) => {
  try {
    const { unionId } = req.params;
    
    const stats = await Problem.aggregate([
      { $match: { union: require('mongoose').Types.ObjectId(unionId), status: 'approved' } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
