// models/User.js
import mongoose from 'mongoose';

// Define the schema and specify the exact collection name
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    location: { type: String },
    dob: { type: Date },
    gender: { type: String },
    profileImage: { type: String }, // URL of uploaded photo
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date }
  },
  { collection: 'Users', timestamps: true } // exact collection name, auto adds createdAt & updatedAt
);

// Create and export the model
const User = mongoose.model('User', userSchema);
export default User;
