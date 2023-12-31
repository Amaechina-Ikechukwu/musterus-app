import axios from 'axios';

const api = axios.create({
  baseURL: 'https://musterus-api.onrender.com', // Replace with your API base URL
});

export const updateprofile = async (
  token,
  firstname,
  lastname,
  username,
  bio,
  photourl,
  birthdate,
) => {
  try {
    const response = await api.post(
      '/profile/update',
      {
        firstname, // Correct spelling here
        lastname,
        username,
        bio,
        photourl,
        birthdate,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the Bearer token in the request headers
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
