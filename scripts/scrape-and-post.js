/**
 * Blog Content Scraper & Auto-Poster
 * Scrapes career advice from top blogs, rewrites with AI, and publishes
 * Run: node scripts/scrape-and-post.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Target blogs to scrape (more reliable sources)
const TARGET_BLOGS = [
  // Dev.to career tags (JSON API - more reliable)
  'https://dev.to/api/articles?tag=career',
  'https://dev.to/api/articles?tag=jobsearch',
  'https://dev.to/api/articles?tag=interview',
];

// Fallback: If scraping fails, generate these topics with AI
const FALLBACK_TOPICS = [
  'How to negotiate your first salary as a new graduate',
  '5 resume mistakes that cost you job interviews',
  'Best side hustles for college students in 2025',
  'How to switch careers without going back to school',
  'Remote job interview tips that actually work',
  'How to ask for a raise (with email templates)',
  'Freelancing vs full-time: Which pays more?',
  'LinkedIn profile optimization for job seekers',
];

// Topics we want to focus on (stay focused on career/income)
const RELEVANT_KEYWORDS = [
  'salary',
  'negotiation',
  'resume',
  'career',
  'job',
  'interview',
  'side hustle',
  'freelance',
  'remote work',
  'income',
  'raise',
  'promotion',
];

/**
 * Fetch content from URL (supports both HTTP and HTTPS, JSON and XML)
 */
async function fetchContent(url) {
  try {
    const response = await fetch(url);
    const contentType = response.headers.get('content-type');
    
    if (contentType?.includes('application/json')) {
      return await response.json();
    }
    return await response.text();
  } catch (error) {
/**
 * Parse content (handles both RSS XML and JSON APIs)
 */
function parseContent(data, url) {
  // Dev.to API returns JSON array
  if (Array.isArray(data)) {
    return data.map(article => ({
      title: article.title,
      link: article.url,
      description: article.description || article.body_markdown?.substring(0, 500) || '',
    }));
  }
  
  // RSS XML format
  if (typeof data === 'string') {
    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;
    
    while ((match = itemRegex.exec(data)) !== null) {
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
    
/**
 * Generate original content from scratch (fallback if scraping fails)
 */
async function generateOriginalContent(topic) {
  const prompt = `Write an in-depth, actionable career advice article for students and young professionals.

Topic: ${topic}

Requirements:
- 800-1200 words
- Practical, actionable advice
- Include specific examples, numbers, templates
- Write in a casual, engaging tone
- Focus on income/career growth for 18-30 age group
- Include step-by-step instructions where relevant

Provide:
1. An SEO-friendly title (include year 2025 if relevant)
2. Article content in markdown format
3. 3-5 key takeaways

Format as JSON:
{
  "title": "article title",
  "content": "markdown content with ## headings, bullet points, etc.",
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
            maxOutputTokens: 3000,
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
    console.error('AI call error:', error);
    return null;
  }
}. A new catchy title (SEO-friendly)
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
    
  // Fetch from all sources
  for (const feedUrl of TARGET_BLOGS) {
    try {
      console.log(`Fetching: ${feedUrl}`);
      const data = await fetchContent(feedUrl);
      if (data) {
        const articles = parseContent(data, feedUrl);
        const relevant = articles.filter(isRelevant);
        allArticles.push(...relevant);
        console.log(`  Found ${articles.length} articles (${relevant.length} relevant)\n`);
      }
    } catch (error) {
      console.error(`  ❌ Error: ${error.message}\n`);
    }
  }
  
  console.log(`📰 Total relevant articles: ${allArticles.length}\n`);
  
  let topArticles = [];
  
  // If scraping failed, use AI to generate original content
  if (allArticles.length === 0) {
    console.log('⚠️  No articles scraped. Generating original AI content instead...\n');
    
    // Pick 2 random topics from fallback list
    const shuffled = [...FALLBACK_TOPICS].sort(() => Math.random() - 0.5);
    const selectedTopics = shuffled.slice(0, 2);
    
    for (const topic of selectedTopics) {
      console.log(`📝 Generating: ${topic}`);
      const generated = await generateOriginalContent(topic);
      
      if (generated) {
        const slug = generated.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        
        createBlogPost(slug, generated.content, {
          title: generated.title,
          description: generated.content.substring(0, 150),
          takeaways: generated.takeaways,
          tags: ['career', 'advice', 'income'],
        });
      }
      
      // Rate limit
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
    
    console.log('\n✨ Done! Generated 2 original articles.');
    return;
  }
  
  // Pick top 2 most relevant scraped articles
  topArticles = allArticles.slice(0, 2);
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
