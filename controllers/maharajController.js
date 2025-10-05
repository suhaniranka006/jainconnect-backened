// controllers/maharajController.js
import Maharaj from '../models/Maharaj.js';
import { cloudinaryUpload } from '../utils/cloudinaryHelper.js';

// Get all maharajs
export const getAllMaharajs = async (req, res) => {
  try {
    const maharajs = await Maharaj.find();
    res.json(maharajs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get maharaj by ID
export const getMaharajById = async (req, res) => {
  try {
    const maharaj = await Maharaj.findById(req.params.id);
    if (!maharaj) return res.status(404).json({ message: 'Maharaj not found' });
    res.json(maharaj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new maharaj
export const createMaharaj = async (req, res) => {
  try {
    const newMaharaj = new Maharaj(req.body);
    const savedMaharaj = await newMaharaj.save();
    res.status(201).json(savedMaharaj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create maharaj with image
export const createMaharajWithImage = async (req, res) => {
  try {
    let maharajData = { ...req.body };
    
    // Handle image upload if present
    if (req.file) {
      const imageUrl = await cloudinaryUpload(req.file);
      maharajData.image = imageUrl;
    }
    
    const newMaharaj = new Maharaj(maharajData);
    const savedMaharaj = await newMaharaj.save();
    
    res.status(201).json(savedMaharaj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update maharaj
export const updateMaharaj = async (req, res) => {
  try {
    const maharaj = await Maharaj.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!maharaj) return res.status(404).json({ message: 'Maharaj not found' });
    
    res.json(maharaj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update maharaj with image
export const updateMaharajWithImage = async (req, res) => {
  try {
    let maharajData = { ...req.body };
    
    // Handle image upload if present
    if (req.file) {
      const imageUrl = await cloudinaryUpload(req.file);
      maharajData.image = imageUrl;
    }
    
    const maharaj = await Maharaj.findByIdAndUpdate(
      req.params.id,
      maharajData,
      { new: true, runValidators: true }
    );
    
    if (!maharaj) return res.status(404).json({ message: 'Maharaj not found' });
    
    res.json(maharaj);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete maharaj
export const deleteMaharaj = async (req, res) => {
  try {
    const maharaj = await Maharaj.findByIdAndDelete(req.params.id);
    
    if (!maharaj) return res.status(404).json({ message: 'Maharaj not found' });
    
    res.json({ message: 'Maharaj deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};