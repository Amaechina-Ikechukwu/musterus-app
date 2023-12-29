// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.musterus.com', // Replace with your API base URL
});

export const signup = async (firstname, lastname, registeremail, username) => {
  try {
    const response = await api.post(
      `/ws/notifyme?username=${username}&firstname=${firstname}&lastname=${lastname}&registeremail=${registeremail}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
