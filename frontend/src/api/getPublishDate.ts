import axiosClient from "./axiosClient";

export const getPublishedDate = async () => {
    try {
        const response = await axiosClient.get(
            '/webcontent/get-latest-published-date'
        )

        return response.data
    } catch (error : any) {
        console.error('Failed to fetch tickets:', error.response?.data || error.message);
        throw error;
    }
}