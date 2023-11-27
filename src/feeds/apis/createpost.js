import axios from 'axios';

const api = axios.create({
  baseURL: 'https://musterus-api.onrender.com', // Replace with your API base URL
});

export const createpost = async (token, caption, mediaurl) => {
  try {
    const response = await api.post(
      '/home/createpost',
      {
        caption,
        mediaurl,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the Bearer token in the request headers
        },
      },
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
