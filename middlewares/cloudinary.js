
// const parser = multer({ storage });
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if Cloudinary credentials are available
const hasCloudinaryConfig = process.env.CLOUD_NAME && process.env.CLOUD_API_KEY && process.env.CLOUD_API_SECRET;

let storage;
let parser;

if (hasCloudinaryConfig) {
  // Configure Cloudinary with real credentials
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });

  // Multer storage using Cloudinary
  storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => ({
      folder: 'jainconnect_profiles',
      format: file.mimetype.split('/')[1], // jpg, png, etc.
      public_id: `profile_${Date.now()}_${Math.round(Math.random() * 1E9)}`,
      transformation: [
        { width: 500, height: 500, crop: 'fill' },
        { quality: 'auto' }
      ]
    }),
  });

  parser = multer({ 
    storage,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
      // Accept only image files
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed!'), false);
      }
    }
  });

  console.log('✅ Cloudinary configured with real credentials');
} else {
  // Fallback: Use local disk storage with short URLs
  console.log('⚠️  Cloudinary credentials not found, using local storage');
  
  // Create uploads directory if it doesn't exist
  const uploadsDir = path.join(__dirname, '../uploads/profile-images');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
      // Generate short, unique filename
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extension = path.extname(file.originalname);
      cb(null, 'profile-' + uniqueSuffix + extension);
    }
  });

  parser = multer({
    storage,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed!'), false);
      }
    }
  });
}

export default parser;
