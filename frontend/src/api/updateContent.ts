import axiosClient from "./axiosClient";

export const updateContent = async (data: any)=> {
    try {
        
        const response = await axiosClient.patch(
            `/webcontent/update-content`,
            data
        )

        return response.data

    } catch (error) {
        console.error('Failed to create user:', error);
        throw error;
    }
}