"use client";

import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="header-btn"
      title="Toggle theme"
    >
      {theme === "dark" ? (
        <FiSun className="header-btn-icon" />
      ) : (
        <FiMoon className="header-btn-icon" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
