import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3003/',
  timeout: 2000,
});
// get all games
export const getBets = () => {
  return instance.get('/bets/all');
};

// get bet by id
export const getBetById = (id) => {
  return instance.get(`/bets/${id}`);
};

// get bets by user id
export const getBetsByUserId = (id) => {
  return instance.get(`/bets/user/${id}`);
};

// post new bet
export function postBet(bet) {
  return instance.post('/bets/add', bet);
}
