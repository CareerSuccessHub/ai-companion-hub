/**
 * Blog Content Scraper & Auto-Poster
 * Scrapes career blogs OR generates original AI content
 * Run: node scripts/scrape-and-post.js
 */

const fs = require('fs');
const path = require('path');

// Target blogs (Dev.to API - reliable JSON)
const TARGET_BLOGS = [
  'https://dev.to/api/articles?tag=career',
  'https://dev.to/api/articles?tag=jobsearch',
  'https://dev.to/api/articles?tag=interview',
];

// Fallback: Generate these topics if scraping fails
const FALLBACK_TOPICS = [
  'How to negotiate your first salary as a new graduate in 2025',
  '5 resume mistakes that cost you job interviews',
  'Best side hustles for college students in 2025',
  'How to switch careers without going back to school',
  'Remote job interview tips that actually work',
  'How to ask for a raise (with email templates)',
  'Freelancing vs full-time job: Which pays more in 2025?',
  'LinkedIn profile optimization for job seekers',
];

// Filter for relevant content
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
 * Fetch content from URL
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
    console.error(`Fetch error for ${url}:`, error.message);
    return null;
  }
}

/**
 * Parse content (handles JSON and RSS)
 */
function parseContent(data) {
  // Dev.to API returns JSON array
  if (Array.isArray(data)) {
    return data.map(article => ({
      title: article.title,
      link: article.url,
      description: article.description || article.body_markdown?.substring(0, 500) || '',
    }));
  }
  
  // RSS XML format (fallback)
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
    
    return items;
  }
  
  return [];
}

/**
 * Check if article is relevant
 */
function isRelevant(article) {
  const text = `${article.title} ${article.description}`.toLowerCase();
  return RELEVANT_KEYWORDS.some(keyword => text.includes(keyword));
}

/**
 * Call Gemini API with specific model
 */
async function callGeminiAPI(prompt, model, retries = 2) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('❌ GEMINI_API_KEY not found in environment');
    return null;
  }

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      if (attempt > 0) {
        const delay = Math.pow(2, attempt - 1) * 1000; // 1s, 2s
        console.log(`   ⏳ Retry attempt ${attempt} after ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
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
              maxOutputTokens: 8000,
            }
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        const errorMsg = errorData.error?.message || 'Unknown error';
        
        if (response.status === 503 || response.status === 429) {
          console.error(`   ⚠️  ${model} overloaded (${response.status}): ${errorMsg}`);
          if (attempt === retries) {
            throw new Error(`${model} failed after ${retries + 1} attempts: ${errorMsg}`);
          }
          continue; // Retry
        }
        
        throw new Error(`API error ${response.status}: ${errorMsg}`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!text) {
        console.error('   ⚠️  No text in response:', JSON.stringify(data, null, 2));
        if (attempt === retries) return null;
        continue; // Retry
      }
    
      // Log first 500 chars to debug
      console.log('   Raw response (first 500 chars):', text.substring(0, 500));
      
      // Remove markdown code fences if present
      let cleanText = text.trim();
      if (cleanText.startsWith('```')) {
        console.log('   Found code fence, removing...');
        cleanText = cleanText.replace(/^```(?:json)?\s*\n?/i, '');
        cleanText = cleanText.replace(/\n?```\s*$/i, '');
        cleanText = cleanText.trim();
      }
      
      console.log('   Clean text (first 200 chars):', cleanText.substring(0, 200));
    
    // Try to parse the entire cleaned text as JSON first
    try {
      const parsed = JSON.parse(cleanText);
      console.log('   ✅ Successfully parsed JSON!');
      return parsed;
    } catch (e) {
      console.log('   Failed to parse as complete JSON:', e.message);
      // If that fails, try to extract JSON object
      const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        try {
          const parsed = JSON.parse(jsonMatch[0]);
          console.log('   ✅ Successfully parsed extracted JSON!');
          return parsed;
        } catch (e2) {
          console.error('   ⚠️  JSON parse error:', e2.message);
          return null;
        }
      }
    }
    
      console.error('   ⚠️  No valid JSON found');
      return null;
    } catch (error) {
      console.error(`   ❌ ${model} error (attempt ${attempt + 1}):`, error.message);
      if (attempt === retries) {
        throw error; // Final attempt failed
      }
    }
  }
  
  return null; // All retries exhausted
}

/**
 * Call Gemini with model fallback
 */
async function callGeminiWithFallback(prompt) {
  for (const model of GEMINI_MODELS) {
    try {
      console.log(`   🤖 Attempting with ${model}...`);
      const result = await callGeminiAPI(prompt, model);
      if (result) {
        console.log(`   ✅ Success with ${model}`);
        return result;
      }
    } catch (error) {
      console.error(`   ✗ ${model} failed:`, error.message);
      const isLastModel = GEMINI_MODELS.indexOf(model) === GEMINI_MODELS.length - 1;
      if (isLastModel) {
        throw new Error(`All models failed. Last error: ${error.message}`);
      }
      console.log(`   ⏭️  Trying next model...`);
    }
  }
  
  throw new Error('All models exhausted with no result');
}

/**
 * Generate original content (fallback)
 */
async function generateOriginalContent(topic) {
  const prompt = `Write an in-depth, actionable career advice article for students and young professionals (ages 18-30).

Topic: ${topic}

Requirements:
- 800-1200 words
- Practical, actionable advice with specific examples
- Include numbers, templates, step-by-step instructions
- Casual, engaging tone (conversational but professional)
- Focus on income/career growth

FORMATTING REQUIREMENTS (CRITICAL):
- Use ## for main section headings (4-6 sections)
- Use ### for subsections if needed
- Use **bold text** for key terms and important points
- Use bullet points with * for lists
- Use numbered lists (1. 2. 3.) for sequential steps
- Include > blockquotes for important tips or warnings
- Add visual breaks with --- between major sections
- Use *italics* for emphasis on phrases
- Make it visually engaging with varied formatting

Provide response as JSON:
{
  "title": "SEO-friendly title",
  "content": "markdown content with rich formatting (##headings, **bold**, *italic*, bullet points, blockquotes)",
  "takeaways": ["key point 1", "key point 2", "key point 3"]
}`;

  return await callGeminiWithFallback(prompt);
}

/**
 * Rewrite scraped content
 */
async function rewriteWithAI(title, originalContent) {
  const prompt = `Rewrite this career advice article in a completely unique way for students and young professionals (18-30). Keep the core advice but use totally different wording, examples, and structure.

Original Title: ${title}
Original Content: ${originalContent}

Requirements:
- 800-1200 words
- Completely unique (avoid plagiarism)
- Add actionable steps and specific examples
- Casual, engaging tone (conversational but professional)
- Include year 2025 in title if relevant

FORMATTING REQUIREMENTS (CRITICAL):
- Use ## for main section headings (4-6 sections)
- Use ### for subsections if needed
- Use **bold text** for key terms, numbers, and important points
- Use bullet points with * for lists
- Use numbered lists (1. 2. 3.) for sequential steps
- Include > blockquotes for pro tips, warnings, or key insights
- Add visual breaks with --- between major sections
- Use *italics* for emphasis on phrases
- Make it visually engaging with varied formatting

Provide response as JSON:
{
  "title": "new SEO-friendly title",
  "content": "markdown content with rich formatting (##headings, **bold**, *italic*, bullet points, blockquotes, horizontal rules)",
  "takeaways": ["key point 1", "key point 2", "key point 3"]
}`;

  return await callGeminiWithFallback(prompt);
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

## Recommended Resources

Looking to level up your career? Check out these helpful resources:

- **[LinkedIn Learning](https://linkedin-learning.pxf.io/c/your-id)** - Professional development courses (Free trial)
- **[Coursera Career Certificates](https://coursera.pxf.io/c/your-id)** - Industry-recognized credentials
- **[Grammarly](https://grammarly.go2cloud.org/aff_c?offer_id=3)** - Perfect your resume and cover letters (Affiliate link)

*This article was researched and curated by our AI team. For personalized career advice, [chat with our AI Career Mentor](/).*

*Disclosure: Some links above are affiliate links. We may earn a commission at no cost to you if you make a purchase.*
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
  
  // Try scraping from Dev.to
  for (const feedUrl of TARGET_BLOGS) {
    try {
      console.log(`Fetching: ${feedUrl}`);
      const data = await fetchContent(feedUrl);
      if (data) {
        const articles = parseContent(data);
        const relevant = articles.filter(isRelevant);
        allArticles.push(...relevant);
        console.log(`  Found ${articles.length} articles (${relevant.length} relevant)\n`);
      }
    } catch (error) {
      console.error(`  ❌ Error: ${error.message}\n`);
    }
  }
  
  console.log(`📰 Total relevant articles scraped: ${allArticles.length}\n`);
  
  // If scraping failed, generate original AI content
  if (allArticles.length === 0) {
    console.log('⚠️  No articles scraped. Generating original AI content instead...\n');
    
    // Pick 2 random topics
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
      } else {
        console.log('   ❌ Generation failed');
      }
      
      // Rate limit
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
    
    console.log('\n✨ Done! Generated 2 original articles.');
    return;
  }
  
  // Process scraped articles
  const topArticles = allArticles.slice(0, 2);
  
  for (const article of topArticles) {
    console.log(`\n📝 Processing: ${article.title}`);
    console.log(`   Source: ${article.link}`);
    
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
      console.log('   ❌ Rewrite failed');
    }
    
    // Rate limit
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
  
  console.log('\n✨ Done! Check app/blog/ for new posts.');
}

main().catch(console.error);
