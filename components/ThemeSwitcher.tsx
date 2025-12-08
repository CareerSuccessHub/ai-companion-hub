"use client";

import { useTheme } from "./providers/ThemeProvider";

export default function ThemeSwitcher() {
  const { currentTheme, setTheme, availableThemes } = useTheme();

  return (
    <div className={`${currentTheme.cardBg} rounded-lg p-4 shadow-lg`}>
      <h3 className="text-sm font-semibold mb-3">Switch Theme</h3>
      <div className="flex gap-2">
        {availableThemes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => setTheme(theme.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              currentTheme.id === theme.id
                ? `${theme.primary} text-white`
                : `${currentTheme.cardBg} hover:opacity-80`
            }`}
          >
            {theme.name}
          </button>
        ))}
      </div>
    </div>
  );
}
