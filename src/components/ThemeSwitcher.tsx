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
        className="p-2 rounded-full transition-colors bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20"
      >
        {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
      </button>
  );
};

export default ThemeSwitcher;