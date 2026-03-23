import axiosClient from './axiosClient';

export interface TicketData {
  name: string;
  email: string;
  description: string;
  platform: string;
  category: string;
}

export const createTicket = async (data: TicketData) => {
  try {
    const response = await axiosClient.post(
      '/ticket/create',
      data
    );

    return response.data;
  } catch (error: any) {
    console.error('Failed to create ticket:', error.response?.data || error.message);
    throw error;
  }
}