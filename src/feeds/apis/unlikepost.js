import axios from 'axios';

const api = axios.create({
  baseURL: 'https://musterus-api.onrender.com', // Replace with your API base URL
});

export const unlikepost = async (token, postid) => {
  try {
    const response = await api.post(
      '/home/unlikepost',
      {
        postid,
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
