import axios, { getHeaders } from "./axiosInstance";

const baseUrl = "/items";

const getAll = async () => {
    const response = await axios.get(baseUrl, {
        params: { limit: 5 },
    });
    return response.data;
};

const getById = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
};

const like = async (id) => {
    await axios.post(`${baseUrl}/${id}/like`, null, getHeaders());
};

export default { getAll, getById, like };
