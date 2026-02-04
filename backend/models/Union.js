const mongoose = require('mongoose');

const unionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  bengaliName: {
    type: String,
    required: true
  },
  description: String,
  boundary: {
    type: {
      type: String,
      enum: ['Polygon'],
      default: 'Polygon'
    },
    coordinates: {
      type: [[[Number]]],
      required: true
    }
  },
  problemCount: {
    type: Number,
    default: 0
  },
  populationEstimate: Number,
  areaSize: String,
  // Introduction/Overview section
  introduction: String,
  introductionImages: [String],
  introductionFields: [{
    key: String,
    value: String
  }],
  // New Fields for Union Details
  chairman: {
    name: String,
    contactNumber: String,
    images: [String]
  },
  placesToVisit: [{
    name: String,
    bengaliName: String,
    description: String,
    images: [String]
  }],
  famousPlaces: [{
    name: String,
    bengaliName: String,
    description: String,
    images: [String],
    historicalSignificance: String
  }],
  literatureAndCulture: [{
    name: String,
    bengaliName: String,
    type: { type: String }, // "type" is reserved in Mongoose - use { type: String } for field named "type"
    description: String,
    images: [String]
  }],
  famousFood: [{
    name: String,
    bengaliName: String,
    description: String,
    mainIngredients: [String],
    images: [String]
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Union', unionSchema);
