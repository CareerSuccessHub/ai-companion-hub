"use client";

import { useState } from "react";
import { Sparkles, TrendingUp, DollarSign, Rocket } from "lucide-react";
import GradientIcon from "./GradientIcon";

export default function SideHustleGenerator() {
  const [skills, setSkills] = useState("");
  const [timeAvailable, setTimeAvailable] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!skills.trim()) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/side-hustle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skills, timeAvailable }),
      });
      
      const data = await response.json();
      if (data.suggestions) {
        setSuggestions(data.suggestions);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 rounded-lg border border-slate-800 p-6 hover:border-pink-500/50 transition-all duration-300">
        <div className="flex items-center gap-4 mb-4">
          <GradientIcon icon={Rocket} gradient="from-pink-400 to-rose-500" />
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent">
              Side Hustle Generator
            </h2>
          </div>
        </div>
        <p className="text-gray-400 mb-6">
          Get personalized side income ideas based on your skills and available time
        </p>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Your Skills</label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="e.g., coding, design, writing, video editing..."
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Time Available Per Week</label>
          <select
            value={timeAvailable}
            onChange={(e) => setTimeAvailable(e.target.value)}
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select time...</option>
            <option value="1-5 hours">1-5 hours</option>
            <option value="5-10 hours">5-10 hours</option>
            <option value="10-20 hours">10-20 hours</option>
            <option value="20+ hours">20+ hours</option>
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading || !skills.trim()}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 disabled:opacity-50 font-medium flex items-center justify-center gap-2"
        >
          <TrendingUp size={20} />
          {isLoading ? 'Generating...' : 'Generate Side Hustle Ideas'}
        </button>
      </div>

      {suggestions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-3">Your Personalized Opportunities:</h3>
          {suggestions.map((suggestion, index) => (
            <div key={index} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <div className="flex items-start gap-3">
                <DollarSign className="text-green-400 mt-1" size={20} />
                <div className="flex-1">
                  <h4 className="font-semibold text-blue-300 mb-2">{suggestion.title}</h4>
                  <p className="text-gray-300 text-sm mb-3">{suggestion.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded">
                      💰 {suggestion.potential}
                    </span>
                    <span className="text-xs bg-slate-700 text-gray-300 px-2 py-1 rounded">
                      ⏱️ {suggestion.timeRequired}
                    </span>
                  </div>
                  {suggestion.platforms && (
                    <div className="flex flex-wrap gap-2">
                      {suggestion.platforms.map((platform: any, i: number) => (
                        <a
                          key={i}
                          href={platform.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs bg-green-900/30 text-green-300 px-3 py-1 rounded hover:bg-green-900/50 transition"
                        >
                          Start on {platform.name} →
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
