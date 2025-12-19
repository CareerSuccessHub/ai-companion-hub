# AI Career Success Hub 🚀

**Live Site:** [ai-career-hub.com](https://ai-career-hub.com)  
**Launch Date:** December 2025

An AI-powered platform helping students and young professionals land jobs, negotiate salaries, find scholarships, and boost their careers through intelligent tools and resources.

---

## 🎯 Features

### 🤖 AI Career Mentor
- Floating chat interface accessible from any page
- Personalized career advice powered by Google Gemini AI
- Answers questions about resumes, interviews, career paths
- Context-aware responses for students and young professionals

### 📄 Resume Reviewer
- AI-powered analysis using Gemini 2.5 Flash
- Instant feedback on strengths, improvements, and recommendations
- Color-coded sections with gradient styling
- No file upload needed - just copy-paste your resume

### 💰 Salary Negotiation Script Generator
- Input your job title and salary offer
- AI generates personalized negotiation scripts
- Get data-backed recommendations
- Professional scripts you can use immediately

### 💼 Side Hustle Generator
- Multiple skill categories (Writing, Design, Coding, Teaching, and more)
- AI suggests freelance opportunities based on your skills
- Platform recommendations and getting started tips
- Estimated earnings potential for each opportunity

### 🎓 Scholarship Finder
- Curated database of scholarships
- Search by name, major, or category
- Filter by Merit, Need-Based, Major-Specific, Demographic
- Direct "Apply Now" links with deadlines and requirements
- Regularly updated with new opportunities

### 📝 Blog System
- In-depth career guides and resources
- SEO-optimized for discoverability
- Regular updates with fresh content
- Practical tips and actionable advice

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **AI:** Google Gemini API
- **Hosting:** Vercel
- **Analytics:** Google Analytics 4
- **State Management:** Zustand + React Context
- **Icons:** Lucide React
- **Blog:** MDX with dynamic routing

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Google Gemini API key (free at [aistudio.google.com](https://aistudio.google.com/app/apikey))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/CareerSuccessHub/ai-companion-hub.git
cd ai-companion-hub
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create `.env.local` in root directory:
```env
GEMINI_API_KEY=your-gemini-api-key-here
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
ai-companion-hub/
├── app/
│   ├── api/
│   │   ├── chat/route.ts                 # AI Career Mentor API
│   │   ├── resume-review/route.ts        # Resume Reviewer API
│   │   ├── salary-negotiation/route.ts   # Salary Script API
│   │   └── side-hustle/route.ts          # Side Hustle API
│   ├── blog/
│   │   ├── [slug]/page.tsx               # Dynamic MDX blog route
│   │   └── page.tsx                      # Blog index
│   ├── tools/
│   │   ├── resume-reviewer/page.tsx
│   │   ├── salary-negotiator/page.tsx
│   │   └── side-hustle/page.tsx
│   ├── scholarships/page.tsx
│   ├── layout.tsx                        # Root layout with nav
│   ├── page.tsx                          # Homepage
│   └── globals.css
├── components/
│   ├── FloatingChat.tsx                  # AI Mentor floating chat
│   ├── ScholarshipDatabase.tsx           # Scholarship finder
│   ├── Navigation.tsx                    # Navigation bar
│   └── ...                               # Other components
├── lib/
│   ├── blog.ts                           # Blog utilities
│   └── utils.ts                          # Shared utilities
├── public/
│   ├── sitemap.xml
│   └── robots.txt
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🤝 Contributing

We welcome contributions! If you'd like to help improve AI Career Success Hub:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate tests.

---

## 🔧 Development Notes

### API Usage:
- Uses Google Gemini API for AI features
- Free tier with daily request limits
- Automatic fallback handling for reliability

### Deployment:
- Auto-deploys from GitHub main branch to Vercel
- Build time: ~2-3 minutes
- Environment variables required: `GEMINI_API_KEY`, `NEXT_PUBLIC_BASE_URL`

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🙏 Acknowledgments

- **Google Gemini AI** - Powering all AI features
- **Vercel** - Hosting and deployment
- **Next.js** - React framework
- **Tailwind CSS** - Styling framework

---

## 📞 Contact & Support

- **Website:** [ai-career-hub.com](https://ai-career-hub.com)
- **GitHub:** [CareerSuccessHub/ai-companion-hub](https://github.com/CareerSuccessHub/ai-companion-hub)

For bug reports and feature requests, please open an issue on GitHub.

---

**Built with ❤️ to help students and young professionals succeed in their careers**
