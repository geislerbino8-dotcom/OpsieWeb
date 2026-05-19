import axiosClient from "./axiosClient";

export const updateProduct = async (data: object) => {
    try {

        const response = await axiosClient.put(
            '/products/update',
            data
        )

        return response.data
        
    } catch (error: any) {
        console.error('Failed to restore user:', error.response?.data || error.message);
        throw error;
    }
}