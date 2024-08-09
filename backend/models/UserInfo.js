import mongoose from 'mongoose';

const userInfoSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  title: String,
  phone: String,
  mobile: String,
  email: { type: String, required: true },
  skypeId: String,
  secondaryEmail: String,
  twitter: String,
}, { timestamps: true });

const UserInfo = mongoose.model('UserInfo', userInfoSchema);

export default UserInfo;
