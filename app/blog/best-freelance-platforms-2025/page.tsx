import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Star, TrendingUp, DollarSign, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "7 Best Freelance Platforms for Beginners in 2025 | Start Earning Today",
  description: "Discover the top freelance platforms for beginners in 2025. Compare Fiverr, Upwork, Freelancer, and more. Find the best platform to start your side hustle and earn money online.",
  keywords: [
    "freelance platforms 2025",
    "best freelance websites",
    "Fiverr vs Upwork",
    "freelance jobs for beginners",
    "make money online",
    "side hustle platforms",
    "gig economy",
    "remote work platforms"
  ],
  openGraph: {
    title: "7 Best Freelance Platforms for Beginners in 2025",
    description: "Compare the top freelance platforms and start earning today. Perfect for students and beginners.",
    type: "article",
    publishedTime: "2025-12-16T00:00:00Z",
  }
};

export default function BestFreelancePlatforms2025() {
  const platforms = [
    {
      name: "Fiverr",
      url: "https://www.fiverr.com/",
      bestFor: "Beginners & creative services",
      commission: "20% (platform keeps)",
      pros: ["Easy to start", "No proposals needed", "Global audience", "Wide variety of categories"],
      cons: ["High competition", "Lower starting prices", "Platform takes significant cut"],
      avgEarnings: "$100-500/month for beginners",
      icon: "🎨",
      rating: 4.5
    },
    {
      name: "Upwork",
      url: "https://www.upwork.com/",
      bestFor: "Professional services & long-term clients",
      commission: "5-20% sliding scale",
      pros: ["Higher-paying clients", "Long-term relationships", "Professional reputation building"],
      cons: ["Competitive bidding", "Need strong proposals", "Connects cost money"],
      avgEarnings: "$500-2000/month with experience",
      icon: "💼",
      rating: 4.3
    },
    {
      name: "Freelancer.com",
      url: "https://www.freelancer.com/",
      bestFor: "Tech & development projects",
      commission: "10% or $5 minimum",
      pros: ["Contest-based work", "Diverse project types", "Milestone payments"],
      cons: ["Very competitive", "Lower prices in many categories", "Contest model can be time-consuming"],
      avgEarnings: "$200-800/month",
      icon: "💻",
      rating: 4.0
    },
    {
      name: "PeoplePerHour",
      url: "https://www.peopleperhour.com/",
      bestFor: "European & UK clients",
      commission: "3.5-20% depending on earnings",
      pros: ["European market focus", "Hourly packages", "Lower competition than Upwork"],
      cons: ["Smaller user base", "Limited to certain regions", "Fewer job categories"],
      avgEarnings: "$300-1200/month",
      icon: "⏰",
      rating: 4.1
    },
    {
      name: "Toptal",
      url: "https://www.toptal.com/",
      bestFor: "Elite developers & designers",
      commission: "No commission (clients pay premium)",
      pros: ["Top 3% talent only", "Very high rates", "Premium clients", "No bidding"],
      cons: ["Extremely hard to get accepted", "Rigorous screening", "Not for beginners"],
      avgEarnings: "$5000-15000/month",
      icon: "🏆",
      rating: 4.7
    },
    {
      name: "99designs",
      url: "https://99designs.com/",
      bestFor: "Graphic designers & creatives",
      commission: "Platform varies by package",
      pros: ["Design-specific", "Contest + 1-on-1 options", "Active client base"],
      cons: ["Design only", "Contest model can waste time", "Competitive"],
      avgEarnings: "$400-1500/month",
      icon: "🎨",
      rating: 4.2
    },
    {
      name: "Guru",
      url: "https://www.guru.com/",
      bestFor: "Mid-level professionals",
      commission: "4.95-8.95% depending on membership",
      pros: ["Lower fees than competitors", "WorkRoom collaboration", "SafePay escrow"],
      cons: ["Smaller than Upwork/Fiverr", "Less traffic", "Older interface"],
      avgEarnings: "$300-1000/month",
      icon: "📊",
      rating: 4.0
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-full mb-4">
            <span className="text-blue-400 text-sm font-medium">Updated December 2025</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
            7 Best Freelance Platforms for Beginners in 2025
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Compare the top platforms, understand the fees, and choose the right one to start your freelance career today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-400" />
              <span>33M+ freelancers worldwide</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-green-400" />
              <span>$1.3 trillion gig economy</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span>Growing 15% annually</span>
            </div>
          </div>
        </div>

        {/* Quick Comparison Table */}
        <div className="mb-12 p-6 bg-slate-800/50 border border-slate-700 rounded-xl">
          <h2 className="text-2xl font-bold text-white mb-4">Quick Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 text-gray-300">Platform</th>
                  <th className="text-left py-3 text-gray-300">Best For</th>
                  <th className="text-left py-3 text-gray-300">Commission</th>
                  <th className="text-left py-3 text-gray-300">Rating</th>
                </tr>
              </thead>
              <tbody>
                {platforms.map((platform, idx) => (
                  <tr key={idx} className="border-b border-slate-800">
                    <td className="py-3 text-white font-medium">{platform.icon} {platform.name}</td>
                    <td className="py-3 text-gray-400">{platform.bestFor}</td>
                    <td className="py-3 text-gray-400">{platform.commission}</td>
                    <td className="py-3 text-yellow-400 flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current" />
                      {platform.rating}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Platform Reviews */}
        <div className="space-y-8">
          {platforms.map((platform, idx) => (
            <div key={idx} className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-blue-500/30 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                    <span className="text-3xl">{platform.icon}</span>
                    {platform.name}
                  </h3>
                  <p className="text-gray-400">{platform.bestFor}</p>
                </div>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="font-bold">{platform.rating}</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Commission Rate</p>
                  <p className="text-white font-semibold">{platform.commission}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-2">Average Earnings (Beginners)</p>
                  <p className="text-green-400 font-semibold">{platform.avgEarnings}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-semibold text-green-400 mb-2">✅ Pros</h4>
                  <ul className="space-y-1">
                    {platform.pros.map((pro, i) => (
                      <li key={i} className="text-sm text-gray-300">• {pro}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-400 mb-2">❌ Cons</h4>
                  <ul className="space-y-1">
                    {platform.cons.map((con, i) => (
                      <li key={i} className="text-sm text-gray-300">• {con}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <a
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-500 hover:to-cyan-500 transition-all"
              >
                Visit {platform.name}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {/* How to Choose Section */}
        <div className="mt-12 p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl">
          <h2 className="text-2xl font-bold text-white mb-4">How to Choose the Right Platform</h2>
          <div className="space-y-4 text-gray-300">
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">For Complete Beginners:</h3>
              <p>Start with <strong>Fiverr</strong>. Create your profile, set up 3-5 gigs, and start getting orders without bidding.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">For Professionals:</h3>
              <p>Use <strong>Upwork</strong> for higher-paying clients and long-term projects. Build your reputation with quality proposals.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">For Designers:</h3>
              <p><strong>99designs</strong> specializes in design work and has an active client base looking specifically for creative talent.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-2">For Elite Talent:</h3>
              <p>If you have 5+ years experience, try <strong>Toptal</strong>. The screening is tough but rates are 3-5x higher.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 p-8 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-xl text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Not Sure What to Offer? Use Our AI Tool!
          </h2>
          <p className="text-gray-300 mb-6">
            Let our AI analyze your skills and suggest the perfect side hustles for you, including which platforms to use.
          </p>
          <Link
            href="/tools/side-hustle"
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-cyan-500 transition-all"
          >
            Try Side Hustle Generator →
          </Link>
        </div>

        {/* Affiliate Disclosure */}
        <div className="mt-8 p-4 bg-slate-800/30 border border-slate-700 rounded-lg">
          <p className="text-sm text-gray-400">
            <strong>Affiliate Disclosure:</strong> This article may contain affiliate links. If you sign up through these links, we may earn a commission at no extra cost to you. We only recommend platforms we genuinely believe will help you succeed.
          </p>
        </div>
      </div>
    </div>
  );
}
