import { isAxiosError } from 'axios';
import axiosClient from './axiosClient';

export interface TicketData {
  name: string;
  email: string;
  description: string;
  platform: string;
  category: string;
  phone?: string;
  address?: string;
  product?: string;
}

export const createTicket = async (data: TicketData) => {
  try {
    const response = await axiosClient.post(
      '/ticket/create',
      data
    );

    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      console.error('Failed to create ticket:', error.response?.data || error.message);
    } else if (error instanceof Error) {
      console.error('Failed to create ticket:', error.message);
    } else {
      console.error('Failed to create ticket:', error);
    }
    throw error;
  }
}