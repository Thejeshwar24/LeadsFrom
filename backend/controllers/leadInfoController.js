import LeadInfo from '../models/LeadInfo.js';

export const createLeadInfo = async (data) => {
  const leadInfo = new LeadInfo(data);
  await leadInfo.save();
  return leadInfo;
};
