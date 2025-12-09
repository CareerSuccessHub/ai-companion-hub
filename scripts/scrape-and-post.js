/**
 * Blog Content Scraper & Auto-Poster
 * Scrapes career advice from top blogs, rewrites with AI, and publishes
 * Run: node scripts/scrape-and-post.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Target blogs to scrape (RSS feeds for easy parsing)
const TARGET_BLOGS = [
  'https://www.themuse.com/advice/rss',
  'https://www.forbes.com/careers/feed/',
  'https://hbr.org/topic/career-planning',
];

// Topics we want to focus on
const RELEVANT_KEYWORDS = [
  'salary negotiation',
  'resume',
  'career change',
  'side hustle',
  'remote work',
  'interview',
  'job search',
  'professional development',
];

/**
 * Fetch content from URL
 */
function fetchContent(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

/**
 * Parse RSS feed for articles
 */
function parseRSS(xml) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  
  while ((match = itemRegex.exec(xml)) !== null) {
    const item = match[1];
    const title = (item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || 
                   item.match(/<title>(.*?)<\/title>/))?.[1];
    const link = item.match(/<link>(.*?)<\/link>/)?.[1];
    const description = (item.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/) || 
                        item.match(/<description>(.*?)<\/description>/))?.[1];
    
    if (title && link) {
      items.push({ title, link, description: description || '' });
    }
  }
  
  return items;
}

/**
 * Check if article is relevant to our topics
 */
function isRelevant(article) {
  const text = `${article.title} ${article.description}`.toLowerCase();
  return RELEVANT_KEYWORDS.some(keyword => text.includes(keyword));
}

/**
 * Rewrite content with Gemini API to avoid plagiarism
 */
async function rewriteWithAI(title, originalContent) {
  const prompt = `Rewrite this career advice article in a unique way. Make it engaging for students and young professionals. Keep the core advice but use completely different wording, examples, and structure.

Original Title: ${title}

Original Content: ${originalContent}

Provide:
1. A new catchy title (SEO-friendly)
2. A rewritten article (800-1200 words, markdown format)
3. 3-5 key takeaways

Format as JSON:
{
  "title": "new title",
  "content": "markdown content",
  "takeaways": ["point 1", "point 2", ...]
}`;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('❌ GEMINI_API_KEY not found in environment');
    return null;
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.9,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          }
        })
      }
    );

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!text) return null;
    
    // Extract JSON from response (might be wrapped in markdown)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return null;
  } catch (error) {
    console.error('AI rewrite error:', error);
    return null;
  }
}

/**
 * Create blog post file
 */
function createBlogPost(slug, content, metadata) {
  const date = new Date().toISOString().split('T')[0];
  const filename = `${date}-${slug}.mdx`;
  const filepath = path.join(__dirname, '../app/blog', filename);
  
  const frontmatter = `---
title: "${metadata.title}"
date: "${date}"
author: "AI Career Hub Team"
description: "${metadata.description || metadata.title}"
tags: ${JSON.stringify(metadata.tags || ['career', 'advice'])}
---

${content}

## Key Takeaways

${metadata.takeaways?.map(t => `- ${t}`).join('\n') || ''}

---

*This article was researched and curated by our AI team. For personalized career advice, [chat with our AI Career Mentor](/).*
`;

  fs.writeFileSync(filepath, frontmatter);
  console.log(`✅ Created: ${filename}`);
  return filename;
}

/**
 * Main execution
 */
async function main() {
  console.log('🔍 Scraping career blogs...\n');
  
  const allArticles = [];
  
  // Fetch from all RSS feeds
  for (const feedUrl of TARGET_BLOGS) {
    try {
      console.log(`Fetching: ${feedUrl}`);
      const xml = await fetchContent(feedUrl);
      const articles = parseRSS(xml);
      allArticles.push(...articles.filter(isRelevant));
      console.log(`  Found ${articles.length} articles (${articles.filter(isRelevant).length} relevant)\n`);
    } catch (error) {
      console.error(`  ❌ Error: ${error.message}\n`);
    }
  }
  
  console.log(`📰 Total relevant articles: ${allArticles.length}\n`);
  
  if (allArticles.length === 0) {
    console.log('No articles found. Try again later.');
    return;
  }
  
  // Pick top 2 most relevant articles
  const topArticles = allArticles.slice(0, 2);
  
  for (const article of topArticles) {
    console.log(`\n📝 Processing: ${article.title}`);
    console.log(`   URL: ${article.link}`);
    
    // Rewrite with AI
    const rewritten = await rewriteWithAI(article.title, article.description);
    
    if (rewritten) {
      const slug = rewritten.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      createBlogPost(slug, rewritten.content, {
        title: rewritten.title,
        description: rewritten.content.substring(0, 150),
        takeaways: rewritten.takeaways,
        tags: ['career', 'advice', 'professional-development'],
      });
    } else {
      console.log('   ⚠️  AI rewrite failed, skipping');
    }
    
    // Rate limit (1 request per 5 seconds)
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
  
  console.log('\n✨ Done! Check app/blog/ for new posts.');
}

main().catch(console.error);
