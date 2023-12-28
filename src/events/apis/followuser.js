// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.musterus.com', // Replace with your API base URL
});

export const followuser = async (mykey, mskl, friendID, memberkey) => {
  try {
    const response = await api.get(
      `/ws/musterpoint?mykey=${mykey}&mskl=${mskl}&friendID=${friendID}&follow=follow&memberkey=${memberkey}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
