// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.musterus.com', // Replace with your API base URL
});

export const getgroupsposts = async (mykey, mskl, uid, group, draft) => {
  try {
    const response = await api.post(
      `/ws/groups/posts?mykey=${mykey}&mskl=${mskl}&uid=${uid}&group=${group}&drafts=${draft}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
