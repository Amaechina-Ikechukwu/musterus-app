import axios from 'axios';

const api = axios.create({
  baseURL: 'https://musterus-api.onrender.com', // Replace with your API base URL
});

export const sendmessage = async (token, friendid, text, mediaurl, type) => {
  try {
    const response = await api.post(
      '/dm/sendDM',
      {
        friendid,
        text,
        mediaurl,
        type,
      },
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
