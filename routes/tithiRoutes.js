// routes/tithiRoutes.js
import express from 'express';
import { 
  getAllTithis, 
  getTithiById, 
  createTithi, 
  updateTithi, 
  deleteTithi 
} from '../controllers/tithiController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllTithis);
router.get('/:id', getTithiById);

// Protected routes
router.post('/', protect, createTithi);
router.put('/:id', protect, updateTithi);
router.delete('/:id', protect, deleteTithi);

export default router;
