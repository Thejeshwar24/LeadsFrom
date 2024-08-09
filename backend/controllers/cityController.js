import City from '../models/City.js';

export const getCities = async () => {
  const cities = await City.find();
  return cities;
};
