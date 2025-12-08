"use client";

import { useTheme } from "./providers/ThemeProvider";
import { useState, useEffect } from "react";

export default function CompanionDisplay() {
  const { currentTheme } = useTheme();
  const [mood, setMood] = useState<'happy' | 'thinking' | 'excited'>('happy');

  const getCompanionEmoji = () => {
    switch (currentTheme.id) {
      case 'pixel-rpg':
        return mood === 'happy' ? '🗡️' : mood === 'thinking' ? '🛡️' : '⚔️';
      case 'anime':
        return mood === 'happy' ? '✨' : mood === 'thinking' ? '💭' : '🌸';
      case 'pet':
        return mood === 'happy' ? '🐾' : mood === 'thinking' ? '🐕' : '🦴';
      default:
        return '😊';
    }
  };

  const getCompanionMessage = () => {
    switch (currentTheme.id) {
      case 'pixel-rpg':
        return "Ready for adventure!";
      case 'anime':
        return "Let's have fun today!";
      case 'pet':
        return "Woof! Let's play!";
      default:
        return "Hello!";
    }
  };

  return (
    <div className={`${currentTheme.cardBg} rounded-lg p-6 shadow-lg`}>
      <div className="text-center">
        <div className="text-8xl mb-4 animate-float">
          {getCompanionEmoji()}
        </div>
        <h2 className={`text-2xl font-bold mb-2 ${currentTheme.accent}`}>
          Your Companion
        </h2>
        <p className="text-lg opacity-80">
          {getCompanionMessage()}
        </p>
        
        {/* Mood indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {(['happy', 'thinking', 'excited'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMood(m)}
              className={`px-3 py-1 rounded-full text-sm ${
                mood === m ? currentTheme.primary : 'bg-gray-300'
              } text-white`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
