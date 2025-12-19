"use client";

import { useState } from "react";
import { DollarSign, TrendingUp, Sparkles } from "lucide-react";
import GradientIcon from "./GradientIcon";
import { motion } from "framer-motion";
import MarkdownRenderer from "./MarkdownRenderer";
import GuidedTour, { TourStep } from "./GuidedTour";
import ToolCapabilities from "./ToolCapabilities";
import ApiQuotaModal from "./ApiQuotaModal";

export default function SalaryNegotiator() {
  const [jobTitle, setJobTitle] = useState("");
  const [currentOffer, setCurrentOffer] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [script, setScript] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showQuotaModal, setShowQuotaModal] = useState(false);

  const loadSampleData = () => {
    setJobTitle("Software Engineer");
    setCurrentOffer("$95,000");
    setExperience("3 years");
    setLocation("San Francisco, CA");
  };

  const tourSteps: TourStep[] = [
    {
      id: "step-1",
      title: "Step 1: Enter Job Details",
      description: "Fill in your job title, current offer, experience level, and location. The more details you provide, the more personalized your negotiation script will be. Only Job Title and Offer Amount are required.",
      target: "salary-inputs",
      position: "bottom",
    },
    {
      id: "step-2",
      title: "Step 2: Generate Your Script",
      description: "Click this button to generate a personalized salary negotiation script powered by AI. It will provide professional talking points, market data references, and help you confidently ask for $5K-20K more.",
      target: "generate-button",
      position: "bottom",
    },
    {
      id: "step-3",
      title: "Step 3: Practice Your Script",
      description: "Your personalized negotiation script appears here. Read it carefully, practice out loud 3-5 times, and customize it to match your style. Remember: be confident, collaborative, and know your worth!",
      target: "results-section",
      position: "top",
    },
  ];

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
      
      // Check for quota errors
      if (!response.ok && (response.status === 429 || data.error?.includes('quota') || data.error?.includes('limit'))) {
        setShowQuotaModal(true);
        return;
      }
      
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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <GradientIcon icon={DollarSign} gradient="from-emerald-400 to-green-500" />
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                AI Salary Negotiation Coach
              </h2>
              <p className="text-sm text-gray-400">Get personalized scripts to negotiate $5K-20K more</p>
            </div>
          </div>
          <GuidedTour
            steps={tourSteps}
            storageKey="salary-negotiator-tour"
            autoShowOnFirstVisit={true}
          />
        </div>

      <ToolCapabilities
        canDo={[
          "Generate personalized negotiation scripts with talking points",
          "Help you confidently ask for $5K-20K more",
          "Provide market rate references and data points",
          "Give professional phrasing for tricky conversations"
        ]}
        cantDo={[
          "Guarantee you'll get the higher salary you request",
          "Replace professional salary negotiation coaches",
          "Provide legal or financial advice on contracts"
        ]}
      />

      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs text-gray-500">Fill in your job details below:</p>
        <button
          onClick={loadSampleData}
          className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-800 transition-colors"
          aria-label="Load sample data"
        >
          <Sparkles className="w-3 h-3" />
          Try Sample Data
        </button>
      </div>

      <div data-tour-target="salary-inputs" className="grid md:grid-cols-2 gap-4 mb-6">
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
      <p className="text-xs text-gray-500 flex items-center gap-1 -mt-2 mb-6">
        <span>🔒</span>
        <span>Your info stays private — we don&apos;t store your personal data!</span>
      </p>

      <button
        data-tour-target="generate-button"
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

      {/* Results section - always rendered for tour */}
      <div
        data-tour-target="results-section"
        className={script ? "mt-6 p-6 bg-slate-800 border border-green-700 rounded-lg" : "mt-6 min-h-[100px] flex items-center justify-center text-gray-500 text-sm border border-dashed border-slate-700 rounded-lg"}
      >
        {script ? (
          <>
            <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Your Personalized Negotiation Script
            </h3>
            <MarkdownRenderer content={script} />
          </>
        ) : (
          <p>Your personalized negotiation script will appear here</p>
        )}
      </div>

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

      <ApiQuotaModal
        isOpen={showQuotaModal}
        onClose={() => setShowQuotaModal(false)}
        toolName="Salary Negotiation Coach"
      />
    </motion.div>
  );
}
