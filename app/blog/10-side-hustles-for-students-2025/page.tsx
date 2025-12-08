import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "10 Best Side Hustles for College Students in 2025 | AI Student Success Hub",
  description: "Discover the top 10 profitable side hustles for college students. Learn how to earn $500-2000/month while balancing studies. Real income potential and getting started tips.",
  keywords: ["side hustles for students", "college side jobs", "student income ideas", "make money in college", "freelance for students"],
};

export default function SideHustlesPost() {
  return (
    <main className="min-h-screen bg-slate-950 text-gray-100">
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/blog" className="inline-flex items-center text-blue-400 hover:underline mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              December 9, 2025
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              8 min read
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-400">
            10 Best Side Hustles for College Students in 2025
          </h1>

          <p className="text-xl text-gray-300 leading-relaxed">
            Balancing college and finances is tough. These proven side hustles can help you earn $500-2000/month 
            without sacrificing your studies. Real opportunities, real income potential.
          </p>
        </header>

        <div className="prose prose-invert prose-blue max-w-none">
          
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-blue-300 mb-4">Why Side Hustles Matter for Students</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Student loans are piling up, tuition keeps rising, and ramen gets old fast. A side hustle isn&apos;t 
              just about extra cash—it&apos;s about building skills, gaining experience, and creating financial freedom 
              while you&apos;re still in school.
            </p>
            <p className="text-gray-300 leading-relaxed">
              The best part? Many of these side hustles can turn into full-time careers after graduation. You&apos;re 
              not just earning money; you&apos;re building your future.
            </p>
          </section>

          <section className="mb-12 p-6 bg-blue-900/20 border border-blue-800/50 rounded-lg">
            <h3 className="text-xl font-bold text-blue-300 mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Quick Stats
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Average student earns <strong>$500-1500/month</strong> from side hustles</li>
              <li>• <strong>73% of students</strong> have some form of side income</li>
              <li>• Most profitable: <strong>Freelancing, tutoring, content creation</strong></li>
              <li>• Time investment: <strong>5-20 hours/week</strong></li>
            </ul>
          </section>

          <h2 className="text-3xl font-bold text-blue-300 mb-6">The Top 10 Side Hustles</h2>

          <div className="space-y-10">
            
            {/* Side Hustle 1 */}
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-2xl font-bold text-gray-100 mb-3">1. Freelance Web Development 💻</h3>
              <p className="text-lg font-semibold text-blue-400 mb-3">Income Potential: $25-100/hour</p>
              <p className="text-gray-300 mb-4">
                If you know HTML, CSS, JavaScript, or frameworks like React, businesses will pay you well. 
                Build websites for local businesses, create landing pages, or fix bugs for startups.
              </p>
              <div className="bg-slate-900 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold text-gray-200 mb-2">Getting Started:</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Create portfolio with 2-3 sample projects</li>
                  <li>• Sign up on Fiverr, Upwork, Freelancer</li>
                  <li>• Start with $20-30/hour, increase as you gain reviews</li>
                  <li>• Offer simple websites first (landing pages, portfolios)</li>
                </ul>
              </div>
            </div>

            {/* Side Hustle 2 */}
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-2xl font-bold text-gray-100 mb-3">2. Online Tutoring 📚</h3>
              <p className="text-lg font-semibold text-green-400 mb-3">Income Potential: $15-40/hour</p>
              <p className="text-gray-300 mb-4">
                Excel in math, science, or English? Help high school or college students while earning great money. 
                Flexible hours, work from anywhere, and it looks amazing on your resume.
              </p>
              <div className="bg-slate-900 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold text-gray-200 mb-2">Best Platforms:</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Tutor.com - General subjects</li>
                  <li>• Chegg Tutors - College-level help</li>
                  <li>• Wyzant - Set your own rates</li>
                  <li>• Local Facebook groups - No platform fees</li>
                </ul>
              </div>
            </div>

            {/* Side Hustle 3 */}
            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-2xl font-bold text-gray-100 mb-3">3. Graphic Design Services 🎨</h3>
              <p className="text-lg font-semibold text-purple-400 mb-3">Income Potential: $20-80/hour</p>
              <p className="text-gray-300 mb-4">
                Know Figma, Canva, or Adobe? Businesses need logos, social media graphics, flyers, and branding. 
                Quick projects, high demand, and you can work on your own schedule.
              </p>
              <div className="bg-slate-900 p-4 rounded-lg mb-4">
                <p className="text-sm font-semibold text-gray-200 mb-2">Top Services to Offer:</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Logo design ($50-200 per logo)</li>
                  <li>• Social media templates ($30-100/set)</li>
                  <li>• Business cards & flyers ($25-75 each)</li>
                  <li>• Brand identity packages ($200-1000+)</li>
                </ul>
              </div>
            </div>

            {/* Side Hustle 4 */}
            <div className="border-l-4 border-yellow-500 pl-6">
              <h3 className="text-2xl font-bold text-gray-100 mb-3">4. Content Writing & Blogging ✍️</h3>
              <p className="text-lg font-semibold text-yellow-400 mb-3">Income Potential: $15-50/hour</p>
              <p className="text-gray-300 mb-4">
                Good at writing? Businesses need blog posts, articles, product descriptions, and website copy. 
                Start at $0.05-0.10 per word and scale up fast with experience.
              </p>
            </div>

            {/* Side Hustle 5 */}
            <div className="border-l-4 border-pink-500 pl-6">
              <h3 className="text-2xl font-bold text-gray-100 mb-3">5. Social Media Management 📱</h3>
              <p className="text-lg font-semibold text-pink-400 mb-3">Income Potential: $300-1500/month per client</p>
              <p className="text-gray-300 mb-4">
                Spend time on Instagram and TikTok anyway? Get paid for it. Small businesses need help posting, 
                engaging, and growing their accounts. Manage 2-3 clients and earn $1000+/month.
              </p>
            </div>

            {/* Side Hustle 6 */}
            <div className="border-l-4 border-red-500 pl-6">
              <h3 className="text-2xl font-bold text-gray-100 mb-3">6. Video Editing 🎥</h3>
              <p className="text-lg font-semibold text-red-400 mb-3">Income Potential: $25-75/hour</p>
              <p className="text-gray-300 mb-4">
                YouTubers, course creators, and businesses need editors. Learn Premiere Pro or DaVinci Resolve 
                (free!) and start with small projects. Recurring work is common.
              </p>
            </div>

            {/* Side Hustle 7 */}
            <div className="border-l-4 border-cyan-500 pl-6">
              <h3 className="text-2xl font-bold text-gray-100 mb-3">7. Virtual Assistant Work 🖥️</h3>
              <p className="text-lg font-semibold text-cyan-400 mb-3">Income Potential: $15-30/hour</p>
              <p className="text-gray-300 mb-4">
                Help entrepreneurs with email, scheduling, data entry, and admin tasks. Easy to start, 
                flexible hours, and you learn how businesses operate.
              </p>
            </div>

            {/* Side Hustle 8 */}
            <div className="border-l-4 border-orange-500 pl-6">
              <h3 className="text-2xl font-bold text-gray-100 mb-3">8. Photography (Events & Portraits) 📸</h3>
              <p className="text-lg font-semibold text-orange-400 mb-3">Income Potential: $50-200/session</p>
              <p className="text-gray-300 mb-4">
                Got a decent camera or phone? Shoot graduation photos, headshots, or small events. 
                Students always need photos, and local events pay well.
              </p>
            </div>

            {/* Side Hustle 9 */}
            <div className="border-l-4 border-teal-500 pl-6">
              <h3 className="text-2xl font-bold text-gray-100 mb-3">9. Selling Digital Products 💾</h3>
              <p className="text-lg font-semibold text-teal-400 mb-3">Income Potential: $100-2000+/month</p>
              <p className="text-gray-300 mb-4">
                Create once, sell forever. Make study guides, resume templates, Notion templates, or design assets. 
                Sell on Etsy, Gumroad, or your own site.
              </p>
            </div>

            {/* Side Hustle 10 */}
            <div className="border-l-4 border-indigo-500 pl-6">
              <h3 className="text-2xl font-bold text-gray-100 mb-3">10. Delivery & Rideshare (Flexible) 🚗</h3>
              <p className="text-lg font-semibold text-indigo-400 mb-3">Income Potential: $12-25/hour</p>
              <p className="text-gray-300 mb-4">
                Got a car or bike? DoorDash, Uber Eats, and Instacart let you work whenever you want. 
                Perfect for filling gaps between classes.
              </p>
            </div>

          </div>

          <section className="mt-12 p-8 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-700/50 rounded-lg">
            <h2 className="text-2xl font-bold text-blue-300 mb-4">💡 Pro Tips for Success</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">→</span>
                <span><strong>Start small:</strong> Pick ONE side hustle and master it before adding more.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">→</span>
                <span><strong>Time block:</strong> Dedicate specific hours each week. Consistency beats intensity.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">→</span>
                <span><strong>Build a portfolio:</strong> Even 2-3 projects make you look professional.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">→</span>
                <span><strong>Raise your rates:</strong> After 10-15 gigs, increase prices by 20-30%.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 font-bold">→</span>
                <span><strong>Track expenses:</strong> Save receipts. Side hustle costs are tax-deductible.</span>
              </li>
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="text-3xl font-bold text-blue-300 mb-4">Ready to Start?</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              The hardest part is starting. Pick the side hustle that matches your skills, dedicate 5-10 hours 
              this week to getting set up, and land your first client. In 3 months, you could be earning an 
              extra $500-1500/month.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Need personalized guidance on which side hustle fits your situation? Try our free AI Career Mentor 
              for customized advice based on your skills, schedule, and goals.
            </p>
          </section>

        </div>

        <div className="mt-12 p-6 bg-blue-900/20 border border-blue-800/50 rounded-lg text-center">
          <h3 className="text-xl font-bold mb-3 text-blue-300">Get Personalized Side Hustle Recommendations</h3>
          <p className="text-gray-400 mb-6">
            Our AI-powered tool analyzes your skills and available time to suggest the best side hustles for you
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Try Side Hustle Generator →
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800">
          <Link href="/blog" className="text-blue-400 hover:underline">← Back to All Posts</Link>
        </div>
      </article>
    </main>
  );
}
