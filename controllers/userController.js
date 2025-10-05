// controllers/userController.js
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cloudinaryUpload } from '../utils/cloudinaryHelper.js';

// Register a new user
export const register = async (req, res) => {
  try {
    const { name, email, password, phone, location, dob, gender } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      location,
      dob: dob ? new Date(dob) : undefined,
      gender
    });

    const savedUser = await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: savedUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        profileImage: savedUser.profileImage
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Forgot password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate reset token
    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // In a real application, you would send an email with a reset link
    // For now, we'll just return the token
    res.json({
      message: 'Password reset link sent to your email',
      resetToken
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Reset password
export const resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    // Verify token
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    
    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user password
    const user = await User.findByIdAndUpdate(
      decoded.userId,
      { password: hashedPassword },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    res.status(500).json({ message: err.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const updates = { ...req.body };
    
    // Don't allow password updates through this route
    delete updates.password;
    
    if (updates.dob) updates.dob = new Date(updates.dob);

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    res.json({
      message: 'User updated successfully',
      user
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user with profile image
export const updateUserWithImage = async (req, res) => {
  try {
    console.log("===== Update User API Hit =====");
    console.log("Params ID:", req.params.id);
    console.log("Body:", req.body);
    console.log("File:", req.file);

    // Handle file upload if present
    let profileImageUrl;
    if (req.file) {
      try {
        profileImageUrl = await cloudinaryUpload(req.file);
        console.log("✅ Uploaded to Cloudinary:", profileImageUrl);
      } catch (uploadErr) {
        console.error("❌ Cloudinary Upload Failed:", uploadErr);
        return res.status(500).json({ message: "Image upload failed", error: uploadErr.message });
      }
    }

    const updates = { ...req.body };

    // Prevent sensitive fields update
    delete updates.password;

    if (updates.dob) updates.dob = new Date(updates.dob);
    if (profileImageUrl) updates.profileImage = profileImageUrl;

    // Update user
    const user = await User.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      console.log("❌ User not found with ID:", req.params.id);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log("✅ User updated successfully:", user);
    return res.json({
      message: 'User updated successfully',
      user
    });

  } catch (err) {
    console.error("🔥 ERROR in updateUserWithImage:", err);
    return res.status(500).json({ message: err.message || "Internal Server Error" });
  }
};


// Delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};