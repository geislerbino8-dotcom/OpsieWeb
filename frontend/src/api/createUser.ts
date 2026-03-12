import axios from 'axios';
import { getToken } from '../utils/authToken';

export const createUser = async (userData: any) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/create`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Failed to create user:', error.response?.data || error.message);
    throw error;
  }
}