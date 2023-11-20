import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import { NotificationContextProvider } from "./contexts/NotificationContext.jsx";
import { UserContextProvider } from "./contexts/UserContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <NotificationContextProvider>
            <UserContextProvider>
                <App />
            </UserContextProvider>
        </NotificationContextProvider>
    </BrowserRouter>
);
