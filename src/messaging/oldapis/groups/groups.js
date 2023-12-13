// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.musterus.com', // Replace with your API base URL
});

export const getgroups = async (mykey, mskl, uid, list) => {
  try {
    const response = await api.post(
      `/ws/groups?mykey=${mykey}&mskl=${mskl}&uid=${uid}&list=${list}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
