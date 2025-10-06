// routes/UserRoutes.js
import express from 'express';
import User from '../models/User.js';
import parser from '../middlewares/cloudinary.js';
import { generateToken, authenticateToken, optionalAuth } from '../middlewares/auth.js';

const router = express.Router();

// ✅ REGISTER new user (with password and profile image)
router.post('/register', parser.single('profileImage'), async (req, res) => {
  try {
    console.log('Register User req.body:', req.body);
    console.log('Register User req.file:', req.file);

    const { name, email, password, phone, location, dob, gender } = req.body;
    
    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Name, email, and password are required' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        success: false,
        message: 'Password must be at least 6 characters long' 
      });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'User with this email already exists' 
      });
    }

    // Handle profile image upload
    let profileImage = null;
    if (req.file) {
      if (req.file.path && req.file.path.includes('cloudinary')) {
        // Cloudinary upload successful
        profileImage = req.file.path || req.file.secure_url || req.file.url;
        console.log('✅ Profile image uploaded to Cloudinary:', profileImage);
      } else if (req.file.filename) {
        // Local storage upload successful - create short URL
        const protocol = req.protocol;
        const host = req.get('host');
        profileImage = `${protocol}://${host}/uploads/profile-images/${req.file.filename}`;
        console.log('✅ Profile image stored locally with short URL:', profileImage);
      }
    }

    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password,
      phone,
      location,
      dob: dob ? new Date(dob) : undefined,
      gender,
      profileImage,
    });

    const savedUser = await newUser.save();
    
    // Generate JWT token
    const token = generateToken(savedUser._id);
    
    // Remove password from response
    const userResponse = savedUser.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: userResponse,
      profileImageUrl: profileImage // Send back the actual Cloudinary URL
    });
  } catch (err) {
    console.error('ERROR REGISTERING USER:', err);
    
    // Handle different types of errors
    let errorMessage = 'Failed to register user';
    let statusCode = 500;
    
    if (err.message) {
      errorMessage = err.message;
    }
    
    if (err.code === 11000) {
      errorMessage = 'User with this email already exists';
      statusCode = 400;
    }
    
    if (err.http_code === 401) {
      errorMessage = 'Cloudinary authentication failed. Image upload skipped.';
      statusCode = 400;
    }
    
    res.status(statusCode).json({
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? err : undefined
    });
  }
});

// ✅ LOGIN user (with email and password)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'Email and password are required' 
      });
    }

    // Find user with password field included
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid email or password' 
      });
    }

    // Debug logging (remove in production)
    console.log('Login attempt for:', email);

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid email or password' 
      });
    }

    // Generate JWT token
    const token = generateToken(user._id);
    
    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: userResponse
    });
  } catch (err) {
    console.error('ERROR LOGGING IN:', err);
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
});

// ✅ GET current user profile (protected route)
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user
    });
  } catch (err) {
    console.error('ERROR GETTING PROFILE:', err);
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
});

// ✅ UPDATE current user profile (protected route)
router.put('/profile', authenticateToken, parser.single('profileImage'), async (req, res) => {
  try {
    console.log("===== Update Profile API Hit =====");
    console.log("Request Body:", req.body);
    console.log("Request File:", req.file);
    console.log("Authenticated User:", req.user._id);

    const updates = { ...req.body };
    
    // Remove sensitive fields that shouldn't be updated this way
    delete updates.email;
    delete updates.password;

    if (updates.dob) {
      updates.dob = new Date(updates.dob);
    }

    // Handle profile image upload
    let newProfileImageUrl = null;
    if (req.file) {
      if (req.file.path && req.file.path.includes('cloudinary')) {
        // Cloudinary upload successful
        newProfileImageUrl = req.file.path || req.file.secure_url || req.file.url;
        updates.profileImage = newProfileImageUrl;
        console.log("✅ Profile image uploaded to Cloudinary:", newProfileImageUrl);
      } else if (req.file.filename) {
        // Local storage upload successful - create short URL
        const protocol = req.protocol;
        const host = req.get('host');
        newProfileImageUrl = `${protocol}://${host}/uploads/profile-images/${req.file.filename}`;
        updates.profileImage = newProfileImageUrl;
        console.log("✅ Profile image stored locally with short URL:", newProfileImageUrl);
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    console.log("✅ User updated successfully:", updatedUser);
    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser,
      profileImageUrl: newProfileImageUrl || updatedUser.profileImage // Send back the image URL
    });

  } catch (err) {
    console.error("🔥 ERROR UPDATING PROFILE:", err);
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
});

// ✅ UPLOAD/UPDATE profile photo only (protected route)
router.post('/upload-photo', authenticateToken, parser.single('profileImage'), async (req, res) => {
  try {
    console.log("===== Upload Profile Photo API Hit =====");
    console.log("Request File:", req.file);
    console.log("Authenticated User:", req.user._id);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
    }

    // Handle profile image upload
    let profileImageUrl;
    if (req.file.path && req.file.path.includes('cloudinary')) {
      // Cloudinary upload successful
      profileImageUrl = req.file.path || req.file.secure_url || req.file.url;
      console.log("✅ Profile image uploaded to Cloudinary:", profileImageUrl);
    } else if (req.file.filename) {
      // Local storage upload successful - create short URL
      const protocol = req.protocol;
      const host = req.get('host');
      profileImageUrl = `${protocol}://${host}/uploads/profile-images/${req.file.filename}`;
      console.log("✅ Profile image stored locally with short URL:", profileImageUrl);
    } else {
      throw new Error('Failed to process uploaded image');
    }

    // Update user's profile image
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { profileImage: profileImageUrl } },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Profile photo uploaded successfully',
      profileImageUrl: profileImageUrl,
      user: updatedUser
    });

  } catch (err) {
    console.error("🔥 ERROR UPLOADING PROFILE PHOTO:", err);
    
    // Handle different types of errors
    let errorMessage = 'Failed to upload profile photo';
    
    if (err.message) {
      errorMessage = err.message;
    }
    
    if (err.http_code === 401) {
      errorMessage = 'Cloudinary authentication failed. Please check API credentials.';
    }
    
    if (err.error && err.error.message) {
      errorMessage = err.error.message;
    }
    
    res.status(500).json({ 
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? err : undefined
    });
  }
});

// ✅ CHANGE PASSWORD (protected route)
router.put('/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ 
        success: false,
        message: 'Current password and new password are required' 
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ 
        success: false,
        message: 'New password must be at least 6 characters long' 
      });
    }

    // Get user with password
    const user = await User.findById(req.user._id).select('+password');
    
    // Check current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    
    if (!isCurrentPasswordValid) {
      return res.status(401).json({ 
        success: false,
        message: 'Current password is incorrect' 
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Password changed successfully'
    });

  } catch (err) {
    console.error('ERROR CHANGING PASSWORD:', err);
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
});

// ✅ GET all users (protected route - admin only for now)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({
      success: true,
      count: users.length,
      users
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
});

// ✅ GET user by ID (protected route)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }
    res.json({
      success: true,
      user
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
});

// ✅ GET user by email (protected route)
router.get('/email/:email', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    res.json({
      success: true,
      user
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
});

// ✅ DELETE current user account (protected route)
router.delete('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    res.json({ 
      success: true,
      message: 'Account deleted successfully', 
      user: user 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
});

// ✅ DELETE user by ID (protected route - admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }
    res.json({ 
      success: true,
      message: 'User deleted successfully', 
      user: user 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
});

// ✅ REFRESH TOKEN (protected route)
router.post('/refresh-token', authenticateToken, async (req, res) => {
  try {
    // Generate new token
    const newToken = generateToken(req.user._id);
    
    res.json({
      success: true,
      message: 'Token refreshed successfully',
      token: newToken
    });
  } catch (err) {
    console.error('ERROR REFRESHERING TOKEN:', err);
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
});

// ✅ FIX OLD USER - Add password to existing user (temporary fix)
router.post('/fix-user', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find user without password requirement
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update user with password
    user.password = password;
    await user.save(); // This will trigger the pre-save hook to hash the password

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'User password updated successfully',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.location,
        profileImage: user.profileImage
      }
    });

  } catch (err) {
    console.error('ERROR FIXING USER:', err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

export default router;