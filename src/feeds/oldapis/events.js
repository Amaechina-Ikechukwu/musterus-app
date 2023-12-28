// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.musterus.com', // Replace with your API base URL
});

export const events = async (mykey, mskl, friend, per_page) => {
  try {
    const response = await api.get(
      `/ws/eventscard?mykey=${mykey}&mskl=${mskl}&friend=${friend}&per_page=${per_page}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
