// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.musterus.com', // Replace with your API base URL
});

export const initializechat = async (uid, touser, mykey) => {
  try {
    const response = await api.post(
      `/ws/api/messageList?uid=${uid}&touser=${touser}&mykey=${mykey}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
