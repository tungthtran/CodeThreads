import axios from "axios";

const API_BASE_URL = 'http://localhost:3500';

export const signIn = async (username: string, password: string) => {
    const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    const data = {
        user: username,
        pwd: password,
    };
    const response = await axios.post(`${API_BASE_URL}/auth`, data, config);
    return response;
};

export const signUp = async (username: string, password: string) => {
    const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };
    const data = {
        user: username,
        pwd: password,
    };
    const response = await axios.post(`${API_BASE_URL}/register`, data, config);
    return response;
};

export const refreshAccessToken = async () => {
    const config = {
        withCredentials: true,
    };
    const response = await axios.get(`${API_BASE_URL}/refresh`, config);
    const newAccessToken = response.data.accessToken;
    return newAccessToken;
}

