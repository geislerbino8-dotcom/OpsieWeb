import axios from 'axios';

export interface InquiryData {
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
}

export const createInquiry = async (data: InquiryData) => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/inquiry/create`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Failed to create inquiry:', error.response?.data || error.message);
    throw error;
  }
};