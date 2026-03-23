import axiosClient from './axiosClient';

export const getTickets = async () => {
  try {
    const response = await axiosClient.get(
      '/ticket/getAll'
    );

    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch tickets:', error.response?.data || error.message);
    throw error;
  }
}