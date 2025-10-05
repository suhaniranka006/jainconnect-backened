// routes/maharajRoutes.js
import express from 'express';
import { 
  getAllMaharajs, 
  getMaharajById, 
  createMaharaj, 
  createMaharajWithImage, 
  updateMaharaj, 
  updateMaharajWithImage, 
  deleteMaharaj 
} from '../controllers/maharajController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { upload } from '../utils/cloudinaryHelper.js';

const router = express.Router();

// Public routes
router.get('/', getAllMaharajs);
router.get('/:id', getMaharajById);

// Protected routes
router.post('/', protect, createMaharaj);
router.post('/with-image', protect, upload.single('image'), createMaharajWithImage);
router.put('/:id', protect, updateMaharaj);
router.put('/upload/:id', protect, upload.single('image'), updateMaharajWithImage);
router.put('/:id/with-image', protect, upload.single('image'), updateMaharajWithImage);
router.delete('/:id', protect, deleteMaharaj);

export default router;
