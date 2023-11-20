import axios from "./axiosInstance";

const baseUrl = "/auth";

const signup = async (username, email, password) => {
    await axios.post(`${baseUrl}/signup`, { username, email, password });
};

const signin = async (email, password) => {
    const response = await axios.post(`${baseUrl}/signin`, { email, password });
    return response.data;
};

export default { signup, signin };
