import axios from 'axios';

export const getInquiries = async () => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/inquiry/getAll`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Failed to get inquiries:', error.response?.data || error.message);
    throw error;
  }
};