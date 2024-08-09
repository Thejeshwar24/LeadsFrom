import State from '../models/State.js';

export const getStates = async () => {
  const states = await State.find();
  return states;
};
