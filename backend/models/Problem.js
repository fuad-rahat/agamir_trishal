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

// Create indexes for faster queries
problemSchema.index({ location: '2dsphere' });
problemSchema.index({ union: 1, status: 1 }); // Compound index for union + status queries
problemSchema.index({ status: 1, createdAt: -1 }); // For status-based sorting
problemSchema.index({ category: 1, status: 1 }); // For category filtering
problemSchema.index({ upvotes: -1, createdAt: -1 }); // For sorting by popularity

module.exports = mongoose.model('Problem', problemSchema);
