import { useEffect, useState } from "react";

export default function useDarkMode() {
  const [currentTheme, setTheme] = useState("light");
  const colorTheme = currentTheme === "dark" ? "light" : "dark";
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(currentTheme);
  }, [currentTheme, colorTheme]);
  return [setTheme, colorTheme, currentTheme];
}
