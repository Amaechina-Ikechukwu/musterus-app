// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.musterus.com', // Replace with your API base URL
});

export const adpage = async (mykey, mskl) => {
  try {
    const response = await api.post(
      `/ws/advertisements?mykey=${mykey}&mskl=${mskl}&step=4`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
