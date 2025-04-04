import axios from 'axios';

const validateToken = async (token: string): Promise<boolean> => {
    const url = `${import.meta.env.VITE_API_BASE_URL}/api/pixel_ai/validate-token`;

    try {
        const response = await axios.post(
            url,
            { apiKey: token }, // Request body
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
                },
            }
        );

        return response.data.success === "Token is valid";
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // console.error(
            //     "Token validation failed:",
            //     error.response?.data || error.message
            // );
        } else {
            // console.error("Unexpected error:", error);
        }
        return false;
    }
};

export default validateToken;