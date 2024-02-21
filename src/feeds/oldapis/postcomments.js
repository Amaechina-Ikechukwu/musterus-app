// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.musterus.com', // Replace with your API base URL
});

export const postcomment = async (mykey, comid, uid, ref, comment) => {
  try {
    const response = await api.post(
      `/ws/api/comments?mykey=${mykey}&comid=${comid}&uid=${uid}&comment=${comment}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
