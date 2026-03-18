import axiosClient from './axiosClient';

export const resetPassword = async (id: string) => {
  try {
    const response = await axiosClient.patch(
      `/auth/resetPassword/${id}`,
      {}
    );

    return response.data;
  } catch (error: any) {
    console.error('Failed to reset password:', error.response?.data || error.message);
    throw error;
  }
}