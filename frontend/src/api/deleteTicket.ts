import axiosClient from './axiosClient';

export const deleteTicket = async (id: string) => {
  try {
    const response = await axiosClient.delete(
      `/ticket/delete/${id}`
    );

    return response.data;
  } catch (error: any) {
    console.error('Failed to delete ticket:', error.response?.data || error.message);
    throw error;
  }
}