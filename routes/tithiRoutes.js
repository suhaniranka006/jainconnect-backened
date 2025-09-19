// import express from 'express';
// import Tithi from '../models/Tithi.js';

// const router = express.Router();

// router.get('/', async (req, res) => {
//   const data = await Tithi.find();
//   res.json(data);
// });

// export default router;


import express from 'express';
import Tithi from '../models/Tithi.js';

const router = express.Router();

// Get all Tithis
router.get('/', async (req, res) => {
  try {
    const tithis = await Tithi.find();
    res.json(tithis);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new Tithi
router.post('/', async (req, res) => {
  try {
    const tithi = new Tithi(req.body);
    const savedTithi = await tithi.save();
    res.status(201).json(savedTithi);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update Tithi by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedTithi = await Tithi.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTithi) return res.status(404).json({ message: 'Tithi not found' });
    res.json(updatedTithi);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete Tithi by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedTithi = await Tithi.findByIdAndDelete(req.params.id);
    if (!deletedTithi) return res.status(404).json({ message: 'Tithi not found' });
    res.json({ message: 'Tithi deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
