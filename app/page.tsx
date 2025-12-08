"use client";

import CompanionDisplay from "@/components/CompanionDisplay";
import ChatInterface from "@/components/ChatInterface";
import SideHustleGenerator from "@/components/SideHustleGenerator";
import ResumeReviewer from "@/components/ResumeReviewer";
import KofiButton from "@/components/KofiButton";
import AdPlaceholder from "@/components/AdPlaceholder";
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
            "name": "AI Student Success Hub",
            "description": "Free AI-powered career mentor for students with side hustle ideas and scholarships",
            "url": "https://ai-companion-hub.vercel.app",
            "applicationCategory": "EducationalApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "150"
            }
          })
        }}
      />
      
      <main className="min-h-screen bg-slate-950 text-gray-100">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-blue-400">
              AI Student Success Hub
            </h1>
            <p className="text-gray-400 text-lg">Your AI mentor for career growth, side income, and success</p>
          </header>

          {/* Top Ad Banner */}
          <div className="mb-6">
            <AdPlaceholder size="banner" />
          </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Companion */}
          <div className="lg:col-span-1">
            <CompanionDisplay />
            
            {/* Ko-fi Support Button */}
            <div className="mt-6">
              <KofiButton />
            </div>
          </div>
          
          {/* Center - Chat */}
          <div className="lg:col-span-2">
            <ChatInterface />
          </div>
          
          {/* Right Sidebar - Ads */}
          <div className="lg:col-span-1 space-y-6">
            <AdPlaceholder size="square" label="Sponsored" />
            <AdPlaceholder size="square" label="Sponsored" />
          </div>
        </div>

        {/* Side Hustle Generator */}
        <div className="mt-8">
          <SideHustleGenerator />
        </div>

        {/* Resume Reviewer */}
        <div className="mt-8">
          <ResumeReviewer />
        </div>

        {/* Affiliate Disclosure */}
        <div className="mt-12 p-4 bg-slate-900 border border-slate-800 rounded-lg text-center">
          <p className="text-xs text-gray-500">
            <strong>Affiliate Disclosure:</strong> This site contains affiliate links. 
            We may earn a commission when you click or make purchases through these links, 
            at no additional cost to you. This helps keep our platform free for students. 
            We only recommend services we believe in. Learn more in our{" "}
            <a href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</a>.
          </p>
        </div>

        {/* Footer with SEO keywords */}
        <footer className="mt-16 pt-8 border-t border-slate-800 text-center text-gray-500 text-sm">
          <p className="mb-4">
            Free AI career mentor for students • Side hustle ideas • Scholarship finder • Job opportunities • Freelance guidance
          </p>
          <div className="mb-4 flex flex-wrap justify-center gap-4">
            <a href="/about" className="hover:text-blue-400 transition-colors">About</a>
            <a href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</a>
            <a href="https://ko-fi.com/studentsuccesshub" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Support Us</a>
          </div>
          <p>© 2025 AI Student Success Hub. Empowering students to achieve financial freedom.</p>
        </footer>
      </div>
    </main>
    </>
  );
}
