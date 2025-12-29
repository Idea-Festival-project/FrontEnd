import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const signup = (data) => {
  return API.post('/auth/CodingGo/signup', data);
};