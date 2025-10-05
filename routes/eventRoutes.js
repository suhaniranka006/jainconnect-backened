// routes/eventRoutes.js
import express from 'express';
import { 
  getAllEvents, 
  getEventById, 
  createEvent, 
  createEventWithImage, 
  updateEvent, 
  updateEventWithImage, 
  deleteEvent 
} from '../controllers/eventController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { upload } from '../utils/cloudinaryHelper.js';
import { validateRequest, eventValidation } from '../middlewares/validationMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllEvents);
router.get('/:id', getEventById);

// Protected routes
router.post('/', protect, validateRequest(eventValidation.create), createEvent);
router.post('/with-image', protect, upload.single('image'), createEventWithImage);
router.put('/:id', protect, updateEvent);
router.put('/upload/:id', protect, upload.single('image'), updateEventWithImage);
router.put('/:id/with-image', protect, upload.single('image'), updateEventWithImage);
router.delete('/:id', protect, deleteEvent);

export default router;
