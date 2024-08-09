import AddressInfo from '../models/AddressInfo.js';

export const createAddressInfo = async (data) => {
  const addressInfo = new AddressInfo(data);
  await addressInfo.save();
  return addressInfo;
};