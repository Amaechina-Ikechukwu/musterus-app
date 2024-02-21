// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.musterus.com', // Replace with your API base URL
});

export const reacttopost = async (comid, selec, divid, mykey, mskl, uid) => {
  try {
    const response = await api.post(
      `/ws/api/comments?mykey=${mykey}&comid=${comid}&uid=${uid}&selec=${selec}&divid=${divid}&mskl=${mskl}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
