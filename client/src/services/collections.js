import axios, { getHeaders } from "./axiosInstance";

const baseUrl = "/collections";

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

const create = async (newObject) => {
    const response = await axios.post(`${baseUrl}`, newObject, getHeaders());
    return response.data;
};

const remove = async (id) => {
    await axios.delete(`${baseUrl}/${id}`, getHeaders());
};

export default { getAll, getById, create, remove };
