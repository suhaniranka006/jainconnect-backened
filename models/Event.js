import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: String,
  city: String,
  date: String,
  time:String,
  description: String
});


export default mongoose.model('Event', eventSchema,'Events');
