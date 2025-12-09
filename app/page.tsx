import ModernHero from "@/components/ModernHero";
import KofiButton from "@/components/KofiButton";
import Link from "next/link";
import Script from "next/script";
import { getAllBlogPosts } from "@/lib/blog";
import LatestBlogPosts from "@/components/LatestBlogPosts";
import FadeInSection from "@/components/FadeInSection";

export default function Home() {
  const allPosts = getAllBlogPosts();
  const latestPosts = allPosts.slice(0, 2); // Get 2 newest posts
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
          {/* Quick Stats - Honest Value Props */}
          <FadeInSection>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-2">5 Tools</div>
                <p className="text-gray-400">Career & income boosters</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">AI-Powered</div>
                <p className="text-gray-400">Google Gemini technology</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-pink-400 mb-2">100%</div>
                <p className="text-gray-400">Free to use</p>
              </div>
            </div>
          </FadeInSection>

          {/* Featured Blog Posts */}
          <FadeInSection delay={0.2}>
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Latest Career Guides
              </h2>
              <LatestBlogPosts posts={latestPosts} />
            </div>
          </FadeInSection>

          {/* Ko-fi Support */}
          <FadeInSection delay={0.3}>
            <div className="text-center mb-12">
              <KofiButton />
            </div>
          </FadeInSection>

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
      </main>
    </>
  );
}
