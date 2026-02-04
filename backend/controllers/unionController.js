const mongoose = require('mongoose');
const Union = require('../models/Union');
const Problem = require('../models/Problem');

// Helper to support numeric SVG ids (e.g. "/union/4") used by frontend
// Map frontend numeric ids to the seeded ObjectIds from seedUnions.js
const FRONTEND_TO_SEED_ID = {
  '1': '660000000000000000000010', // Mothbari -> seed index 10
  '2': '660000000000000000000006', // Trishal -> seed index 6
  '3': '660000000000000000000003', // Kanthal -> seed index 3
  '4': '660000000000000000000001', // Dhankhola -> seed index 1
  '5': '660000000000000000000004', // Kanihary -> seed index 4
  '6': '660000000000000000000002', // Bailor -> seed index 2
  '7': '660000000000000000000007', // Harirampur -> seed index 7
  '8': '660000000000000000000005', // Rampur -> seed index 5
  '9': '660000000000000000000009', // Balipara -> seed index 9
  '10': '660000000000000000000011', // Mokspur -> seed index 11
  '11': '660000000000000000000012', // Amirabari -> seed index 12
  '12': '660000000000000000000008'  // Sakhua -> seed index 8
};

const resolveUnionId = (id) => {
  // If frontend numeric id provided, map to seeded ObjectId
  if (/^\d+$/.test(String(id))) {
    const mapped = FRONTEND_TO_SEED_ID[String(id)];
    if (mapped) {
      try {
        return new mongoose.Types.ObjectId(mapped);
      } catch (err) {
        console.error('resolveUnionId: invalid mapped ObjectId', mapped, err);
        return id;
      }
    }
    // fallback: try constructing by padding (older approach)
    const num = parseInt(id, 10);
    const suffix = num < 10 ? `0${num}` : `${num}`;
    try {
      return new mongoose.Types.ObjectId(`6600000000000000000000${suffix}`);
    } catch (err) {
      return id;
    }
  }
  // If it's already an ObjectId string, return as-is
  return id;
};

// Get all unions
exports.getAllUnions = async (req, res) => {
  try {
    const unions = await Union.find();
    res.json(unions);
  } catch (error) {
    console.error('getUnionById error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get single union with problems
exports.getUnionById = async (req, res) => {
  try {
    const resolvedId = resolveUnionId(req.params.id);
    const union = await Union.findById(resolvedId);
    if (!union) {
      return res.status(404).json({ error: 'ইউনিয়ন পাওয়া যায়নি' });
    }

    const problems = await Problem.find({ union: union._id });
    
    res.json({
      ...union.toObject(),
      problems: problems
    });
  } catch (error) {
    console.error('updateUnionInfo error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Create union (admin only)
exports.createUnion = async (req, res) => {
  try {
    const { name, bengaliName, boundary, description, populationEstimate, areaSize } = req.body;

    const union = new Union({
      name,
      bengaliName,
      boundary,
      description,
      populationEstimate,
      areaSize
    });

    await union.save();
    res.status(201).json(union);
  } catch (error) {
    console.error('addChairman error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Update union info (chairman, places, culture, food)
exports.updateUnionInfo = async (req, res) => {
  try {
    const { chairman, placesToVisit, famousPlaces, literatureAndCulture, famousFood } = req.body;
    
    const resolvedId = resolveUnionId(req.params.id);
    const union = await Union.findByIdAndUpdate(
      resolvedId,
      {
        chairman,
        placesToVisit,
        famousPlaces,
        literatureAndCulture,
        famousFood,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );

    if (!union) {
      return res.status(404).json({ error: 'ইউনিয়ন পাওয়া যায়নি' });
    }

    res.json({ message: 'ইউনিয়ন তথ্য সফলভাবে আপডেট হয়েছে', union });
  } catch (error) {
    console.error('addPlaceToVisit error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Add chairman
exports.addChairman = async (req, res) => {
  try {
    const { name, contactNumber, images } = req.body;
    const resolvedId = resolveUnionId(req.params.id);
    const union = await Union.findByIdAndUpdate(
      resolvedId,
      { chairman: { name, contactNumber, images } },
      { new: true }
    );

    if (!union) {
      return res.status(404).json({ error: 'ইউনিয়ন পাওয়া যায়নি' });
    }

    res.json({ message: 'চেয়ারম্যান তথ্য যোগ হয়েছে', union });
  } catch (error) {
    console.error('addFamousPlace error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Add places to visit
exports.addPlaceToVisit = async (req, res) => {
  try {
    const { name, bengaliName, description, images } = req.body;
    const resolvedId = resolveUnionId(req.params.id);
    const union = await Union.findByIdAndUpdate(
      resolvedId,
      {
        $push: {
          placesToVisit: { name, bengaliName, description, images }
        }
      },
      { new: true }
    );

    if (!union) {
      return res.status(404).json({ error: 'ইউনিয়ন পাওয়া যায়নি' });
    }

    res.json({ message: 'ভ্রমণ স্থান যোগ হয়েছে', union });
  } catch (error) {
    console.error('addCultureItem error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Add famous place
exports.addFamousPlace = async (req, res) => {
  try {
    const { name, bengaliName, description, images, historicalSignificance } = req.body;
    const resolvedId = resolveUnionId(req.params.id);
    const union = await Union.findByIdAndUpdate(
      resolvedId,
      {
        $push: {
          famousPlaces: { name, bengaliName, description, images: images || [], historicalSignificance }
        }
      },
      { new: true }
    );

    if (!union) {
      return res.status(404).json({ error: 'ইউনিয়ন পাওয়া যায়নি' });
    }

    res.json({ message: 'বিখ্যাত স্থান যোগ হয়েছে', union });
  } catch (error) {
    console.error('addFamousPlace error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Add culture/literature
exports.addCultureItem = async (req, res) => {
  try {
    // Normalize - use find+push+save to avoid Mongoose $push cast issues with large base64 arrays
    const name = String(req.body.name || '').trim();
    const bengaliName = String(req.body.bengaliName || name).trim();
    const type = String(req.body.type || '').trim();
    const description = String(req.body.description || '').trim();

    let images = [];
    if (Array.isArray(req.body.images)) {
      images = req.body.images
        .filter(img => img != null && typeof img === 'string')
        .slice(0, 10); // limit to 10 images to avoid 16MB document limit
    }

    if (!name) {
      return res.status(400).json({ error: 'নাম প্রয়োজন' });
    }

    const resolvedId = resolveUnionId(req.params.id);
    const union = await Union.findById(resolvedId);

    if (!union) {
      return res.status(404).json({ error: 'ইউনিয়ন পাওয়া যায়নি' });
    }

    // Push via schema - Mongoose handles casting correctly
    union.literatureAndCulture.push({ name, bengaliName, type, description, images });
    await union.save();

    res.json({ message: 'সংস্কৃতি তথ্য যোগ হয়েছে', union });
  } catch (error) {
    console.error('addCultureItem error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Add famous food
exports.addFamousFood = async (req, res) => {
  try {
    const { name, bengaliName, description, mainIngredients, images } = req.body;
    const resolvedId = resolveUnionId(req.params.id);
    const union = await Union.findByIdAndUpdate(
      resolvedId,
      {
        $push: {
          famousFood: { name, bengaliName, description, mainIngredients, images }
        }
      },
      { new: true }
    );

    if (!union) {
      return res.status(404).json({ error: 'ইউনিয়ন পাওয়া যায়নি' });
    }

    res.json({ message: 'খাবার তথ্য যোগ হয়েছে', union });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update union (general - admin only)
exports.updateUnion = async (req, res) => {
  try {
    const resolvedId = resolveUnionId(req.params.id);
    const union = await Union.findByIdAndUpdate(resolvedId, req.body, { new: true });
    if (!union) {
      return res.status(404).json({ error: 'ইউনিয়ন পাওয়া যায়নি' });
    }
    res.json(union);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update introduction/overview
exports.updateIntroduction = async (req, res) => {
  try {
    const introduction = typeof req.body.introduction === 'string' ? req.body.introduction : String(req.body.introduction || '');
    let introductionImages = [];
    if (Array.isArray(req.body.introductionImages)) {
      introductionImages = req.body.introductionImages.filter(img => img != null && typeof img === 'string').slice(0, 30);
    }
    let introductionFields = [];
    if (Array.isArray(req.body.introductionFields)) {
      introductionFields = req.body.introductionFields
        .filter(f => f && (f.key != null || f.value != null))
        .map(f => ({ key: String(f.key || ''), value: String(f.value || '') }));
    }

    const resolvedId = resolveUnionId(req.params.id);
    const union = await Union.findByIdAndUpdate(
      resolvedId,
      { introduction, introductionImages, introductionFields },
      { new: true }
    );

    if (!union) {
      return res.status(404).json({ error: 'ইউনিয়ন পাওয়া যায়নি' });
    }

    res.json({ message: 'সংক্ষিপ্ত পরিচয় আপডেট হয়েছে', union });
  } catch (error) {
    console.error('updateIntroduction error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Update place to visit
exports.updatePlaceToVisit = async (req, res) => {
  try {
    const { placeId } = req.params;
    const { name, bengaliName, description, images } = req.body;
    const resolvedId = resolveUnionId(req.params.id);
    
    const union = await Union.findById(resolvedId);
    if (!union) {
      return res.status(404).json({ error: 'ইউনিয়ন পাওয়া যায়নি' });
    }

    const place = union.placesToVisit.id(placeId);
    if (!place) {
      return res.status(404).json({ error: 'স্থান পাওয়া যায়নি' });
    }

    place.name = name || place.name;
    place.bengaliName = bengaliName || place.bengaliName;
    place.description = description || place.description;
    if (images) place.images = images;

    await union.save();
    res.json({ message: 'স্থান আপডেট হয়েছে', union });
  } catch (error) {
    console.error('updatePlaceToVisit error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Delete place to visit
exports.deletePlaceToVisit = async (req, res) => {
  try {
    const { placeId } = req.params;
    const resolvedId = resolveUnionId(req.params.id);
    
    const union = await Union.findByIdAndUpdate(
      resolvedId,
      { $pull: { placesToVisit: { _id: placeId } } },
      { new: true }
    );

    if (!union) {
      return res.status(404).json({ error: 'ইউনিয়ন পাওয়া যায়নি' });
    }

    res.json({ message: 'স্থান মুছে ফেলা হয়েছে', union });
  } catch (error) {
    console.error('deletePlaceToVisit error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Update culture item
exports.updateCultureItem = async (req, res) => {
  try {
    const { cultureId } = req.params;
    const { name, bengaliName, type, description, images } = req.body;
    const resolvedId = resolveUnionId(req.params.id);
    
    const union = await Union.findById(resolvedId);
    if (!union) {
      return res.status(404).json({ error: 'ইউনিয়ন পাওয়া যায়নি' });
    }

    const culture = union.literatureAndCulture.id(cultureId);
    if (!culture) {
      return res.status(404).json({ error: 'সংস্কৃতি তথ্য পাওয়া যায়নি' });
    }

    culture.name = name || culture.name;
    culture.bengaliName = bengaliName || culture.bengaliName;
    culture.type = type || culture.type;
    culture.description = description || culture.description;
    if (images) culture.images = images;

    await union.save();
    res.json({ message: 'সংস্কৃতি তথ্য আপডেট হয়েছে', union });
  } catch (error) {
    console.error('updateCultureItem error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Delete culture item
exports.deleteCultureItem = async (req, res) => {
  try {
    const { cultureId } = req.params;
    const resolvedId = resolveUnionId(req.params.id);
    
    const union = await Union.findByIdAndUpdate(
      resolvedId,
      { $pull: { literatureAndCulture: { _id: cultureId } } },
      { new: true }
    );

    if (!union) {
      return res.status(404).json({ error: 'ইউনিয়ন পাওয়া যায়নি' });
    }

    res.json({ message: 'সংস্কৃতি তথ্য মুছে ফেলা হয়েছে', union });
  } catch (error) {
    console.error('deleteCultureItem error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Update food item
exports.updateFoodItem = async (req, res) => {
  try {
    const { foodId } = req.params;
    const { name, bengaliName, description, mainIngredients, images } = req.body;
    const resolvedId = resolveUnionId(req.params.id);
    
    const union = await Union.findById(resolvedId);
    if (!union) {
      return res.status(404).json({ error: 'ইউনিয়ন পাওয়া যায়নি' });
    }

    const food = union.famousFood.id(foodId);
    if (!food) {
      return res.status(404).json({ error: 'খাবার তথ্য পাওয়া যায়নি' });
    }

    food.name = name || food.name;
    food.bengaliName = bengaliName || food.bengaliName;
    food.description = description || food.description;
    if (mainIngredients) food.mainIngredients = mainIngredients;
    if (images) food.images = images;

    await union.save();
    res.json({ message: 'খাবার তথ্য আপডেট হয়েছে', union });
  } catch (error) {
    console.error('updateFoodItem error:', error);
    res.status(500).json({ error: error.message });
  }
};

// Delete food item
exports.deleteFoodItem = async (req, res) => {
  try {
    const { foodId } = req.params;
    const resolvedId = resolveUnionId(req.params.id);
    
    const union = await Union.findByIdAndUpdate(
      resolvedId,
      { $pull: { famousFood: { _id: foodId } } },
      { new: true }
    );

    if (!union) {
      return res.status(404).json({ error: 'ইউনিয়ন পাওয়া যায়নি' });
    }

    res.json({ message: 'খাবার তথ্য মুছে ফেলা হয়েছে', union });
  } catch (error) {
    console.error('deleteFoodItem error:', error);
    res.status(500).json({ error: error.message });
  }
};
