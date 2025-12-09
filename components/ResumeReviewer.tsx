"use client";

import { useState } from "react";
import { FileText, Upload, Sparkles, CheckCircle, XCircle } from "lucide-react";
import GradientIcon from "./GradientIcon";

export default function ResumeReviewer() {
  const [resumeText, setResumeText] = useState("");
  const [feedback, setFeedback] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!resumeText.trim()) return;
    
    setIsLoading(true);
    setFeedback(null);
    
    try {
      const response = await fetch('/api/resume-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText }),
      });
      
      const data = await response.json();
      if (data.feedback) {
        setFeedback(data.feedback);
      }
    } catch (error) {
      console.error('Error:', error);
      setFeedback({ error: "Failed to analyze resume. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 rounded-lg border border-slate-800 p-6 hover:border-cyan-500/50 transition-all duration-300">
        <div className="flex items-center gap-4 mb-6">
          <GradientIcon icon={FileText} gradient="from-cyan-400 to-blue-500" />
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              AI Resume Reviewer
            </h2>
            <p className="text-sm text-gray-400">Get instant feedback on your resume from AI</p>
          </div>
        </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Paste your resume text below:
          </label>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Copy and paste your resume content here..."
            className="w-full h-48 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <button
          onClick={handleAnalyze}
          disabled={isLoading || !resumeText.trim()}
          className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Sparkles className="w-5 h-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Analyze Resume
            </>
          )}
        </button>

        {feedback && (
          <div className="mt-6 p-6 bg-slate-800 border border-slate-700 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-300 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              AI Feedback
            </h3>
            
            {feedback.error ? (
              <p className="text-red-400">{feedback.error}</p>
            ) : (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Strengths
                  </h4>
                  <p className="text-gray-300 whitespace-pre-line">{feedback.strengths}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-yellow-400 mb-2 flex items-center gap-2">
                    <XCircle className="w-4 h-4" />
                    Areas for Improvement
                  </h4>
                  <p className="text-gray-300 whitespace-pre-line">{feedback.improvements}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Specific Recommendations
                  </h4>
                  <p className="text-gray-300 whitespace-pre-line">{feedback.recommendations}</p>
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <p className="text-sm text-gray-400 italic">
                    💡 Pro tip: Tailor your resume for each job application using keywords from the job description!
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
        <p className="text-xs text-gray-400">
          <strong>How to use:</strong> Copy your resume content (not PDF) and paste above. 
          Our AI will analyze formatting, content, keywords, and ATS compatibility to help you land more interviews.
        </p>
      </div>
  );
}
