// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.musterus.com', // Replace with your API base URL
});

export const searchusers = async (mykey, mskl, searchterm, ordering) => {
  try {
    const response = await api.get(
      `/ws/musterpoint?mykey=${mykey}&mskl=${mskl}&searchterm=${searchterm}&ordering=${ordering}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
