"use client";

import { useTheme } from "./providers/ThemeProvider";

export default function ThemeSwitcher() {
  const { currentTheme, setTheme, availableThemes } = useTheme();

  const colorClasses = {
    emerald: 'bg-emerald-600 hover:bg-emerald-500 ring-emerald-400',
    pink: 'bg-pink-600 hover:bg-pink-500 ring-pink-400',
    orange: 'bg-orange-600 hover:bg-orange-500 ring-orange-400',
  };

  return (
    <div className="flex gap-3">
      {availableThemes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => setTheme(theme.id)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            currentTheme.id === theme.id
              ? `${colorClasses[theme.color as keyof typeof colorClasses]} text-white ring-2 ring-offset-2 ring-offset-slate-950`
              : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
          }`}
        >
          {theme.name}
        </button>
      ))}
    </div>
  );
}
