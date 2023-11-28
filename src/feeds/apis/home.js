import axios from 'axios';

const api = axios.create({
  baseURL: 'https://musterus-api.onrender.com', // Replace with your API base URL
});

export const getposts = async token => {
  try {
    const response = await api.get(
      '/home/posts',

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
