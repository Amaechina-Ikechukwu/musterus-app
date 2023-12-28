// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.musterus.com', // Replace with your API base URL
});

export const sendDM = async (uid, touser, comment) => {
  try {
    const response = await api.post(
      `/ws/api/messageSend?uid=${uid}&touser=${touser}&comment=${comment}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
