import axiosClient from "./axiosClient";

export const publishContent = async () => {
    try {
        
        const response = await axiosClient.patch(
            '/webcontent/publish-content'
        )

        return response.data

    } catch (error: any) {
        console.error('Failed to fetch products:', error.response?.data || error.message);
        throw error;
    }
}