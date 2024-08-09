import UserInfo from '../models/UserInfo.js';

export const createUserInfo = async (data) => {
  const userInfo = new UserInfo(data);
  await userInfo.save();
  return userInfo;
};
