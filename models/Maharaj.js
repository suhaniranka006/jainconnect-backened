import mongoose from 'mongoose';

const maharajSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Maharaj name is required'],
    trim: true
  },
  title: { 
    type: String, 
    required: [true, 'Title is required'],
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
  contactInfo: { 
    type: String,
    trim: true
  }
}, { collection: 'Maharajs', timestamps: true });

export default mongoose.model('Maharaj', maharajSchema);
