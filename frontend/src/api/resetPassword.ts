import axios from 'axios';
import { getToken } from '../utils/authToken';

export const resetPassword = async (id: string) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/resetPassword/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Failed to reset password:', error.response?.data || error.message);
    throw error;
  }
}