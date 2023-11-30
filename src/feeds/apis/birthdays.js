import axios from 'axios';

const api = axios.create({
  baseURL: 'https://musterus-api.onrender.com', // Replace with your API base URL
});

export const getbirthdays = async token => {
  try {
    const response = await api.get(
      '/profile/birthdays',

      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the Bearer token in the request headers
        },
      },
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
