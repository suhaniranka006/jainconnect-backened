// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import multer from 'multer';
// import cloudinary from '../config/cloudinary.js';

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'profile_images', // folder name in Cloudinary
//     allowed_formats: ['jpg', 'jpeg', 'png']
//   }
// });

// const parser = multer({ storage });
import { v2 as cloudinary } from 'cloudinary';  // ✅ THIS IS REQUIRED
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Multer storage using Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'profile_images',
    format: file.mimetype.split('/')[1], // jpg, png, etc.
    public_id: `${Date.now()}-${file.originalname}`,
  }),
});

const parser = multer({ storage });

export default parser;
