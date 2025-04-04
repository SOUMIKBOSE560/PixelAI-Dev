const validateToken = async (token: string): Promise<boolean> => {
    const url = `${import.meta.env.VITE_API_BASE_URL}/api/pixel_ai/validate-token`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
            body: JSON.stringify({ apiKey: token }),
        });

        if (!response.ok) {
            return false;
        }

        const data = await response.json();
        return data.success === "Token is valid";
    } catch (error) {
        console.error("Token validation error:", error);
        return false;
    }
};

export default validateToken;