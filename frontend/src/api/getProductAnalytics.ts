import axiosClient from './axiosClient';

export const getProductAnalytics = async () => {
  try {
    const response = await axiosClient.get(
      '/ticket/product-stats'
    );

    return response.data;
  } catch (error: any) {
    console.error('Failed to fetch users:', error.response?.data || error.message);
    throw error;
  }
}