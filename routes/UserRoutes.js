// routes/userRoutes.js
import express from 'express';
import { 
  register, 
  login, 
  forgotPassword, 
  resetPassword, 
  getAllUsers, 
  getUserById, 
  updateUser, 
  updateUserWithImage, 
  deleteUser 
} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { upload } from '../utils/cloudinaryHelper.js';
import { validateRequest, userValidation } from '../middlewares/validationMiddleware.js';

const router = express.Router();

// Auth routes
router.post('/register', validateRequest(userValidation.register), register);
router.post('/login', validateRequest(userValidation.login), login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// User routes (protected)
router.get('/', protect, getAllUsers);
router.put('/profile/image', protect, upload.single('image'), updateUserWithImage);
router.put('/upload/:id', protect, upload.single('profileImage'), updateUserWithImage);
router.get('/:id', protect, getUserById);
router.put('/:id', protect, updateUser);
router.delete('/:id', protect, deleteUser);

export default router;