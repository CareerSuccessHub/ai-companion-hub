"use client";

import { useState } from "react";
import { Search, GraduationCap, DollarSign, Calendar, ExternalLink, Filter, Clock, CheckCircle, XCircle, TrendingUp, AlertCircle } from "lucide-react";

// Curated scholarship database
const scholarships = [
  {
    "name": "National Merit Scholarship Program",
    "provider": "National Merit Scholarship Corporation",
    "amount": "$2,500 - Full Tuition",
    "deadline": "January 15, 2026",
    "category": "merit-based",
    "eligibility": "High school seniors, PSAT/NMSQT scores, US Citizen or permanent resident",
    "description": "Recognizes academically talented high school students across the nation. Finalists compete for various scholarship awards sponsored by corporations, colleges, and the NMSC itself.",
    "link": "https://www.scholarships.com/national-merit-scholarship-program"
  },
  {
    "name": "Society of Women Engineers (SWE) Scholarship",
    "provider": "Society of Women Engineers",
    "amount": "$1,000 - $15,000",
    "deadline": "February 1, 2026",
    "category": "stem",
    "eligibility": "Female students pursuing an ABET-accredited baccalaureate or graduate degree in engineering or computer science",
    "description": "Supports women pursuing degrees in engineering and technology fields. Applicants are evaluated based on academic achievement, leadership, and participation in engineering activities.",
    "link": "https://www.scholarships.com/society-of-women-engineers-scholarship"
  },
  {
    "name": "Jackie Robinson Foundation Scholarship",
    "provider": "Jackie Robinson Foundation",
    "amount": "Up to $35,000 over four years",
    "deadline": "February 28, 2026",
    "category": "minority",
    "eligibility": "Minority high school seniors, US Citizen, demonstrate financial need, leadership potential",
    "description": "Provides a comprehensive scholarship program for minority students attending four-year accredited colleges and universities. Scholars receive financial assistance, extensive mentoring, and leadership development opportunities.",
    "link": "https://www.scholarships.com/jackie-robinson-foundation-scholarship"
  },
  {
    "name": "Gates Millennium Scholarship Program",
    "provider": "Bill & Melinda Gates Foundation",
    "amount": "Full Cost of Attendance",
    "deadline": "March 10, 2026",
    "category": "need-based",
    "eligibility": "High school seniors from diverse backgrounds, Pell Grant eligible, minimum 3.3 GPA, US Citizen or permanent resident",
    "description": "A highly selective scholarship for outstanding minority students with significant financial need. It covers the full cost of attendance not met by other financial aid for undergraduate and graduate studies.",
    "link": "https://www.scholarships.com/gates-millennium-scholarship-program"
  },
  {
    "name": "America's Farmers Grow Ag Leaders Scholarship",
    "provider": "Monsanto Fund",
    "amount": "$1,500 - $2,500",
    "deadline": "March 31, 2026",
    "category": "stem",
    "eligibility": "High school seniors pursuing an agriculture-related field of study at a two- or four-year college",
    "description": "Supports students passionate about agriculture and rural communities. Scholarships are sponsored by local farmers and aim to develop the next generation of agricultural leaders.",
    "link": "https://www.scholarships.com/americas-farmers-grow-ag-leaders-scholarship"
  },
  {
    "name": "Hispanic Scholarship Fund (HSF) Scholarship",
    "provider": "Hispanic Scholarship Fund",
    "amount": "$500 - $5,000",
    "deadline": "April 15, 2026",
    "category": "minority",
    "eligibility": "Hispanic heritage, minimum 2.5 GPA, plan to enroll full-time in an accredited US institution",
    "description": "Empowers Latino students and their families to pursue higher education. Scholarships are available for high school seniors, undergraduate, and graduate students across all majors and academic years.",
    "link": "https://www.scholarships.com/hispanic-scholarship-fund-scholarship"
  },
  {
    "name": "Ayn Rand Institute Essay Contest",
    "provider": "Ayn Rand Institute",
    "amount": "$50 - $10,000",
    "deadline": "April 30, 2026",
    "category": "merit-based",
    "eligibility": "High school students (grades 8-12) based on specific novel, US or international",
    "description": "Encourages students to read and engage with Ayn Rand's novels like 'The Fountainhead' and 'Atlas Shrugged'. Participants submit essays analyzing themes and characters from the selected book.",
    "link": "https://www.scholarships.com/ayn-rand-institute-essay-contest"
  },
  {
    "name": "Future Business Leaders of America (FBLA) Scholarship",
    "provider": "Future Business Leaders of America",
    "amount": "$500 - $2,000",
    "deadline": "May 1, 2026",
    "category": "business",
    "eligibility": "Active FBLA members, high school seniors, pursuing a business-related degree",
    "description": "Recognizes outstanding FBLA members who demonstrate leadership and commitment to business education. Scholarships are awarded based on academic performance, FBLA involvement, and future career goals.",
    "link": "https://www.scholarships.com/future-business-leaders-of-america-scholarship"
  },
  {
    "name": "Doodle for Google Scholarship",
    "provider": "Google",
    "amount": "$30,000 college scholarship",
    "deadline": "May 15, 2026",
    "category": "arts",
    "eligibility": "K-12 students in the US, submit an original doodle based on a theme",
    "description": "An annual competition where students create their own Google Doodle. The national winner receives a college scholarship, a technology package, and their artwork featured on the Google homepage.",
    "link": "https://www.scholarships.com/doodle-for-google-scholarship"
  },
  {
    "name": "United Negro College Fund (UNCF) Scholarships",
    "provider": "United Negro College Fund",
    "amount": "$500 - Full Tuition",
    "deadline": "June 1, 2026",
    "category": "minority",
    "eligibility": "African American students, various GPA requirements, enrolled in a UNCF-member institution or other accredited college",
    "description": "UNCF offers a wide range of scholarships to help minority students attend college. Eligibility varies greatly by specific scholarship, covering different majors, regions, and academic levels.",
    "link": "https://www.scholarships.com/united-negro-college-fund-scholarships"
  },
  {
    "name": "Point Foundation Scholarship",
    "provider": "Point Foundation",
    "amount": "Full Cost of Attendance",
    "deadline": "June 30, 2026",
    "category": "need-based",
    "eligibility": "LGBTQ students, enrolled or planning to enroll in an accredited higher education institution, demonstrate financial need and academic merit",
    "description": "Empowers LGBTQ students to achieve their full academic and leadership potential. The scholarship provides financial support, mentorship, and leadership development for scholars.",
    "link": "https://www.scholarships.com/point-foundation-scholarship"
  },
  {
    "name": "Davidson Fellows Scholarship",
    "provider": "Davidson Institute for Talent Development",
    "amount": "$10,000 - $50,000",
    "deadline": "July 15, 2026",
    "category": "merit-based",
    "eligibility": "Under 18, US Citizen, demonstrate extraordinary accomplishment in a specific field (e.g., science, literature, music)",
    "description": "Recognizes young people who have completed a significant piece of work that has the potential to make a positive contribution to society. It's one of the largest scholarships in the U.S. for young people.",
    "link": "https://www.scholarships.com/davidson-fellows-scholarship"
  },
  {
    "name": "American Heart Association (AHA) Undergraduate Research Fellowship",
    "provider": "American Heart Association",
    "amount": "$4,000 - $6,000",
    "deadline": "August 1, 2026",
    "category": "stem",
    "eligibility": "Undergraduate students, US Citizen or permanent resident, interested in cardiovascular or cerebrovascular research",
    "description": "Provides financial support for students to conduct research under the supervision of an experienced mentor. This program aims to inspire future careers in cardiovascular science.",
    "link": "https://www.scholarships.com/american-heart-association-scholarship"
  },
  {
    "name": "Coca-Cola Scholars Program Scholarship",
    "provider": "The Coca-Cola Foundation",
    "amount": "$20,000",
    "deadline": "August 31, 2026",
    "category": "merit-based",
    "eligibility": "High school seniors, US Citizen, minimum 3.0 GPA, demonstrate leadership and community service",
    "description": "Recognizes students who exemplify leadership, service, and commitment to their communities. It is one of the most prestigious and competitive scholarships available to high school students.",
    "link": "https://www.scholarships.com/coca-cola-scholars-program-scholarship"
  },
  {
    "name": "Horatio Alger Association Scholarship",
    "provider": "Horatio Alger Association of Distinguished Americans",
    "amount": "$10,000 - $25,000",
    "deadline": "September 15, 2026",
    "category": "need-based",
    "eligibility": "High school seniors, US Citizen, demonstrate critical financial need, minimum 2.0 GPA, strong commitment to community service",
    "description": "Assists students who have faced and overcome great obstacles in their lives. Scholars are selected based on their commitment to pursuing higher education and their ability to persevere through adversity.",
    "link": "https://www.scholarships.com/horatio-alger-association-scholarship"
  },
  {
    "name": "Dell Scholars Program",
    "provider": "Michael & Susan Dell Foundation",
    "amount": "$20,000",
    "deadline": "September 30, 2026",
    "category": "need-based",
    "eligibility": "High school seniors participating in approved college readiness programs, minimum 2.4 GPA, demonstrate financial need",
    "description": "Supports low-income, highly motivated students who are often the first in their family to attend college. Beyond financial aid, the program provides personalized support services to help scholars succeed.",
    "link": "https://www.scholarships.com/dell-scholars-program"
  },
  {
    "name": "Prudential Spirit of Community Awards",
    "provider": "Prudential Financial, Inc.",
    "amount": "$1,000 - $5,000",
    "deadline": "October 15, 2026",
    "category": "merit-based",
    "eligibility": "Students in grades 5-12, US Citizen, demonstrate outstanding volunteer service",
    "description": "Honors middle and high school students across the United States for their volunteer work. State Honorees receive a monetary award and an all-expenses-paid trip to Washington, D.C.",
    "link": "https://www.scholarships.com/prudential-spirit-of-community-awards"
  },
  {
    "name": "QuestBridge National College Match",
    "provider": "QuestBridge",
    "amount": "Full Four-Year Scholarship",
    "deadline": "October 31, 2026",
    "category": "need-based",
    "eligibility": "High school seniors from low-income backgrounds, strong academic record, US Citizen or permanent resident",
    "description": "Connects high-achieving low-income students with top colleges and universities. Matched students receive a full four-year scholarship covering tuition, room and board, books, and travel expenses.",
    "link": "https://www.scholarships.com/questbridge-national-college-match"
  },
  {
    "name": "Army ROTC Scholarship Program",
    "provider": "U.S. Army",
    "amount": "Full Tuition & Fees or Room & Board",
    "deadline": "November 15, 2026",
    "category": "merit-based",
    "eligibility": "High school juniors/seniors, US Citizen, minimum 2.5 GPA, physically fit, pursue a commission as an Army Officer",
    "description": "Provides financial assistance for students attending college while training to become Army Officers. Scholarships cover tuition, fees, and a book allowance, plus a monthly stipend.",
    "link": "https://www.scholarships.com/army-rotc-scholarship-program"
  },
  {
    "name": "Burger King Scholars Program",
    "provider": "Burger King McLamore Foundation",
    "amount": "$1,000 - $50,000",
    "deadline": "December 1, 2026",
    "category": "merit-based",
    "eligibility": "High school seniors, US Citizen, minimum 2.5 GPA, demonstrate financial need, community service",
    "description": "Assists students who are outstanding in their academic achievements and community involvement. Scholarships are awarded based on academic performance, leadership, and work experience.",
    "link": "https://www.scholarships.com/burger-king-scholars-program"
  }
];

// Utility functions
function parseDeadline(deadline: string): Date {
  return new Date(deadline);
}

function isExpired(deadline: string): boolean {
  const deadlineDate = parseDeadline(deadline);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return deadlineDate < today;
}

function getDaysUntilDeadline(deadline: string): number {
  const deadlineDate = parseDeadline(deadline);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = deadlineDate.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function getUrgencyLevel(deadline: string): 'expired' | 'urgent' | 'soon' | 'upcoming' {
  if (isExpired(deadline)) return 'expired';
  const days = getDaysUntilDeadline(deadline);
  if (days <= 30) return 'urgent';
  if (days <= 60) return 'soon';
  return 'upcoming';
}

export default function ScholarshipDatabase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showExpired, setShowExpired] = useState(false);
  const [sortBy, setSortBy] = useState<'deadline' | 'amount'>('deadline');

  const categories = ["All", "merit-based", "need-based", "stem", "business", "arts", "athletics", "minority", "international"];

  // Filter and sort scholarships
  let filteredScholarships = scholarships.filter((scholarship) => {
    const matchesSearch = scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.eligibility.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || scholarship.category === selectedCategory;
    const matchesExpired = showExpired || !isExpired(scholarship.deadline);
    
    return matchesSearch && matchesCategory && matchesExpired;
  });

  // Sort scholarships
  filteredScholarships = [...filteredScholarships].sort((a, b) => {
    if (sortBy === 'deadline') {
      return parseDeadline(a.deadline).getTime() - parseDeadline(b.deadline).getTime();
    } else {
      // Sort by amount (extract first number from amount string)
      const amountA = parseInt(a.amount.replace(/[^0-9]/g, '')) || 0;
      const amountB = parseInt(b.amount.replace(/[^0-9]/g, '')) || 0;
      return amountB - amountA;
    }
  });

  const activeCount = scholarships.filter(s => !isExpired(s.deadline)).length;
  const expiredCount = scholarships.length - activeCount;
  
  // Count scholarships closing this month
  const today = new Date();
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const closingThisMonth = scholarships.filter(s => {
    const deadline = parseDeadline(s.deadline);
    return deadline >= today && deadline <= endOfMonth;
  }).length;

  return (
    <div className="space-y-6">
      {/* Stats Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-700/50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-2xl font-bold text-gray-100">{activeCount}</p>
              <p className="text-sm text-gray-400">Active Scholarships</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 border border-purple-700/50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-purple-400" />
            <div>
              <p className="text-2xl font-bold text-gray-100">{closingThisMonth}</p>
              <p className="text-sm text-gray-400">Closing This Month</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-900/40 to-orange-800/20 border border-orange-700/50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-8 h-8 text-orange-400" />
            <div>
              <p className="text-2xl font-bold text-gray-100">{scholarships.filter(s => getUrgencyLevel(s.deadline) === 'urgent').length}</p>
              <p className="text-sm text-gray-400">Deadlines in 30 Days</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-900/20 border border-blue-800/50 rounded-lg p-4">
        <p className="text-sm text-blue-200">
          📅 <strong>Tip:</strong> Most scholarships are recurring annual programs. 
          Deadlines shown are for the 2025-2026 cycle. Always verify current deadlines on official websites. 
          <span className="block mt-1 text-xs text-blue-300">✨ Updated monthly with fresh opportunities</span>
        </p>
      </div>

      <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-blue-400" />
            <div>
              <h2 className="text-2xl font-bold text-blue-400">Scholarship Finder</h2>
              <p className="text-sm text-gray-400">Discover scholarships worth thousands of dollars</p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search scholarships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="capitalize">{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'deadline' | 'amount')}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="deadline">Deadline (Soonest First)</option>
                <option value="amount">Amount (Highest First)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Show Expired
              </label>
              <button
                onClick={() => setShowExpired(!showExpired)}
                className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                  showExpired 
                    ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                    : 'bg-slate-800 hover:bg-slate-700 text-gray-300 border border-slate-700'
                }`}
              >
                {showExpired ? `Showing All (${expiredCount} expired)` : 'Active Only'}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <p>
            Found <strong className="text-blue-400">{filteredScholarships.length}</strong> scholarships
          </p>
          {!showExpired && expiredCount > 0 && (
            <button
              onClick={() => setShowExpired(true)}
              className="text-blue-400 hover:text-blue-300 underline"
            >
              + {expiredCount} expired (show all)
            </button>
          )}
        </div>

        {/* Scholarship List */}
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800 hover:scrollbar-thumb-slate-500">
          {filteredScholarships.map((scholarship, index) => {
            const urgency = getUrgencyLevel(scholarship.deadline);
            const daysLeft = getDaysUntilDeadline(scholarship.deadline);
            
            return (
              <div
                key={`${scholarship.name}-${index}`}
                className={`bg-slate-800 border rounded-lg p-5 transition-all ${
                  urgency === 'expired' 
                    ? 'border-slate-700/50 opacity-60' 
                    : urgency === 'urgent'
                    ? 'border-red-500/50 shadow-lg shadow-red-500/10'
                    : urgency === 'soon'
                    ? 'border-orange-500/50'
                    : 'border-slate-700 hover:border-blue-500'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-gray-100">{scholarship.name}</h3>
                      {urgency === 'expired' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-600/20 text-gray-400 text-xs font-semibold rounded">
                          <XCircle className="w-3 h-3" />
                          Expired
                        </span>
                      )}
                      {urgency === 'urgent' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-600/20 text-red-400 text-xs font-semibold rounded animate-pulse">
                          <AlertCircle className="w-3 h-3" />
                          {daysLeft} days left!
                        </span>
                      )}
                      {urgency === 'soon' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-600/20 text-orange-400 text-xs font-semibold rounded">
                          <Clock className="w-3 h-3" />
                          {daysLeft} days left
                        </span>
                      )}
                    </div>
                    <span className="inline-block px-3 py-1 bg-blue-600/20 text-blue-400 text-xs font-semibold rounded-full capitalize">
                      {scholarship.category}
                    </span>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-xl font-bold text-green-400 flex items-center gap-1 justify-end">
                      <DollarSign className="w-5 h-5" />
                      {scholarship.amount}
                    </p>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4">{scholarship.description}</p>

                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Deadline
                    </p>
                    <p className={`font-semibold ${
                      urgency === 'expired' ? 'text-gray-500 line-through' : 
                      urgency === 'urgent' ? 'text-red-400' : 
                      urgency === 'soon' ? 'text-orange-400' : 'text-gray-300'
                    }`}>
                      {scholarship.deadline}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Provider</p>
                    <p className="text-gray-300 text-sm font-medium">{scholarship.provider}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-500 text-xs mb-1">Eligibility</p>
                  <p className="text-gray-300 text-sm">{scholarship.eligibility}</p>
                </div>

                <a
                  href={scholarship.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                    urgency === 'expired'
                      ? 'bg-gray-600 hover:bg-gray-700 text-gray-300 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                  onClick={(e) => {
                    if (urgency === 'expired') {
                      e.preventDefault();
                      alert('This deadline has passed. Check back next year or explore other opportunities!');
                    }
                  }}
                >
                  {urgency === 'expired' ? 'Deadline Passed' : 'Learn More & Apply'}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-blue-900/20 border border-blue-800/50 rounded-lg p-6">
        <h3 className="text-lg font-bold text-blue-300 mb-3">💡 Scholarship Application Tips</h3>
        <ul className="space-y-2 text-sm text-gray-300">
          <li>✅ Apply early - many scholarships are first-come, first-served</li>
          <li>✅ Customize each essay - don&apos;t use the same one for every application</li>
          <li>✅ Get strong recommendations - ask teachers who know you well</li>
          <li>✅ Apply to local scholarships - less competition than national ones</li>
          <li>✅ Use our AI Resume Reviewer to perfect your application materials</li>
        </ul>
      </div>
    </div>
  );
}
