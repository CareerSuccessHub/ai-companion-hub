"use client";

import { useState } from "react";
import { Search, GraduationCap, DollarSign, Calendar, ExternalLink, Filter, Clock, CheckCircle, XCircle, TrendingUp, AlertCircle } from "lucide-react";

// Curated scholarship database
const scholarships = [
  {
    "name": "The Gates Scholarship",
    "provider": "Bill & Melinda Gates Foundation",
    "amount": "Full Cost of Attendance",
    "deadline": "September 15, 2025",
    "category": "need-based",
    "eligibility": "High school seniors, Pell Grant eligible, minimum 3.3 GPA, U.S. citizen/resident/refugee, from at least one of the following ethnicities: African American, American Indian/Alaska Native, Asian & Pacific Islander American, Hispanic American.",
    "description": "This highly selective scholarship is for outstanding minority students from low-income backgrounds. It covers the full cost of attendance not already covered by other financial aid and the expected family contribution. Scholars are selected based on academic achievement, leadership ability, and exceptional personal success skills.",
    "link": "https://www.scholarships.com/the-gates-scholarship"
  },
  {
    "name": "Coca-Cola Scholars Program Scholarship",
    "provider": "Coca-Cola Scholars Foundation",
    "amount": "$20,000",
    "deadline": "October 31, 2025",
    "category": "merit-based",
    "eligibility": "Current high school seniors, U.S. citizens/nationals/permanent residents, minimum 3.0 GPA, planning to pursue a degree at an accredited U.S. institution.",
    "description": "The Coca-Cola Scholars Program recognizes students who have demonstrated outstanding leadership, academic achievement, and commitment to their communities. Annually, 150 students are selected to receive a $20,000 scholarship. It's one of the most prestigious merit-based scholarships in the country.",
    "link": "https://www.scholarships.com/coca-cola-scholars-program-scholarship"
  },
  {
    "name": "Ron Brown Scholars Program",
    "provider": "Ron Brown Scholar Program",
    "amount": "$40,000 ($10,000 per year)",
    "deadline": "January 9, 2025",
    "category": "minority",
    "eligibility": "African American high school seniors, U.S. citizens/permanent residents, demonstrate academic achievement, exhibit exceptional leadership potential, and participate in community service.",
    "description": "This scholarship honors students who are committed to public service, community engagement, business entrepreneurship, and global citizenship. Scholars receive financial assistance, a network of mentors, and professional development opportunities. It supports future leaders who are dedicated to making a difference.",
    "link": "https://www.scholarships.com/ron-brown-scholars-program"
  },
  {
    "name": "Dell Scholars Program",
    "provider": "Michael & Susan Dell Foundation",
    "amount": "$20,000",
    "deadline": "December 1, 2025",
    "category": "need-based",
    "eligibility": "High school seniors participating in an approved college readiness program, minimum 2.5 GPA, demonstrate significant unmet financial need, plan to enroll full-time in a bachelor's degree program.",
    "description": "The Dell Scholars Program is designed to provide a support system for students facing significant personal challenges in their pursuit of higher education. In addition to financial aid, scholars receive a laptop, textbook credits, and personalized support services. It aims to ensure students not only get to college but also graduate.",
    "link": "https://www.scholarships.com/dell-scholars-program"
  },
  {
    "name": "Horatio Alger National Scholarship Program",
    "provider": "Horatio Alger Association of Distinguished Americans",
    "amount": "$10,000 - $25,000",
    "deadline": "March 15, 2025",
    "category": "need-based",
    "eligibility": "High school juniors, U.S. citizens, demonstrate critical financial need ($55,000 or lower adjusted gross family income), strong commitment to pursue and complete a bachelor's degree, involvement in extracurricular and community activities.",
    "description": "This program assists students who have overcome great obstacles in their lives and are still committed to pursuing higher education. It seeks to reward students who have exhibited integrity, perseverance, and a desire to contribute to society. Applicants should demonstrate academic promise and strength of character.",
    "link": "https://www.scholarships.com/horatio-alger-national-scholarship-program"
  },
  {
    "name": "GE-Reagan Foundation Scholarship Program",
    "provider": "Ronald Reagan Presidential Foundation & Institute",
    "amount": "$10,000 per year (up to $40,000 total)",
    "deadline": "January 4, 2025",
    "category": "merit-based",
    "eligibility": "High school seniors, U.S. citizens, minimum 3.0 GPA, demonstrate leadership, integrity, drive, and citizenship.",
    "description": "This scholarship program rewards college-bound students who embody the characteristics of President Ronald Reagan. It emphasizes leadership, communication skills, and commitment to service. Scholars are selected based on their academic success, leadership abilities, and dedication to their communities.",
    "link": "https://www.scholarships.com/ge-reagan-foundation-scholarship-program"
  },
  {
    "name": "Jack Kent Cooke Foundation Undergraduate Transfer Scholarship",
    "provider": "Jack Kent Cooke Foundation",
    "amount": "Up to $55,000 per year",
    "deadline": "December 15, 2025",
    "category": "need-based",
    "eligibility": "Current community college students or recent graduates, minimum 3.5 GPA, plan to transfer to a four-year institution, significant unmet financial need.",
    "description": "This scholarship supports high-achieving community college students who wish to transfer to a four-year institution. It provides substantial financial aid and comprehensive advising to help scholars succeed. The program aims to remove financial barriers for exceptional students pursuing their bachelor's degrees.",
    "link": "https://www.scholarships.com/jack-kent-cooke-foundation-undergraduate-transfer-scholarship"
  },
  {
    "name": "Society of Women Engineers (SWE) Scholarships",
    "provider": "Society of Women Engineers",
    "amount": "$1,000 - $20,000",
    "deadline": "May 1, 2025 (for sophomores-graduates) / February 15, 2025 (for freshmen)",
    "category": "stem",
    "eligibility": "Female students pursuing a bachelor's or graduate degree in engineering or computer science, minimum 3.0 GPA, U.S. citizen or permanent resident.",
    "description": "SWE offers a variety of scholarships to women pursuing degrees in engineering and technology. These scholarships support the next generation of female engineers and leaders. Awards are based on academic performance, leadership, and involvement in engineering-related activities.",
    "link": "https://www.scholarships.com/society-of-women-engineers-scholarships"
  },
  {
    "name": "Hispanic Scholarship Fund (HSF) Scholarship Program",
    "provider": "Hispanic Scholarship Fund",
    "amount": "$500 - $5,000",
    "deadline": "February 15, 2025",
    "category": "minority",
    "eligibility": "High school seniors, undergraduate students, or graduate students of Hispanic heritage, minimum 2.5 GPA, U.S. citizens/permanent residents/DACA or eligible non-citizens, plan to enroll full-time in an accredited U.S. institution.",
    "description": "HSF empowers students and parents with the knowledge and resources to successfully complete a higher education. They provide scholarships to students of Hispanic heritage across various fields of study. Selection is based on merit, financial need, and an essay.",
    "link": "https://www.scholarships.com/hispanic-scholarship-fund-scholarship-program"
  },
  {
    "name": "Asian & Pacific Islander American Scholars (APIA Scholars) Scholarship Program",
    "provider": "APIA Scholars",
    "amount": "$2,500 - $20,000",
    "deadline": "January 23, 2025",
    "category": "minority",
    "eligibility": "High school seniors, undergraduate students, or graduate students who are of Asian and/or Pacific Islander ethnicity, U.S. citizens/nationals/permanent residents/DACA, minimum 2.7 GPA.",
    "description": "APIA Scholars provides scholarships to underserved Asian and Pacific Islander American students. The program aims to empower students through higher education and leadership development. Awards are based on financial need, academic achievement, leadership, and community involvement.",
    "link": "https://www.scholarships.com/apia-scholars-scholarship-program"
  },
  {
    "name": "United Negro College Fund (UNCF) General Scholarships",
    "provider": "United Negro College Fund",
    "amount": "$500 - $10,000",
    "deadline": "Varies by scholarship (check UNCF website)",
    "category": "minority",
    "eligibility": "African American students, minimum 2.5 GPA, U.S. citizens/permanent residents, enrolled in a UNCF-member institution or other accredited four-year college/university.",
    "description": "UNCF offers a wide range of scholarships to African American students attending historically Black colleges and universities (HBCUs) and other institutions. These scholarships support students pursuing various fields of study. Eligibility criteria vary by specific scholarship, so applicants should explore the UNCF website.",
    "link": "https://www.scholarships.com/united-negro-college-fund-general-scholarships"
  },
  {
    "name": "Regeneron Science Talent Search",
    "provider": "Regeneron & Society for Science",
    "amount": "$2,000 - $250,000",
    "deadline": "November 13, 2025",
    "category": "stem",
    "eligibility": "High school seniors, U.S. citizens/permanent residents, who have completed an original research project in science, mathematics, or engineering.",
    "description": "The Regeneron Science Talent Search is the nation's oldest and most prestigious science and math competition for high school seniors. It recognizes and empowers the most promising young scientists. Finalists compete for significant scholarship awards and present their groundbreaking research.",
    "link": "https://www.scholarships.com/regeneron-science-talent-search"
  },
  {
    "name": "Burger King Scholars Program",
    "provider": "Burger King McLamore Foundation",
    "amount": "$1,000 - $50,000",
    "deadline": "December 15, 2025",
    "category": "merit-based",
    "eligibility": "High school seniors, U.S. citizens/permanent residents, minimum 2.5 GPA, demonstrate financial need, and plan to enroll full-time in an accredited post-secondary institution.",
    "description": "This scholarship program assists students in achieving their academic dreams. It rewards students who are dedicated to community service and academic excellence. The program supports future leaders by providing financial assistance for their college education.",
    "link": "https://www.scholarships.com/burger-king-scholars-program"
  },
  {
    "name": "Doodle for Google Scholarship",
    "provider": "Google",
    "amount": "$30,000",
    "deadline": "March 15, 2025",
    "category": "arts",
    "eligibility": "K-12 students (specific age groups for scholarship), U.S. citizens/permanent residents, create a doodle based on a given theme.",
    "description": "This annual art contest invites students to redesign the Google logo based on a theme. The national winner receives a scholarship and a technology package for their school. It encourages creativity and imagination among young artists across the country.",
    "link": "https://www.scholarships.com/doodle-for-google-scholarship"
  },
  {
    "name": "Microsoft Scholarships",
    "provider": "Microsoft Corporation",
    "amount": "Full or partial tuition",
    "deadline": "August 15, 2025",
    "category": "stem",
    "eligibility": "Undergraduate students enrolled in a four-year degree program in computer science, computer engineering, or related STEM fields, minimum 3.0 GPA, U.S. citizens/permanent residents.",
    "description": "Microsoft offers various scholarships to encourage diversity and innovation in technology. These scholarships support students pursuing degrees in computer science and related fields. They aim to empower the next generation of tech leaders and innovators.",
    "link": "https://www.scholarships.com/microsoft-scholarships"
  },
  {
    "name": "National Merit Scholarship Program",
    "provider": "National Merit Scholarship Corporation",
    "amount": "$2,500 (one-time) or varied corporate/college-sponsored awards",
    "deadline": "October 31, 2024 (PSAT/NMSQT test date for 2026 awards) / Application deadlines vary for finalists (Fall 2025 for 2026 awards)",
    "category": "merit-based",
    "eligibility": "High school students who take the PSAT/NMSQT in their junior year and score in the top percentile, U.S. citizens/intending citizens.",
    "description": "This highly prestigious program recognizes students who demonstrate exceptional academic ability. Semifinalists are selected based on PSAT scores, and finalists compete for various scholarship awards. It's a significant indicator of academic excellence recognized by colleges nationwide.",
    "link": "https://www.scholarships.com/national-merit-scholarship-program"
  },
  {
    "name": "American Institute of Architects (AIA) Scholarships",
    "provider": "American Institute of Architects",
    "amount": "$1,000 - $5,000",
    "deadline": "March 1, 2025",
    "category": "arts",
    "eligibility": "Students enrolled in or applying to an NAAB-accredited architecture program, U.S. citizens/permanent residents, demonstrate financial need and academic promise.",
    "description": "The AIA offers several scholarships to students pursuing degrees in architecture. These awards support the education and professional development of future architects. They aim to foster talent and innovation within the architectural profession.",
    "link": "https://www.scholarships.com/american-institute-of-architects-scholarships"
  },
  {
    "name": "NCAA Postgraduate Scholarship Program",
    "provider": "National Collegiate Athletic Association (NCAA)",
    "amount": "$10,000",
    "deadline": "January 2025 (Fall), April 2025 (Winter), July 2025 (Spring)",
    "category": "athletics",
    "eligibility": "Student-athletes in their final year of intercollegiate athletics eligibility, minimum 3.2 GPA, U.S. citizens/permanent residents, must be nominated by their institution, demonstrate leadership and community service.",
    "description": "This scholarship provides financial aid for student-athletes to pursue graduate studies. It recognizes academic and athletic achievement, as well as community involvement. The program aims to support former student-athletes in their continued educational pursuits.",
    "link": "https://www.scholarships.com/ncaa-postgraduate-scholarship-program"
  },
  {
    "name": "Youth Volunteer Scholarship Award",
    "provider": "Stephen J. Brady Stop Hunger Foundation",
    "amount": "$5,000",
    "deadline": "March 15, 2025",
    "category": "merit-based",
    "eligibility": "High school students (ages 5-25), U.S. citizens/permanent residents, who have demonstrated significant commitment to volunteer service in the fight against hunger.",
    "description": "This scholarship recognizes young people who are making a significant impact in their communities through volunteerism related to hunger relief. It encourages students to continue their philanthropic efforts while pursuing higher education. Awards are based on the impact of their service and leadership.",
    "link": "https://www.scholarships.com/youth-volunteer-scholarship-award"
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
  const totalValue = filteredScholarships.reduce((sum, s) => {
    const amount = parseInt(s.amount.replace(/[^0-9]/g, '')) || 0;
    return sum + amount;
  }, 0);

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
            <TrendingUp className="w-8 h-8 text-purple-400" />
            <div>
              <p className="text-2xl font-bold text-gray-100">${(totalValue / 1000).toFixed(0)}K+</p>
              <p className="text-sm text-gray-400">Total Value Available</p>
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
