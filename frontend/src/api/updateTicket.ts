import axiosClient from './axiosClient';

export interface UpdateTicketData {
  status?: 'open' | 'in progress' | 'resolved' | "won't fix" | 'closed';
  category?: 'Inquiry' | 'Bug Report' | 'Question' | 'Complaint' | 'Feature Request';
  taskReferenceUrl?: string;
  assignee?: string | null;
  resolution?: string
}

export const updateTicket = async (id: string, data: UpdateTicketData) => {
  console.log(data)
  try {
    const response = await axiosClient.patch(
      `/ticket/update/${id}`,
      data
    );

    console.log(response)

    return response.data;
  } catch (error: any) {
    console.error('Failed to update ticket:', error.response?.data || error.message);
    throw error;
  }
}