// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.musterus.com', // Replace with your API base URL
});

export const login = async (username, password) => {
  try {
    const response = await api.post(
      `/ws/authenticate?username=${username}&password=${password}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
