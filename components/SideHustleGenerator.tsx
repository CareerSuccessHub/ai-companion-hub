"use client";

import { useState } from "react";
import { Sparkles, TrendingUp, DollarSign, Rocket } from "lucide-react";
import GradientIcon from "./GradientIcon";
import { motion } from "framer-motion";
import GuidedTour, { TourStep } from "./GuidedTour";

export default function SideHustleGenerator() {
  const [skills, setSkills] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const tourSteps: TourStep[] = [
    {
      id: "step-1",
      title: "Step 1: Enter Your Skills",
      description: "Tell us about your skills, interests, or expertise. Be specific! For example: 'video editing', 'graphic design', 'Python programming', 'photography', or 'content writing'. The more detail, the better your personalized ideas.",
      target: "skills-input",
      position: "bottom",
    },
    {
      id: "step-2",
      title: "Step 2: Generate Ideas",
      description: "Click this button to get AI-powered side hustle ideas tailored to your skills. You'll receive personalized opportunities with earning potential, time requirements, and platforms to get started.",
      target: "generate-button",
      position: "bottom",
    },
    {
      id: "step-3",
      title: "Step 3: Explore Your Opportunities",
      description: "Your personalized side hustle ideas appear here with earnings potential, time requirements, starting steps, and direct links to platforms. Pick one that fits your schedule and start earning!",
      target: "results-section",
      position: "top",
    },
  ];

  const handleGenerate = async () => {
    if (!skills.trim()) return;
    
    setIsLoading(true);
    console.log('🔍 Requesting suggestions for skills:', skills);
    
    try {
      const response = await fetch('/api/side-hustle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skills }),
      });
      
      console.log('📡 API Response status:', response.status);
      
      const data = await response.json();
      console.log('📦 API Response data:', data);
      
      if (data.suggestions) {
        console.log('✅ Got', data.suggestions.length, 'suggestions');
        console.log('🔍 Source:', data.source || 'unknown');
        if (data.aiError) {
          console.error('⚠️ AI failed with error:', data.aiError);
        }
        console.log('📋 Suggestions:', data.suggestions);
        setSuggestions(data.suggestions);
      } else if (data.error) {
        console.error('❌ API returned error:', data.error);
      }
    } catch (error) {
      console.error('❌ Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
      className="bg-slate-900 rounded-lg border border-slate-800 p-6 hover:border-pink-500/50 transition-all duration-300"
    >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <GradientIcon icon={Rocket} gradient="from-pink-400 to-rose-500" />
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-rose-500 bg-clip-text text-transparent">
                Side Hustle Generator
              </h2>
            </div>
          </div>
          <GuidedTour
            steps={tourSteps}
            storageKey="side-hustle-tour"
            autoShowOnFirstVisit={true}
          />
        </div>
        <p className="text-gray-400 mb-6">
          Get personalized side income ideas based on your skills and available time
        </p>

      <div className="space-y-4 mb-6">
        <div data-tour-target="skills-input">
          <label className="block text-sm font-medium mb-2">Your Skills or Interests</label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="e.g., video editing, graphic design, programming, photography, writing..."
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">Be specific! The more detail you provide, the better the AI suggestions.</p>
        </div>

        <button
          data-tour-target="generate-button"
          onClick={handleGenerate}
          disabled={isLoading || !skills.trim()}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 disabled:opacity-50 font-medium flex items-center justify-center gap-2"
        >
          <TrendingUp size={20} />
          {isLoading ? 'Generating Custom Ideas...' : 'Generate Side Hustle Ideas'}
        </button>
      </div>

      {/* Results section - always rendered for tour */}
      <div
        data-tour-target="results-section"
        className={suggestions.length > 0 ? "space-y-4" : "min-h-[100px] flex items-center justify-center text-gray-500 text-sm border border-dashed border-slate-700 rounded-lg"}
      >
        {suggestions.length > 0 ? (
          <>
            <h3 className="text-lg font-semibold mb-3">Your Personalized Opportunities:</h3>
            {suggestions.map((suggestion, index) => (
              <div key={index} className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-blue-500/50 transition-all">
                <div className="flex items-start gap-3">
                  <DollarSign className="text-green-400 mt-1 flex-shrink-0" size={20} />
                  <div className="flex-1">
                    <h4 className="font-semibold text-blue-300 mb-2">{suggestion.title}</h4>
                    {suggestion.aiReason && (
                      <p className="text-pink-300 text-xs mb-2 italic">
                        ✨ {suggestion.aiReason}
                      </p>
                    )}
                    <p className="text-gray-300 text-sm mb-3">{suggestion.description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded">
                        💰 {suggestion.potential}
                      </span>
                      <span className="text-xs bg-slate-700 text-gray-300 px-2 py-1 rounded">
                        ⏱️ {suggestion.timeRequired}
                      </span>
                    </div>
                    {suggestion.startingSteps && (
                      <div className="mb-3 p-2 bg-blue-900/20 border border-blue-800/50 rounded text-xs text-blue-200">
                        <strong>Quick Start:</strong> {suggestion.startingSteps}
                      </div>
                    )}
                    {suggestion.platforms && (
                      <div className="flex flex-wrap gap-2">
                        {suggestion.platforms.map((platform: any, i: number) => (
                          <a
                            key={i}
                            href={platform.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs bg-green-900/30 text-green-300 px-3 py-1 rounded hover:bg-green-900/50 transition flex items-center gap-1"
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
          </>
        ) : (
          <p>Your personalized side hustle ideas will appear here</p>
        )}
      </div>
    </motion.div>
  );
}
