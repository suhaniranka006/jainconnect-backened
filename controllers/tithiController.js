// controllers/tithiController.js
import Tithi from '../models/Tithi.js';

// Get all tithis
export const getAllTithis = async (req, res) => {
  try {
    const tithis = await Tithi.find();
    res.json(tithis);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get tithi by ID
export const getTithiById = async (req, res) => {
  try {
    const tithi = await Tithi.findById(req.params.id);
    if (!tithi) return res.status(404).json({ message: 'Tithi not found' });
    res.json(tithi);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new tithi
export const createTithi = async (req, res) => {
  try {
    const newTithi = new Tithi(req.body);
    const savedTithi = await newTithi.save();
    res.status(201).json(savedTithi);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update tithi
export const updateTithi = async (req, res) => {
  try {
    const tithi = await Tithi.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!tithi) return res.status(404).json({ message: 'Tithi not found' });
    
    res.json(tithi);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete tithi
export const deleteTithi = async (req, res) => {
  try {
    const tithi = await Tithi.findByIdAndDelete(req.params.id);
    
    if (!tithi) return res.status(404).json({ message: 'Tithi not found' });
    
    res.json({ message: 'Tithi deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};