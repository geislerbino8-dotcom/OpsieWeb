import axiosClient from './axiosClient';

export const login = async (username: string, password: string) => {
  try {
    const response = await axiosClient.post(
      '/auth/login',
      {
        username,
        password,
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
}