// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.musterus.com', // Replace with your API base URL
});

export const getcomment = async (mykey, comid, uid) => {
  try {
    const response = await api.get(
      `/ws/api/comments?mykey=${mykey}&comid=${comid}&uid=${uid}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
