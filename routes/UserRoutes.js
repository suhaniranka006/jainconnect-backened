// routes/UserRoutes.js
import express from 'express';
import User from '../models/User.js';
import parser from '../middlewares/cloudinary.js';


const router = express.Router();

// ✅ Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find(); // fetch all users
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Create new user
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Update user (Edit Profile)
router.put('/:id', async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Delete user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// Create user with image
router.post('/upload', parser.single('profileImage'), async (req, res) => {
  try {
    const { name, email, phone, location, dob, gender } = req.body;
    const profileImage = req.file ? req.file.path : undefined;

    const newUser = new User({
      name,
      email,
      phone,
      location,
      dob: dob ? new Date(dob) : undefined,
      gender,
      profileImage
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Update user with image
router.put('/upload/:id', parser.single('profileImage'), async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.dob) updates.dob = new Date(updates.dob);
    if (req.file) updates.profileImage = req.file.path;

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});


export default router;
