import axiosClient from "./axiosClient";

export const getProducts = async () => {
    try {

        const response = await axiosClient.get('/products/get-all')

        return response.data
        
    } catch (error: any) {
        console.error('Failed to fetch products:', error.response?.data || error.message);
        throw error;
        
    }
}