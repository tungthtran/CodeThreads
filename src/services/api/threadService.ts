import axios from "axios";

const API_BASE_URL = "https://65a37b87a54d8e805ed3a935.mockapi.io/api/v1/";

export const getThreads = async () => {
    const response = await axios.get(`${API_BASE_URL}/threads`);
    return response.data;
};

export const getThreadReplies = async (threadId: string) => {
    const response = await axios.get(`${API_BASE_URL}/threads/${threadId}/replies`);
    return response.data;
};
