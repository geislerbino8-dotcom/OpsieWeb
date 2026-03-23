import axiosClient from './axiosClient';

export const updateUser = async (id: string, data: any) => {
  try {
    const response = await axiosClient.patch(
      `/auth/updateUser/${id}`,
      data
    );

    return response.data;
  } catch (error: any) {
    console.error('Failed to update user:', error.response?.data || error.message);
    throw error;
  }
}