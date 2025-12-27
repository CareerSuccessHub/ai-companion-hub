# Google Forms Newsletter Setup Guide

## Step 1: Create Google Form

1. Go to https://forms.google.com
2. Click **"+ Blank"** to create new form
3. **Title:** "AI Career Hub Newsletter Signup"
4. **Description:** "Get weekly career tips, side hustles, scholarships & blog posts"

## Step 2: Add Form Fields

### Field 1: Email Address
- **Type:** Short answer
- **Question:** "Email Address"
- **Required:** Yes
- **Validation:** Text → Email address

### Field 2 (Optional): Interests
- **Type:** Checkboxes
- **Question:** "What are you interested in? (optional)"
- **Options:**
  - Side hustle ideas
  - Salary negotiation
  - Scholarship opportunities
  - Resume tips
  - Career advice
- **Required:** No

### Field 3: Consent
- **Type:** Checkboxes
- **Question:** "Please confirm:"
- **Options:**
  - "I agree to receive weekly emails from AI Career Hub (you can unsubscribe anytime)"
- **Required:** Yes

## Step 3: Customize Settings

1. Click **Settings** (gear icon)
2. **Presentation tab:**
   - Confirmation message: "Thanks for subscribing! Check your inbox for our next newsletter."
3. **Responses tab:**
   - ✅ Collect email addresses (ON)
   - ✅ Response receipts: Never send

## Step 4: Get Form URL/Embed

### Option A: Direct Link (Recommended for now)
1. Click **Send** button (top right)
2. Click **Link** icon
3. ✅ Check "Shorten URL"
4. **Copy the link** (e.g., `https://forms.gle/abc123xyz`)

### Option B: Embed Code (Optional)
1. Click **Send** button
2. Click **< >** (Embed HTML)
3. Copy the iframe code

## Step 5: Add to Your Website

Open `components/NewsletterSignup.tsx` and replace:

```typescript
const GOOGLE_FORM_URL = 'https://forms.google.com/YOUR_FORM_ID';
```

With your actual form URL:

```typescript
const GOOGLE_FORM_URL = 'https://forms.gle/YOUR_SHORT_URL';
```

## Step 6: Manage Responses

1. **View responses:** Open your form → Responses tab
2. **Export to Google Sheets:** Click the Sheets icon in Responses tab
3. **Download CSV:** Responses tab → Three dots → Download responses (.csv)

## Step 7: Weekly Email Sending (Manual for now)

Since this is zero-cost:

1. **Weekly:** Export responses from Google Form to CSV
2. **Filter new subscribers** since last export
3. **Send emails manually** or use:
   - Gmail (max 500/day)
   - Your Zoho email account
   - Create HTML email template

### Future: Automate with Zapier/Make (when you have budget)
- Google Forms → Zapier → Email service
- Or migrate to proper ESP when you hit 100+ subscribers

## Best Practices

- ✅ **Send weekly** (consistency builds trust)
- ✅ **Include unsubscribe link** (legal requirement)
- ✅ **Provide value** (not just promotions)
- ✅ **Mobile-friendly** emails
- ❌ **Never spam** or sell email list

## Email Template Example

```
Subject: [Week of Dec 23] Career Tips + New Scholarships 🎓

Hi there!

This week at AI Career Hub:

📝 New Blog Post: [Title + Link]
💰 Featured Scholarship: [Name + Deadline]
🚀 Side Hustle Tip: [Quick actionable tip]
🔧 Tool Spotlight: [Feature one of your tools]

[Brief preview of blog post - 2-3 sentences]

Read full article →

---

Quick Links:
• Resume Reviewer
• Salary Negotiator  
• Browse Scholarships

Unsubscribe | Update preferences
© 2025 AI Career Hub
```

## Next Steps After 100 Subscribers

Consider migrating to:
- **Buttondown** (1,000 free subscribers)
- **Brevo** (300 emails/day free)
- **MailerLite** (1,000 subscribers free)

For now, Google Forms + manual emails = **$0 cost** ✅
