import axios from 'axios';
import { getToken } from '../utils/authToken';

export const getMe = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch user:', error.response?.data || error.message);
    throw error;
  }
}