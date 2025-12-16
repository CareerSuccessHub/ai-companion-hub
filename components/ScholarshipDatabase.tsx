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
    "link": "https://www.nationalmerit.org/s/1758/interior.aspx?sid=1758&gid=2&pgid=424"
  },
  {
    "name": "Society of Women Engineers (SWE) Scholarship",
    "provider": "Society of Women Engineers",
    "amount": "$1,000 - $15,000",
    "deadline": "February 1, 2026",
    "category": "stem",
    "eligibility": "Female students pursuing an ABET-accredited baccalaureate or graduate degree in engineering or computer science",
    "description": "Supports women pursuing degrees in engineering and technology fields. Applicants are evaluated based on academic achievement, leadership, and participation in engineering activities.",
    "link": "https://swe.org/scholarships/"
  },
  {
    "name": "Jackie Robinson Foundation Scholarship",
    "provider": "Jackie Robinson Foundation",
    "amount": "Up to $35,000 over four years",
    "deadline": "February 28, 2026",
    "category": "minority",
    "eligibility": "Minority high school seniors, US Citizen, demonstrate financial need, leadership potential",
    "description": "Provides a comprehensive scholarship program for minority students attending four-year accredited colleges and universities. Scholars receive financial assistance, extensive mentoring, and leadership development opportunities.",
    "link": "https://www.jackierobinson.org/apply/"
  },
  {
    "name": "Gates Millennium Scholarship Program",
    "provider": "Bill & Melinda Gates Foundation",
    "amount": "Full Cost of Attendance",
    "deadline": "March 10, 2026",
    "category": "need-based",
    "eligibility": "High school seniors from diverse backgrounds, Pell Grant eligible, minimum 3.3 GPA, US Citizen or permanent resident",
    "description": "A highly selective scholarship for outstanding minority students with significant financial need. It covers the full cost of attendance not met by other financial aid for undergraduate and graduate studies.",
    "link": "https://www.thegatesscholarship.org/scholarship"
  },
  {
    "name": "America's Farmers Grow Ag Leaders Scholarship",
    "provider": "Monsanto Fund",
    "amount": "$1,500 - $2,500",
    "deadline": "March 31, 2026",
    "category": "stem",
    "eligibility": "High school seniors pursuing an agriculture-related field of study at a two- or four-year college",
    "description": "Supports students passionate about agriculture and rural communities. Scholarships are sponsored by local farmers and aim to develop the next generation of agricultural leaders.",
    "link": "https://www.americasfarmers.com/"
  },
  {
    "name": "Hispanic Scholarship Fund (HSF) Scholarship",
    "provider": "Hispanic Scholarship Fund",
    "amount": "$500 - $5,000",
    "deadline": "April 15, 2026",
    "category": "minority",
    "eligibility": "Hispanic heritage, minimum 2.5 GPA, plan to enroll full-time in an accredited US institution",
    "description": "Empowers Latino students and their families to pursue higher education. Scholarships are available for high school seniors, undergraduate, and graduate students across all majors and academic years.",
    "link": "https://www.hsf.net/scholarship"
  },
  {
    "name": "Ayn Rand Institute Essay Contest",
    "provider": "Ayn Rand Institute",
    "amount": "$50 - $10,000",
    "deadline": "April 30, 2026",
    "category": "merit-based",
    "eligibility": "High school students (grades 8-12) based on specific novel, US or international",
    "description": "Encourages students to read and engage with Ayn Rand's novels like 'The Fountainhead' and 'Atlas Shrugged'. Participants submit essays analyzing themes and characters from the selected book.",
    "link": "https://aynrand.org/students/essay-contests/"
  },
  {
    "name": "Future Business Leaders of America (FBLA) Scholarship",
    "provider": "Future Business Leaders of America",
    "amount": "$500 - $2,000",
    "deadline": "May 1, 2026",
    "category": "business",
    "eligibility": "Active FBLA members, high school seniors, pursuing a business-related degree",
    "description": "Recognizes outstanding FBLA members who demonstrate leadership and commitment to business education. Scholarships are awarded based on academic performance, FBLA involvement, and future career goals.",
    "link": "https://www.fbla.org/"
  },
  {
    "name": "Doodle for Google Scholarship",
    "provider": "Google",
    "amount": "$30,000 college scholarship",
    "deadline": "May 15, 2026",
    "category": "arts",
    "eligibility": "K-12 students in the US, submit an original doodle based on a theme",
    "description": "An annual competition where students create their own Google Doodle. The national winner receives a college scholarship, a technology package, and their artwork featured on the Google homepage.",
    "link": "https://doodles.google.com/d4g/"
  },
  {
    "name": "United Negro College Fund (UNCF) Scholarships",
    "provider": "United Negro College Fund",
    "amount": "$500 - Full Tuition",
    "deadline": "June 1, 2026",
    "category": "minority",
    "eligibility": "African American students, various GPA requirements, enrolled in a UNCF-member institution or other accredited college",
    "description": "UNCF offers a wide range of scholarships to help minority students attend college. Eligibility varies greatly by specific scholarship, covering different majors, regions, and academic levels.",
    "link": "https://uncf.org/scholarships"
  },
  {
    "name": "Point Foundation Scholarship",
    "provider": "Point Foundation",
    "amount": "Full Cost of Attendance",
    "deadline": "June 30, 2026",
    "category": "need-based",
    "eligibility": "LGBTQ students, enrolled or planning to enroll in an accredited higher education institution, demonstrate financial need and academic merit",
    "description": "Empowers LGBTQ students to achieve their full academic and leadership potential. The scholarship provides financial support, mentorship, and leadership development for scholars.",
    "link": "https://pointfoundation.org/scholarship/"
  },
  {
    "name": "Davidson Fellows Scholarship",
    "provider": "Davidson Institute for Talent Development",
    "amount": "$10,000 - $50,000",
    "deadline": "July 15, 2026",
    "category": "merit-based",
    "eligibility": "Under 18, US Citizen, demonstrate extraordinary accomplishment in a specific field (e.g., science, literature, music)",
    "description": "Recognizes young people who have completed a significant piece of work that has the potential to make a positive contribution to society. It's one of the largest scholarships in the U.S. for young people.",
    "link": "https://www.davidsongifted.org/gifted-programs/fellows-scholarship/"
  },
  {
    "name": "American Heart Association (AHA) Undergraduate Research Fellowship",
    "provider": "American Heart Association",
    "amount": "$4,000 - $6,000",
    "deadline": "August 1, 2026",
    "category": "stem",
    "eligibility": "Undergraduate students, US Citizen or permanent resident, interested in cardiovascular or cerebrovascular research",
    "description": "Provides financial support for students to conduct research under the supervision of an experienced mentor. This program aims to inspire future careers in cardiovascular science.",
    "link": "https://www.heart.org/en/about-us/aha-financial-information"
  },
  {
    "name": "Coca-Cola Scholars Program Scholarship",
    "provider": "The Coca-Cola Foundation",
    "amount": "$20,000",
    "deadline": "August 31, 2026",
    "category": "merit-based",
    "eligibility": "High school seniors, US Citizen, minimum 3.0 GPA, demonstrate leadership and community service",
    "description": "Recognizes students who exemplify leadership, service, and commitment to their communities. It is one of the most prestigious and competitive scholarships available to high school students.",
    "link": "https://www.coca-colascholarsfoundation.org/apply/"
  },
  {
    "name": "Horatio Alger Association Scholarship",
    "provider": "Horatio Alger Association of Distinguished Americans",
    "amount": "$10,000 - $25,000",
    "deadline": "September 15, 2026",
    "category": "need-based",
    "eligibility": "High school seniors, US Citizen, demonstrate critical financial need, minimum 2.0 GPA, strong commitment to community service",
    "description": "Assists students who have faced and overcome great obstacles in their lives. Scholars are selected based on their commitment to pursuing higher education and their ability to persevere through adversity.",
    "link": "https://scholars.horatioalger.org/"
  },
  {
    "name": "Dell Scholars Program",
    "provider": "Michael & Susan Dell Foundation",
    "amount": "$20,000",
    "deadline": "September 30, 2026",
    "category": "need-based",
    "eligibility": "High school seniors participating in approved college readiness programs, minimum 2.4 GPA, demonstrate financial need",
    "description": "Supports low-income, highly motivated students who are often the first in their family to attend college. Beyond financial aid, the program provides personalized support services to help scholars succeed.",
    "link": "https://www.msdf.org/dell-scholars/"
  },
  {
    "name": "Prudential Spirit of Community Awards",
    "provider": "Prudential Financial, Inc.",
    "amount": "$1,000 - $5,000",
    "deadline": "October 15, 2026",
    "category": "merit-based",
    "eligibility": "Students in grades 5-12, US Citizen, demonstrate outstanding volunteer service",
    "description": "Honors middle and high school students across the United States for their volunteer work. State Honorees receive a monetary award and an all-expenses-paid trip to Washington, D.C.",
    "link": "https://www.prudential.com/about/corporate-social-responsibility/spirit-of-community"
  },
  {
    "name": "DOST Scholarship Program",
    "provider": "Philippine Department of Science and Technology",
    "amount": "Full Tuition + Monthly Allowance",
    "deadline": "October 2025 (annually)",
    "category": "stem",
    "country": "Philippines",
    "eligibility": "Filipino citizens, incoming college freshmen, must pursue STEM degrees, maintain high GPA",
    "description": "Provides full scholarship for Filipino students pursuing science, technology, engineering, and mathematics degrees at approved Philippine universities. Includes tuition, book allowance, and monthly stipend.",
    "link": "https://www.dost.gov.ph/programs-services/scholarships-and-grants.html"
  },
  {
    "name": "CHED Scholarship (UniFAST)",
    "provider": "Commission on Higher Education (Philippines)",
    "amount": "Full Tuition + Allowances",
    "deadline": "Varies by program",
    "category": "merit-based",
    "country": "Philippines",
    "eligibility": "Filipino citizens, incoming freshmen or current students, demonstrate academic excellence and financial need",
    "description": "Multiple scholarship programs under UniFAST including Free Higher Education, Tertiary Education Subsidy (TES), and merit-based scholarships. Covers tuition and various allowances.",
    "link": "https://unifast.gov.ph/"
  },
  {
    "name": "SM Foundation Scholarship",
    "provider": "SM Foundation",
    "amount": "Varies (tuition assistance)",
    "deadline": "August 2025 (annually)",
    "category": "need-based",
    "country": "Philippines",
    "eligibility": "Filipino citizens, financially challenged students, good academic standing",
    "description": "Provides educational assistance to deserving Filipino students who lack financial means. Covers tuition fees and in some cases, allowances for books and school supplies.",
    "link": "https://www.sm-foundation.org/scholarships/"
  },
  {
    "name": "Gokongwei Brothers Foundation Scholarship",
    "provider": "Gokongwei Brothers Foundation",
    "amount": "Full Tuition + Allowances",
    "deadline": "March 2026",
    "category": "merit-based",
    "country": "Philippines",
    "eligibility": "Filipino incoming college freshmen, strong academic record, demonstrated leadership, financial need",
    "description": "Comprehensive scholarship for Filipino youth including full tuition, stipend, leadership training, and mentorship. Focuses on STEM and business programs to develop future leaders.",
    "link": "https://www.facebook.com/GokongweiBrothersFoundation/"
  },
  {
    "name": "MEXT Scholarship (Japanese Government)",
    "provider": "Ministry of Education, Culture, Sports, Science and Technology",
    "amount": "Full Tuition + ¥117,000/month",
    "deadline": "Varies (typically April-June)",
    "category": "merit-based",
    "country": "Japan (International)",
    "eligibility": "International students from any country, bachelor's degree for graduate programs, under 35 years old, Japanese language proficiency helpful",
    "description": "Prestigious scholarship from Japanese government for international students to study in Japan. Covers tuition, airfare, and monthly stipend for undergraduate or graduate studies.",
    "link": "https://www.studyinjapan.go.jp/en/planning/scholarship/"
  },
  {
    "name": "Korean Government Scholarship (GKS)",
    "provider": "National Institute for International Education (South Korea)",
    "amount": "Full Tuition + ₩1,000,000/month",
    "deadline": "Varies (typically September-October)",
    "category": "merit-based",
    "country": "South Korea (International)",
    "eligibility": "International students from eligible countries, bachelor's degree for graduate programs, under 40 years old, good health",
    "description": "Comprehensive scholarship for international students including Korean language training, tuition, airfare, settlement allowance, and monthly living expenses.",
    "link": "https://www.studyinkorea.go.kr/en/sub/gks/allnew_invite.do"
  },
  {
    "name": "Singapore International Graduate Award (SINGA)",
    "provider": "Agency for Science, Technology and Research (A*STAR)",
    "amount": "Full Tuition + S$2,000-2,500/month",
    "deadline": "January 2026 (annually)",
    "category": "stem",
    "country": "Singapore (International)",
    "eligibility": "International students, excellent academic record in science/engineering, seeking PhD in Singapore",
    "description": "Prestigious PhD scholarship for international students to conduct research at top Singapore universities (NUS, NTU, SUTD). Includes tuition, stipend, and airfare.",
    "link": "https://www.a-star.edu.sg/"
  },
  {
    "name": "Fulbright Foreign Student Program",
    "provider": "U.S. Department of State",
    "amount": "Full Tuition + Living Stipend",
    "deadline": "Varies by country (typically Oct-Dec)",
    "category": "merit-based",
    "country": "USA (International - 160+ countries)",
    "eligibility": "International students from 160+ countries, bachelor's degree or equivalent, strong academic record, English proficiency",
    "description": "Enables graduate students, young professionals, and artists from around the world to study and conduct research in the United States. Covers tuition, airfare, living stipend, and health insurance.",
    "link": "https://foreign.fulbrightonline.org/"
  },
  {
    "name": "Chevening Scholarships",
    "provider": "UK Government",
    "amount": "Full Tuition + Living Allowance",
    "deadline": "November 5, 2025 (annually)",
    "category": "merit-based",
    "country": "UK (International - 160+ countries)",
    "eligibility": "Students from 160+ Chevening-eligible countries, bachelor's degree, 2+ years work experience, leadership potential",
    "description": "Prestigious UK government scholarship for outstanding emerging leaders to pursue one-year master's degrees at any UK university. Covers tuition, travel costs, and monthly stipend.",
    "link": "https://www.chevening.org/"
  },
  {
    "name": "DAAD Scholarships",
    "provider": "German Academic Exchange Service",
    "amount": "€934-€1,200/month + tuition waiver",
    "deadline": "Varies by program (typically Aug-Oct)",
    "category": "merit-based",
    "country": "Germany (International)",
    "eligibility": "International students from any country, bachelor's degree for master's programs, academic excellence, German language proficiency (varies by program)",
    "description": "Offers numerous scholarship programs for international students to study in Germany at all academic levels. Most German public universities charge no tuition fees.",
    "link": "https://www.daad.de/en/"
  },
  {
    "name": "Erasmus Mundus Joint Master Degrees",
    "provider": "European Union",
    "amount": "€1,400/month + tuition + travel",
    "deadline": "Varies by program (typically Oct-Jan)",
    "category": "merit-based",
    "country": "European Union (International)",
    "eligibility": "Students from any country worldwide, bachelor's degree, English proficiency, varies by specific program",
    "description": "Prestigious international study programs jointly delivered by consortia of European universities. Students study in at least 2 different EU countries and receive full scholarship covering all costs.",
    "link": "https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en"
  },
  {
    "name": "Australia Awards Scholarships",
    "provider": "Australian Government",
    "amount": "Full Tuition + Living Allowance",
    "deadline": "April 30, 2026 (varies by country)",
    "category": "need-based",
    "country": "Australia (International - Asia-Pacific focus)",
    "eligibility": "Students from Asia-Pacific, Middle East, Africa (varies by country), demonstrate leadership potential, commit to returning home after studies",
    "description": "Long-term development scholarships for future leaders from eligible countries to undertake full-time undergraduate or postgraduate study at participating Australian universities.",
    "link": "https://www.dfat.gov.au/people-to-people/australia-awards"
  },
  {
    "name": "Commonwealth Scholarships",
    "provider": "Commonwealth Scholarship Commission",
    "amount": "Full Tuition + Airfare + Stipend",
    "deadline": "Varies by country (typically Dec-Mar)",
    "category": "merit-based",
    "country": "UK (Commonwealth countries - 54 nations)",
    "eligibility": "Citizens of Commonwealth countries (54 countries), bachelor's degree for master's, demonstrate academic merit and development impact",
    "description": "Funded by UK government for students from low and middle-income Commonwealth countries to pursue master's or PhD degrees in the UK. Aimed at those who could not otherwise afford to study in the UK.",
    "link": "https://cscuk.fcdo.gov.uk/"
  },
  {
    "name": "Swedish Institute Scholarships",
    "provider": "Swedish Institute",
    "amount": "Full Tuition + SEK 10,000/month",
    "deadline": "February 20, 2026 (annually)",
    "category": "merit-based",
    "country": "Sweden (International)",
    "eligibility": "Students from selected countries (Africa, Asia, Latin America, Middle East), bachelor's degree, demonstrated leadership experience",
    "description": "Covers tuition fees, living expenses, insurance, and travel grant for master's level studies at Swedish universities. Aimed at future global leaders committed to making a positive impact.",
    "link": "https://si.se/en/apply/scholarships/"
  },
  {
    "name": "New Zealand Excellence Awards",
    "provider": "Education New Zealand",
    "amount": "Full Tuition + NZ$10,000 stipend",
    "deadline": "July 31, 2026 (varies by institution)",
    "category": "merit-based",
    "country": "New Zealand (International)",
    "eligibility": "International students from any country, bachelor's degree for postgraduate programs, academic excellence, leadership potential",
    "description": "Prestigious scholarships for outstanding international students to study postgraduate degrees at participating New Zealand universities. Recognizes academic achievement and leadership.",
    "link": "https://www.studyinnewzealand.govt.nz/study-options/scholarships"
  },
  {
    "name": "QuestBridge National College Match",
    "provider": "QuestBridge",
    "amount": "Full Four-Year Scholarship",
    "deadline": "October 31, 2026",
    "category": "need-based",
    "eligibility": "High school seniors from low-income backgrounds, strong academic record, US Citizen or permanent resident",
    "description": "Connects high-achieving low-income students with top colleges and universities. Matched students receive a full four-year scholarship covering tuition, room and board, books, and travel expenses.",
    "link": "https://www.questbridge.org/"
  },
  {
    "name": "Army ROTC Scholarship Program",
    "provider": "U.S. Army",
    "amount": "Full Tuition & Fees or Room & Board",
    "deadline": "November 15, 2026",
    "category": "merit-based",
    "eligibility": "High school juniors/seniors, US Citizen, minimum 2.5 GPA, physically fit, pursue a commission as an Army Officer",
    "description": "Provides financial assistance for students attending college while training to become Army Officers. Scholarships cover tuition, fees, and a book allowance, plus a monthly stipend.",
    "link": "https://www.goarmy.com/careers-and-jobs/find-your-path/army-officers/rotc"
  },
  {
    "name": "Burger King Scholars Program",
    "provider": "Burger King McLamore Foundation",
    "amount": "$1,000 - $50,000",
    "deadline": "December 1, 2026",
    "category": "merit-based",
    "eligibility": "High school seniors, US Citizen, minimum 2.5 GPA, demonstrate financial need, community service",
    "description": "Assists students who are outstanding in their academic achievements and community involvement. Scholarships are awarded based on academic performance, leadership, and work experience.",
    "link": "https://burgerking.scholarsapply.org/"
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
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [showExpired, setShowExpired] = useState(false);
  const [sortBy, setSortBy] = useState<'deadline' | 'amount'>('deadline');

  const categories = ["All", "merit-based", "need-based", "stem", "business", "arts", "athletics", "minority", "international"];
  const countries = [
    "All",
    "Australia",
    "European Union",
    "Germany",
    "International (Multiple Countries)",
    "Japan",
    "New Zealand",
    "Philippines",
    "Singapore",
    "South Korea",
    "Sweden",
    "UK",
    "USA"
  ];

  // Filter and sort scholarships
  let filteredScholarships = scholarships.filter((scholarship: any) => {
    const matchesSearch = scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.eligibility.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || scholarship.category === selectedCategory;
    
    // Country filter logic - scholarships without country field are assumed to be USA-based
    let matchesCountry = selectedCountry === "All";
    if (!matchesCountry && scholarship.country) {
      matchesCountry = scholarship.country.includes(selectedCountry) ||
                      (selectedCountry === "International (Multiple Countries)" && scholarship.country.includes("International"));
    } else if (!matchesCountry && !scholarship.country && selectedCountry === "USA") {
      matchesCountry = true; // Legacy scholarships without country field are USA-based
    }
    
    const matchesExpired = showExpired || !isExpired(scholarship.deadline);
    
    return matchesSearch && matchesCategory && matchesCountry && matchesExpired;
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
  
  // Count high-value scholarships ($20,000+)
  const highValueCount = scholarships.filter(s => {
    const amount = parseInt(s.amount.replace(/[^0-9]/g, '')) || 0;
    return !isExpired(s.deadline) && amount >= 20000;
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
            <DollarSign className="w-8 h-8 text-purple-400" />
            <div>
              <p className="text-2xl font-bold text-gray-100">{highValueCount}</p>
              <p className="text-sm text-gray-400">High Value ($20K+)</p>
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

          <div className="grid md:grid-cols-4 gap-4">
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
                <GraduationCap className="w-4 h-4" />
                Country/Region
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {countries.map((country) => (
                  <option key={country} value={country}>{country}</option>
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
