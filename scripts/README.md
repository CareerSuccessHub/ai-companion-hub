# Blog Auto-Scraper

Automatically scrapes career advice from top blogs, rewrites with AI, and publishes to your site.

## How It Works

1. **Scrapes RSS feeds** from The Muse, Forbes Careers, Harvard Business Review
2. **Filters for relevant topics**: salary negotiation, resume, career change, side hustles, etc.
3. **Rewrites with Gemini AI** to create unique content (avoids plagiarism)
4. **Auto-posts** as MDX files to `app/blog/`
5. **Runs weekly** via GitHub Actions (every Monday 9 AM UTC)

## Setup

### 1. Add Gemini API Key to GitHub Secrets

1. Go to your repo: Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `GEMINI_API_KEY`
4. Value: Your Gemini API key (from https://aistudio.google.com/apikey)
5. Save

### 2. Test Locally

```bash
# Set API key
$env:GEMINI_API_KEY="your-key-here"

# Run scraper
node scripts/scrape-and-post.js
```

### 3. Manual Trigger

- Go to: Actions → Auto Blog Posts → Run workflow
- Or wait for Monday 9 AM UTC

## Customization

Edit `scripts/scrape-and-post.js`:

- **TARGET_BLOGS**: Add/remove RSS feed URLs
- **RELEVANT_KEYWORDS**: Change topics to scrape
- **Schedule**: Edit `.github/workflows/auto-blog.yml` cron expression

## Ethical Notes

✅ **Legal**: We're using publicly available RSS feeds  
✅ **Unique**: AI rewrites content completely (not plagiarism)  
✅ **Attribution**: Links back to original sources in metadata  
✅ **Value-Add**: Tailored for students/young professionals  

⚠️ **Always verify** generated content for accuracy before publishing!

## Troubleshooting

**No posts created?**
- Check GitHub Actions logs for errors
- Verify GEMINI_API_KEY is set correctly
- Test locally first with `node scripts/scrape-and-post.js`

**Rate limits?**
- Script includes 5-second delays between API calls
- Processes max 2 articles per run to stay under limits

**Bad content?**
- Adjust AI prompt in `rewriteWithAI()` function
- Increase temperature for more creativity (0.9 → 1.0)
- Add more specific instructions
