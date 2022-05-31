import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3003/',
  timeout: 2000,
});

export function getList() {
  return fetch('http://localhost:3333/list').then((data) => data.json());
}

// sign up new user
export function signUp(user) {
  return instance.post('/users/sign-up', user);
}

// sign in existing user
export function signIn(user) {
  return instance.post('/users/sign-in', user);
}

// get user info
export function getUserInfo() {
  return instance.get('/users/info');
}

// logout
export function userLogout() {
  return instance.post('/users/logout');
}
