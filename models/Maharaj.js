import mongoose from 'mongoose';

const maharajSchema = new mongoose.Schema({
  name: String,
  location: String,
  tapasya: String
});

export default mongoose.model('Maharaj', maharajSchema,'Maharaj');
