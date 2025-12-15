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

// Tech news APIs (career-relevant trending topics)
const NEWS_SOURCES = [
  'https://dev.to/api/articles?tag=tech&top=7', // Trending tech (past week)
  'https://dev.to/api/articles?tag=ai&top=7',
  'https://dev.to/api/articles?tag=startup&top=7',
];

// Topic categories for rotation
const TOPIC_CATEGORIES = {
  salary: [
    'How to negotiate your first salary as a new graduate in 2025',
    'How to ask for a raise (with email templates)',
    'Salary negotiation mistakes that cost you thousands',
    'How to research salary data before your next job offer',
  ],
  resume: [
    '5 resume mistakes that cost you job interviews',
    'LinkedIn profile optimization for job seekers',
    'How to write a resume that beats AI screening systems',
    'Resume keywords that get you hired in 2025',
  ],
  sideHustle: [
    'Best side hustles for college students in 2025',
    'Freelancing vs full-time job: Which pays more in 2025?',
    'How to start a profitable side hustle with $100 or less',
    '7 remote side hustles that pay $50+ per hour',
  ],
  careerChange: [
    'How to switch careers without going back to school',
    'Career pivot: From [X] to tech without a CS degree',
    'How to change industries in your 20s or 30s',
    'Breaking into tech: A realistic 6-month roadmap',
  ],
  interview: [
    'Remote job interview tips that actually work',
    'How to answer "What\'s your expected salary?" without losing leverage',
    'Behavioral interview questions and winning answers for 2025',
    'How to negotiate after getting a job offer',
  ],
  trending: [
    'AI replacing jobs in 2025: Skills that future-proof your career',
    'Remote work vs office mandates: How to negotiate your arrangement',
    'Tech layoffs 2025: What it means for your career trajectory',
    'The 4-day workweek: Companies hiring and how to land these jobs',
    'ChatGPT for job seekers: 10 prompts that land interviews',
    'Quiet quitting vs career growth: Finding your balance in 2025',
  ],
};

// Flatten all topics for random selection
const FALLBACK_TOPICS = Object.values(TOPIC_CATEGORIES).flat();

// Topic memory file to avoid duplicates
const TOPIC_MEMORY_FILE = path.join(__dirname, '.blog-topics-memory.json');
const MAX_MEMORY = 20; // Remember last 20 topics

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
  'layoff',
  'hiring',
  'ai impact',
  'automation',
  'startup',
  'tech industry',
  'work from home',
  'professional development',
];

// Gemini model for blog generation
// Use ONLY best model - quality critical for blog content
// Runs 2x per week so won't hit 500/day quota
const GEMINI_MODELS = [
  'gemini-2.5-flash'  // Best quality model - mandatory for blog quality
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
              maxOutputTokens: 8192,
              responseMimeType: "application/json"
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
 * Load topic memory (avoid duplicates)
 */
function loadTopicMemory() {
  try {
    if (fs.existsSync(TOPIC_MEMORY_FILE)) {
      const data = fs.readFileSync(TOPIC_MEMORY_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.warn('⚠️  Failed to load topic memory:', error.message);
  }
  return [];
}

/**
 * Save topic to memory
 */
function saveTopicMemory(topic) {
  try {
    let memory = loadTopicMemory();
    memory.push({ topic, date: new Date().toISOString() });
    
    // Keep only last MAX_MEMORY topics
    if (memory.length > MAX_MEMORY) {
      memory = memory.slice(-MAX_MEMORY);
    }
    
    fs.writeFileSync(TOPIC_MEMORY_FILE, JSON.stringify(memory, null, 2));
  } catch (error) {
    console.warn('⚠️  Failed to save topic memory:', error.message);
  }
}

/**
 * Select unique topics avoiding recent duplicates
 */
function selectUniqueTopics(count, source = 'fallback') {
  const memory = loadTopicMemory();
  const recentTopics = new Set(memory.map(m => m.topic.toLowerCase()));
  
  let availableTopics;
  if (source === 'fallback') {
    availableTopics = FALLBACK_TOPICS.filter(t => !recentTopics.has(t.toLowerCase()));
  } else {
    availableTopics = source.filter(t => !recentTopics.has(t.title?.toLowerCase() || ''));
  }
  
  // If all topics used, reset and use all
  if (availableTopics.length < count) {
    console.log('   ℹ️  Topic memory full, allowing repeats');
    availableTopics = source === 'fallback' ? FALLBACK_TOPICS : source;
  }
  
  // Shuffle and pick
  const shuffled = [...availableTopics].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Determine if should skip this run (random 25% chance for 3-4 posts/week variety)
 */
function shouldSkipRun() {
  return Math.random() < 0.25; // 25% chance to skip
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
  console.log('� AI Career Blog Auto-Poster v2.0\n');
  
  // Random skip for 3-4 posts/week variety
  if (shouldSkipRun()) {
    console.log('🎲 Random skip activated (creates 3-4 posts/week variety)');
    console.log('✨ Skipping this run. See you next time!');
    return;
  }
  
  console.log('📰 Fetching trending career content...\n');
  
  const allArticles = [];
  const newsArticles = [];
  
  // Fetch career blog content
  for (const feedUrl of TARGET_BLOGS) {
    try {
      console.log(`📥 Fetching: ${feedUrl}`);
      const data = await fetchContent(feedUrl);
      if (data) {
        const articles = parseContent(data);
        const relevant = articles.filter(isRelevant);
        allArticles.push(...relevant);
        console.log(`   ✓ Found ${articles.length} articles (${relevant.length} career-relevant)\n`);
      }
    } catch (error) {
      console.error(`   ❌ Error: ${error.message}\n`);
    }
  }
  
  // Fetch trending news for career impact topics
  for (const newsUrl of NEWS_SOURCES) {
    try {
      console.log(`📡 Fetching trending: ${newsUrl}`);
      const data = await fetchContent(newsUrl);
      if (data) {
        const articles = parseContent(data);
        const relevant = articles.filter(isRelevant);
        newsArticles.push(...relevant);
        console.log(`   ✓ Found ${articles.length} articles (${relevant.length} trending)\n`);
      }
    } catch (error) {
      console.error(`   ❌ Error: ${error.message}\n`);
    }
  }
  
  console.log(`📊 Total content found: ${allArticles.length} career + ${newsArticles.length} trending\n`);
  
  // Decide content mix: 50% scraped, 50% original
  const shouldGenerateOriginal = Math.random() > 0.5 || allArticles.length === 0;
  
  if (shouldGenerateOriginal) {
    console.log('🎨 Generating original AI content...\n');
    
    // Select 1 unique topic (avoid duplicates)
    const selectedTopics = selectUniqueTopics(1, 'fallback');
    
    if (selectedTopics.length === 0) {
      console.log('❌ No unique topics available');
      return;
    }
    
    const topic = selectedTopics[0];
    console.log(`📝 Topic: ${topic}`);
    
    const generated = await generateOriginalContent(topic);
    
    if (generated) {
      const slug = generated.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      // Determine category from topic
      let category = 'career';
      for (const [cat, topics] of Object.entries(TOPIC_CATEGORIES)) {
        if (topics.includes(topic)) {
          category = cat;
          break;
        }
      }
      
      createBlogPost(slug, generated.content, {
        title: generated.title,
        description: generated.content.substring(0, 150),
        takeaways: generated.takeaways,
        tags: [category, 'career-advice', 'professional-growth'],
      });
      
      saveTopicMemory(topic);
    } else {
      console.log('   ❌ Generation failed');
    }
  } else {
    console.log('✍️  Rewriting scraped content...\n');
    
    // Mix: prefer news articles if available for trending content
    const sourcePool = newsArticles.length > 0 ? newsArticles : allArticles;
    const selectedArticles = selectUniqueTopics(1, sourcePool);
    
    if (selectedArticles.length === 0) {
      console.log('❌ No unique articles available');
      return;
    }
    
    const article = selectedArticles[0];
    console.log(`📝 Rewriting: ${article.title}`);
    console.log(`   Source: ${article.link}\n`);
    
    const rewritten = await rewriteWithAI(article.title, article.description);
    
    if (rewritten) {
      const slug = rewritten.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      const isNews = newsArticles.includes(article);
      const tags = isNews 
        ? ['trending', 'career-news', 'industry-insights']
        : ['career', 'advice', 'professional-development'];
      
      createBlogPost(slug, rewritten.content, {
        title: rewritten.title,
        description: rewritten.content.substring(0, 150),
        takeaways: rewritten.takeaways,
        tags,
      });
      
      saveTopicMemory(article.title);
    } else {
      console.log('   ❌ Rewrite failed');
    }
  }
  
  console.log('\n✨ Done! Check app/blog/ for new posts.');
  console.log('📅 Next run: See schedule (Mon/Tue/Thu/Sat at varied times)');
}

main().catch(console.error);
