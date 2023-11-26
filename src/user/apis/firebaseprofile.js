// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://musterus-api.onrender.com', // Replace with your API base URL
});

export const usersprofile = async token => {
  try {
    const response = await api.get('/profile', {
      headers: {
        Authorization: `Bearer ${token}`, // Add the Bearer token in the headers
      },
    });

    return response.data.userprofile;
  } catch (error) {
    throw error;
  }
};
