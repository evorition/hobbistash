import { createContext, useContext, useState } from "react";

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
        setUser(storedUser);
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
