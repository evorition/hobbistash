import { Routes, Route } from "react-router-dom";

import { useUser } from "./contexts/UserContext";
import Notification from "./components/Notification";
import Header from "./components/Header";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { useEffect } from "react";

const App = () => {
    const { loadUser } = useUser();

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <>
            <Header />
            <Notification />
            <Routes>
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/user/:userId" element={<UserPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
            </Routes>
        </>
    );
};

export default App;
