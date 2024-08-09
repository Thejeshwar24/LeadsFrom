import mongoose from 'mongoose';

const companyInfoSchema = new mongoose.Schema({
  company: String,
  fax: String,
  website: String,
  annualRevenue: String,
  employees: String,
  description: String,
}, { timestamps: true });

const CompanyInfo = mongoose.model('CompanyInfo', companyInfoSchema);

export default CompanyInfo;
