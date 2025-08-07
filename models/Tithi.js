import mongoose from 'mongoose';

const tithiSchema = new mongoose.Schema({
  date: String,
  tithi: String,
  description: String,
  city: String
});

// 👇 Pass 'Tithis' as the 3rd argument to use your actual collection name
export default mongoose.model('Tithi', tithiSchema, 'Tithis');
