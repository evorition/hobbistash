import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { BsMoon, BsSun } from "react-icons/bs";

const ThemeSwitcher = () => {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const prefersDarkMode = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        const initialTheme =
            localStorage.getItem("theme") ||
            (prefersDarkMode ? "dark" : "light");
        setTheme(initialTheme);
        localStorage.setItem("theme", initialTheme);
        applyTheme(initialTheme);
    }, []);

    const applyTheme = (selectedTheme) => {
        document.documentElement.setAttribute("data-bs-theme", selectedTheme);
    };

    const handleThemeChange = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
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
