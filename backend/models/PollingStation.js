const mongoose = require('mongoose');

const pollingStationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
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
  booth: String,
  contactPerson: String,
  contactPhone: String,
  accessibility: {
    wheelchairAccessible: Boolean,
    voterAssistanceAvailable: Boolean,
    notes: String
  },
  verified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

pollingStationSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('PollingStation', pollingStationSchema);
