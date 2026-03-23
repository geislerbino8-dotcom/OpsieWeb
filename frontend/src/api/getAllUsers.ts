import axiosClient from './axiosClient';

export const getAllUsers = async () => {
  try {
    const response = await axiosClient.get(
      '/user/getAll'
    );

    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch users:', error.response?.data || error.message);
    throw error;
  }
}