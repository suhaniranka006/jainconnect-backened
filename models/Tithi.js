import mongoose from 'mongoose';

const tithiSchema = new mongoose.Schema({
  tithi: { type: String, required: true },
  date: { type: String, required: true }, // keep String since your current DB uses string dates
  description: { type: String }
}, { collection: 'Tithis' }); // ✅ Correct case-sensitive collection name

const Tithi = mongoose.model('Tithi', tithiSchema);

export default Tithi;
