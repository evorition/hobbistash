import Toast from "react-bootstrap/Toast";

import { useNotification } from "../contexts/NotificationContext";

const Notification = () => {
    const { notificationMessage } = useNotification();

    if (!notificationMessage) {
        return;
    }

    return (
        <Toast
            className="position-absolute start-50 translate-middle my-5"
            bg="danger"
        >
            <Toast.Body>{notificationMessage}</Toast.Body>
        </Toast>
    );
};

export default Notification;
