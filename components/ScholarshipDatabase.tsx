"use client";

import { useState } from "react";
import { Search, GraduationCap, DollarSign, Calendar, ExternalLink, Filter } from "lucide-react";

// Curated scholarship database
const scholarships = [
  {
    id: 1,
    name: "Coca-Cola Scholars Program",
    amount: "$20,000",
    deadline: "October 31, 2025",
    category: "Merit-Based",
    gpaMin: 3.0,
    major: "Any",
    year: "High School Senior",
    description: "Recognizing high school seniors for their leadership, service, and academic achievement.",
    link: "https://www.coca-colascholarsfoundation.org/",
    recurring: true,
  },
  {
    id: 2,
    name: "Gates Scholarship",
    amount: "Full Tuition",
    deadline: "September 15, 2025",
    category: "Need-Based",
    gpaMin: 3.3,
    major: "Any",
    year: "High School Senior",
    description: "Full scholarship for exceptional minority students with significant financial need.",
    link: "https://www.thegatesscholarship.org/",
    recurring: true,
  },
  {
    id: 3,
    name: "Dell Scholars Program",
    amount: "$20,000",
    deadline: "December 1, 2025",
    category: "Need-Based",
    gpaMin: 2.4,
    major: "Any",
    year: "High School Senior",
    description: "Supporting students who have overcome obstacles to pursue their education.",
    link: "https://www.dellscholars.org/",
    recurring: true,
  },
  {
    id: 4,
    name: "STEM Scholarship by Google",
    amount: "$10,000",
    deadline: "March 15, 2026",
    category: "Major-Specific",
    gpaMin: 3.5,
    major: "Computer Science, Engineering",
    year: "Undergraduate",
    description: "Supporting students pursuing STEM degrees, particularly underrepresented groups.",
    link: "https://buildyourfuture.withgoogle.com/scholarships/",
    recurring: true,
  },
  {
    id: 5,
    name: "Jack Kent Cooke Foundation Scholarship",
    amount: "$55,000/year",
    deadline: "November 16, 2025",
    category: "Merit-Based",
    gpaMin: 3.5,
    major: "Any",
    year: "High School Senior",
    description: "One of the most generous scholarships for high-achieving students with financial need.",
    link: "https://www.jkcf.org/",
    recurring: true,
  },
  {
    id: 6,
    name: "National Merit Scholarship",
    amount: "$2,500",
    deadline: "Varies by PSAT",
    category: "Merit-Based",
    gpaMin: 0,
    major: "Any",
    year: "High School Senior",
    description: "Based on PSAT/NMSQT scores. Over 7,500 awards given annually.",
    link: "https://www.nationalmerit.org/",
    recurring: true,
  },
  {
    id: 7,
    name: "QuestBridge National College Match",
    amount: "Full Ride",
    deadline: "September 26, 2025",
    category: "Need-Based",
    gpaMin: 3.5,
    major: "Any",
    year: "High School Senior",
    description: "Matches high-achieving, low-income students with full scholarships to top universities.",
    link: "https://www.questbridge.org/",
    recurring: true,
  },
  {
    id: 8,
    name: "Hispanic Scholarship Fund",
    amount: "$500-$5,000",
    deadline: "February 15, 2026",
    category: "Demographic",
    gpaMin: 3.0,
    major: "Any",
    year: "Undergraduate, Graduate",
    description: "Supporting Hispanic students pursuing higher education.",
    link: "https://hsf.net/",
    recurring: true,
  },
  {
    id: 9,
    name: "UNCF Scholarships",
    amount: "Varies",
    deadline: "Rolling",
    category: "Demographic",
    gpaMin: 2.5,
    major: "Any",
    year: "Undergraduate, Graduate",
    description: "Over 400 scholarship programs for African American students.",
    link: "https://www.uncf.org/scholarships",
    recurring: true,
  },
  {
    id: 10,
    name: "Fastweb Scholarships",
    amount: "$100-$25,000",
    deadline: "Various",
    category: "Various",
    gpaMin: 0,
    major: "Any",
    year: "All",
    description: "Database of thousands of scholarships. Create a profile to match with opportunities.",
    link: "https://www.fastweb.com/",
    recurring: false,
  },
];

export default function ScholarshipDatabase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMajor, setSelectedMajor] = useState("All");

  const categories = ["All", "Merit-Based", "Need-Based", "Major-Specific", "Demographic", "Various"];
  const majors = ["All", "Any", "Computer Science, Engineering", "Business", "Healthcare"];

  const filteredScholarships = scholarships.filter((scholarship) => {
    const matchesSearch = scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || scholarship.category === selectedCategory;
    const matchesMajor = selectedMajor === "All" || scholarship.major.includes(selectedMajor) || scholarship.major === "Any";
    
    return matchesSearch && matchesCategory && matchesMajor;
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

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Major
              </label>
              <select
                value={selectedMajor}
                onChange={(e) => setSelectedMajor(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {majors.map((major) => (
                  <option key={major} value={major}>{major}</option>
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
          {filteredScholarships.map((scholarship) => (
            <div
              key={scholarship.id}
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
                <div>
                  <p className="text-gray-500 text-xs">Min GPA</p>
                  <p className="text-gray-300">{scholarship.gpaMin || "N/A"}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Major</p>
                  <p className="text-gray-300">{scholarship.major}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Eligibility</p>
                  <p className="text-gray-300">{scholarship.year}</p>
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
