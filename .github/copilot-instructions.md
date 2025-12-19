# AI Career Success Hub - Development Guidelines

## Project Overview
**Current State:** Live production platform at ai-career-hub.com  
**Launch Date:** December 9, 2025  
**Current Version:** v1.3.0 (UX improvements deployed Dec 20, 2025)  
**Team:** 3 members (2 developers, 1 marketing specialist)  
**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Gemini AI (gemini-2.5-flash)

## Platform Features (Phase 1-5 In Progress)
- ✅ AI Career Mentor (floating chat interface with session greeting)
- ✅ Resume Reviewer (AI-powered feedback + guided tour)
- ✅ Salary Negotiation Script Generator (guided tour)
- ✅ Side Hustle Generator (7+ categories + guided tour)
- ✅ Scholarship Finder (20+ scholarships, $320K+ value, auto-updates monthly)
- ✅ Blog System (15+ posts: manual + auto-generated via GitHub Actions)
- ✅ SEO optimized (sitemap, robots.txt, meta tags, schema markup)
- ✅ Analytics (Google Analytics 4 - G-1W1HNJGT2G)
- ✅ UX Enhancements (sample data buttons, privacy notes, API quota modals)
- ⏳ Affiliate Integrations (implementing CTAs - see AFFILIATE_IMPLEMENTATION_CHECKLIST.md)

## Current Phase (Phase 5 - Dec 11 - Jan 31, 2026)
**Focus:** Affiliate Implementation + Traffic Generation  
**Primary Goal:** Implement affiliate CTAs & start marketing campaigns  
**Traffic Goal:** 500-1,000 monthly visitors by January 31, 2026 (extended from Dec 31)  
**Revenue Goal:** First affiliate conversions + AdSense approval

**Team Priorities:**
- Developer 1: Affiliate CTA implementation, bug fixes, performance monitoring
- Developer 2: Affiliate blog posts, SEO optimization, email capture
- Marketing Specialist: Affiliate applications, Reddit/LinkedIn marketing (starts Dec 23)

## Code Standards
- **Framework:** Next.js 14 App Router (no Pages Router)
- **Styling:** Tailwind CSS only (no inline styles or CSS modules)
- **Components:** Server components by default, client only when needed ("use client")
- **API:** Gemini API (500/day primary + 2000/day fallbacks = 2500 total, resets midnight PT = 4 PM Philippine Time)
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
- **Production URL:** https://ai-career-hub.com (custom domain active since Dec 16, 2025)

## Future Expansion (Phase 6-8 Planned for 2026)
- Phase 6: Affiliate optimization & traffic scaling (Feb-Mar 2026)
- Phase 7: Writing Tools (paraphrasing, citation generator)
- Phase 8: Finance Tools (loan calculator, budget planner)
- Phase 9: Productivity Suite (study planner, Pomodoro timer)

## Documentation Files (Updated Dec 20, 2025)
- **PROJECT_ROADMAP.md** - Complete roadmap with phases, team assignments, updated milestones
- **AFFILIATE_STRATEGY.md** - Detailed affiliate program info & revenue model (PRIMARY)
- **AFFILIATE_IMPLEMENTATION_CHECKLIST.md** - Step-by-step affiliate CTA implementation
- **TRAFFIC_STRATEGY.md** - Team-based traffic plan with weekly tasks
- **MONETIZATION_GUIDE.md** - Revenue streams overview & action items
- **MARKET_TRENDS_2025.md** - Market research, expansion strategy
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
