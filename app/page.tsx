"use client";

import CompanionDisplay from "@/components/CompanionDisplay";
import ChatInterface from "@/components/ChatInterface";
import SideHustleGenerator from "@/components/SideHustleGenerator";
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

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <CompanionDisplay />
          </div>
          <div className="lg:col-span-2">
            <ChatInterface />
          </div>
        </div>

        {/* Side Hustle Generator */}
        <div className="mt-8">
          <SideHustleGenerator />
        </div>

        {/* Footer with SEO keywords */}
        <footer className="mt-16 pt-8 border-t border-slate-800 text-center text-gray-500 text-sm">
          <p className="mb-4">
            Free AI career mentor for students • Side hustle ideas • Scholarship finder • Job opportunities • Freelance guidance
          </p>
          <p>© 2025 AI Student Success Hub. Empowering students to achieve financial freedom.</p>
        </footer>
      </div>
    </main>
    </>
  );
}
