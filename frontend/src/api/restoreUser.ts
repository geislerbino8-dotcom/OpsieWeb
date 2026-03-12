import axios from 'axios';
import { getToken } from '../utils/authToken';

export const restoreUser = async (id: string) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/restore/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Failed to restore user:', error.response?.data || error.message);
    throw error;
  }
}