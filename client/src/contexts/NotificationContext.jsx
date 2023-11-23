import { createContext, useContext, useEffect, useState } from "react";

const NotificationContext = createContext();

const useNotification = () => useContext(NotificationContext);

const NotificationContextProvider = ({ children }) => {
    const [notificationMessage, setNotificationMessage] = useState(null);

    const displayNotification = (message) => {
        setNotificationMessage(message);
        setTimeout(() => {
            setNotificationMessage(null);
        }, 5000);
    };

    return (
        <NotificationContext.Provider
            value={{ notificationMessage, displayNotification }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export { useNotification, NotificationContextProvider };
