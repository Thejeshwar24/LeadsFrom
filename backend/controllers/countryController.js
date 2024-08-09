import Country from '../models/Country.js';

export const getCountries = async () => {
  const countries = await Country.find();
  return countries;
};
