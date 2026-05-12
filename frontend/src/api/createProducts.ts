import axiosClient from "./axiosClient";

export const createProduct = async (productData: object)=> {
    try {
        
        const response  = await axiosClient.post(
            '/products/create',
            productData
        )

        return response.data

    } catch (error: any) {
        console.error('Failed to create ticket:', error.response?.data || error.message);
        throw error;
    }
}