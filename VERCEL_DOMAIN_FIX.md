# Vercel Domain Fix Guide

## Issue
The main Vercel domain is showing an outdated deployment while git-main and self domains show the latest version.

## Current Domains:
- ❌ OLD: https://ai-companion-n5lt9o1qg-laries-projects.vercel.app/ (outdated)
- ✅ UPDATED: https://ai-companion-hub-git-main-laries-projects.vercel.app/
- ✅ UPDATED: https://ai-companion-hub-self.vercel.app/

## Fix Steps:

### Option 1: Use Vercel Dashboard (Recommended)
1. Go to: https://vercel.com/laries-projects/ai-companion-hub
2. Click on "Domains" tab
3. Find the primary domain (should be ai-companion-hub-self.vercel.app or ai-companion-hub.vercel.app)
4. If you see "ai-companion-n5lt9o1qg-laries-projects.vercel.app" set as primary:
   - Remove it or set a different domain as primary
5. Make "ai-companion-hub-self.vercel.app" your primary production domain
6. Click "Visit" button should now show updated version

### Option 2: Redeploy from Dashboard
1. Go to: https://vercel.com/laries-projects/ai-companion-hub/deployments
2. Find the latest deployment (should show "8bd9016" commit hash)
3. Click the "..." menu → "Promote to Production"
4. This forces the main domain to update

### Option 3: Add vercel.json (Force production settings)
Create vercel.json in project root with:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/$1"
    }
  ]
}
```

Then commit and push - this triggers a fresh production deployment.

## Quick Check:
After fixing, verify ALL these URLs show the navigation bar at top:
- https://ai-companion-hub-self.vercel.app/
- https://ai-companion-hub.vercel.app/ (if this exists)
- Main "Visit" button from Vercel dashboard

## Recommended Primary Domain:
Use: **ai-companion-hub-self.vercel.app**
(This is the cleanest auto-generated production URL)

## If Still Issues:
- Clear browser cache (Ctrl + Shift + Delete)
- Try incognito window
- Wait 2-3 minutes for CDN propagation

## Share This URL:
Use **ai-companion-hub-self.vercel.app** for all sharing until primary domain is fixed.
This one is definitely up-to-date!
