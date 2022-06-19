import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3003/',
  timeout: 2000,
});
// get all balance history
export const getBalance = () => {
  return instance.get('/history-balance/all');
};

// post new balance history
export const postBalance = (data) => {
  return instance.post('/history-balance/add', data);
};

// get all balances by user id
export const getBalanceByUserId = (userId) => {
  return instance.get(`/history-balance/user/${userId}`);
};
