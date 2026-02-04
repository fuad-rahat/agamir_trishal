const mongoose = require('mongoose');

const infrastructureSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Road', 'School', 'Health Center', 'Water Supply', 'Drainage', 'Electricity'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  union: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Union',
    required: true
  },
  description: String,
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
  address: String,
  condition: {
    type: String,
    enum: ['Excellent', 'Good', 'Fair', 'Poor', 'Critical'],
    default: 'Good'
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

infrastructureSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Infrastructure', infrastructureSchema);
