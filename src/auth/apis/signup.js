// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://musterus-api.onrender.com', // Replace with your API base URL
});

export const signup = async (
  username,
  firstname,
  lastname,
  email,
  password,
  birthdate,
) => {
  try {
    const response = await api.post('/auth/signup', {
      username,
      firstname,
      lastname,
      email,
      password,
      birthdate,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
