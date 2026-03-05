import axios from 'axios';

export const updateInquiryStatus = async (
  id: string,
  status: 'open' | 'in progress' | 'resolved' | "won't fix" | 'closed'
) => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.patch(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/inquiry/updateStatus/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Failed to update status:', error.response?.data || error.message);
    throw error;
  }
};