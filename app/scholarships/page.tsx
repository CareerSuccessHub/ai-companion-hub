"use client";

import ScholarshipDatabase from "@/components/ScholarshipDatabase";
import Link from "next/link";
import { motion } from "framer-motion";
import { motion } from "framer-motion";

export default function ScholarshipsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-4">
            Scholarship Finder 🎓
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Discover scholarships worth thousands of dollars. Updated regularly.
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <div className="bg-slate-800 px-4 py-2 rounded-full border border-slate-700">
              <span className="text-gray-400">Total Value:</span>{" "}
              <span className="text-green-400 font-bold">$200,000+</span>
            </div>
            <div className="bg-slate-800 px-4 py-2 rounded-full border border-slate-700">
              <span className="text-gray-400">Scholarships:</span>{" "}
              <span className="text-blue-400 font-bold">10+ Curated</span>
            </div>
            <div className="bg-slate-800 px-4 py-2 rounded-full border border-slate-700">
              <span className="text-gray-400">Updated:</span>{" "}
              <span className="text-purple-400 font-bold">Weekly</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <ScholarshipDatabase />

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Need Help With Your Scholarship Application?
          </h2>
          <p className="text-blue-100 mb-6">
            Use our AI-powered tools to perfect your resume and essays
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/#resume-reviewer"
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              AI Resume Reviewer
            </Link>
            <Link
              href="/#ai-mentor"
              className="px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors border-2 border-white"
            >
              Chat With AI Mentor
            </Link>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
