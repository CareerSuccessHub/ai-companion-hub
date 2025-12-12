"use client";

import { useState } from "react";
import { DollarSign, TrendingUp, Sparkles } from "lucide-react";
import GradientIcon from "./GradientIcon";
import { motion } from "framer-motion";
import MarkdownRenderer from "./MarkdownRenderer";

export default function SalaryNegotiator() {
  const [jobTitle, setJobTitle] = useState("");
  const [currentOffer, setCurrentOffer] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [script, setScript] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateScript = async () => {
    if (!jobTitle || !currentOffer) {
      alert("Please fill in at least Job Title and Current Offer");
      return;
    }

    setIsLoading(true);
    setScript("");

    try {
      const response = await fetch("/api/salary-negotiation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle,
          currentOffer,
          experience: experience || "0-2 years",
          location: location || "Remote",
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        setScript("Error generating script. Please try again.");
      } else {
        setScript(data.script);
      }
    } catch (error) {
      setScript("Failed to generate script. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      className="bg-slate-900 rounded-lg border border-slate-800 p-6 hover:border-emerald-500/50 transition-all duration-300"
    >
        <div className="flex items-center gap-4 mb-6">
          <GradientIcon icon={DollarSign} gradient="from-emerald-400 to-green-500" />
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              AI Salary Negotiation Coach
            </h2>
            <p className="text-sm text-gray-400">Get personalized scripts to negotiate $5K-20K more</p>
          </div>
        </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Job Title *
          </label>
          <input
            type="text"
            placeholder="e.g. Software Engineer, Marketing Manager"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Current Offer Amount *
          </label>
          <input
            type="text"
            placeholder="e.g. $75,000"
            value={currentOffer}
            onChange={(e) => setCurrentOffer(e.target.value)}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Years of Experience
          </label>
          <input
            type="text"
            placeholder="e.g. 3 years"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Location/Market
          </label>
          <input
            type="text"
            placeholder="e.g. San Francisco, Remote"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      <button
        onClick={generateScript}
        disabled={isLoading}
        className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Sparkles className="w-5 h-5 animate-spin" />
            Generating Your Script...
          </>
        ) : (
          <>
            <TrendingUp className="w-5 h-5" />
            Generate Negotiation Script
          </>
        )}
      </button>

      {script && (
        <div className="mt-6 p-6 bg-slate-800 border border-green-700 rounded-lg">
          <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Your Personalized Negotiation Script
          </h3>
          <MarkdownRenderer content={script} />
        </div>
      )}

      <div className="mt-6 bg-green-900/20 border border-green-800/50 rounded-lg p-4">
        <h3 className="text-sm font-bold text-green-300 mb-2">💡 Pro Tips:</h3>
        <ul className="text-xs text-gray-300 space-y-1">
          <li>✅ Research market rates on Glassdoor/Levels.fyi first</li>
          <li>✅ Negotiate BEFORE signing - you have the most leverage now</li>
          <li>✅ Be confident but collaborative - you&apos;re excited to join!</li>
          <li>✅ Ask for 10-20% more than you actually want (room to negotiate)</li>
          <li>✅ Practice your script out loud 3-5 times before the call</li>
        </ul>
      </div>
    </motion.div>
  );
}
