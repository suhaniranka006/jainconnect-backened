// controllers/eventController.js
import Event from '../models/Event.js';
import { cloudinaryUpload } from '../utils/cloudinaryHelper.js';

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new event
export const createEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create event with image
export const createEventWithImage = async (req, res) => {
  try {
    let eventData = { ...req.body };
    
    // Handle image upload if present
    if (req.file) {
      const imageUrl = await cloudinaryUpload(req.file);
      eventData.image = imageUrl;
    }
    
    const newEvent = new Event(eventData);
    const savedEvent = await newEvent.save();
    
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update event
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!event) return res.status(404).json({ message: 'Event not found' });
    
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update event with image
export const updateEventWithImage = async (req, res) => {
  try {
    let eventData = { ...req.body };
    
    // Handle image upload if present
    if (req.file) {
      const imageUrl = await cloudinaryUpload(req.file);
      eventData.image = imageUrl;
    }
    
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      eventData,
      { new: true, runValidators: true }
    );
    
    if (!event) return res.status(404).json({ message: 'Event not found' });
    
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    
    if (!event) return res.status(404).json({ message: 'Event not found' });
    
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};