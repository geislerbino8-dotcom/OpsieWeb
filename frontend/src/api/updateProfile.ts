import axiosClient from './axiosClient';

export const updateProfile = async (data: any) => {
  try {
    const response = await axiosClient.patch(
      '/user/update',
      data
    );
    
    return response.data;
  } catch (error: any) {
    console.error('Failed to update profile:', error.response?.data || error.message);
    throw error;
  }
}