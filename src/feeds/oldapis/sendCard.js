// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.musterus.com', // Replace with your API base URL
});

export const sendcard = async (
  mykey,
  mskl,
  event,
  friendid,
  userid,
  card,
  giftcardid,
  message,
) => {
  try {
    const response = await api.get(
      `/ws/https://www.musterus.com/ws/eventcards/send?mykey=${mykey}&mskl=${mskl}&friendid=${friendid}&event=${event}&userid=${userid}&card=${card}&giftcardid=${giftcardid}&message=${message}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
