require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// CORS – allow frontend and dev
const allowedOrigins = [
  'https://agamir-trishal-web.vercel.app',
  'http://localhost:3000',
];

if (process.env.FRONTEND_URL) {
  process.env.FRONTEND_URL.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
    .forEach((origin) => allowedOrigins.push(origin));
}

const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  if (allowedOrigins.includes(origin)) return true;

  const vercelPreviewPattern = /^https:\/\/agamir-trishal-web(-[\w-]+)?\.vercel\.app$/;
  return vercelPreviewPattern.test(origin);
};

app.use(
  cors({
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) return callback(null, true);
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
