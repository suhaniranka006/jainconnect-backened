// import express from 'express';
// import Tithi from '../models/Tithi.js';

// const router = express.Router();

// router.get('/', async (req, res) => {
//   const data = await Tithi.find();
//   res.json(data);
// });

// export default router;


import mongoose from 'mongoose';

const tithiSchema = new mongoose.Schema({
  // Define your schema fields here, e.g.:
  tithi: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String },
}, { collection: 'Tithis' });  // THIS makes Mongoose use the correct collection name

const Tithi = mongoose.model('Tithi', tithiSchema);

export default Tithi;
