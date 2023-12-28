// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.musterus.com', // Replace with your API base URL
});

export const chatlist = async (mskl, mykey) => {
  try {
    const response = await api.post(
      `/ws/api/chatroom?mskl=${mskl}&mykey=${mykey}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
