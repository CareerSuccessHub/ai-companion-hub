"use client";

import ModernHero from "@/components/ModernHero";
import FloatingChat from "@/components/FloatingChat";
import KofiButton from "@/components/KofiButton";
import Link from "next/link";
import Script from "next/script";

export default function Home() {
  return (
    <>
      {/* Structured Data for SEO */}
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "AI Career Success Hub",
            "description": "Free AI-powered career tools for job seekers and professionals",
            "url": "https://ai-companion-hub-self.vercel.app",
            "applicationCategory": "BusinessApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })
        }}
      />
      
      <main className="min-h-screen bg-slate-950 text-gray-100">
        {/* Hero Section */}
        <ModernHero />

        <div className="container mx-auto px-4 py-12 max-w-6xl">
          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">$15K+</div>
              <p className="text-gray-400">Average salary increase</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">10K+</div>
              <p className="text-gray-400">Users helped</p>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-pink-400 mb-2">100%</div>
              <p className="text-gray-400">Free forever</p>
            </div>
          </div>

          {/* Featured Blog Posts */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Latest Career Guides
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link
                href="/blog/salary-negotiation-script-15k-more"
                className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-blue-500/50 transition-all group"
              >
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                  How to Negotiate Your Salary: The Script That Got Me $15K More
                </h3>
                <p className="text-gray-400 mb-4">
                  Learn the exact script I used to negotiate $15,000 more...
                </p>
                <span className="text-blue-400 font-semibold">Read More →</span>
              </Link>
              <Link
                href="/blog/10-side-hustles-for-students-2025"
                className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-blue-500/50 transition-all group"
              >
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                  10 Best Side Hustles That Pay $1,000-5,000/Month in 2025
                </h3>
                <p className="text-gray-400 mb-4">
                  Discover profitable side hustle ideas that fit your schedule...
                </p>
                <span className="text-blue-400 font-semibold">Read More →</span>
              </Link>
            </div>
          </div>

          {/* Ko-fi Support */}
          <div className="text-center mb-12">
            <KofiButton />
          </div>

          {/* Footer */}
          <footer className="pt-8 border-t border-slate-800 text-center text-gray-500">
            <div className="flex flex-wrap justify-center gap-6 mb-4">
              <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
              <Link href="/about" className="hover:text-gray-300 transition-colors">About</Link>
            </div>
            <p>© {new Date().getFullYear()} AI Career Hub. All rights reserved.</p>
          </footer>
        </div>

        {/* Floating Chat Button */}
        <FloatingChat />
      </main>
    </>
  );
}
