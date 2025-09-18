// maharajRoutes.js
import express from 'express';
import Maharaj from '../models/Maharaj.js'; // Use .js for ES modules

const router = express.Router();

// GET all Maharajs
router.get('/', async (req, res) => {
  try {
    const data = await Maharaj.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single Maharaj by ID
router.get('/:id', async (req, res) => {
  try {
    const maharaj = await Maharaj.findById(req.params.id);
    if (!maharaj) return res.status(404).json({ message: 'Maharaj not found' });
    res.json(maharaj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE new Maharaj
router.post('/', async (req, res) => {
  try {
    const newMaharaj = new Maharaj(req.body);
    const savedMaharaj = await newMaharaj.save();
    res.status(201).json(savedMaharaj);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE Maharaj by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedMaharaj = await Maharaj.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMaharaj) return res.status(404).json({ message: 'Maharaj not found' });
    res.json(updatedMaharaj);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE Maharaj by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedMaharaj = await Maharaj.findByIdAndDelete(req.params.id);
    if (!deletedMaharaj) return res.status(404).json({ message: 'Maharaj not found' });
    res.json({ message: 'Maharaj deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
