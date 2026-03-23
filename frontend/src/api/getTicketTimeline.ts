import axiosClient from './axiosClient';

export const getTicketTimeline = async (ticketId: string) => {
  try {
    const response = await axiosClient.get(
      `/ticket/timeline/${ticketId}`
    );

    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch ticket timeline:', error.response?.data || error.message);
    throw error;
  }
}