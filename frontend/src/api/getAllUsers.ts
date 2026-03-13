import axios from 'axios';
import { getToken } from '../utils/authToken';

export const getAllUsers = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/user/getAll`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch users:', error.response?.data || error.message);
    throw error;
  }
}