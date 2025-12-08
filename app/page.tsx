"use client";

import CompanionDisplay from "@/components/CompanionDisplay";
import ChatInterface from "@/components/ChatInterface";
import SideHustleGenerator from "@/components/SideHustleGenerator";

export default function Home() {
  return (
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
      </div>
    </main>
  );
}
