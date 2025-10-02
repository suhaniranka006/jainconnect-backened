import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Event title is required'],
    trim: true
  },
  city: { 
    type: String, 
    required: [true, 'City is required'],
    trim: true
  },
  date: { 
    type: String, 
    required: [true, 'Date is required'],
    trim: true
  },
  time: { 
    type: String, 
    required: [true, 'Time is required'],
    trim: true
  },
  description: { 
    type: String,
    trim: true
  }
}, { collection: 'Events', timestamps: true });

export default mongoose.model('Event', eventSchema);
