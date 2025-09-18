import mongoose from 'mongoose';

const maharajSchema = new mongoose.Schema({
  name: String,
  title:String,
  city:String,
  date:String,
  contactInfo:String

});

export default mongoose.model('Maharaj', maharajSchema,'Maharaj');
