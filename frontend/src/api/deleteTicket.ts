import axios from 'axios';
import { getToken } from '../utils/authToken';

export const deleteTicket = async (id: string) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/ticket/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Failed to delete ticket:', error.response?.data || error.message);
    throw error;
  }
}