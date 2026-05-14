import axiosClient from "./axiosClient";

export const getProduct = async (name: string) => {
    try {
        const response = await axiosClient.get(
            "/products/get-product",
            {
                params: {
                    name,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};