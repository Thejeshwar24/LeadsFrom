import mongoose from 'mongoose';

const leadInfoSchema = new mongoose.Schema({
  leadOwner: String,
  leadSource: String,
  industry: String,
  leadStatus: String,
  leadRating: String,
}, { timestamps: true });

const LeadInfo = mongoose.model('LeadInfo', leadInfoSchema);

export default LeadInfo;
