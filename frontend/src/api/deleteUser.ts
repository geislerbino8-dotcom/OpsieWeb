import axiosClient from './axiosClient';

export const deleteUser = async (id: string) => {
  try {
    const response = await axiosClient.delete(
      `/auth/delete/${id}`
    );

    return response.data;
  } catch (error: any) {
    console.error('Failed to delete user:', error.response?.data || error.message);
    throw error;
  }
}