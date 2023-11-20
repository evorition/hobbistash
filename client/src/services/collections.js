import axios, { getHeaders } from "./axiosInstance";

const baseUrl = "/collections";

const getAll = async () => {
    const response = await axios.get(baseUrl, {
        params: { limit: 5 },
    });
    return response.data;
};

export default { getAll };
