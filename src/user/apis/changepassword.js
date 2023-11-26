// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.musterus.com', // Replace with your API base URL
});

export const changepassword = async (
  mykey,
  mskl,
  newpassword,
  repassword,
  reminderHint,
  reminderanswer,
) => {
  try {
    const response = await api.get(
      `/ws/profile/changepassword?mykey=${mykey}&mskl=${mskl}&password=${newpassword}&repassword=${repassword}&reminderhint=${reminderHint}&reminderanswer=${reminderanswer}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
