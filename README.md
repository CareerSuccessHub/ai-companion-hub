# AI Career Success Hub 🚀

**Live Site:** [ai-companion-hub-self.vercel.app](https://ai-companion-hub-self.vercel.app)  
**Launch Date:** December 9, 2025  
**Team:** 3 members (2 developers, 1 marketing specialist)

A multi-revenue AI platform helping students and young professionals land jobs, negotiate salaries, find scholarships, and boost their careers.

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
- Input job title and salary offer
- AI generates personalized negotiation script
- Suggests specific dollar amounts to request
- Tie-in with "How I Negotiated $15K More" blog post

### 💼 Side Hustle Generator
- 7+ skill categories (Writing, Design, Coding, Teaching, etc.)
- AI suggests freelance opportunities based on your skills
- Links to platforms: Fiverr, Upwork, Freelancer
- Estimated earnings potential for each hustle

### 🎓 Scholarship Finder
- Database of 10+ scholarships worth $200K+ total
- Search by name, major, or category
- Filter by Merit, Need-Based, Major-Specific, Demographic
- Auto-refreshes monthly via GitHub Actions
- Direct "Apply Now" links with deadlines and requirements

### 📝 Blog System
- **Manual posts:** In-depth guides (2,500+ words)
- **Auto-generated:** 2 blog posts per week via GitHub Actions
- SEO-optimized for high-volume keywords
- Internal linking to tools for conversion
- Ad space placeholders ready for Google AdSense

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **AI:** Google Gemini API (gemini-2.5-flash) - 1,500 requests/day free tier
- **Hosting:** Vercel (auto-deploy from GitHub main branch)
- **Analytics:** Google Analytics 4 (G-1W1HNJGT2G)
- **Monetization:** Ko-fi donations, AdSense-ready, affiliate links
- **State Management:** Zustand (chat) + React Context (theme)
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
│   │   ├── 2025-12-09-*.mdx              # Auto-generated blogs
│   │   ├── 10-side-hustles.../page.tsx   # Manual blog posts
│   │   └── page.tsx                      # Blog index
│   ├── resume-reviewer/page.tsx
│   ├── salary-negotiation/page.tsx
│   ├── scholarships/page.tsx
│   ├── layout.tsx                        # Root layout with nav
│   ├── page.tsx                          # Homepage
│   └── globals.css
├── components/
│   ├── FloatingChatButton.tsx            # AI Mentor floating chat
│   ├── ScholarshipDatabase.tsx           # 10+ scholarships
│   ├── Navigation.tsx                    # Sticky nav bar
│   ├── AdPlaceholder.tsx                 # AdSense-ready spaces
│   └── KofiButton.tsx                    # Donation button
├── lib/
│   ├── blog.ts                           # Blog post aggregator
│   └── gemini.ts                         # Gemini API config
├── scripts/
│   ├── generate-blog.js                  # Auto-blog via GitHub Actions
│   └── update-scholarships.js            # Monthly scholarship refresh
├── .github/
│   ├── workflows/
│   │   ├── generate-blog.yml             # Mondays 9 AM UTC
│   │   └── update-scholarships.yml       # 1st of month 10 AM UTC
│   └── copilot-instructions.md
├── public/
│   ├── sitemap.xml
│   └── robots.txt
├── PROJECT_ROADMAP.md            # Development phases, team tasks
├── MARKET_TRENDS_2025.md         # Market research, expansion strategy
├── TRAFFIC_STRATEGY.md           # Traffic generation plan
├── MONETIZATION_GUIDE.md         # Revenue streams guide
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 💰 Monetization Strategy

### Current Revenue Streams:
1. **Ko-fi Donations** - [ko-fi.com/studentsuccesshub](https://ko-fi.com/studentsuccesshub)
2. **Affiliate Links** - Fiverr, Skillshare (pending approval)
3. **Google AdSense** - Applying once 500-1K visitors hit

### Revenue Goals:
- Month 1 (Dec 2025): $10-30
- Month 3 (Feb 2026): $100-200
- Month 6 (May 2026): $500-800
- Month 12 (Dec 2026): $2,000-3,000

**Detailed plan:** See `MONETIZATION_GUIDE.md`

---

## 📈 Growth Roadmap

### Phase 1-4: Core Platform ✅ (Completed Dec 11, 2025)
- AI Career Mentor, Resume Reviewer, Scholarship Finder
- Blog system (manual + auto-generated)
- SEO optimization, analytics, monetization hooks

### Phase 5: Traffic Generation 🎯 (Dec 11-31, 2025)
- Goal: 1,000 monthly visitors
- Reddit, LinkedIn, Quora, social media campaigns
- Team of 3 executing traffic strategy

### Phase 6-8: Platform Expansion 🚀 (2026)
- **Phase 6 (Jan):** Writing tools (paraphrasing, citations)
- **Phase 7 (Feb):** Finance tools (loan calculator, budgeting)
- **Phase 8 (Mar):** Productivity suite (study planner, Pomodoro)

**Detailed roadmap:** See `PROJECT_ROADMAP.md`

---

## 🤝 Contributing

This is currently a private project. If you're interested in contributing:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📊 Key Metrics (Updated Weekly)

- **Live Site:** [ai-companion-hub-self.vercel.app](https://ai-companion-hub-self.vercel.app)
- **Analytics:** Google Analytics 4 (G-1W1HNJGT2G)
- **Current Visitors:** Tracking since Dec 9, 2025
- **Revenue:** $0 (launched Dec 9, targeting $100/month in 90 days)

---

## 🔧 Technical Notes

### Gemini API Limits:
- Free tier: 1,500 requests/day
- Resets: Midnight Pacific Time (4 PM Philippine Time)
- Model: gemini-2.5-flash (fastest, best for chat)

### Vercel Deployment:
- Auto-deploys from GitHub main branch
- Build time: ~2-3 minutes
- Free tier: 100 build hours/month

### GitHub Actions:
- **Blog generation:** Mondays 9 AM UTC (2 posts/week)
- **Scholarship updates:** 1st of month 10 AM UTC (monthly refresh)

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

## 📞 Contact

- **Website:** [ai-companion-hub-self.vercel.app](https://ai-companion-hub-self.vercel.app)
- **Support:** [ko-fi.com/studentsuccesshub](https://ko-fi.com/studentsuccesshub)
- **GitHub:** [CareerSuccessHub/ai-companion-hub](https://github.com/CareerSuccessHub/ai-companion-hub)

---

**Built with ❤️ by the AI Career Success Hub team**

### 2. Anime Companion
- Bright, colorful gradient backgrounds
- Cheerful and encouraging personality
- Cute and friendly visual style

### 3. Pet Companion
- Warm, cozy color palette
- Playful and loving personality
- Pet-themed interactions

## Customization

### Adding New Themes

Edit `lib/themes.ts` to add new theme configurations:

```typescript
export const themes: Record<string, Theme> = {
  'your-theme': {
    id: 'your-theme',
    name: 'Your Theme Name',
    background: 'bg-your-color',
    // ... other properties
  },
};
```

### Customizing AI Personality

Edit the system prompts in `app/api/chat/route.ts` to change how the AI responds for each theme.

## Roadmap

- [ ] Implement micro tools functionality
- [ ] Add user authentication
- [ ] Implement data persistence
- [ ] Add voice interaction
- [ ] Premium features & monetization
- [ ] Mobile app version
- [ ] Multi-language support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue in the GitHub repository.
