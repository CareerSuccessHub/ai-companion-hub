import { Rocket, Sparkles, Globe, Zap, TrendingUp, Mail } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "What's New - AI Career Success Hub Updates",
  description: "Latest features, improvements, and updates to AI Career Success Hub - your all-in-one platform for career success.",
};

const updates = [
  {
    version: "1.5.0",
    date: "January 26, 2026",
    icon: Zap,
    iconGradient: "from-yellow-400 to-orange-500",
    title: "Lightning-Fast Performance Update",
    changes: [
      {
        type: "Performance",
        items: [
          "Significant bundle size reduction with optimized animations",
          "Lazy-loaded components for faster initial page render",
          "Mobile experience 2x faster - improved load times across all devices",
          "Desktop performance significantly enhanced",
          "Smoother animations with pure CSS implementation",
        ],
      },
      {
        type: "New",
        items: [
          "Enhanced tool feedback with actionable next steps",
          "Improved user experience with faster tool interactions",
          "Better resource recommendations for career growth",
        ],
      },
      {
        type: "Improved",
        items: [
          "Optimized script loading for better performance",
          "Streamlined content workflow for consistent quality",
          "Enhanced browser compatibility with CSS animations",
          "Better mobile responsiveness across all pages",
        ],
      },
    ],
  },
  {
    version: "1.4.0",
    date: "December 28, 2025",
    icon: Mail,
    iconGradient: "from-blue-400 to-cyan-500",
    title: "Contact Page & Newsletter Launch",
    changes: [
      {
        type: "New",
        items: [
          "Added dedicated Contact page with 5 professional email addresses (contact@, partnerships@, support@, hello@, superadmin@)",
          "Launched weekly newsletter signup via Google Forms - get career tips, side hustles, scholarships & blog posts in your inbox",
          "Newsletter signup now available on homepage, all blog posts, and contact page",
          "Contact link moved to footer for better UX (following web conventions)",
        ],
      },
      {
        type: "Improved",
        items: [
          "Enhanced content publishing schedule for consistent weekly updates",
          "Improved content quality and consistency",
          "Better professional presentation for partnership applications",
        ],
      },
    ],
  },
  {
    version: "1.3.0",
    date: "December 19, 2025",
    icon: Sparkles,
    iconGradient: "from-purple-400 to-pink-500",
    title: "UX Enhancements & User Experience Improvements",
    changes: [
      {
        type: "New",
        items: [
          "Added chat greeting pop-up for better discoverability of the Career Mentor",
          "Added tool scope and limits sections - clear visibility of what each tool can and can't do",
          "Added usage notice modals when daily limits are reached",
          "Added inline privacy reassurance messages near all sensitive input fields",
          "Added 'Try Sample Data' buttons to Resume Reviewer, Salary Negotiator, and Side Hustle Generator for easier testing",
          "Implemented modal-like tooltips for tool onboarding and guided tours",
        ],
      },
      {
        type: "Improved",
        items: [
          "Enhanced hero section design and messaging",
          "Fixed mobile responsiveness of guided tour modals",
          "Updated 'Updates' page icon for better visual consistency",
          "Improved user trust with explicit privacy messaging on all forms",
        ],
      },
    ],
  },
  {
    version: "1.2.0",
    date: "December 16, 2025",
    icon: Globe,
    iconGradient: "from-blue-400 to-purple-500",
    title: "Global Scholarships & Enhanced Side Hustle Generator",
    changes: [
      {
        type: "New",
        items: [
          "Added 11 international scholarships covering 160+ countries (Fulbright, Chevening, DAAD, Erasmus Mundus, Australia Awards, Commonwealth, Swedish Institute, New Zealand, Japan MEXT, Korea GKS, Singapore SINGA)",
          "Added 4 Filipino scholarships (DOST, CHED, SM Foundation, Ayala Young Leaders) specifically for PH students",
          "Country/Region filter - easily find scholarships by target destination (Philippines, USA, UK, Germany, Japan, Korea, etc.)",
          "Completely redesigned Side Hustle Generator with dynamic personalized suggestions - get specific ideas tailored to your skills",
          "Added Quick Start steps to each side hustle suggestion for immediate action",
        ],
      },
      {
        type: "Improved",
        items: [
          "Side hustle suggestions are now tailored to your exact skills (e.g., drone pilot → drone-specific opportunities, not generic video editing)",
          "Simplified input process - flexible suggestions generated automatically",
          "Enhanced reliability for more consistent side hustle generation",
          "Better platform recommendations with real, actionable URLs",
          "Enhanced UI with hover effects and better visual hierarchy",
        ],
      },
    ],
  },
  {
    version: "1.1.0",
    date: "December 15, 2025",
    icon: TrendingUp,
    iconGradient: "from-green-400 to-blue-500",
    title: "Blog Enhancements & UX Improvements",
    changes: [
      {
        type: "New",
        items: [
          "Blog search functionality - find articles instantly",
          "Blog filters by month and year for easy navigation",
          "Pagination system for better content organization",
          "Custom scrollbar design for improved aesthetics",
        ],
      },
      {
        type: "Improved",
        items: [
          "Scholarship deadline tracking with urgency badges",
          "Replaced misleading scholarship statistics with accurate data",
          "Enhanced content scheduling for consistent updates",
          "Sitemap updates for better SEO",
        ],
      },
    ],
  },
  {
    version: "1.0.0",
    date: "December 9, 2025",
    icon: Rocket,
    iconGradient: "from-pink-400 to-rose-500",
    title: "Platform Launch 🎉",
    changes: [
      {
        type: "New",
        items: [
          "AI Career Mentor - floating chat interface for career guidance",
          "Resume Reviewer - get instant feedback on your resume",
          "Salary Negotiation Script Generator - prepare for your next raise",
          "Side Hustle Generator - discover income opportunities based on your skills",
          "Scholarship Finder - 10+ curated scholarships worth $200K+",
          "Blog system with career-focused content",
          "Google Analytics integration for site improvements",
          "SEO optimization (sitemap, robots.txt, meta tags, schema markup)",
        ],
      },
    ],
  },
];

export default function UpdatesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="text-pink-400" size={32} />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              What&apos;s New
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            We&apos;re constantly improving AI Career Success Hub based on your feedback
          </p>
        </div>

        {/* Updates Timeline */}
        <div className="space-y-8">
          {updates.map((update, index) => (
            <div
              key={update.version}
              className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-pink-500/30 transition-all"
            >
              {/* Update Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${update.iconGradient} bg-opacity-20`}>
                  <update.icon size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-xl font-bold text-white">{update.title}</h2>
                    <span className="text-xs bg-slate-800 text-gray-400 px-2 py-1 rounded">
                      v{update.version}
                    </span>
                    {index === 0 && (
                      <span className="text-xs bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-400/40 text-pink-300 px-2 py-1 rounded flex items-center gap-1">
                        <Sparkles size={10} />
                        Latest
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{update.date}</p>
                </div>
              </div>

              {/* Changes */}
              {update.changes.map((changeGroup, cgIndex) => (
                <div key={cgIndex} className="mb-4 last:mb-0">
                  <h3 className="text-sm font-semibold text-blue-300 mb-2 flex items-center gap-2">
                    {changeGroup.type === "New" ? (
                      <Zap size={14} className="text-yellow-400" />
                    ) : (
                      <TrendingUp size={14} className="text-green-400" />
                    )}
                    {changeGroup.type}
                  </h3>
                  <ul className="space-y-2 ml-6">
                    {changeGroup.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-gray-300 flex items-start gap-2">
                        <span className="text-pink-400 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Feedback CTA */}
        <div className="mt-12 bg-gradient-to-br from-pink-900/20 to-purple-900/20 border border-pink-500/30 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold mb-2 text-white">Have a feature request?</h3>
          <p className="text-gray-400 text-sm mb-4">
            We&apos;d love to hear your ideas! Help us make AI Career Success Hub even better.
          </p>
          <a
            href="https://ko-fi.com/aicompanionhub"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all font-medium"
          >
            <Sparkles size={16} />
            Share Your Feedback
          </a>
        </div>
      </div>
    </div>
  );
}
