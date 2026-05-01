import axiosClient from "./axiosClient";

export const getContent = async () => {
    try {
        
        const response = await axiosClient.get(
            '/webcontent/get-content'
        )

        return response.data

    } catch (error: any) {
        console.error('Failed to fetch content:', error.response?.data || error.message);
        
    }
}