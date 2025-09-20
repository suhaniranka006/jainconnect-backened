import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profile_images', // folder name in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png']
  }
});

const parser = multer({ storage });

export default parser;
