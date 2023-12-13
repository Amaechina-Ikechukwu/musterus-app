// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.musterus.com', // Replace with your API base URL
});

export const getgroupsview = async (mykey, mskl, group) => {
  try {
    const response = await api.post(
      `/ws/groups/view?mykey=${mykey}&mskl=${mskl}&group=${group}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
