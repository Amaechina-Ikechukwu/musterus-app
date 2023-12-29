// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.musterus.com', // Replace with your API base URL
});

export const grouppostcomment = async (
  mykey,
  mskl,
  uid,
  group,
  postid,
  replypost,
) => {
  try {
    const response = await api.post(
      `/ws/groups/replypost?mykey=${mykey}&mskl=${mskl}&uid=${uid}&group=${group}&postid=${postid}&replypost=${replypost}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
