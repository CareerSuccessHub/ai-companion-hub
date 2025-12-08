"use client";

import { useTheme } from "./providers/ThemeProvider";
import { Calendar, Clock, Calculator, CheckSquare } from "lucide-react";

export default function MicroTools() {
  const { currentTheme } = useTheme();

  const tools = [
    {
      id: 'reminder',
      name: 'Daily Reminder',
      icon: <Calendar size={24} />,
      description: 'Set reminders',
    },
    {
      id: 'timer',
      name: 'Timer',
      icon: <Clock size={24} />,
      description: 'Pomodoro timer',
    },
    {
      id: 'calculator',
      name: 'Calculator',
      icon: <Calculator size={24} />,
      description: 'Quick math',
    },
    {
      id: 'todo',
      name: 'To-Do List',
      icon: <CheckSquare size={24} />,
      description: 'Track tasks',
    },
  ];

  return (
    <div className={`${currentTheme.cardBg} rounded-lg p-6 shadow-lg`}>
      <h2 className="text-2xl font-bold mb-4">Micro Tools</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tools.map((tool) => (
          <button
            key={tool.id}
            className={`${currentTheme.cardBg} hover:${currentTheme.primary} hover:text-white transition-all p-4 rounded-lg border-2 border-gray-300 hover:border-transparent group`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-2 group-hover:scale-110 transition-transform">
                {tool.icon}
              </div>
              <h3 className="font-semibold">{tool.name}</h3>
              <p className="text-xs opacity-70 mt-1">{tool.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
