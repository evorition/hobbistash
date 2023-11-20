import axios from "axios";

import storage from "../utils/storage";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const errroMessage =
            error.response?.data?.message || "An error occured";
        return Promise.reject(errroMessage);
    }
);

export const getHeaders = () => {
    const token = storage.getToken();
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : null,
        },
    };
};

export default axios;
