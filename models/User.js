// models/User.js
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  location: String,
  dob: Date,
  gender: String,
  profileImage: String
}, { collection: 'Users' }); // exact collection name

const User = mongoose.model('User', userSchema);
export default User;
