import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.musterus.com', // Replace with your API base URL
});

export const editprofile = async (mykey, mskl, profile) => {
  try {
    // Constructing the query string
    let queryString = `mykey=${mykey}&mskl=${mskl}`;
    for (const key in profile) {
      if (profile.hasOwnProperty(key)) {
        queryString += `&${key}=${encodeURIComponent(profile[key])}`;
      }
    }

    const response = await api.get(`/ws/myprofile/update?${queryString}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
