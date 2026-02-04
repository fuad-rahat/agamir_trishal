const Problem = require('../models/Problem');
const Union = require('../models/Union');

// Get all problems (optimized with indexing and selective fields)
exports.getAllProblems = async (req, res) => {
  try {
    const { union, category, status, isElectionDay } = req.query;
    let query = {};

    // Show all problems by default (including pending), unless status filter is specified
    if (status) {
      query.status = status;
    } else {
      // Default: show all except hidden
      query.status = { $ne: 'hidden' };
    }

    if (union) query.union = union;
    if (category) query.category = category;
    if (isElectionDay !== undefined) query.isElectionDay = isElectionDay === 'true';

    // Optimized query: select only needed fields, populate efficiently, limit results
    const problems = await Problem.find(query)
      .select('title description category status union pollingStation location images upvotes createdAt updatedAt')
      .populate('union', 'name bengaliName _id')
      .populate('pollingStation', 'name address')
      .sort({ upvotes: -1, createdAt: -1 })
      .lean()
      .limit(1000); // Reasonable limit

    res.json(problems || []);
  } catch (error) {
    console.error('Error fetching problems:', error);
    res.status(500).json({ error: error.message || 'সমস্যা ডেটা লোড করতে ব্যর্থ হয়েছে' });
  }
};

// Get problems by union (optimized)
exports.getProblemsByUnion = async (req, res) => {
  try {
    const problems = await Problem.find({ 
      union: req.params.unionId,
      status: { $in: ['approved', 'in-progress', 'resolved'] }
    })
    .select('title description category status union pollingStation location images upvotes createdAt updatedAt')
    .populate('union', 'name bengaliName _id')
    .populate('pollingStation', 'name address')
    .sort({ upvotes: -1, createdAt: -1 })
    .lean()
    .limit(500);

    res.json(problems);
  } catch (error) {
    console.error('Error fetching problems by union:', error);
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
    const mongoose = require('mongoose');
    
    const stats = await Problem.aggregate([
      { $match: { union: new mongoose.Types.ObjectId(unionId), status: 'approved' } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json(stats);
  } catch (error) {
    console.error('Error fetching problem stats:', error);
    res.status(500).json({ error: error.message });
  }
};
