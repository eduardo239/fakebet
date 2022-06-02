import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3003/',
  timeout: 2000,
});

// post new team
export function postTeam(team) {
  return instance.post('/teams/add', team);
}

// get team info
export function getTeam(team) {
  return instance.get(`/teams/${team.id}`);
}

// team edit
export function userEdit(team) {
  return instance.put('/teams/edit', team);
}

// upload image
export function uploadImage(image, id) {
  return instance.post(`teams/upload/${id}`, image);
}
