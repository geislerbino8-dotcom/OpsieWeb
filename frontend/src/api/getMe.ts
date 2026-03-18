import axiosClient from './axiosClient';

export const getMe = async () => {
  try {
    const response = await axiosClient.get(
      '/auth/me'
    );

    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch user:', error.response?.data || error.message);
    throw error;
  }
}