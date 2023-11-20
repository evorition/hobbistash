let token = null;

const setTheme = (theme) => {
    localStorage.setItem("theme", theme);
};

const getTheme = () => {
    const theme = localStorage.getItem("theme");
    if (theme) {
        return theme;
    }
    return null;
};

const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    token = user.token;
};

const getUser = () => {
    const user = localStorage.getItem("user");
    if (user) {
        return JSON.parse(user);
    }
    return null;
};

const removeUser = () => {
    localStorage.removeItem("user");
    token = null;
};

const getToken = () => token;

export default { getTheme, setTheme, setUser, getUser, removeUser, getToken };
