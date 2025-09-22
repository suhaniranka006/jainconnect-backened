// // import express from 'express';
// // import mongoose from 'mongoose';
// // import dotenv from 'dotenv';
// // import cors from 'cors';

// // import tithiRoutes from './routes/tithiRoutes.js';
// // import eventRoutes from './routes/eventRoutes.js';
// // import maharajRoutes from './routes/maharajRoutes.js';

// // dotenv.config();

// // const app = express();
// // app.use(cors());
// // app.use(express.json());

// // app.use('/api/tithis', tithiRoutes);
// // app.use('/api/events', eventRoutes);
// // app.use('/api/maharajs', maharajRoutes);

// // const PORT = process.env.PORT || 5000;

// // mongoose.connect(process.env.MONGO_URI)
// //   .then(() => {
// //     console.log('✅ MongoDB Connected');
// //     app.listen(PORT, () => {
// //       console.log(`🚀 Server running on port ${PORT}`);
// //     });
// //   })
// //   .catch((err) => console.log(err));


// // import express from 'express';
// // import mongoose from 'mongoose';
// // import dotenv from 'dotenv';
// // import cors from 'cors';

// // import tithiRoutes from './routes/tithiRoutes.js';
// // import eventRoutes from './routes/eventRoutes.js';
// // import maharajRoutes from './routes/maharajRoutes.js';

// // dotenv.config();

// // const app = express();
// // app.use(cors());
// // app.use(express.json());

// // app.use('/api/tithis', tithiRoutes);
// // app.use('/api/events', eventRoutes);
// // app.use('/api/maharajs', maharajRoutes);

// // // ✅ Root route added here
// // app.get('/', (req, res) => {
// //   res.send('✅ JainConnect API is live');
// // });

// // const PORT = process.env.PORT || 5000;

// // mongoose.connect(process.env.MONGO_URI)
// //   .then(() => {
// //     console.log('✅ MongoDB Connected');
// //     app.listen(PORT, () => {
// //       console.log(`🚀 Server running on port ${PORT}`);
// //     });
// //   })
// //   .catch((err) => console.log(err));




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

// Routes
app.use('/api/users', UserRoutes);
app.use('/api/tithis', tithiRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/maharajs', maharajRoutes);

app.get('/', (req, res) => res.send('✅ JainConnect API is live'));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => console.log(`✅ Server running on port ${PORT}`));









// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import cors from 'cors';

// import UserRoutes from './routes/UserRoutes.js';
// import parser from './middlewares/cloudinary.js';

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/users', UserRoutes);

//  app.get('/', (req, res) => res.send('✅ JainConnect API is live'));

// // ✅ Cloudinary test route (no DB involved)
// // app.post('/upload-test', parser.single('profileImage'), (req, res) => {
// //   if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
// //   res.json({ message: 'Uploaded successfully!', url: req.file.path });
// // });

// const PORT = process.env.PORT || 10000;

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('✅ MongoDB connected'))
//   .catch(err => console.error('❌ MongoDB connection error:', err));

// app.listen(PORT, '0.0.0.0', () => console.log(`✅ Server running on port ${PORT}`));
