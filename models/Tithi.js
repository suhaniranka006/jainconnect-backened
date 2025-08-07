import mongoose from 'mongoose';

const tithiSchema = new mongoose.Schema({
  date: String,
  tithi: String,
  description: String,
  city: String
});

export default mongoose.model('Tithi', tithiSchema);
