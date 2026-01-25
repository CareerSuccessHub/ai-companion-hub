// Smart Udemy course recommendations based on content analysis

export interface CourseRecommendation {
  title: string;
  description: string;
  url: string;
  reason: string;
}

// Course database with Udemy affiliate links
const courses = {
  // Programming & Tech
  python: {
    title: "Complete Python Bootcamp 2026",
    description: "Master Python programming from beginner to advanced",
    url: "https://trk.udemy.com/2anXvD",
    keywords: ["python", "programming", "coding", "software", "developer", "data science", "machine learning"]
  },
  webDev: {
    title: "The Complete Web Development Bootcamp",
    description: "Full-stack development with HTML, CSS, JavaScript, React, Node.js",
    url: "https://trk.udemy.com/2anXvD",
    keywords: ["web development", "html", "css", "javascript", "react", "frontend", "backend", "full stack"]
  },
  dataScience: {
    title: "Data Science & Machine Learning Bootcamp",
    description: "Python for data analysis, visualization, and ML algorithms",
    url: "https://trk.udemy.com/2anXvD",
    keywords: ["data science", "analytics", "machine learning", "ai", "statistics", "pandas", "numpy"]
  },
  
  // Business & Marketing
  digitalMarketing: {
    title: "Digital Marketing Masterclass 2026",
    description: "SEO, social media, email marketing, and growth strategies",
    url: "https://trk.udemy.com/2anXvD",
    keywords: ["marketing", "digital marketing", "seo", "social media", "advertising", "content marketing"]
  },
  projectManagement: {
    title: "Agile & Scrum Project Management",
    description: "Master project management frameworks and tools",
    url: "https://trk.udemy.com/2anXvD",
    keywords: ["project management", "agile", "scrum", "pmp", "project manager", "leadership"]
  },
  
  // Design & Creative
  graphicDesign: {
    title: "Graphic Design Masterclass",
    description: "Photoshop, Illustrator, branding, and UI/UX design",
    url: "https://trk.udemy.com/2anXvD",
    keywords: ["graphic design", "photoshop", "illustrator", "design", "creative", "ui", "ux", "branding"]
  },
  
  // Career Development
  communication: {
    title: "Effective Communication & Public Speaking",
    description: "Master presentations, negotiations, and leadership communication",
    url: "https://trk.udemy.com/2anXvD",
    keywords: ["communication", "public speaking", "presentation", "negotiation", "soft skills"]
  },
  leadership: {
    title: "Leadership & Management Skills",
    description: "Team management, decision-making, and executive presence",
    url: "https://trk.udemy.com/2anXvD",
    keywords: ["leadership", "management", "team", "executive", "manager", "supervisor"]
  },
  
  // Finance & Accounting
  excel: {
    title: "Microsoft Excel - Advanced Formulas & Analysis",
    description: "Master Excel for data analysis and financial modeling",
    url: "https://trk.udemy.com/2anXvD",
    keywords: ["excel", "spreadsheet", "data analysis", "financial", "accounting", "formulas"]
  },
  
  // Generic catch-all
  careerDevelopment: {
    title: "Career Development Bundle - Top Rated Courses",
    description: "Boost your skills across multiple domains",
    url: "https://trk.udemy.com/2anXvD",
    keywords: [] // Fallback option
  }
};

// Analyze content and recommend relevant course
export function getRecommendedCourse(content: string): CourseRecommendation | null {
  if (!content) return null;
  
  const lowerContent = content.toLowerCase();
  
  // Find best matching course based on keywords
  for (const [key, course] of Object.entries(courses)) {
    const matchCount = course.keywords.filter(keyword => 
      lowerContent.includes(keyword)
    ).length;
    
    if (matchCount > 0) {
      return {
        title: course.title,
        description: course.description,
        url: course.url,
        reason: generateReason(key, lowerContent)
      };
    }
  }
  
  // Fallback to generic career development
  return {
    title: courses.careerDevelopment.title,
    description: courses.careerDevelopment.description,
    url: courses.careerDevelopment.url,
    reason: "Boost your career with in-demand skills"
  };
}

// Generate contextual reason based on detected skill gap
function generateReason(courseType: string, content: string): string {
  const reasons: Record<string, string> = {
    python: "Adding Python skills can increase your salary by 20-30%",
    webDev: "Web development is one of the most in-demand skills in 2026",
    dataScience: "Data science roles command average salaries of $120K+",
    digitalMarketing: "Digital marketing skills are essential for modern businesses",
    projectManagement: "Project management certifications boost credibility",
    graphicDesign: "Strong design skills set you apart in creative roles",
    communication: "Better communication leads to faster career advancement",
    leadership: "Leadership skills are key to management promotions",
    excel: "Advanced Excel skills are valued across all industries",
    careerDevelopment: "Continuous learning is the key to career success"
  };
  
  return reasons[courseType] || reasons.careerDevelopment;
}

// Analyze salary negotiation context for role-specific courses
export function getCourseForRole(jobTitle: string): CourseRecommendation {
  const lowerTitle = jobTitle.toLowerCase();
  
  if (lowerTitle.includes("developer") || lowerTitle.includes("engineer") || lowerTitle.includes("programmer")) {
    return {
      title: "Advanced Software Engineering & System Design",
      description: "Level up your technical skills to justify senior-level compensation",
      url: "https://trk.udemy.com/2anXvD",
      reason: `${jobTitle}s with advanced skills earn 30-50% more`
    };
  }
  
  if (lowerTitle.includes("marketing") || lowerTitle.includes("growth")) {
    return {
      title: "Digital Marketing & Growth Hacking",
      description: "Master data-driven marketing strategies for higher impact",
      url: "https://trk.udemy.com/2anXvD",
      reason: `Top ${jobTitle}s with digital skills command premium salaries`
    };
  }
  
  if (lowerTitle.includes("manager") || lowerTitle.includes("director") || lowerTitle.includes("lead")) {
    return {
      title: "Executive Leadership & Strategic Management",
      description: "Develop leadership skills for C-suite trajectory",
      url: "https://trk.udemy.com/2anXvD",
      reason: `${jobTitle}s with leadership training advance 2x faster`
    };
  }
  
  if (lowerTitle.includes("designer") || lowerTitle.includes("creative")) {
    return {
      title: "Advanced UI/UX & Design Systems",
      description: "Master modern design tools and methodologies",
      url: "https://trk.udemy.com/2anXvD",
      reason: `Senior ${jobTitle}s with advanced portfolios earn 40% more`
    };
  }
  
  if (lowerTitle.includes("data") || lowerTitle.includes("analyst")) {
    return {
      title: "Data Science & Advanced Analytics",
      description: "Master Python, SQL, and machine learning for data roles",
      url: "https://trk.udemy.com/2anXvD",
      reason: `${jobTitle}s with Python/ML skills earn $20-30K more annually`
    };
  }
  
  // Generic professional development for other roles
  return {
    title: "Professional Skills Bundle - Communication & Leadership",
    description: "Develop soft skills that drive salary increases",
    url: "https://trk.udemy.com/2anXvD",
    reason: `${jobTitle}s with strong communication skills negotiate 15-25% higher salaries`
  };
}
