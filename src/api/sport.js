import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3003/',
  timeout: 2000,
});
// get all sports
export const getSports = () => {
  return instance.get('/sports/all');
};

export const getSport = (id) => {
  return instance.get(`/sports/${id}`);
};

// post new sport
export function postSport(sport) {
  return instance.post('/sports/add', sport);
}

// delete sport
export function deleteSport(id) {
  return instance.delete(`/sports/remove/${id}`);
}
