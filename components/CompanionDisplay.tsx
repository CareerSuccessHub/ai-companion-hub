"use client";

import { useState } from "react";

export default function CompanionDisplay() {
  const [mood, setMood] = useState<'focused' | 'motivated' | 'planning'>('focused');

  const states = {
    focused: { emoji: '🎯', msg: 'Ready to help you succeed' },
    motivated: { emoji: '💪', msg: 'Let\'s achieve your goals' },
    planning: { emoji: '📊', msg: 'Strategizing your next move' },
  };

  const current = states[mood];

  return (
    <div className="bg-slate-900 rounded-lg p-6 border border-slate-800">
      <div className="text-center">
        <div className="text-8xl mb-4">{current.emoji}</div>
        <h2 className="text-2xl font-bold mb-2 text-blue-400">Your AI Mentor</h2>
        <p className="text-gray-400 mb-6">{current.msg}</p>
        
        <div className="flex justify-center gap-2">
          {(['focused', 'motivated', 'planning'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMood(m)}
              className={`px-3 py-1 rounded-full text-sm font-medium capitalize transition-all ${
                mood === m
                  ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                  : 'bg-slate-800 text-gray-400 hover:bg-slate-700'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
