import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

import storage from "../utils/storage";

const UserContext = createContext();

const useUser = () => useContext(UserContext);

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const saveUser = (newUser) => {
        storage.setUser(newUser);
        setUser(newUser);
    };

    const loadUser = () => {
        const storedUser = storage.getUser();
        if (storedUser) {
            const decodedToken = jwtDecode(storedUser.accessToken);
            const expirationDate = decodedToken.exp * 1000;
            const currentTime = Date.now();
            if (expirationDate < currentTime) {
                storage.removeUser();
            } else {
                setUser(storedUser);
            }
        }
    };

    const signOut = () => {
        storage.removeUser();
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, saveUser, loadUser, signOut }}>
            {children}
        </UserContext.Provider>
    );
};

export { useUser, UserContextProvider };
