import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api', // Adjust if your API base URL is different
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
