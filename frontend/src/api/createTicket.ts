import axios from 'axios';

export interface TicketData {
  name: string;
  email: string;
  description: string;
  platform: string;
  category: string;
}

export const createTicket = async (data: TicketData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/ticket/create`,
      data
    );

    return response.data;
  } catch (error: any) {
    console.error('Failed to create ticket:', error.response?.data || error.message);
    throw error;
  }
}