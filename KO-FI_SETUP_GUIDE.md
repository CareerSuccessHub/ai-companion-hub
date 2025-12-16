# Ko-fi Page Setup Guide
**For:** AI Career Success Hub  
**Goal:** Convert free users to $5/month supporters for unlimited AI access  
**Created:** December 16, 2025

---

## 🎯 Ko-fi Profile Setup

### Profile Name
**AI Career Success Hub**

### Profile URL (Username)
**Recommendation:** `aicareersuccesshub` or `careertoolkit`  
**URL:** https://ko-fi.com/aicareersuccesshub

### Profile Picture
Use your website logo (circular format, 400×400px minimum)

### Cover Image
**Recommended size:** 1200×350px  
**Design idea:** Screenshot montage of your AI tools (chat, resume reviewer, salary negotiator) with text overlay: "Unlock AI-Powered Career Tools"

---

## 📝 Ko-fi Page Copy

### Bio / Description
```
🚀 AI-powered career tools to help you land better jobs and negotiate higher salaries

We build free career resources for students and young professionals. Your support keeps our AI tools running and helps us create more content!

✅ Free Tools: Scholarship database, blog, templates
💎 Supporter Benefits: Unlimited AI career mentor, resume reviewer & salary negotiator

Support starts at just $5/month - skip one coffee, unlock your dream career! ☕→💼
```

### Goal / Fundraising Message (Optional)
```
Help us reach 50 supporters to cover AI API costs and keep the platform free for students! 

Current Progress: [X]/50 supporters
```

### Thank You Message (After First Support)
```
🎉 Thank you for supporting AI Career Success Hub!

Your access has been activated! Here's what you get:

✅ Unlimited AI Career Mentor Chat
✅ Unlimited AI Resume Reviews
✅ Unlimited Salary Negotiation Scripts
✅ Early access to new features

🔑 Access Instructions:
1. Check your email for your supporter access code
2. Visit https://ai-companion-hub-self.vercel.app
3. Click any AI tool and enter your code when prompted

Questions? Email us at [your-email]@gmail.com

You're helping us keep career tools accessible for everyone. Thank you! 🙏
```

---

## 💰 Membership Tiers Setup

### Tier 1: Career Supporter ⭐ ($5/month)
**Display Name:** Career Supporter

**Description:**
```
Unlock unlimited AI-powered career tools!

What you get:
✅ Unlimited AI Career Mentor conversations
✅ Unlimited AI Resume Reviews (with detailed feedback)
✅ Unlimited Salary Negotiation Script Generator
✅ Priority support (24h response time)
✅ Early access to new tools
✅ Supporter badge on our website

Perfect for: Active job seekers, career changers, and students preparing for interviews
```

**Benefits to list:**
- Unlimited AI Career Mentor Chat
- Unlimited Resume Reviews
- Unlimited Salary Scripts
- Priority Email Support
- Early Access to New Features

### Optional Tier 2: Career Champion 💎 ($10/month)
**Display Name:** Career Champion

**Description:**
```
Everything in Career Supporter PLUS:

✅ 1-on-1 resume review session (30 min/month via Zoom)
✅ Personalized career roadmap
✅ Monthly career strategy newsletter (not public)
✅ Vote on new features we build
✅ Lifetime access (even if you cancel later)

Perfect for: Serious professionals making major career moves
```

### Optional Tier 3: Career Mentor ⚡ ($25/month)
**Display Name:** Career Mentor (Limited spots)

**Description:**
```
Everything in Career Champion PLUS:

✅ Weekly 1-on-1 coaching calls (30 min/week)
✅ Direct Slack/Discord access to founders
✅ Custom career tools built for your needs
✅ Listed as supporter on our About page

Perfect for: Executives, consultants, and high-earning professionals

Note: Limited to 10 spots to ensure quality support
```

---

## 🎨 Suggested Ko-fi Page Galleries

### Gallery 1: Tool Screenshots
**Title:** See What You'll Unlock
- Screenshot 1: AI Career Mentor chat interface
- Screenshot 2: Resume review with feedback highlights
- Screenshot 3: Salary negotiation script output

### Gallery 2: Success Stories
**Title:** Real Results from Our Community
- Testimonial screenshot 1: "Got 15% raise using salary script!"
- Testimonial screenshot 2: "AI resume review helped me land 3 interviews"
- Testimonial screenshot 3: "Career mentor chat saved me hours of research"

### Gallery 3: Free vs Premium Comparison
**Title:** Free Tools vs Supporter Access
Create comparison table image:

| Feature | Free Users | Supporters ($5/mo) |
|---------|------------|-------------------|
| Scholarship Database | ✅ Unlimited | ✅ Unlimited |
| Blog Articles | ✅ Unlimited | ✅ Unlimited |
| Resume Templates | ✅ 5 templates | ✅ 10+ templates |
| AI Career Mentor | ❌ Coming soon | ✅ Unlimited |
| AI Resume Reviewer | ❌ Coming soon | ✅ Unlimited |
| AI Salary Negotiator | ❌ Coming soon | ✅ Unlimited |
| Priority Support | ❌ | ✅ 24h response |

---

## 📧 Email Templates

### Welcome Email (Manual - First 10 Supporters)
**Subject:** 🎉 Your AI Career Tools Access is Ready!

```
Hi [Name],

Thank you for becoming a supporter of AI Career Success Hub! 🚀

Your supporter access is now active. Here's your personal access code:

🔑 ACCESS CODE: [UNIQUE-CODE-HERE]

How to use your AI tools:
1. Visit https://ai-companion-hub-self.vercel.app
2. Click any AI tool (Career Mentor, Resume Reviewer, or Salary Negotiator)
3. Enter your access code when prompted
4. Enjoy unlimited AI-powered career advice!

What you can do now:
✅ Chat with AI Career Mentor for personalized advice
✅ Upload your resume for detailed AI feedback
✅ Generate custom salary negotiation scripts

Need help? Just reply to this email - we'll respond within 24 hours.

You're supporting our mission to make career tools accessible to everyone. Thank you! 🙏

Best,
[Your Name]
AI Career Success Hub Team

P.S. We're rolling out new features every month. You'll get early access as a supporter!
```

### Monthly Update Email (All Supporters)
**Subject:** 🚀 New Feature Alert: [Feature Name] Now Live!

```
Hi supporter!

Quick update on what's new at AI Career Success Hub:

✨ NEW THIS MONTH:
- [Feature 1]: Description
- [Feature 2]: Description
- [Feature 3]: Description

📊 BY THE NUMBERS:
- [X] active supporters (that's you!)
- [Y] AI career advice conversations
- [Z] resumes reviewed
- $[A] in salary increases reported by users

🎯 COMING SOON:
- [Future feature 1]
- [Future feature 2]

Your support makes all of this possible. Thank you for believing in our mission! 💙

Keep crushing your career goals,
[Your Name]

P.S. Have feedback or feature requests? Reply to this email!
```

---

## 🔧 Technical Integration

### Ko-fi Webhook Setup
1. Go to https://ko-fi.com/manage/webhooks
2. Enable webhooks
3. Set webhook URL: `https://ai-companion-hub-self.vercel.app/api/kofi-webhook`
4. Copy verification token
5. Save token to `.env.local`: `KOFI_VERIFICATION_TOKEN=your_token_here`

### Webhook Payload Example
```json
{
  "message_id": "12345678-1234-1234-1234-123456789012",
  "timestamp": "2025-12-16T12:00:00Z",
  "type": "Subscription",
  "is_subscription_payment": true,
  "is_first_subscription_payment": true,
  "email": "supporter@example.com",
  "amount": "5.00",
  "currency": "USD",
  "from_name": "John Doe",
  "message": "Thanks for the amazing tools!",
  "tier_name": "Career Supporter"
}
```

### Database Schema (Vercel KV)
```typescript
// Store supporter data
interface Supporter {
  email: string;
  accessCode: string;        // e.g., "CS-ABC123"
  tier: string;              // "Career Supporter"
  subscriptionId: string;    // From Ko-fi
  startDate: string;         // ISO date
  lastPaymentDate: string;   // ISO date
  status: "active" | "cancelled";
}

// Redis key format: "supporter:{email}"
// Example: "supporter:john@example.com"
```

---

## 📊 Conversion Funnel

### Touchpoint 1: AI Tool Page (Before Use)
**Banner:**
```
🎁 Limited Time: First 50 supporters get lifetime access for $5/month
[Become a Supporter] [See Benefits]
```

### Touchpoint 2: After Using Free Tool
**Modal:**
```
Title: 🎉 You've Used Your Daily Free AI Query!

Body:
Thanks for trying our AI tools! Free users get 1 AI query per day.

Want unlimited access?

Career Supporter ($5/month):
✅ Unlimited AI conversations
✅ Unlimited resume reviews
✅ Unlimited salary scripts
✅ Priority support

That's less than one coffee per month! ☕

[Unlock Unlimited Access - $5/mo] [Maybe Later]

Resets in: [23h 45m]
```

### Touchpoint 3: Blog Post CTA
**End of article:**
```
---

💡 Want personalized career advice?

This article was written by our team, but our AI Career Mentor can give you personalized guidance for your specific situation.

Supporters get unlimited access to:
- AI Career Mentor Chat
- AI Resume Reviewer
- AI Salary Negotiator

[Become a Supporter - $5/month] [Learn More]
```

---

## 🎯 Launch Checklist

**Ko-fi Profile Setup:**
- [ ] Create Ko-fi account
- [ ] Set username (aicareersuccesshub)
- [ ] Upload profile picture & cover image
- [ ] Add bio description (copy from above)
- [ ] Set up "Career Supporter" tier ($5/month)
- [ ] Add benefits list to tier
- [ ] Upload gallery images (tool screenshots)
- [ ] Enable webhooks (save verification token)
- [ ] Test donation flow (use your own email)

**Website Integration:**
- [ ] Add Ko-fi button to all AI tool pages
- [ ] Create upgrade modal component
- [ ] Build supporter verification system
- [ ] Add webhook endpoint (/api/kofi-webhook)
- [ ] Set up email system (manual for MVP)
- [ ] Create supporter dashboard page (/dashboard)
- [ ] Add "Supporters" page listing all supporters (optional)

**Marketing Materials:**
- [ ] Create social media graphics (Ko-fi announcement)
- [ ] Write launch blog post ("Introducing Premium Features")
- [ ] Update homepage with Free vs Premium comparison
- [ ] Add Ko-fi link to email signature
- [ ] Pin Ko-fi link on Twitter/LinkedIn profile

**Testing:**
- [ ] Test webhook triggers correctly
- [ ] Verify access code generation works
- [ ] Confirm supporter can access all AI tools
- [ ] Test cancellation flow (refund policy?)
- [ ] Check email delivery (welcome email)

---

## 💬 FAQ for Supporters Page

### Q: What happens if I cancel my subscription?
**A:** You'll keep access until the end of your current billing period. After that, you'll return to free tier with 1 AI query per day. Your account data is saved, so you can resubscribe anytime!

### Q: Can I get a refund?
**A:** First-time supporters get a 7-day money-back guarantee, no questions asked. Just email us at [email] within 7 days of your first payment.

### Q: How do I access the AI tools after subscribing?
**A:** You'll receive an email with your access code within 5 minutes. Just enter it on any AI tool page to unlock unlimited access.

### Q: Do you offer student discounts?
**A:** Not yet, but we're planning to add $3/month student tier soon! For now, our free tier includes scholarship database and blog access.

### Q: How is my data used?
**A:** We never sell your data. Your conversations are used only to provide AI responses and improve our tools. See our [Privacy Policy] for details.

### Q: Can I pause my subscription?
**A:** Not currently, but you can cancel anytime and resubscribe later. Your access code will be reactivated when you return!

---

## 📈 Growth Tactics

### Week 1: Soft Launch (First 10 Supporters)
- Email existing users: "Exclusive early access to premium features"
- Offer bonus: "First 10 supporters get lifetime $5/month rate (never increases)"
- Share on social media: "Help us reach 10 supporters by Friday!"

### Week 2-4: Public Launch
- Publish blog post: "Introducing Premium AI Career Tools"
- Reddit post on r/careerguidance, r/resumes
- Add Ko-fi badge to all tool pages
- Update homepage hero: "Free Tools + Premium AI"

### Month 2: Conversion Optimization
- A/B test pricing: $3 vs $5 vs $7
- Test modal timing: After 1st use vs 3rd use
- Add testimonials from first supporters
- Create comparison page (free vs premium)

### Month 3: Referral Program
- "Invite 3 friends, get 1 month free"
- Supporters get unique referral link
- Track referrals via URL parameters
- Reward top referrers with free lifetime access

---

## 🎁 Launch Incentives (Optional)

### Early Bird Bonus (First 50 Supporters)
```
🚀 EARLY BIRD SPECIAL

First 50 supporters get:
✅ Lifetime $5/month rate (price increases to $7 after 50)
✅ Exclusive "Founding Supporter" badge
✅ Listed on our About page (if you opt-in)
✅ Vote on next features we build

[Claim Your Spot - $5/month]

[X]/50 spots claimed
```

### Holiday Launch Promo
```
🎄 DECEMBER SPECIAL

Subscribe by Dec 31st and get:
✅ First month for $3 (then $5/month)
✅ Bonus: 10 premium resume templates
✅ Career goals workbook (PDF)

[Start Your Career Upgrade - $3]
```

---

## 📞 Support Contact

**Supporter Support Email:** [your-email]@gmail.com  
**Response Time:** Within 24 hours for supporters, 48 hours for free users  
**Live Chat:** Coming soon (after 50 supporters)

---

## ✅ Next Steps

1. **Now:** Create Ko-fi account and set up profile (use copy above)
2. **Today:** Upload screenshots and graphics
3. **This Week:** Test donation flow and webhook integration
4. **Next Week:** Launch soft (invite first 10 supporters)
5. **Week 3-4:** Public launch with blog post + social media

**Need help?** Review this guide with your team and assign tasks!
