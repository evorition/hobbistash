import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { BsMoon, BsSun } from "react-icons/bs";

import storage from "../utils/storage";

const ThemeSwitcher = () => {
    const [theme, setTheme] = useState("light");

    const applyTheme = (newTheme) => {
        document.documentElement.setAttribute("data-bs-theme", newTheme);
    };

    useEffect(() => {
        const prefersDarkMode = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        const initialTheme =
            storage.getTheme() || (prefersDarkMode ? "dark" : "light");
        storage.setTheme(initialTheme);
        setTheme(initialTheme);
        applyTheme(initialTheme);
    }, []);

    const handleThemeChange = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        storage.setTheme(newTheme);
        setTheme(newTheme);
        applyTheme(newTheme);
    };

    return (
        <Button
            variant="outline"
            className="d-inline-flex align-items-center"
            onClick={handleThemeChange}
        >
            {theme === "light" ? <BsSun /> : <BsMoon />}
        </Button>
    );
};

export default ThemeSwitcher;
