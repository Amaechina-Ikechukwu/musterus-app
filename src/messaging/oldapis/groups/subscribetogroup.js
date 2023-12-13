// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.musterus.com', // Replace with your API base URL
});

export const subscribetogroup = async (mykey, mskl, uid, group) => {
  try {
    const response = await api.post(
      `/ws/groups/subscribe?mykey=${mykey}&mskl=${mskl}&uid=${uid}&group=${group}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
