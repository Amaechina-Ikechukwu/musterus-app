// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.musterus.com', // Replace with your API base URL
});

export const sendDMMessage = async (mykey, touser, comment) => {
  try {
    const response = await api.post(
      `/ws/api/messageSend?mykey=${mykey}&touser=${touser}&comment=${comment}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
