import axiosClient from "./axiosClient";

export const deleteProduct = async (id: string) => {
    try {

        const response = await axiosClient(
            `/products/delete/${id}`
        )

        return response.data

        
    } catch (error: any) {
        console.error('Failed to delete ticket:', error.response?.data || error.message);
        throw error;
    }
}