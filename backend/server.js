require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// CORS – allow frontend and dev
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser / server-to-server or when no origin
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      // Fallback: allow any origin if FRONTEND_URL not set
      if (!process.env.FRONTEND_URL) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://trishal_user:trishal123@cluster0.mongodb.net/trishal-civic?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/unions', require('./routes/unionRoutes'));
app.use('/api/problems', require('./routes/problemRoutes'));
app.use('/api/polling-stations', require('./routes/pollingStationRoutes'));
app.use('/api/infrastructure', require('./routes/infrastructureRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/helpline', require('./routes/helplineRoutes'));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
