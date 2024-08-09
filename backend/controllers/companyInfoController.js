import CompanyInfo from '../models/CompanyInfo.js';

export const createCompanyInfo = async (data) => {
  const companyInfo = new CompanyInfo(data);
  await companyInfo.save();
  return companyInfo;
};
