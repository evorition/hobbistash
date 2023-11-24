import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { useUser } from "./contexts/UserContext";
import Notification from "./components/Notification";
import Header from "./components/Header";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import CollectionPage from "./pages/CollectionPage";
import NewCollectionPage from "./pages/NewCollectionPage";
import NewItemPage from "./pages/NewItemPage";
import ItemPage from "./pages/ItemPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

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
                <Route
                    path="/collection/:collectionId"
                    element={<CollectionPage />}
                />
                <Route path="/collection/new" element={<NewCollectionPage />} />
                <Route
                    path="/collection/:collectionId/add-item"
                    element={<NewItemPage />}
                />
                <Route path="/item/:itemId" element={<ItemPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
            </Routes>
        </>
    );
};

export default App;
