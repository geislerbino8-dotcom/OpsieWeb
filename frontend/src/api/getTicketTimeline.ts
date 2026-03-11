import axios from 'axios';

export const getTicketTimeline = async (ticketId: string) => {
  const token = localStorage.getItem('token');

  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/ticket/timeline/${ticketId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};