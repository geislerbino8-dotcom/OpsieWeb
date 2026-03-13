import axios from 'axios';
import { getToken } from '../utils/authToken';

export interface UpdateTicketData {
  status?: 'open' | 'in progress' | 'resolved' | "won't fix" | 'closed';
  category?: 'Inquiry' | 'Bug Report' | 'Question' | 'Complaint' | 'Feature Request';
  taskReferenceUrl?: string;
  assignee?: string | null;
}

export const updateTicket = async (id: string, data: UpdateTicketData) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/ticket/update/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Failed to update ticket:', error.response?.data || error.message);
    throw error;
  }
}