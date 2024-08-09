import mongoose from 'mongoose';

const addressInfoSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  zipCode: String,
  country: String,
}, { timestamps: true });

const AddressInfo = mongoose.model('AddressInfo', addressInfoSchema);

export default AddressInfo;
