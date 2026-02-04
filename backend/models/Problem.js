const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Road', 'School', 'Health', 'Water/Drainage', 'Electricity', 'Other'],
    required: true
  },
  union: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Union',
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  images: [String],
  status: {
    type: String,
    enum: ['pending', 'approved', 'in-progress', 'resolved', 'hidden'],
    default: 'pending'
  },
  isAnonymous: {
    type: Boolean,
    default: true
  },
  isElectionDay: {
    type: Boolean,
    default: false
  },
  pollingStation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PollingStation'
  },
  upvotes: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create 2dsphere index for location
problemSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Problem', problemSchema);
