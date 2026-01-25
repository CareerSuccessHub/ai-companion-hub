"use client";

import SideHustleGenerator from "@/components/SideHustleGenerator";
import Link from "next/link";

export default function SideHustlePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-400">
          <Link href="/" className="hover:text-blue-400">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">Side Hustle Generator</span>
        </div>

        {/* Main Content */}
        <SideHustleGenerator />
      </div>
    </main>
  );
}
