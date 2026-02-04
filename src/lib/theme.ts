export type Theme = "light" | "dark";

const STORAGE_KEY = "techradar_theme";

export function getInitialTheme(): Theme {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored === "light" || stored === "dark") {
      return stored;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return "light";
}

export function setTheme(theme: Theme): void {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
  localStorage.setItem(STORAGE_KEY, theme);
}

export function toggleTheme(): Theme {
  const current = getInitialTheme();
  const next = current === "light" ? "dark" : "light";
  setTheme(next);
  return next;
}
