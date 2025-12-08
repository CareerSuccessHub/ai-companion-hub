# Gemini API Setup Guide

## Quick Setup (2 minutes)

### 1. Get Your Free Gemini API Key
1. Go to https://aistudio.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key

### 2. Add to Your Project
Create or edit `.env.local` in your project root:

```env
GEMINI_API_KEY=your-api-key-here
USE_MOCK_AI=false
```

### 3. Restart the Server
```bash
npm run dev
```

## Troubleshooting

### "GEMINI_API_KEY not configured"
- Make sure `.env.local` exists in the project root
- Check that your API key is correctly pasted (no extra spaces)
- Restart the dev server after adding the key

### "404 Not Found" errors
- The app now uses `gemini-1.5-flash` which is the current stable model
- Make sure your API key is valid and active
- Check your free tier quota hasn't been exceeded

## Free Tier Limits
- **15 requests per minute**
- **1,500 requests per day**
- No credit card required!

## Current Model
The app uses **gemini-1.5-flash**, Google's latest fast model optimized for chat applications.
