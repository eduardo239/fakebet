import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3003/',
  timeout: 2000,
});
// get all games
export const getGames = () => {
  return instance.get('/games/all');
};

// get all games by type
export const getGamesByType = (type) => {
  return instance.get(`/games/all/${type.name || 'futebol'}`);
};

// post new game
export function postGame(game) {
  return instance.post('/games/add', game);
}

// get game by pagination
export function getGamesByPagination(page, type) {
  return instance.get(`/games/${type}/${page}`);
}

// get game info
// export function getGame(game) {
//   return instance.get(`/games/${game._id}`);
// }

// edit game
export function updateGame(game) {
  return instance.put('/games/edit', game);
}

// delete game
export function removeGame(id) {
  return instance.delete(`/games/remove/${id}`);
}
