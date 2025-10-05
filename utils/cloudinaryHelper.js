// utils/cloudinaryHelper.js
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'jainconnect',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif']
  }
});

// Create multer upload middleware
export const upload = multer({ storage: storage });

// Helper function to upload file to cloudinary
export const cloudinaryUpload = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.path);
    return result.secure_url;
  } catch (error) {
    throw new Error(`Error uploading to Cloudinary: ${error.message}`);
  }
};

// Helper function to delete file from cloudinary
export const cloudinaryDelete = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
    return { success: true };
  } catch (error) {
    throw new Error(`Error deleting from Cloudinary: ${error.message}`);
  }
};