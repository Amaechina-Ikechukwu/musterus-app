// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.musterus.com', // Replace with your API base URL
});

export const personalmessages = async (
  mykey,
  touser,
  uid,
  Friend,
  Friendship,
) => {
  try {
    const response = await api.post(
      `/ws/api/messageList?mykey=${mykey}&touser=${touser}&uid=${uid}&Friend=${Friend}&Friendship=${Friendship}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
