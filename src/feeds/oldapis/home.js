// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.musterus.com', // Replace with your API base URL
});

export const homepage = async (mykey, mskl) => {
  try {
    const response = await api.post(`/ws/home?mykey=${mykey}&mskl=${mskl}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
