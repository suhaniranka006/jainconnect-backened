// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import UserRoutes from './routes/UserRoutes.js';
import tithiRoutes from './routes/tithiRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import maharajRoutes from './routes/maharajRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files for uploaded images
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/users', UserRoutes);
app.use('/api/tithis', tithiRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/maharajs', maharajRoutes);

// Root route
app.get('/', (req, res) => res.send('✅ JainConnect API is live'));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`✅ Server running on port ${PORT}`));