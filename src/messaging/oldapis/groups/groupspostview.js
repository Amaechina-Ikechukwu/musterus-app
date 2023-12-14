// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.musterus.com', // Replace with your API base URL
});

export const getgroupspostview = async (mykey, mskl, uid, group, post) => {
  try {
    console.log({mykey, mskl, uid, group, post});
    const response = await api.post(
      `/ws/groups/readpost?mykey=${mykey}&mskl=${mskl}&uid=${uid}&group=${group}&post=${post}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
