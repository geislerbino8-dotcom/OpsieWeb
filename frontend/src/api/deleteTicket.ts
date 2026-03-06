import axios from "axios";

export const deleteTicket = async (id: string) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/ticket/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Failed to delete ticket:", error.response?.data || error.message);
    throw error;
  }
};