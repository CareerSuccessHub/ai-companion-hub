import type { Metadata } from "next";
import { Sparkles, Target, TrendingUp, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about AI Student Success Hub - Free career mentorship and side hustle guidance for students",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-gray-100">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-blue-400">About AI Student Success Hub</h1>
        
        <div className="space-y-8 text-gray-300">
          
          <section className="bg-slate-900 rounded-lg p-6 border border-slate-800">
            <h2 className="text-2xl font-semibold text-blue-300 mb-4 flex items-center gap-2">
              <Target className="w-6 h-6" />
              Our Mission
            </h2>
            <p className="text-lg">
              Empowering students worldwide with free AI-powered career guidance, side hustle opportunities, 
              and the tools needed to achieve financial independence and professional success.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-300 mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              What We Offer
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                <h3 className="font-semibold text-blue-400 mb-2">🤖 AI Career Mentor</h3>
                <p className="text-sm">
                  24/7 access to professional career guidance powered by advanced AI technology
                </p>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                <h3 className="font-semibold text-blue-400 mb-2">💼 Side Hustle Generator</h3>
                <p className="text-sm">
                  Personalized income opportunities based on your skills and available time
                </p>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                <h3 className="font-semibold text-blue-400 mb-2">🎓 Student-Focused</h3>
                <p className="text-sm">
                  Everything designed specifically for college students and recent graduates
                </p>
              </div>
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                <h3 className="font-semibold text-blue-400 mb-2">🆓 100% Free</h3>
                <p className="text-sm">
                  All core features are free forever. No credit card required.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-300 mb-4">Why We Built This</h2>
            <p className="mb-4">
              As a student myself, I understand the challenges of balancing studies, finances, and career planning. 
              Traditional career counseling is expensive and often unavailable when you need it most.
            </p>
            <p className="mb-4">
              AI Student Success Hub was created to democratize access to quality career guidance. Whether you're 
              looking for your first side hustle, planning your career path, or seeking scholarship opportunities, 
              our AI mentor is here to help—free, anytime, anywhere.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-300 mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              How We Sustain This
            </h2>
            <p className="mb-4">
              To keep our services free for students, we use a sustainable business model:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Affiliate Partnerships:</strong> When you use platforms we recommend (like Fiverr or Skillshare), 
                we may earn a small commission at no extra cost to you
              </li>
              <li>
                <strong>Donations:</strong> Supporters can contribute via Ko-fi to help cover server and AI API costs
              </li>
              <li>
                <strong>Advertising:</strong> Relevant ads help fund development while keeping the core service free
              </li>
            </ul>
            <p className="mt-4 text-sm text-gray-400">
              We're committed to transparency. Every recommendation is based on genuine value, not just commission rates.
            </p>
          </section>

          <section className="bg-slate-900 rounded-lg p-6 border border-slate-800">
            <h2 className="text-2xl font-semibold text-blue-300 mb-4 flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-400" />
              Support Our Mission
            </h2>
            <p className="mb-4">
              If AI Student Success Hub has helped you, consider supporting us:
            </p>
            <ul className="space-y-2 mb-4">
              <li>☕ <a href="https://ko-fi.com/studentsuccesshub" className="text-blue-400 hover:underline">Buy us a coffee</a> - Every donation helps!</li>
              <li>📢 Share with fellow students who need career guidance</li>
              <li>⭐ Give us feedback to help us improve</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-300 mb-4">The Technology</h2>
            <p className="mb-2">Built with cutting-edge technology:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Google Gemini AI:</strong> Powers our intelligent career mentor</li>
              <li><strong>Next.js 14:</strong> Fast, modern web framework</li>
              <li><strong>Vercel:</strong> Reliable, global hosting</li>
              <li><strong>Open Source:</strong> Code available on GitHub</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-300 mb-4">Our Values</h2>
            <ul className="space-y-3">
              <li><strong>🎓 Students First:</strong> Every decision prioritizes student needs</li>
              <li><strong>💡 Transparency:</strong> Clear about affiliates, data, and operations</li>
              <li><strong>🌍 Accessibility:</strong> Free, fast, and available globally</li>
              <li><strong>📈 Continuous Improvement:</strong> Regular updates based on feedback</li>
            </ul>
          </section>

          <section className="text-center py-8">
            <h2 className="text-2xl font-semibold text-blue-300 mb-4">Join Thousands of Students</h2>
            <p className="mb-6">Start your journey to career success and financial freedom today.</p>
            <a 
              href="/" 
              className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Try AI Mentor Now →
            </a>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800">
          <a href="/" className="text-blue-400 hover:underline">← Back to Home</a>
        </div>
      </div>
    </main>
  );
}
