import axios from 'axios';
import {Alert} from 'react-native';

const api = axios.create({
  baseURL: 'https://musterus-api.onrender.com', // Replace with your API base URL
});

export const mylogin = async (email, password) => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
    });

    if (response.status === 200) {
      return response?.data;
    } else {
      // Handle specific status codes or ranges as needed
      if (response.status === 400) {
        // Unauthorized
        Alert.alert('Login', 'Please ensure your login details are correct');
      } else {
        Alert.alert('Login', 'An error occurred while logging in');
      }
    }
  } catch (error) {
    // Handle network errors or other exceptions
    throw error;
  }
};
