"use client";

import ResumeReviewer from "@/components/ResumeReviewer";
import Link from "next/link";

export default function ResumeReviewerPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-400">
          <Link href="/" className="hover:text-blue-400">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">Resume Reviewer</span>
        </div>

        {/* Main Content */}
        <ResumeReviewer />
      </div>
    </main>
  );
}
