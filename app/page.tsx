"use client";

import { useTheme } from "@/components/providers/ThemeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import CompanionDisplay from "@/components/CompanionDisplay";
import ChatInterface from "@/components/ChatInterface";
import MicroTools from "@/components/MicroTools";

export default function Home() {
  const { currentTheme } = useTheme();

  return (
    <main className={`min-h-screen ${currentTheme.background} ${currentTheme.text} transition-all duration-500`}>
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">AI Daily Companion Hub</h1>
          <ThemeSwitcher />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Companion Display */}
          <div className="lg:col-span-1">
            <CompanionDisplay />
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <ChatInterface />
          </div>
        </div>

        {/* Micro Tools */}
        <div className="mt-8">
          <MicroTools />
        </div>
      </div>
    </main>
  );
}
