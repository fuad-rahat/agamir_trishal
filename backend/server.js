require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// CORS Configuration - allow frontend and dev
const allowedOrigins = [
  'https://agamir-trishal-web.vercel.app',
  'http://localhost:3000',
];

// Add FRONTEND_URL from environment if provided
if (process.env.FRONTEND_URL) {
  process.env.FRONTEND_URL.split(',')
    .map((origin) => origin.trim().replace(/\/+$/, '')) // Remove trailing slashes
    .filter(Boolean)
    .forEach((origin) => {
      if (!allowedOrigins.includes(origin)) {
        allowedOrigins.push(origin);
      }
    });
}

const isAllowedOrigin = (origin) => {
  // Allow requests with no origin (like mobile apps or curl requests)
  if (!origin) return true;
  
  // Check exact match
  if (allowedOrigins.includes(origin)) return true;

  // Allow Vercel preview deployments
  const vercelPreviewPattern = /^https:\/\/agamir-trishal-web(-[\w-]+)?\.vercel\.app$/;
  if (vercelPreviewPattern.test(origin)) return true;

  // Log blocked origins for debugging (only in development)
  if (process.env.NODE_ENV === 'development') {
    console.log('CORS: Blocked origin:', origin);
    console.log('CORS: Allowed origins:', allowedOrigins);
  }
  return false;
};

// CORS middleware - must be before routes
app.use(
  cors({
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// Database Connection with proper timeout settings
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // 30 seconds
  socketTimeoutMS: 45000, // 45 seconds
  connectTimeoutMS: 30000, // 30 seconds
  maxPoolSize: 10, // Maintain up to 10 socket connections
  minPoolSize: 2, // Maintain at least 2 socket connections
  maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
  bufferMaxEntries: 0, // Disable mongoose buffering
  bufferCommands: false, // Disable mongoose buffering
};

// MongoDB Connection - don't exit process on failure (for serverless)
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://trishal_user:trishal123@cluster0.mongodb.net/trishal-civic?retryWrites=true&w=majority', mongooseOptions);
    console.log('MongoDB Connected Successfully');
    
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
    });
    
    return true;
  } catch (err) {
    console.error('MongoDB Connection Error:', err);
    // Don't exit process in serverless - let it retry on next request
    return false;
  }
};

// Connect to database (non-blocking for serverless)
connectDB();

// Routes
app.use('/api/unions', require('./routes/unionRoutes'));
app.use('/api/problems', require('./routes/problemRoutes'));
app.use('/api/polling-stations', require('./routes/pollingStationRoutes'));
app.use('/api/infrastructure', require('./routes/infrastructureRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/helpline', require('./routes/helplineRoutes'));

// Health Check - must handle errors gracefully
app.get('/api/health', (req, res) => {
  try {
    const mongoose = require('mongoose');
    const dbStatus = mongoose.connection?.readyState || 0;
    const dbStates = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    
    res.json({ 
      status: 'Server is running',
      database: {
        status: dbStates[dbStatus] || 'unknown',
        readyState: dbStatus
      },
      cors: {
        allowedOrigins: allowedOrigins,
        frontendUrl: process.env.FRONTEND_URL
      },
      environment: {
        nodeEnv: process.env.NODE_ENV || 'development',
        vercel: process.env.VERCEL || 'false'
      }
    });
  } catch (error) {
    console.error('Health check error:', error);
    res.status(500).json({ 
      status: 'Server error',
      error: error.message 
    });
  }
});

// Error handling middleware - MUST be after routes
// This ensures CORS headers are sent even on errors
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // Set CORS headers even on error
  const origin = req.headers.origin;
  if (origin && isAllowedOrigin(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  } else if (!origin) {
    // Allow requests with no origin
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Send error response
  const statusCode = err.status || err.statusCode || 500;
  res.status(statusCode).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler - must be last
app.use((req, res) => {
  // Set CORS headers for 404
  const origin = req.headers.origin;
  if (origin && isAllowedOrigin(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  } else if (!origin) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  res.status(404).json({ error: 'Route not found', path: req.path });
});

// Export app for Vercel serverless functions
module.exports = app;

// Only start server if not in serverless environment
if (process.env.VERCEL !== '1' && !process.env.AWS_LAMBDA_FUNCTION_NAME) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('CORS Allowed Origins:', allowedOrigins);
    console.log('FRONTEND_URL from env:', process.env.FRONTEND_URL);
    console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
  });
} else {
  console.log('Running in serverless mode');
  console.log('CORS Allowed Origins:', allowedOrigins);
  console.log('FRONTEND_URL from env:', process.env.FRONTEND_URL);
  console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
}
