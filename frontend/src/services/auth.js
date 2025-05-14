import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register/`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};