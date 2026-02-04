const mongoose = require('mongoose');

const helplineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Election Commission', 'Local Administration', 'Emergency', 'Support'],
    required: true
  },
  number: {
    type: String,
    required: true
  },
  description: String,
  availability: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Helpline', helplineSchema);
