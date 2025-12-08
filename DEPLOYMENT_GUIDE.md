# Deployment Guide - AI Student Success Hub

## 🚀 Deploy to Vercel (Free Hosting)

### Step 1: Prepare Repository
Your GitHub repo is ready at: `github.com/melee45/ai-companion-hub`

### Step 2: Deploy to Vercel
1. Go to [Vercel](https://vercel.com)
2. Click "Sign Up" or "Log In" with GitHub
3. Click "Add New Project"
4. Import `melee45/ai-companion-hub` repository
5. **Configure Project:**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

6. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add: `GEMINI_API_KEY` = `your-gemini-api-key-here`
   - Add: `NEXT_PUBLIC_BASE_URL` = `https://ai-companion-hub.vercel.app` (update after deployment)

7. Click **"Deploy"**

### Step 3: Get Your Free Domain
After deployment, you'll get:
- **Free Vercel URL:** `https://ai-companion-hub.vercel.app`
- Use this immediately - it's free forever!

### Step 4: Update Environment Variable
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Update `NEXT_PUBLIC_BASE_URL` to your actual Vercel URL
3. Redeploy (automatic if you push to main branch)

---

## 🌐 Custom Domain Options

### Option 1: Free Vercel Subdomain ✅ RECOMMENDED
- **URL:** `ai-companion-hub.vercel.app`
- **Cost:** FREE
- **Setup:** Automatic
- **SSL:** Free (automatic)
- **Professional:** Yes, Vercel domains are trusted

### Option 2: Budget .com Domain
- **Providers:** Namecheap, GoDaddy, Google Domains
- **Cost:** ~$10-15/year
- **Setup:** 
  1. Buy domain (e.g., `studentsuccesshub.com`)
  2. In Vercel: Settings → Domains → Add Domain
  3. Update DNS records in your domain provider
- **SSL:** Free (automatic)

### Option 3: Free Freenom Domains
- **URL:** `.tk`, `.ml`, `.ga`, `.cf`, `.gq`
- **Cost:** FREE
- **Issues:** 
  - Less professional
  - Can be revoked
  - Some services block them
  - Lower SEO trust
- **Verdict:** NOT recommended for revenue-focused project

**RECOMMENDATION:** Start with free Vercel subdomain, buy custom domain when revenue hits $100/month.

---

## 📊 Post-Deployment Setup

### 1. Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://ai-companion-hub.vercel.app`
3. Verify ownership (Vercel auto-verifies or use HTML tag)
4. Submit sitemap: `https://ai-companion-hub.vercel.app/sitemap.xml`

### 2. Google Analytics 4
1. Go to [Google Analytics](https://analytics.google.com)
2. Create account → Add property
3. Get Measurement ID (G-XXXXXXXXXX)
4. Add to your site (see ANALYTICS_SETUP.md)

### 3. Monitor Performance
- **Vercel Analytics:** Built-in (free tier)
- **Lighthouse Score:** Run in Chrome DevTools
- **PageSpeed Insights:** https://pagespeed.web.dev

---

## 🔄 Continuous Deployment

Every time you push to `main` branch:
1. Vercel automatically detects changes
2. Builds your Next.js app
3. Deploys to production
4. Updates live site in ~2 minutes

**Test deployments:**
- Create a branch (e.g., `feature/new-feature`)
- Push to GitHub
- Vercel creates preview deployment
- Test before merging to main

---

## ✅ Deployment Checklist

- [ ] Vercel account created with GitHub
- [ ] Repository imported to Vercel
- [ ] `GEMINI_API_KEY` environment variable added
- [ ] First deployment successful
- [ ] Verify site loads: `https://ai-companion-hub.vercel.app`
- [ ] Test AI chat functionality
- [ ] Test Side Hustle Generator
- [ ] Update `NEXT_PUBLIC_BASE_URL` to actual URL
- [ ] Submit sitemap to Google Search Console
- [ ] Setup Google Analytics 4
- [ ] Create OG image (`public/og-image.png`)
- [ ] Test social media preview (Facebook, Twitter)
- [ ] Run Lighthouse audit (aim for 90+ score)

---

## 🐛 Troubleshooting

**Build fails:**
- Check build logs in Vercel dashboard
- Verify all dependencies in package.json
- Ensure TypeScript has no errors locally

**Environment variables not working:**
- Must start with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding new variables
- Check variable names match exactly

**Chat not working:**
- Verify `GEMINI_API_KEY` is correct
- Check Vercel logs for API errors
- Test API endpoint: `/api/chat`

**404 errors:**
- Clear Vercel cache and redeploy
- Check file paths are correct
- Verify sitemap.ts is in app directory

---

## 📈 Next Steps After Deployment

1. ✅ Share your live URL!
2. 📊 Setup Google Analytics
3. 💰 Apply for Google AdSense (need ~20 quality pages + traffic)
4. 🔗 Get real affiliate links (Fiverr, Upwork partner programs)
5. 📱 Test on mobile devices
6. 🚀 Start driving traffic (social media, Reddit, student forums)

---

**Estimated deployment time:** 10-15 minutes  
**Cost:** $0 (Vercel free tier is generous)

Good luck! 🚀
