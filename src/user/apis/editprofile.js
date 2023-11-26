// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.musterus.com', // Replace with your API base URL
});

export const editprofile = async (mykey, mskl, name, username, bio) => {
  try {
    const response = await api.post(
      `/ws/myprofile/edit?mykey=${mykey}&mskl=${mskl}&name=${name}&username=${username}&bio=${bio}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
