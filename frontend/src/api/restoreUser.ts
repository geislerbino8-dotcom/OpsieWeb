import axiosClient from './axiosClient';

export const restoreUser = async (id: string) => {
  try {
    const response = await axiosClient.patch(
      `/auth/restore/${id}`,
      {}
    );

    return response.data;
  } catch (error: any) {
    console.error('Failed to restore user:', error.response?.data || error.message);
    throw error;
  }
}