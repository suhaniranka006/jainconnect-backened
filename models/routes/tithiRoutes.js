import express from 'express';
import Tithi from '../models/Tithi';

const router = express.Router();

router.get('/', async (req, res) => {
  const data = await Tithi.find();
  res.json(data);
});

export default router;
