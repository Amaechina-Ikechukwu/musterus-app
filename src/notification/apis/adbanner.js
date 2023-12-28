// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.musterus.com', // Replace with your API base URL
});

export const adbanner = async (mykey, mskl) => {
  try {
    const response = await api.get(
      `/ws/advertisements/mybanners?mykey=${mykey}&mskl=${mskl}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
