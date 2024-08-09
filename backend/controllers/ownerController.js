import Owner from '../models/Owner.js';

export const getOwners = async () => {
  const owners = await Owner.find();
  return owners;
};
