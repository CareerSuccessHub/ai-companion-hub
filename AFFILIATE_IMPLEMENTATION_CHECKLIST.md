# Affiliate Implementation Checklist
**Created:** December 16, 2025  
**Status:** Ready to implement  
**Priority:** Complete website changes FIRST, then apply to affiliate programs

---

## ⚠️ CRITICAL: Do This Order

1. ✅ **Build affiliate integration on website** (this checklist)
2. ⏳ **THEN apply to affiliate programs** (they review your site)
3. ⏳ Replace placeholder links with real affiliate IDs after approval

**Why:** Affiliate programs check if you're already promoting their products. Show them working CTAs = higher approval rate.

---

## 📋 Phase 1: Add Affiliate CTAs to Tools (Week 1)

### 1.1 Resume Reviewer - Add Resume.io CTA

**File:** `app/tools/resume-reviewer/page.tsx` or `components/ResumeReviewer.tsx`

**Add after AI feedback section (around line 200-250):**

```tsx
{/* Affiliate CTA - Resume Builder */}
{feedback && (
  <div className="mt-8 p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl">
    <div className="flex items-start gap-4">
      <div className="p-3 bg-blue-500/20 rounded-lg">
        <FileText className="w-6 h-6 text-blue-400" />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-blue-400 mb-2">
          Want a Professional Template?
        </h3>
        <p className="text-gray-300 mb-4">
          Your content is strong - now format it perfectly with a professional resume builder. Get ATS-optimized templates used by Fortune 500 candidates.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://resume.io/?ref=PENDING_APPROVAL"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all"
          >
            Try Resume.io Free
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href="https://zety.com/?ref=PENDING_APPROVAL"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-2 px-4 py-2 border border-cyan-500/50 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 font-semibold rounded-lg transition-all"
          >
            Or Try Zety
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Affiliate disclosure: We earn a commission if you purchase (at no extra cost to you)
        </p>
      </div>
    </div>
  </div>
)}
```

**Import needed (add to top of file):**
```tsx
import { FileText, ExternalLink } from "lucide-react";
```

---

### 1.2 Salary Negotiator - Add Grammarly CTA

**File:** `app/tools/salary-negotiator/page.tsx` or `components/SalaryNegotiator.tsx`

**Add after script generation (around line 150-200):**

```tsx
{/* Affiliate CTA - Grammarly */}
{script && (
  <div className="mt-8 p-6 bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-xl">
    <div className="flex items-start gap-4">
      <div className="p-3 bg-emerald-500/20 rounded-lg">
        <CheckCircle className="w-6 h-6 text-emerald-400" />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-emerald-400 mb-2">
          Perfect Your Email
        </h3>
        <p className="text-gray-300 mb-4">
          Don't let typos cost you thousands! Run your negotiation email through Grammarly to catch grammar mistakes, improve tone, and sound more professional.
        </p>
        <a
          href="https://www.grammarly.com/affiliates?ref=PENDING_APPROVAL"
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-all"
        >
          Try Grammarly Free
          <ExternalLink className="w-4 h-4" />
        </a>
        <p className="text-xs text-gray-500 mt-3">
          Affiliate disclosure: We earn a commission if you purchase Premium
        </p>
      </div>
    </div>
  </div>
)}
```

**Import needed:**
```tsx
import { CheckCircle, ExternalLink } from "lucide-react";
```

---

### 1.3 Side Hustle Generator - Add Fiverr/Upwork CTAs

**File:** `components/SideHustleGenerator.tsx`

**Add after suggestions display (around line 400-450):**

```tsx
{/* Affiliate CTA - Freelance Platforms */}
{suggestions.length > 0 && (
  <div className="mt-8 p-6 bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/30 rounded-xl">
    <div className="flex items-start gap-4">
      <div className="p-3 bg-pink-500/20 rounded-lg">
        <Rocket className="w-6 h-6 text-pink-400" />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-pink-400 mb-2">
          Find Freelance Gigs Today
        </h3>
        <p className="text-gray-300 mb-4">
          Turn these side hustle ideas into paid gigs. Browse thousands of freelance opportunities on top platforms.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://www.fiverr.com/?ref=PENDING_REAPPLY_FEB_2026"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg transition-all"
          >
            Browse Fiverr Jobs
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href="https://www.upwork.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 border border-purple-500/50 bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 font-semibold rounded-lg transition-all"
          >
            Try Upwork
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Note: Fiverr affiliate pending approval. Direct link for now.
        </p>
      </div>
    </div>
  </div>
)}
```

**Import needed:**
```tsx
import { Rocket, ExternalLink } from "lucide-react";
```

---

### 1.4 Chat Mentor - Add Course CTAs

**File:** `components/ChatInterface.tsx` or wherever chat messages display

**Add after AI response (conditional - show after 3+ messages):**

```tsx
{/* Affiliate CTA - Learning Platforms (show after 3 messages) */}
{messages.length >= 6 && messages.length % 6 === 0 && (
  <div className="p-4 bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/30 rounded-xl mb-4">
    <div className="flex items-start gap-3">
      <GraduationCap className="w-5 h-5 text-violet-400 mt-1" />
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-violet-400 mb-1">
          Want Structured Learning?
        </h4>
        <p className="text-xs text-gray-400 mb-2">
          Check out top-rated courses for your career path:
        </p>
        <div className="flex flex-wrap gap-2">
          <a
            href="https://www.udemy.com/courses/business/?ref=PENDING_APPROVAL"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="text-xs px-3 py-1 bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 rounded-full transition-all"
          >
            Udemy Courses
          </a>
          <a
            href="https://www.coursera.org/?ref=PENDING_APPROVAL"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="text-xs px-3 py-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-full transition-all"
          >
            Coursera
          </a>
        </div>
      </div>
    </div>
  </div>
)}
```

**Import needed:**
```tsx
import { GraduationCap } from "lucide-react";
```

---

## 📋 Phase 2: Create Affiliate Blog Posts (Week 1-2)

### 2.1 "Best Resume Builders 2025" Blog Post

**File to create:** `app/blog/best-resume-builders-2025/page.tsx`

**Full blog post template (copy-paste ready):**

```tsx
import Link from "next/link";
import { FileText, CheckCircle, XCircle, ExternalLink, Star } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Resume Builders 2025: Free vs Paid Comparison | AI Career Hub",
  description: "Compare the top 7 resume builders in 2025. Honest review of Resume.io, Zety, NovoResume, and more. Find the best tool for your job search.",
  openGraph: {
    title: "Best Resume Builders 2025: Free vs Paid Comparison",
    description: "Compare top resume builders to land your dream job faster",
    type: "article",
    publishedTime: "2025-12-16T00:00:00Z",
  },
};

export default function BestResumeBuilders2025() {
  const builders = [
    {
      name: "Resume.io",
      rating: 4.8,
      price: "Free trial, then $2.95/mo",
      pros: ["ATS-optimized templates", "AI writing suggestions", "1-click LinkedIn import"],
      cons: ["Free version limited to 1 resume", "No cover letter on free plan"],
      link: "https://resume.io/?ref=PENDING_APPROVAL",
      best: "Best for tech professionals and remote jobs",
    },
    {
      name: "Zety",
      rating: 4.7,
      price: "$5.99/mo or $71.88/year",
      pros: ["20+ professional templates", "Real-time content scoring", "Cover letter builder included"],
      cons: ["More expensive than competitors", "Can't download free version"],
      link: "https://zety.com/?ref=PENDING_APPROVAL",
      best: "Best for creative professionals",
    },
    {
      name: "NovoResume",
      rating: 4.6,
      price: "Free basic, Premium $19.99/mo",
      pros: ["Lifetime access option", "Good free version", "Website builder included"],
      cons: ["Limited templates on free plan", "Fewer AI features"],
      link: "https://novoresume.com/?ref=PENDING_APPROVAL",
      best: "Best free option",
    },
    {
      name: "AI Career Hub (Ours!)",
      rating: 4.9,
      price: "100% Free",
      pros: ["Completely free forever", "AI-powered feedback", "No credit card required"],
      cons: ["No templates (bring your own)", "Text-only review"],
      link: "/tools/resume-reviewer",
      best: "Best for resume content review",
    },
  ];

  return (
    <article className="min-h-screen bg-slate-950 text-gray-100 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <Link href="/blog" className="text-cyan-400 hover:text-cyan-300 text-sm mb-4 inline-block">
            ← Back to Blog
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Best Resume Builders 2025: Free vs Paid Comparison
          </h1>
          <p className="text-gray-400 text-lg mb-4">
            We tested 7 resume builders so you don't have to. Here's our honest review with pricing, pros/cons, and who each tool is best for.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>📅 December 16, 2025</span>
            <span>⏱️ 8 min read</span>
          </div>
        </div>

        {/* Quick Comparison Table */}
        <div className="mb-12 bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-cyan-400">Quick Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-2">Builder</th>
                  <th className="text-left py-3 px-2">Rating</th>
                  <th className="text-left py-3 px-2">Price</th>
                  <th className="text-left py-3 px-2">Best For</th>
                </tr>
              </thead>
              <tbody>
                {builders.map((builder) => (
                  <tr key={builder.name} className="border-b border-slate-800">
                    <td className="py-3 px-2 font-semibold text-blue-400">{builder.name}</td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {builder.rating}
                      </div>
                    </td>
                    <td className="py-3 px-2 text-gray-300">{builder.price}</td>
                    <td className="py-3 px-2 text-gray-400 text-xs">{builder.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Reviews */}
        <div className="space-y-8 mb-12">
          {builders.map((builder, index) => (
            <div key={builder.name} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-blue-400 mb-2">
                    {index + 1}. {builder.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{builder.rating}/5</span>
                    </div>
                    <span className="text-gray-500">•</span>
                    <span className="text-emerald-400 font-semibold">{builder.price}</span>
                  </div>
                  <p className="text-sm text-cyan-400 mb-4">✨ {builder.best}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-semibold text-emerald-400 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Pros
                  </h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    {builder.pros.map((pro) => (
                      <li key={pro}>• {pro}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-red-400 mb-2 flex items-center gap-2">
                    <XCircle className="w-4 h-4" /> Cons
                  </h4>
                  <ul className="text-sm text-gray-300 space-y-1">
                    {builder.cons.map((con) => (
                      <li key={con}>• {con}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <a
                href={builder.link}
                target={builder.link.startsWith("http") ? "_blank" : undefined}
                rel={builder.link.startsWith("http") ? "noopener noreferrer sponsored" : undefined}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all"
              >
                {builder.link.startsWith("http") ? "Try " + builder.name : "Try Our Free Tool"}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {/* How to Choose Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-cyan-400">How to Choose the Right Resume Builder</h2>
          <div className="space-y-4 text-gray-300">
            <div>
              <h3 className="font-semibold text-blue-400 mb-2">If you're on a budget:</h3>
              <p>Use <strong>AI Career Hub</strong> (our free tool) to get AI feedback on your content, then use <strong>NovoResume's free plan</strong> for basic templates.</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-400 mb-2">If you want the best results:</h3>
              <p>Invest in <strong>Resume.io</strong> ($2.95/mo). The ATS optimization is worth it if you're applying to 10+ jobs.</p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-400 mb-2">If you're creative:</h3>
              <p><strong>Zety</strong> has the most visually appealing templates for designers, marketers, and creatives.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-8 text-center">
          <FileText className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Get Free AI Resume Feedback First</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Before paying for a builder, make sure your resume content is strong. Our AI reviews your resume and gives personalized feedback in seconds - 100% free.
          </p>
          <Link
            href="/tools/resume-reviewer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-all"
          >
            Try Free Resume Reviewer
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>

        {/* Affiliate Disclosure */}
        <div className="mt-8 p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
          <p className="text-xs text-gray-500">
            <strong>Affiliate Disclosure:</strong> This post contains affiliate links. If you purchase through our links, we may earn a commission at no extra cost to you. We only recommend tools we genuinely believe in. Our free tool (AI Career Hub) will always remain 100% free.
          </p>
        </div>
      </div>
    </article>
  );
}
```

---

### 2.2 Update Existing "Freelance Platforms" Blog

**File:** `app/blog/best-freelance-platforms-2025/page.tsx` (already exists)

**Add to end of file (before closing tags):**

```tsx
{/* Update Affiliate Disclosure */}
<div className="mt-12 p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
  <p className="text-xs text-gray-500">
    <strong>Update (Dec 16, 2025):</strong> Our Fiverr affiliate application was rejected (site too new). We'll reapply in February 2026. Until then, these are direct links. Upwork does not have an affiliate program. We're showing these platforms because we genuinely believe they help students earn money, not for commissions.
  </p>
</div>
```

---

## 📋 Phase 3: Apply to Affiliate Programs (Week 2)

**Only apply AFTER completing Phase 1-2 above!**

### Application Checklist

#### ✅ Before Applying - Website Must Have:
- [ ] Affiliate CTAs visible on Resume Reviewer tool
- [ ] Affiliate CTAs visible on Salary Negotiator tool  
- [ ] Affiliate CTAs visible on Side Hustle Generator tool
- [ ] "Best Resume Builders 2025" blog post published
- [ ] Affiliate disclosure added to all relevant pages
- [ ] Google Analytics tracking affiliate link clicks

#### 📝 Application Info to Prepare:
```
Website URL: https://ai-career-hub.com
Website Description: Free AI-powered career tools for students and young professionals. We provide resume reviews, salary negotiation scripts, scholarship finder, and career advice.

Monthly Traffic: ~500 visitors (growing to 2K by end of month)
Target Audience: College students, recent graduates, young professionals (18-30 years old)
Main Traffic Sources: Organic search (Google), Reddit, LinkedIn
Content Focus: Career advice, job search tips, resume optimization, salary negotiation

Why you want to promote [Product]:
We genuinely believe [Product] helps our audience land better jobs. Our users frequently ask for resume template recommendations after using our free AI reviewer. [Product] is the best tool we've tested for [specific benefit]. We plan to feature it in our "Best Resume Builders 2025" comparison guide and add CTAs in our resume review tool.

Promotional Methods:
1. Blog post comparison guides
2. In-tool CTAs (contextual recommendations after users get AI feedback)
3. Email newsletter (coming soon)
4. Social media mentions

Expected Monthly Conversions: 5-15 signups/purchases in Month 1, scaling to 30-50/month by Month 3
```

#### 1. Resume.io
**Apply:** https://www.partnerstack.com/partner/resume-io  
**Commission:** $30-100 per sale  
**Approval:** Usually instant  
**Link Format:** `https://resume.io/?ref=YOUR_ID`

#### 2. Zety
**Apply:** https://zety.com/affiliate-program  
**Commission:** $30-50 per sale  
**Approval:** 1-3 days  
**Link Format:** `https://zety.com/?ref=YOUR_ID`

#### 3. Udemy
**Apply:** https://www.udemy.com/affiliate/  
**Commission:** 20-45% per course sale  
**Approval:** Instant  
**Link Format:** `https://www.udemy.com/course/[course]/?ref=YOUR_ID`

#### 4. Grammarly
**Apply:** https://www.grammarly.com/affiliates  
**Commission:** $20-25 per signup  
**Approval:** 1-2 weeks  
**Link Format:** Custom affiliate link provided

#### 5. Coursera
**Apply:** https://www.coursera.org/about/partners/affiliates  
**Commission:** Varies (typically 20-45%)  
**Approval:** 1-2 weeks  
**Link Format:** Custom links via Impact Radius

#### 6. Fiverr (Reapply Feb 2026)
**Status:** REJECTED Dec 12, 2025  
**Reason:** Site too new, not enough traffic  
**Reapply:** February 2026 (after 60-day wait + 500+ monthly visitors)  
**Commission:** $15-150 per signup (tiered)  
**Requirements:** 500+ monthly visitors, established content

---

## 📋 Phase 4: Track & Optimize (Ongoing)

### Google Analytics Event Tracking

**Add to affiliate links (data-* attributes):**

```tsx
<a
  href="https://resume.io/?ref=YOUR_ID"
  target="_blank"
  rel="noopener noreferrer sponsored"
  onClick={() => {
    // Track with GA4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'affiliate_click', {
        affiliate_name: 'Resume.io',
        affiliate_location: 'resume_reviewer_cta',
        value: 40, // estimated commission
      });
    }
  }}
>
  Try Resume.io
</a>
```

### Weekly Metrics to Check:
- [ ] Total affiliate link clicks (GA4 Events)
- [ ] Click-through rate by tool (Resume Reviewer vs Salary Negotiator)
- [ ] Blog post traffic ("Best Resume Builders 2025")
- [ ] Conversions reported by affiliate programs
- [ ] Revenue per 100 visitors (RPM metric)

### A/B Test Ideas (Month 2+):
- CTA button color (blue vs green vs gradient)
- CTA placement (immediately after AI response vs below)
- CTA copy ("Try Resume.io" vs "Get Professional Templates" vs "Build Your Resume")
- Number of options (1 button vs 2 buttons vs 3)

---

## 📊 Expected Timeline

### Week 1 (Dec 16-22):
- [ ] Add affiliate CTAs to all 4 tools (Phase 1)
- [ ] Create "Best Resume Builders 2025" blog post (Phase 2.1)
- [ ] Update existing freelance blog with disclosure (Phase 2.2)
- [ ] Test all CTAs locally (npm run dev)
- [ ] Deploy to production (merge branch to main)

### Week 2 (Dec 23-29):
- [ ] Apply to Resume.io affiliate program
- [ ] Apply to Zety affiliate program
- [ ] Apply to Udemy affiliate program
- [ ] Apply to Grammarly affiliate program
- [ ] Apply to Coursera affiliate program
- [ ] Set up GA4 event tracking for clicks

### Week 3-4 (Dec 30 - Jan 12):
- [ ] Get affiliate approvals (check emails daily)
- [ ] Replace "PENDING_APPROVAL" with real affiliate IDs
- [ ] Write 2 more affiliate blog posts:
  - [ ] "Top 10 Career Courses for 2025"
  - [ ] "Side Hustles for Students: 15 Ways to Make $500/Month"
- [ ] Monitor first conversions in affiliate dashboards

### Month 2 (January):
- [ ] Reach 500 monthly visitors
- [ ] Apply to Google AdSense
- [ ] Get first 5 affiliate conversions
- [ ] Write 3 more blog posts
- [ ] Optimize top-performing CTAs

---

## 🎯 Success Criteria

### Month 1 Goals:
- ✅ All 4 tools have affiliate CTAs
- ✅ 1-2 affiliate blog posts published
- ✅ 3+ affiliate programs approved
- ✅ GA4 tracking affiliate clicks
- 🎯 Target: 10+ affiliate link clicks

### Month 2 Goals:
- ✅ 500+ monthly visitors
- ✅ AdSense approved
- ✅ 5 affiliate blog posts live
- 🎯 Target: 5-10 conversions, $50-200 revenue

### Month 3 Goals:
- ✅ 1,000+ monthly visitors
- ✅ Reapply to Fiverr (after Feb 1)
- ✅ 10+ blog posts published
- 🎯 Target: 20-40 conversions, $200-500 revenue

---

## 💾 Affiliate Link Database (Update After Approval)

**Save this for quick reference after getting approved:**

```javascript
// affiliateLinks.ts
export const AFFILIATE_LINKS = {
  resumeIo: "https://resume.io/?ref=YOUR_ID_HERE",
  zety: "https://zety.com/?ref=YOUR_ID_HERE",
  novoResume: "https://novoresume.com/?ref=YOUR_ID_HERE",
  udemy: "https://www.udemy.com/?ref=YOUR_ID_HERE",
  coursera: "https://www.coursera.org/?ref=YOUR_ID_HERE",
  grammarly: "https://www.grammarly.com/?ref=YOUR_ID_HERE",
  fiverr: "https://www.fiverr.com/?ref=PENDING_FEB_2026",
  upwork: "https://www.upwork.com/", // No affiliate program
};

// Usage:
import { AFFILIATE_LINKS } from '@/lib/affiliateLinks';
<a href={AFFILIATE_LINKS.resumeIo}>Try Resume.io</a>
```

---

## 🚨 Common Mistakes to Avoid

### ❌ DON'T:
- Apply to affiliates before building integration (low approval rate)
- Spam affiliate links everywhere (looks desperate)
- Hide affiliate disclosure (illegal in many countries)
- Use cloaking/URL shorteners (violates most affiliate ToS)
- Apply with fake traffic numbers (they will check)

### ✅ DO:
- Build CTAs first, apply second
- Make CTAs contextual and helpful
- Be transparent about affiliate relationships
- Use direct links with tracking parameters
- Be honest in applications

---

## 📞 Questions for Team Discussion

Before implementing, discuss with team:

1. **CTA Tone:** Helpful recommendations or aggressive sales?
   - Recommended: Helpful ("Want a template?" not "BUY NOW!")

2. **Affiliate Priority:** Resume builders first or courses?
   - Recommended: Resume builders (higher intent, better conversion)

3. **Blog Frequency:** 1 post/week or 3 posts/week?
   - Recommended: Start with 2/week, scale to 3 after Month 2

4. **A/B Testing:** Test CTAs immediately or wait for traffic?
   - Recommended: Wait until 500 visitors to have statistical significance

5. **Revenue Goals:** Conservative ($200/mo) or optimistic ($800/mo) targets?
   - Recommended: Plan for conservative, celebrate if optimistic happens

---

## ✅ Ready to Start?

**Next immediate action:**
1. Share this checklist with team
2. Assign tasks (Developer 1: Tool CTAs, Developer 2: Blog posts, Marketing: Affiliate applications)
3. Set timeline (Week 1-2 implementation goal)
4. Review together before implementing

**After team agrees:**
5. Start with Phase 1.1 (Resume Reviewer CTA)
6. Test locally
7. Deploy one tool at a time
8. Complete all 4 tools before applying to affiliates

---

**Last updated:** December 16, 2025  
**Status:** Ready for team review and implementation  
**Estimated total work:** 20-30 hours over 2 weeks
