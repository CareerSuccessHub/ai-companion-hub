"use client";

import { useState } from "react";
import { Search, GraduationCap, DollarSign, Calendar, ExternalLink, Filter } from "lucide-react";

// Curated scholarship database
const scholarships = [
  {
    "name": "The Gates Scholarship",
    "provider": "Bill & Melinda Gates Foundation",
    "amount": "Full Cost of Attendance",
    "deadline": "September 15, 2025",
    "category": "need-based",
    "eligibility": "High school seniors, Pell Grant eligible, minimum 3.3 GPA, minority groups preferred.",
    "description": "A highly selective, full-tuition scholarship for outstanding minority high school seniors from low-income backgrounds. It aims to help students achieve their maximum potential.",
    "link": "https://www.scholarships.com/the-gates-scholarship"
  },
  {
    "name": "Coca-Cola Scholars Program Scholarship",
    "provider": "The Coca-Cola Scholars Foundation",
    "amount": "$20,000",
    "deadline": "October 31, 2025",
    "category": "merit-based",
    "eligibility": "High school seniors, minimum 3.0 GPA, demonstrated leadership and community service.",
    "description": "This scholarship recognizes students who have a proven track record of leadership, academic achievement, and commitment to their communities. It's one of the most prestigious merit-based scholarships.",
    "link": "https://www.scholarships.com/coca-cola-scholars-program-scholarship"
  },
  {
    "name": "Ron Brown Scholars Program",
    "provider": "Ron Brown Scholar Program",
    "amount": "$40,000 ($10,000 annually)",
    "deadline": "January 9, 2025",
    "category": "minority",
    "eligibility": "African American high school seniors, demonstrated leadership, community service, academic achievement, and financial need.",
    "description": "The Ron Brown Scholar Program provides academic scholarships, service opportunities, and leadership experiences for young African Americans of outstanding promise. Scholars are chosen based on academic achievement, leadership, and community service.",
    "link": "https://www.scholarships.com/ron-brown-scholars-program"
  },
  {
    "name": "Jack Kent Cooke Foundation Undergraduate Transfer Scholarship",
    "provider": "Jack Kent Cooke Foundation",
    "amount": "Up to $55,000 per year",
    "deadline": "October 20, 2025",
    "category": "merit-based",
    "eligibility": "Current community college students, minimum 3.5 GPA, plan to transfer to a four-year institution, significant financial need.",
    "description": "This scholarship supports top community college students seeking to complete their bachelor's degrees at four-year colleges or universities. It offers substantial financial aid and comprehensive advising.",
    "link": "https://www.scholarships.com/jack-kent-cooke-foundation-undergraduate-transfer-scholarship"
  },
  {
    "name": "QuestBridge National College Match",
    "provider": "QuestBridge",
    "amount": "Full four-year scholarship (full tuition, room & board, books, travel)",
    "deadline": "September 27, 2025",
    "category": "need-based",
    "eligibility": "High school seniors, typically in the top 5-10% of their class, from low-income households (income under $65,000 for a family of four).",
    "description": "A program that connects high-achieving, low-income students with leading colleges and universities. Matched students receive a full scholarship to a QuestBridge partner institution.",
    "link": "https://www.scholarships.com/questbridge-national-college-match"
  },
  {
    "name": "Dell Scholars Program",
    "provider": "Michael & Susan Dell Foundation",
    "amount": "$20,000",
    "deadline": "December 1, 2025",
    "category": "need-based",
    "eligibility": "High school seniors, participate in a college readiness program, minimum 2.5 GPA, demonstrate financial need and academic potential.",
    "description": "This program supports students who are often the first in their family to attend college and are committed to obtaining a bachelor's degree. It provides financial assistance, resources, and support services.",
    "link": "https://www.scholarships.com/dell-scholars-program"
  },
  {
    "name": "Horatio Alger National Scholarship",
    "provider": "Horatio Alger Association of Distinguished Americans",
    "amount": "$25,000",
    "deadline": "October 15, 2025",
    "category": "need-based",
    "eligibility": "High school seniors, critical financial need (adjusted gross income of $65,000 or less per family), minimum 2.0 GPA, demonstrate integrity and perseverance in overcoming adversity.",
    "description": "This scholarship program assists students who have overcome significant personal challenges to pursue higher education. It seeks to reward students who have demonstrated resilience and a strong commitment to their education.",
    "link": "https://www.scholarships.com/horatio-alger-national-scholarship"
  },
  {
    "name": "National Merit Scholarship Program",
    "provider": "National Merit Scholarship Corporation (NMSC)",
    "amount": "$2,500 (one-time scholarship)",
    "deadline": "April 1, 2025",
    "category": "merit-based",
    "eligibility": "High school students who take the PSAT/NMSQT in their junior year, achieve high scores, and meet specific academic requirements.",
    "description": "A prestigious academic competition for recognition and scholarships. Students qualify based on their PSAT/NMSQT scores and can become Finalists to compete for various scholarships.",
    "link": "https://www.scholarships.com/national-merit-scholarship-program"
  },
  {
    "name": "Regeneron Science Talent Search",
    "provider": "Society for Science & the Public / Regeneron",
    "amount": "Up to $250,000",
    "deadline": "November 12, 2025",
    "category": "stem",
    "eligibility": "High school seniors who have completed independent scientific research projects.",
    "description": "The nation's oldest and most prestigious science competition for high school seniors. It recognizes and rewards students who demonstrate exceptional promise in STEM fields through original research.",
    "link": "https://www.scholarships.com/regeneron-science-talent-search"
  },
  {
    "name": "Society of Women Engineers (SWE) Scholarships",
    "provider": "Society of Women Engineers (SWE)",
    "amount": "$1,000 - $15,000",
    "deadline": "May 1, 2025",
    "category": "stem",
    "eligibility": "Female students pursuing a bachelor's or graduate degree in engineering or computer science at an ABET-accredited program.",
    "description": "SWE offers a variety of scholarships for women in engineering and technology fields. These scholarships support aspiring engineers at various stages of their academic careers.",
    "link": "https://www.scholarships.com/society-of-women-engineers-swe-scholarships"
  },
  {
    "name": "AICPA Scholarships for Accounting Students",
    "provider": "American Institute of Certified Public Accountants (AICPA)",
    "amount": "$2,500 - $10,000",
    "deadline": "March 1, 2025",
    "category": "business",
    "eligibility": "Undergraduate or graduate students pursuing an accounting major, minimum 3.0 GPA, AICPA student affiliate member.",
    "description": "The AICPA offers multiple scholarships to support the next generation of accounting professionals. These scholarships help students reduce the financial burden of their education and pursue careers in accounting.",
    "link": "https://www.scholarships.com/aicpa-scholarships-for-accounting-students"
  },
  {
    "name": "NCAA Postgraduate Scholarship Program",
    "provider": "National Collegiate Athletic Association (NCAA)",
    "amount": "$10,000",
    "deadline": "January 17, 2025",
    "category": "athletics",
    "eligibility": "Student-athletes in their final year of intercollegiate athletics eligibility, minimum 3.2 GPA, plan to pursue graduate studies.",
    "description": "This scholarship recognizes student-athletes who excel academically and athletically and are committed to continuing their education. It supports graduate study in various fields.",
    "link": "https://www.scholarships.com/ncaa-postgraduate-scholarship-program"
  },
  {
    "name": "Hispanic Scholarship Fund (HSF) General Scholarships",
    "provider": "Hispanic Scholarship Fund (HSF)",
    "amount": "$500 - $5,000",
    "deadline": "February 15, 2025",
    "category": "minority",
    "eligibility": "Hispanic heritage, minimum 2.5 GPA, plan to enroll full-time at a 2- or 4-year accredited institution.",
    "description": "HSF provides scholarships to Latino students for their higher education. It supports students across all majors and academic years, helping them achieve their college and career goals.",
    "link": "https://www.scholarships.com/hispanic-scholarship-fund-hsf-general-scholarships"
  },
  {
    "name": "UNCF General Scholarship Program",
    "provider": "United Negro College Fund (UNCF)",
    "amount": "Varies, typically $1,000 - $5,000",
    "deadline": "March 31, 2025",
    "category": "minority",
    "eligibility": "African American students, minimum 2.5 GPA, demonstrated financial need, enrolled at a UNCF member institution or other accredited college.",
    "description": "UNCF offers a wide range of scholarships to support African American students pursuing higher education. These scholarships aim to empower students to reach their full potential.",
    "link": "https://www.scholarships.com/uncf-general-scholarship-program"
  },
  {
    "name": "Asian & Pacific Islander American Scholars (APIA Scholars)",
    "provider": "APIA Scholars",
    "amount": "$2,500 - $20,000",
    "deadline": "January 23, 2025",
    "category": "minority",
    "eligibility": "Asian and/or Pacific Islander ethnicity, minimum 2.7 GPA, demonstrated financial need, community service, enrolled at an accredited U.S. college or university.",
    "description": "APIA Scholars provides scholarships to underserved Asian and Pacific Islander American students. The program aims to empower students to complete their college education and become leaders.",
    "link": "https://www.scholarships.com/apia-scholars"
  },
  {
    "name": "American Indian College Fund (AICF) Full Circle Scholarship",
    "provider": "American Indian College Fund",
    "amount": "Varies, typically $1,000 - $5,000",
    "deadline": "May 31, 2025",
    "category": "minority",
    "eligibility": "Enrolled member of a federally recognized American Indian tribe or Alaska Native group, minimum 2.0 GPA, enrolled full-time at an accredited college or university.",
    "description": "This scholarship supports Native American and Alaska Native students pursuing higher education. It aims to provide opportunities for academic success and cultural preservation.",
    "link": "https://www.scholarships.com/american-indian-college-fund-full-circle-scholarship"
  },
  {
    "name": "Davidson Fellows Scholarship",
    "provider": "Davidson Institute for Talent Development",
    "amount": "$10,000, $25,000, or $50,000",
    "deadline": "February 12, 2025",
    "category": "merit-based",
    "eligibility": "Young people under 18, who have completed a significant piece of work in STEM, Literature, Music, Philosophy, or other fields, demonstrating profound depth and expertise.",
    "description": "This scholarship recognizes extraordinary young people who have completed significant projects that have the potential to make a positive contribution to society. It's one of the highest honors for young innovators.",
    "link": "https://www.scholarships.com/davidson-fellows-scholarship"
  },
  {
    "name": "Google Lime Scholarship Program",
    "provider": "Google / Lime Connect",
    "amount": "$10,000 for undergraduates, $10,000 for graduate students",
    "deadline": "December 8, 2025",
    "category": "stem",
    "eligibility": "Current undergraduate, graduate, or Ph.D. students with disabilities, pursuing a degree in computer science, computer engineering, or related technical fields.",
    "description": "This scholarship supports students with disabilities who are pursuing degrees in computer science or related fields. It aims to encourage and empower future technology leaders.",
    "link": "https://www.scholarships.com/google-lime-scholarship-program"
  },
  {
    "name": "VFW Voice of Democracy Scholarship",
    "provider": "Veterans of Foreign Wars (VFW)",
    "amount": "$1,000 - $30,000",
    "deadline": "October 31, 2025",
    "category": "merit-based",
    "eligibility": "Students in grades 9-12, U.S. citizens, submit an original audio-essay on a patriotic theme.",
    "description": "This scholarship competition encourages students to express their opinions on a democratic and patriotic theme. It promotes critical thinking and public speaking skills among young people.",
    "link": "https://www.scholarships.com/vfw-voice-of-democracy-scholarship"
  },
  {
    "name": "Scholastic Art & Writing Awards Scholarships",
    "provider": "Alliance for Young Artists & Writers",
    "amount": "Up to $10,000",
    "deadline": "December 1, 2025",
    "category": "arts",
    "eligibility": "Students in grades 7-12, submit original works of art or writing. Various categories available.",
    "description": "This program identifies and celebrates the vision, ingenuity, and voices of the nation’s most talented teens. It provides opportunities for students to earn scholarships and have their work recognized nationally.",
    "link": "https://www.scholarships.com/scholastic-art-and-writing-awards-scholarships"
  }
];

export default function ScholarshipDatabase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "merit-based", "need-based", "stem", "business", "arts", "athletics", "minority", "international"];

  const filteredScholarships = scholarships.filter((scholarship) => {
    const matchesSearch = scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.eligibility.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || scholarship.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="bg-blue-900/20 border border-blue-800/50 rounded-lg p-4 mb-6">
        <p className="text-sm text-blue-200">
          📅 <strong>Note:</strong> Most scholarships are recurring annual programs. 
          Deadlines shown are for the 2025-2026 cycle. Always verify current deadlines on official websites. 
          <span className="block mt-1 text-xs text-blue-300">Last Updated: December 2025</span>
        </p>
      </div>

      <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
        <div className="flex items-center gap-3 mb-6">
          <GraduationCap className="w-6 h-6 text-blue-400" />
          <div>
            <h2 className="text-2xl font-bold text-blue-400">Scholarship Finder</h2>
            <p className="text-sm text-gray-400">Discover scholarships worth thousands of dollars</p>
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

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-400 mb-4">
          Found <strong className="text-blue-400">{filteredScholarships.length}</strong> scholarships
        </p>

        {/* Scholarship List */}
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {filteredScholarships.map((scholarship, index) => (
            <div
              key={`${scholarship.name}-${index}`}
              className="bg-slate-800 border border-slate-700 rounded-lg p-5 hover:border-blue-500 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-100 mb-1">{scholarship.name}</h3>
                  <span className="inline-block px-3 py-1 bg-blue-600/20 text-blue-400 text-xs font-semibold rounded-full">
                    {scholarship.category}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-green-400 flex items-center gap-1">
                    <DollarSign className="w-5 h-5" />
                    {scholarship.amount}
                  </p>
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-4">{scholarship.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-sm">
                <div>
                  <p className="text-gray-500 text-xs">Deadline</p>
                  <p className="text-gray-300 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {scholarship.deadline}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500 text-xs">Eligibility</p>
                  <p className="text-gray-300 text-sm">{scholarship.eligibility}</p>
                </div>
              </div>

              <a
                href={scholarship.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Apply Now
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
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
