require('dotenv').config();
const mongoose = require('mongoose');
const Union = require('../models/Union');

// 12 Trishal Unions with their details
const TRISHAL_UNIONS_DATA = [
  {
    _id: new mongoose.Types.ObjectId('660000000000000000000001'), // Consistent ID for '1'
    name: 'Dhankhola',
    bengaliName: 'ধানীখোলা',
    description: 'Dhankhola Union',
    populationEstimate: 25000,
    areaSize: '12.5 sq km',
    boundary: {
      type: 'Polygon',
      coordinates: [[[90.3, 24.5], [90.4, 24.5], [90.4, 24.6], [90.3, 24.6], [90.3, 24.5]]]
    }
  },
  {
    _id: new mongoose.Types.ObjectId('660000000000000000000002'),
    name: 'Bailor',
    bengaliName: 'বৈলর',
    description: 'Bailor Union',
    populationEstimate: 23000,
    areaSize: '11.8 sq km',
    boundary: {
      type: 'Polygon',
      coordinates: [[[90.4, 24.5], [90.5, 24.5], [90.5, 24.6], [90.4, 24.6], [90.4, 24.5]]]
    }
  },
  {
    _id: new mongoose.Types.ObjectId('660000000000000000000003'),
    name: 'Kanthal',
    bengaliName: 'কাঁঠাল',
    description: 'Kanthal Union',
    populationEstimate: 24000,
    areaSize: '12.1 sq km',
    boundary: {
      type: 'Polygon',
      coordinates: [[[90.5, 24.5], [90.6, 24.5], [90.6, 24.6], [90.5, 24.6], [90.5, 24.5]]]
    }
  },
  {
    _id: new mongoose.Types.ObjectId('660000000000000000000004'),
    name: 'Kanihary',
    bengaliName: 'কানিহারী',
    description: 'Kanihary Union',
    populationEstimate: 22000,
    areaSize: '11.5 sq km',
    boundary: {
      type: 'Polygon',
      coordinates: [[[90.3, 24.6], [90.4, 24.6], [90.4, 24.7], [90.3, 24.7], [90.3, 24.6]]]
    }
  },
  {
    _id: new mongoose.Types.ObjectId('660000000000000000000005'),
    name: 'Rampur',
    bengaliName: 'রামপুর',
    description: 'Rampur Union',
    populationEstimate: 26000,
    areaSize: '13.0 sq km',
    boundary: {
      type: 'Polygon',
      coordinates: [[[90.4, 24.6], [90.5, 24.6], [90.5, 24.7], [90.4, 24.7], [90.4, 24.6]]]
    }
  },
  {
    _id: new mongoose.Types.ObjectId('660000000000000000000006'),
    name: 'Trishal',
    bengaliName: 'ত্রিশাল',
    description: 'Trishal Union (Sadar)',
    populationEstimate: 28000,
    areaSize: '13.5 sq km',
    boundary: {
      type: 'Polygon',
      coordinates: [[[90.5, 24.6], [90.6, 24.6], [90.6, 24.7], [90.5, 24.7], [90.5, 24.6]]]
    }
  },
  {
    _id: new mongoose.Types.ObjectId('660000000000000000000007'),
    name: 'Harirampur',
    bengaliName: 'হরিরামপুর',
    description: 'Harirampur Union',
    populationEstimate: 21000,
    areaSize: '11.2 sq km',
    boundary: {
      type: 'Polygon',
      coordinates: [[[90.3, 24.7], [90.4, 24.7], [90.4, 24.8], [90.3, 24.8], [90.3, 24.7]]]
    }
  },
  {
    _id: new mongoose.Types.ObjectId('660000000000000000000008'),
    name: 'Sakhua',
    bengaliName: 'সাখুয়া',
    description: 'Sakhua Union',
    populationEstimate: 20000,
    areaSize: '10.8 sq km',
    boundary: {
      type: 'Polygon',
      coordinates: [[[90.4, 24.7], [90.5, 24.7], [90.5, 24.8], [90.4, 24.8], [90.4, 24.7]]]
    }
  },
  {
    _id: new mongoose.Types.ObjectId('660000000000000000000009'),
    name: 'Balipara',
    bengaliName: 'বালিপাড়া',
    description: 'Balipara Union',
    populationEstimate: 23500,
    areaSize: '11.9 sq km',
    boundary: {
      type: 'Polygon',
      coordinates: [[[90.5, 24.7], [90.6, 24.7], [90.6, 24.8], [90.5, 24.8], [90.5, 24.7]]]
    }
  },
  {
    _id: new mongoose.Types.ObjectId('660000000000000000000010'),
    name: 'Mothbari',
    bengaliName: 'মঠবাড়ী',
    description: 'Mothbari Union',
    populationEstimate: 24500,
    areaSize: '12.3 sq km',
    boundary: {
      type: 'Polygon',
      coordinates: [[[90.3, 24.8], [90.4, 24.8], [90.4, 24.9], [90.3, 24.9], [90.3, 24.8]]]
    }
  },
  {
    _id: new mongoose.Types.ObjectId('660000000000000000000011'),
    name: 'Mokspur',
    bengaliName: 'মোক্ষপুর',
    description: 'Mokspur Union',
    populationEstimate: 22500,
    areaSize: '11.7 sq km',
    boundary: {
      type: 'Polygon',
      coordinates: [[[90.4, 24.8], [90.5, 24.8], [90.5, 24.9], [90.4, 24.9], [90.4, 24.8]]]
    }
  },
  {
    _id: new mongoose.Types.ObjectId('660000000000000000000012'),
    name: 'Amirabari',
    bengaliName: 'আমিরাবাড়ী',
    description: 'Amirabari Union',
    populationEstimate: 25500,
    areaSize: '12.7 sq km',
    boundary: {
      type: 'Polygon',
      coordinates: [[[90.5, 24.8], [90.6, 24.8], [90.6, 24.9], [90.5, 24.9], [90.5, 24.8]]]
    }
  },
];

const seedUnions = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://trishal_user:trishal123@cluster0.mongodb.net/trishal-civic?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✓ MongoDB Connected');

    // Clear existing unions
    await Union.deleteMany({});
    console.log('✓ Cleared existing unions');

    // Insert new unions
    const result = await Union.insertMany(TRISHAL_UNIONS_DATA);
    console.log(`✓ Seeded ${result.length} unions successfully`);

    // Display created unions
    console.log('\n📍 Created Unions:');
    result.forEach((union, idx) => {
      console.log(`  ${idx + 1}. ${union.name} (${union.bengaliName}) - ID: ${union._id}`);
    });

    // Close connection
    await mongoose.connection.close();
    console.log('\n✓ Database connection closed');
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedUnions();
