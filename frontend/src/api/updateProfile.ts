import axios from 'axios';
import { getToken } from '../utils/authToken';

export const updateProfile = async (data: any) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/user/update`,
      data,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('Failed to update profile:', error.response?.data || error.message);
    throw error;
  }
}