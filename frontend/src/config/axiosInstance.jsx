import axios from 'axios';

export const springApi = axios.create({
  baseURL: '/spring',
  headers: { 'Content-Type': 'application/json' },
});

export const flaskApi = axios.create({
  baseURL: '/flask', // Vite proxy 설정과 일치
  headers: { 'Content-Type': 'application/json' },
});