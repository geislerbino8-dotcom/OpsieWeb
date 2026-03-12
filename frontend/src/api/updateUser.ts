import axios from 'axios';
import { getToken } from '../utils/authToken';

export const updateUser = async (id: string, data: any) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/updateUser/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Failed to update user:', error.response?.data || error.message);
    throw error;
  }
}