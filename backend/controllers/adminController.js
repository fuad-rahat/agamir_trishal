const Union = require('../models/Union');
const Problem = require('../models/Problem');
const PollingStation = require('../models/PollingStation');
const Infrastructure = require('../models/Infrastructure');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// Admin login
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET || 'your_jwt_secret_key_here',
      { expiresIn: '24h' }
    );

    res.json({ token, admin: { email: admin.email, role: admin.role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get dashboard analytics
exports.getDashboardAnalytics = async (req, res) => {
  try {
    const totalUnions = await Union.countDocuments();
    const totalProblems = await Problem.countDocuments();
    const pendingProblems = await Problem.countDocuments({ status: 'pending' });
    const resolvedProblems = await Problem.countDocuments({ status: 'resolved' });
    const pollingStations = await PollingStation.countDocuments();
    const infrastructure = await Infrastructure.countDocuments();

    // Problems by category
    const problemsByCategory = await Problem.aggregate([
      { $match: { status: { $ne: 'hidden' } } },
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    // Problems by union
    const problemsByUnion = await Problem.aggregate([
      { $match: { status: 'approved' } },
      { $group: { _id: '$union', count: { $sum: 1 } } },
      { $lookup: { from: 'unions', localField: '_id', foreignField: '_id', as: 'unionData' } },
      { $unwind: '$unionData' },
      { $project: { _id: 0, unionName: '$unionData.name', count: 1 } }
    ]);

    res.json({
      totalUnions,
      totalProblems,
      pendingProblems,
      resolvedProblems,
      pollingStations,
      infrastructure,
      problemsByCategory,
      problemsByUnion
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get pending problems
exports.getPendingProblems = async (req, res) => {
  try {
    const problems = await Problem.find({ status: 'pending' })
      .populate('union', 'name bengaliName')
      .sort({ createdAt: -1 });
    res.json(problems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Approve problem
exports.approveProblem = async (req, res) => {
  try {
    const problem = await Problem.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true }
    );
    res.json(problem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Hide problem
exports.hideProblem = async (req, res) => {
  try {
    const problem = await Problem.findByIdAndUpdate(
      req.params.id,
      { status: 'hidden' },
      { new: true }
    );
    res.json(problem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Initialize default admin
exports.initializeAdmin = async (req, res) => {
  try {
    const existingAdmin = await Admin.findOne({});
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin already exists' });
    }

    const admin = new Admin({
      email: process.env.ADMIN_EMAIL || 'admin@trishal.local',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      fullName: 'Administrator',
      role: 'admin'
    });

    await admin.save();
    res.json({ message: 'Admin initialized successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
