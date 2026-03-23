import axiosClient from './axiosClient';

export const createUser = async (userData: any) => {
  try {
    const response = await axiosClient.post(
      '/auth/create',
      userData
    );

    return response.data;
  } catch (error: any) {
    console.error('Failed to create user:', error.response?.data || error.message);
    throw error;
  }
}