import axios from "axios";

export const deleteInquiry = async (id: string) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/inquiry/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Failed to delete inquiry:", error.response?.data || error.message);
    throw error;
  }
};