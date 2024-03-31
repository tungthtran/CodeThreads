import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { refreshAccessToken } from "services/api/authService";
import { setAccessToken, setUser } from "services/state/slices/authSlice";
import { AppDispatch, RootState } from "services/state/store";

const useAxios = () => {
    const { accessToken } = useSelector((state: RootState) => state.auth);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const axiosInstance = axios.create();

    axiosInstance.interceptors.request.use(
        async (config) => {
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (response) => {
            console.log(response);
            return response;
        },
        async (error) => {
            const originalRequest = error.config;

            if (error.response.status === 403 && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const newAccessToken = await refreshAccessToken();
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    dispatch(setAccessToken(newAccessToken));
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    dispatch(setUser(null));
                    dispatch(setAccessToken(null));
                    navigate("/signin");
                }
            }
            return Promise.reject(error);
        }
    );
    return axiosInstance;
};

export default useAxios;
