import { useState, useEffect } from "react";

export function useTheme() {
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        if (typeof window !== "undefined") {
            return (localStorage.getItem("alvard-theme") as "light" | "dark") || "light";
        }
        return "light";
    });

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
        localStorage.setItem("alvard-theme", theme);
    }, [theme]);

    const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

    return { theme, toggleTheme };
}
