// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the schema and specify the exact collection name
const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long']
    },
    email: { 
      type: String, 
      required: [true, 'Email is required'], 
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false // Don't include password in queries by default
    },
    phone: { 
      type: String,
      trim: true
    },
    location: { 
      type: String,
      trim: true
    },
    dob: { type: Date },
    gender: { 
      type: String,
      enum: ['Male', 'Female', 'Other'],
      trim: true
    },
    profileImage: { type: String }, // URL of uploaded photo
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date }
  },
  { collection: 'Users', timestamps: true } // exact collection name, auto adds createdAt & updatedAt
);

// Hash password before saving
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  
  try {
    // Hash password with cost of 12
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to check password
userSchema.methods.comparePassword = async function(candidatePassword) {
  // Check if both password and candidatePassword exist
  if (!candidatePassword || !this.password) {
    return false;
  }
  
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    console.error('Password comparison error:', error);
    return false;
  }
};

// Create and export the model
const User = mongoose.model('User', userSchema);
export default User;
