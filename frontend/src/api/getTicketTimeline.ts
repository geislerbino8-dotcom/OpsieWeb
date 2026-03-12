import axios from 'axios';
import { getToken } from '../utils/authToken';

export const getTicketTimeline = async (ticketId: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/ticket/timeline/${ticketId}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        }
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch ticket timeline:', error.response?.data || error.message);
    throw error;
  }
}