"use client";

import SalaryNegotiator from "@/components/SalaryNegotiator";
import Link from "next/link";

// SEO metadata is in metadata.ts for this route

export default function SalaryNegotiatorPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-400">
          <Link href="/" className="hover:text-blue-400">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/tools/salary-negotiator" className="hover:text-blue-400">Tools</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">Salary Negotiator</span>
        </div>

        {/* Main Content */}
        <SalaryNegotiator />
      </div>
    </main>
  );
}
