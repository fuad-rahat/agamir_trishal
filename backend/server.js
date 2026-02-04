require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

/* =======================
   CORS CONFIG
======================= */

const allowedOrigins = [
  'https://agamir-trishal-web.vercel.app',
  'http://localhost:3000',
];

if (process.env.FRONTEND_URL) {
  process.env.FRONTEND_URL
    .split(',')
    .map(o => o.trim().replace(/\/+$/, ''))
    .filter(Boolean)
    .forEach(o => {
      if (!allowedOrigins.includes(o)) allowedOrigins.push(o);
    });
}

const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  if (allowedOrigins.includes(origin)) return true;

  const vercelPreview = /^https:\/\/agamir-trishal-web(-[\w-]+)?\.vercel\.app$/;
  return vercelPreview.test(origin);
};

app.use(
  cors({
    origin: (origin, cb) => {
      if (isAllowedOrigin(origin)) cb(null, true);
      else cb(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

/* =======================
   MONGODB CONNECTION
   (VERCEL SAFE)
======================= */

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI not set');
    }

    cached.promise = mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 30000,
      connectTimeoutMS: 15000,
      maxPoolSize: 10,
      bufferCommands: false,
    }).then(mongoose => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

/* =======================
   AUTO CONNECT PER REQUEST
======================= */

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

/* =======================
   ROUTES
======================= */

app.use('/api/unions', require('./routes/unionRoutes'));
app.use('/api/problems', require('./routes/problemRoutes'));
app.use('/api/polling-stations', require('./routes/pollingStationRoutes'));
app.use('/api/infrastructure', require('./routes/infrastructureRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/helpline', require('./routes/helplineRoutes'));

/* =======================
   HEALTH CHECK
======================= */

app.get('/api/health', (req, res) => {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  res.json({
    status: 'OK',
    database: {
      state: states[mongoose.connection.readyState],
      readyState: mongoose.connection.readyState,
      mongoUriSet: !!process.env.MONGODB_URI,
    },
    cors: allowedOrigins,
    environment: {
      nodeEnv: process.env.NODE_ENV || 'development',
      vercel: process.env.VERCEL || 'false',
    },
  });
});

/* =======================
   ERROR HANDLER
======================= */

app.use((err, req, res, next) => {
  console.error(err);

  const origin = req.headers.origin;
  if (origin && isAllowedOrigin(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

/* =======================
   404 HANDLER
======================= */

app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.path,
  });
});

/* =======================
   SERVER START (LOCAL ONLY)
======================= */

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
