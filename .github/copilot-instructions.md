# AI Career Success Hub - Development Guidelines

## Project Overview
**Current State:** Live production platform at ai-companion-hub-self.vercel.app  
**Launch Date:** December 9, 2025  
**Team:** 3 members (2 developers, 1 marketing specialist)  
**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Gemini AI (gemini-2.5-flash)

## Platform Features (Phase 1-4 Complete)
- ✅ AI Career Mentor (floating chat interface)
- ✅ Resume Reviewer (AI-powered feedback)
- ✅ Salary Negotiation Script Generator
- ✅ Side Hustle Generator (7+ categories)
- ✅ Scholarship Finder (10+ scholarships, $200K+ value, auto-updates monthly)
- ✅ Blog System (manual + auto-generated posts via GitHub Actions)
- ✅ SEO optimized (sitemap, robots.txt, meta tags, schema markup)
- ✅ Analytics (Google Analytics 4 - G-1W1HNJGT2G)
- ✅ Monetization hooks (Ko-fi, AdSense-ready, affiliate disclosure)

## Current Phase (Phase 5 - Dec 11-31, 2025)
**Focus:** Traffic Generation - Goal of 1,000 monthly visitors by Dec 31  
**Team Priorities:**
- Developer 1: Bug fixes, performance monitoring, scholarship curation
- Developer 2: Content creation (3 blog posts/week), email capture, SEO
- Marketing Specialist: Reddit, LinkedIn, Quora, social media engagement

## Code Standards
- **Framework:** Next.js 14 App Router (no Pages Router)
- **Styling:** Tailwind CSS only (no inline styles or CSS modules)
- **Components:** Server components by default, client only when needed ("use client")
- **API:** Gemini API (1,500 requests/day limit, resets midnight PT = 4 PM Philippine Time)
- **State Management:** React Context for theme, Zustand for chat state
- **Icons:** Lucide React icons
- **Formatting:** Prettier with 2-space indent, single quotes

## Important Constraints
- **No breaking changes** to existing features (users already using tools)
- **Gemini API quota:** Monitor usage, implement caching for common queries
- **Vercel limits:** Free tier = 100 build hours/month, optimize builds
- **Mobile-first:** All features must work on mobile (60%+ traffic from mobile)
- **SEO critical:** Every new page needs meta tags, schema markup, sitemap entry

## Testing Requirements
- Test all features locally before pushing (npm run dev)
- Check mobile responsiveness (DevTools mobile view)
- Verify Gemini API responses (error handling for rate limits)
- Run build before commit (npm run build) to catch TypeScript errors
- Test blog posts render correctly (MDX dynamic route)

## Deployment
- **Auto-deploy:** GitHub main branch → Vercel (takes 2-3 minutes)
- **Environment variables:** GEMINI_API_KEY (secret), NEXT_PUBLIC_BASE_URL
- **Build command:** npm run build
- **Production URL:** https://ai-companion-hub-self.vercel.app

## Future Expansion (Phase 6-8 Planned for 2026)
- Phase 6: Writing Tools (paraphrasing, citation generator)
- Phase 7: Finance Tools (loan calculator, budget planner)
- Phase 8: Productivity Suite (study planner, Pomodoro timer)

## Documentation Files (Updated Dec 11, 2025)
- **PROJECT_ROADMAP.md** - Complete roadmap with phases, team assignments, metrics
- **MARKET_TRENDS_2025.md** - Market research, expansion strategy, revenue projections
- **TRAFFIC_STRATEGY.md** - Team-based traffic plan with weekly tasks
- **MONETIZATION_GUIDE.md** - Revenue streams, affiliate programs, AdSense setup
- **README.md** - Project overview, tech stack, setup instructions

## Common Tasks
**Add new blog post (manual):**
1. Create MDX file in app/blog/[title]/page.tsx with proper meta tags
2. Update app/blog/page.tsx if needed (auto-lists from lib/blog.ts)
3. Test locally, verify styling matches salary negotiation blog

**Add new scholarship:**
1. Edit components/ScholarshipDatabase.tsx
2. Add new object to scholarships array with all fields
3. Test filters work correctly

**Fix Gemini API errors:**
1. Check if quota exhausted (429 error = wait until 4 PM Philippine Time)
2. Implement exponential backoff for retries
3. Cache common queries to reduce API calls

**Update weekly metrics:**
1. Check GA4 dashboard (G-1W1HNJGT2G)
2. Fill out weekly report template (see TRAFFIC_STRATEGY.md)
3. Email team on Sundays with insights

## Important Notes
- **Brand name:** "AI Career Success Hub" (not Daily Companion)
- **Target audience:** College students (expanding to young professionals in 2026)
- **Revenue goal:** $100/month in 90 days, $500/month in 6 months
- **Traffic sources:** Reddit, LinkedIn, Quora, blog SEO (see TRAFFIC_STRATEGY.md)
- **Do NOT** add new tool categories until Phase 5 traffic goals hit (1K visitors)

## Emergency Contacts
- **Gemini API issues:** Check console for error code, refer to MARKET_TRENDS_2025.md for quota reset time
- **Deployment fails:** Check Vercel logs, likely TypeScript error or missing env variable
- **Traffic emergency:** See TRAFFIC_STRATEGY.md "TRAFFIC EMERGENCY PLAN" section
