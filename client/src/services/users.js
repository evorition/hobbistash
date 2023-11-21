import axios from "./axiosInstance";

const baseUrl = "/users";

const getById = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
};

export default { getById };
