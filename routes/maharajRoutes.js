import express from 'express';
import Event from '../models/Maharaj.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const data = await Event.find();
  res.json(data);
});

export default router;
