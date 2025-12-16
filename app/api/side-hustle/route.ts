import { NextRequest, NextResponse } from 'next/server';

// Model strategy: Only use gemini-2.5-flash (API key has limit:0 for other models)
// Quota: 500 requests/day, resets 4 PM Philippine Time
// CACHING: Cache AI responses for 24h to save quota (1 API call per unique skill/day)
const GEMINI_MODELS = [
  "gemini-2.5-flash",        // Only enabled model - 500 req/day
];

// In-memory cache for AI suggestions (resets on server restart)
// Key: normalized skills string, Value: {suggestions, timestamp}
const suggestionCache = new Map<string, { suggestions: any[], timestamp: number }>();
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Normalize skills for cache key (lowercase, trim, sort words alphabetically)
function getCacheKey(skills: string): string {
  return skills
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(w => w.length > 0)
    .sort()
    .join(' ');
}

// Side hustle suggestion logic with AI-powered matching + caching
export async function POST(req: NextRequest) {
  let skills = '';
  
  try {
    const body = await req.json();
    skills = body.skills;

    console.log('🎯 Side hustle request - Skills:', skills);

    if (!skills) {
      return NextResponse.json({ error: 'Skills are required' }, { status: 400 });
    }

    // TEMPORARY: Use keyword matching only to save API quota for critical tools
    // Chat, Resume, and Salary Negotiator all share the same 500/day gemini-2.5-flash quota
    // Side hustle has excellent fallback, so prioritizing other tools
    // TODO: Re-enable AI when traffic is stable or when we get paid API plan
    console.log('💡 Using keyword-based matching (AI disabled to prioritize quota for chat/resume/salary tools)');
    const suggestions = generateSuggestions(skills.toLowerCase());
    return NextResponse.json({ suggestions, source: 'keyword' });

    /* 
    // AI GENERATION CODE (Disabled to save quota)
    // Uncomment when: (1) traffic stabilizes, (2) get paid plan, or (3) 2.0 models are enabled
    
    if (!process.env.GEMINI_API_KEY) {
      console.log('⚠️ No GEMINI_API_KEY found, using keyword matching');
      const suggestions = generateSuggestions(skills.toLowerCase());
      return NextResponse.json({ suggestions, source: 'keyword' });
    }

    // Check cache first
    const cacheKey = getCacheKey(skills);
    const cached = suggestionCache.get(cacheKey);
    const now = Date.now();
    
    if (cached && (now - cached.timestamp) < CACHE_DURATION) {
      console.log('💾 Cache hit for:', cacheKey, '(age:', Math.round((now - cached.timestamp) / 60000), 'minutes)');
      return NextResponse.json({ suggestions: cached.suggestions, source: 'ai-cached' });
    }

    // Try AI generation (cache miss or expired)
    console.log('🤖 Using AI-powered dynamic generation (cache miss)');
    const suggestions = await generateAISuggestions(skills);
    
    // Store in cache
    suggestionCache.set(cacheKey, { suggestions, timestamp: now });
    console.log('💾 Cached suggestions for:', cacheKey);

    return NextResponse.json({ suggestions, source: 'ai' });
    */
  } catch (error: any) {
    console.error('❌ Side hustle API error:', error.message);
    console.error('Error stack:', error.stack);
    
    // Fallback to keyword matching on error (if skills were parsed)
    if (skills) {
      try {
        console.log('🔄 Falling back to keyword matching due to error');
        const suggestions = generateSuggestions(skills.toLowerCase());
        return NextResponse.json({ 
          suggestions, 
          source: 'keyword-fallback',
          aiError: error.message // Include error reason for debugging
        });
      } catch {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }
    
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Helper function to call Gemini API with a specific model
async function callGeminiModel(model: string, prompt: string, apiKey: string): Promise<any> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 3072,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`${model} failed: ${response.status} - ${errorText}`);
  }

  return await response.json();
}

// AI-powered dynamic side hustle generation with model fallback
async function generateAISuggestions(skills: string) {
  const prompt = `You are a creative career advisor specializing in side hustles and freelancing.

User's skills/interests: "${skills}"

Generate 3 CUSTOM, SPECIFIC side hustle ideas that perfectly match their skills. DO NOT use generic categories - create unique, actionable opportunities.

Guidelines:
- Be SPECIFIC: Instead of "Freelance Writing", suggest "Technical Documentation for SaaS Companies" or "LinkedIn Ghostwriting for Executives"
- Match their EXACT skills: If they say "drone pilot", suggest drone-specific hustles, not generic video editing
- Include REAL platforms where they can start
- Estimate realistic income potential (hourly or monthly)
- Make it feel personalized, not templated
- Assume they have flexible time (5-15 hours/week typical for side hustles)

Return ONLY a JSON array with exactly 3 suggestions:
[
  {
    "title": "Specific side hustle name (NOT a generic category)",
    "description": "2-3 sentence description of what they'll do and why it fits their skills",
    "potential": "Realistic monthly income range (e.g., '$200-800/month' or '$30-60/hour')",
    "timeRequired": "Hours needed per week (e.g., '3-8 hours/week')",
    "platforms": [
      {"name": "Platform Name", "url": "https://platform.com"},
      {"name": "Platform Name 2", "url": "https://platform2.com"}
    ],
    "startingSteps": "Quick 1-sentence action they can take today to start"
  }
]

IMPORTANT: 
- Use real, working platform URLs (Fiverr, Upwork, Etsy, YouTube, etc.)
- If skills are vague, suggest versatile opportunities
- Make each idea DISTINCT from the others
- Focus on 2025-relevant opportunities (AI tools, remote work, digital products)

No extra text, just the JSON array.`;

  const apiKey = process.env.GEMINI_API_KEY!;
  let lastError = null;

  // Try each model in fallback chain
  for (const model of GEMINI_MODELS) {
    try {
      console.log(`🤖 Trying ${model}...`);
      const data = await callGeminiModel(model, prompt, apiKey);
      
      // Check for API quota errors
      if (data.error) {
        console.log(`❌ ${model} returned error: ${data.error.message}`);
        lastError = new Error(`${model}: ${data.error.message}`);
        continue; // Try next model
      }
      
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        
      if (!text) {
        console.error('❌ Empty response from Gemini API. Full response:', JSON.stringify(data, null, 2));
        throw new Error('Empty response from AI');
      }
      
      console.log('✅ AI raw response (first 500 chars):', text.substring(0, 500));
      
      // Parse AI response - handle markdown code blocks
      let suggestions = [];
      
      // Remove markdown code blocks if present (```json ... ``` or ``` ... ```)
      let cleanedText = text.trim();
      
      // Remove opening markdown
      if (cleanedText.startsWith('```json')) {
        cleanedText = cleanedText.replace(/^```json\s*/i, '');
      } else if (cleanedText.startsWith('```')) {
        cleanedText = cleanedText.replace(/^```\s*/, '');
      }
      
      // Remove closing markdown
      if (cleanedText.endsWith('```')) {
        cleanedText = cleanedText.replace(/```\s*$/, '');
      }
      
      cleanedText = cleanedText.trim();
      
      console.log('🧹 Cleaned text (first 300 chars):', cleanedText.substring(0, 300));
      
      // Extract JSON array - look for complete array only
      const jsonMatch = cleanedText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        console.log('🔍 Found JSON array, attempting to parse...');
        const jsonText = jsonMatch[0];
        
        // Check if JSON looks truncated (missing closing brace)
        const openBraces = (jsonText.match(/\{/g) || []).length;
        const closeBraces = (jsonText.match(/\}/g) || []).length;
        if (openBraces !== closeBraces) {
          console.error(`❌ Truncated JSON detected: ${openBraces} opening braces, ${closeBraces} closing braces`);
          console.error('Last 200 chars:', jsonText.slice(-200));
          throw new Error('AI response truncated - increase token limit');
        }
        
        suggestions = JSON.parse(jsonText);
        console.log('✅ Successfully parsed', suggestions.length, 'suggestions');
      } else {
        console.error('❌ No JSON array found in cleaned text');
        console.error('Full cleaned text:', cleanedText);
        throw new Error('AI parsing failed: No JSON array found');
      }

      // Validate that we got proper suggestions
      if (!Array.isArray(suggestions) || suggestions.length === 0) {
        console.error('AI returned invalid suggestions format');
        throw new Error('AI returned no valid suggestions');
      }
      
      // Add aiReason field for consistency
      const formattedSuggestions = suggestions.map((sug: any) => ({
        ...sug,
        aiReason: `Custom match for your skills: ${skills.split(',')[0].trim()}`,
      }));
  
      console.log(`✅ ${model} generated ${formattedSuggestions.length} custom suggestions`);
      return formattedSuggestions; // Success! Return immediately
        
    } catch (modelError: any) {
      console.log(`❌ ${model} failed: ${modelError.message}`);
      lastError = modelError;
      // Continue to next model
    }
  }
  
  // All models failed
  console.error('❌ All models failed, last error:', lastError);
  throw lastError || new Error('All AI models failed');
}

// Category details for AI matching
function getCategoryDetails() {
  return {
    'Freelance Web Development': {
      title: 'Freelance Web Development',
      description: 'Build websites and web applications for clients. Perfect for students with coding skills.',
      potential: '$20-100/hour',
      timeRequired: '5-20 hours/week',
      platforms: [
        { name: 'Fiverr', url: 'https://fiverr.com' },
        { name: 'Upwork', url: 'https://upwork.com' },
        { name: 'Freelancer', url: 'https://freelancer.com' },
      ],
    },
    'Graphic Design Services': {
      title: 'Graphic Design Services',
      description: 'Create logos, social media graphics, and branding materials for businesses.',
      potential: '$15-80/hour',
      timeRequired: '3-15 hours/week',
      platforms: [
        { name: 'Fiverr', url: 'https://fiverr.com' },
        { name: '99designs', url: 'https://99designs.com' },
        { name: 'Upwork', url: 'https://upwork.com' },
      ],
    },
    'Freelance Writing & Content Creation': {
      title: 'Freelance Writing & Content Creation',
      description: 'Write blog posts, articles, and website copy for businesses and publications.',
      potential: '$10-50/hour',
      timeRequired: '5-15 hours/week',
      platforms: [
        { name: 'Fiverr', url: 'https://fiverr.com' },
        { name: 'Upwork', url: 'https://upwork.com' },
        { name: 'Contently', url: 'https://contently.com' },
      ],
    },
    'Video Editing Services': {
      title: 'Video Editing Services',
      description: 'Edit videos for YouTubers, businesses, and content creators.',
      potential: '$20-60/hour',
      timeRequired: '5-20 hours/week',
      platforms: [
        { name: 'Fiverr', url: 'https://fiverr.com' },
        { name: 'Upwork', url: 'https://upwork.com' },
      ],
    },
    'Photography & Photo Editing': {
      title: 'Photography & Photo Editing',
      description: 'Offer photography services or edit photos for clients, events, and businesses.',
      potential: '$25-100/hour',
      timeRequired: '5-15 hours/week',
      platforms: [
        { name: 'Fiverr', url: 'https://fiverr.com' },
        { name: 'Upwork', url: 'https://upwork.com' },
      ],
    },
    'Online Tutoring': {
      title: 'Online Tutoring',
      description: 'Teach students in subjects you excel at through online platforms.',
      potential: '$15-40/hour',
      timeRequired: '3-10 hours/week',
      platforms: [
        { name: 'Tutor.com', url: 'https://tutor.com' },
        { name: 'Chegg', url: 'https://chegg.com/tutors' },
      ],
    },
    'Social Media Management': {
      title: 'Social Media Management',
      description: 'Manage social media accounts for small businesses and influencers.',
      potential: '$300-1000/month per client',
      timeRequired: '5-15 hours/week',
      platforms: [
        { name: 'Fiverr', url: 'https://fiverr.com' },
        { name: 'Upwork', url: 'https://upwork.com' },
      ],
    },
    'Virtual Assistant / Data Entry': {
      title: 'Virtual Assistant / Data Entry',
      description: 'Help businesses with administrative tasks, data entry, and organization.',
      potential: '$10-25/hour',
      timeRequired: '5-20 hours/week',
      platforms: [
        { name: 'Fiverr', url: 'https://fiverr.com' },
        { name: 'Upwork', url: 'https://upwork.com' },
      ],
    },
    'Voiceover & Audio Services': {
      title: 'Voiceover & Audio Services',
      description: 'Provide voiceovers for videos, audiobooks, podcasts, and commercials.',
      potential: '$20-100/project',
      timeRequired: '3-10 hours/week',
      platforms: [
        { name: 'Fiverr', url: 'https://fiverr.com' },
        { name: 'Voices.com', url: 'https://voices.com' },
      ],
    },
    'Translation Services': {
      title: 'Translation Services',
      description: 'Translate documents, websites, and content for international clients.',
      potential: '$15-50/hour',
      timeRequired: '5-15 hours/week',
      platforms: [
        { name: 'Fiverr', url: 'https://fiverr.com' },
        { name: 'Upwork', url: 'https://upwork.com' },
      ],
    },
    'SEO & Digital Marketing': {
      title: 'SEO & Digital Marketing',
      description: 'Help businesses improve their online visibility and drive traffic.',
      potential: '$25-80/hour',
      timeRequired: '5-20 hours/week',
      platforms: [
        { name: 'Fiverr', url: 'https://fiverr.com' },
        { name: 'Upwork', url: 'https://upwork.com' },
      ],
    },
    'Custom Crafts & Products': {
      title: 'Custom Crafts & Products',
      description: 'Create and sell handmade items, art, or custom products online.',
      potential: '$100-1000/month',
      timeRequired: '10-20 hours/week',
      platforms: [
        { name: 'Etsy', url: 'https://etsy.com' },
        { name: 'Gumroad', url: 'https://gumroad.com' },
      ],
    },
    'Online Surveys & Micro Tasks': {
      title: 'Online Surveys & Micro Tasks',
      description: 'Complete simple tasks and surveys for quick money. Great for beginners.',
      potential: '$5-20/hour',
      timeRequired: '1-5 hours/week',
      platforms: [
        { name: 'Amazon MTurk', url: 'https://mturk.com' },
        { name: 'Clickworker', url: 'https://clickworker.com' },
      ],
    },
    'Reselling Products': {
      title: 'Reselling Products Online',
      description: 'Buy discounted items and resell them on eBay, Facebook Marketplace, or Amazon.',
      potential: '$100-1000/month',
      timeRequired: '5-15 hours/week',
      platforms: [
        { name: 'eBay', url: 'https://ebay.com' },
        { name: 'Facebook Marketplace', url: 'https://facebook.com/marketplace' },
      ],
    },
  };
}

// Fallback keyword-based matching (kept for reliability)
function generateSuggestions(skills: string) {
  
  const allSuggestions = [
    {
      keywords: ['code', 'coding', 'programming', 'developer', 'dev', 'web', 'app', 'software', 'javascript', 'python', 'react', 'node'],
      title: 'Freelance Web Development',
      description: 'Build websites and web applications for clients. Perfect for students with coding skills.',
      potential: '$20-100/hour',
      timeRequired: '5-20 hours/week',
      platforms: [
        { name: 'Fiverr', url: 'https://fiverr.com' },
        { name: 'Upwork', url: 'https://upwork.com' },
        { name: 'Freelancer', url: 'https://freelancer.com' },
      ],
    },
    {
      keywords: ['design', 'designer', 'graphic', 'logo', 'ui', 'ux', 'photoshop', 'figma', 'illustrator', 'canva', 'branding'],
      title: 'Graphic Design Services',
      description: 'Create logos, social media graphics, and branding materials for businesses.',
      potential: '$15-80/hour',
      timeRequired: '3-15 hours/week',
      platforms: [
        { name: 'Fiverr', url: 'https://fiverr.com' },
        { name: '99designs', url: 'https://99designs.com' },
        { name: 'Upwork', url: 'https://upwork.com' },
      ],
    },
    {
      keywords: ['write', 'writer', 'writing', 'content', 'blog', 'blogger', 'article', 'copywriting', 'copywriter', 'journalism', 'author'],
      title: 'Freelance Writing & Content Creation',
      description: 'Write blog posts, articles, and website copy for businesses and publications.',
      potential: '$10-50/hour',
      timeRequired: '5-15 hours/week',
      platforms: [
        { name: 'Fiverr', url: 'https://fiverr.com' },
        { name: 'Upwork', url: 'https://upwork.com' },
        { name: 'Contently', url: 'https://contently.com' },
      ],
    },
    {
      keywords: ['video', 'editor', 'editing', 'edit', 'youtube', 'premiere', 'davinci', 'final cut', 'filmmaking', 'videography', 'filmmaker'],
      title: 'Video Editing Services',
      description: 'Edit videos for YouTubers, businesses, and content creators.',
      potential: '$20-60/hour',
      timeRequired: '5-20 hours/week',
      platforms: [
        { name: 'Fiverr', url: 'https://fiverr.com' },
        { name: 'Upwork', url: 'https://upwork.com' },
      ],
    },
    {
      keywords: ['photo', 'photography', 'photographer', 'photos', 'camera', 'lightroom', 'photo editing', 'portrait', 'photography'],
      title: 'Photography & Photo Editing',
      description: 'Offer photography services or edit photos for clients, events, and businesses.',
      potential: '$25-100/hour',
      timeRequired: '5-15 hours/week',
      platforms: [
        { name: 'Fiverr', url: 'https://fiverr.com' },
        { name: 'Upwork', url: 'https://upwork.com' },
      ],
    },
    {
      keywords: ['tutor', 'tutoring', 'teach', 'teacher', 'teaching', 'math', 'science', 'english', 'education', 'mentor'],
      title: 'Online Tutoring',
      description: 'Teach students in subjects you excel at through online platforms.',
      potential: '$15-40/hour',
      timeRequired: '3-10 hours/week',
      platforms: [
        { name: 'Tutor.com', url: 'https://tutor.com' },
        { name: 'Chegg', url: 'https://chegg.com/tutors' },
      ],
    },
    {
      keywords: ['social', 'media', 'instagram', 'tiktok', 'facebook', 'twitter', 'linkedin', 'marketing', 'smm', 'community manager'],
      title: 'Social Media Management',
      description: 'Manage social media accounts for small businesses and influencers.',
      potential: '$300-1000/month per client',
      timeRequired: '5-15 hours/week',
      platforms: [
        { name: 'Fiverr', url: 'https://fiverr.com' },
        { name: 'Upwork', url: 'https://upwork.com' },
      ],
    },
    {
      keywords: ['data', 'entry', 'excel', 'spreadsheet', 'admin', 'assistant', 'organization', 'virtual assistant', 'va'],
      title: 'Virtual Assistant / Data Entry',
      description: 'Help businesses with administrative tasks, data entry, and organization.',
      potential: '$10-25/hour',
      timeRequired: '5-20 hours/week',
      platforms: [
        { name: 'Fiverr', url: 'https://fiverr.com' },
        { name: 'Upwork', url: 'https://upwork.com' },
      ],
    },
    {
      keywords: ['voice', 'voiceover', 'narration', 'audio', 'podcast', 'speaking', 'announcer', 'voice acting'],
      title: 'Voiceover & Audio Services',
      description: 'Provide voiceovers for videos, audiobooks, podcasts, and commercials.',
      potential: '$20-100/project',
      timeRequired: '3-10 hours/week',
      platforms: [
        { name: 'Fiverr', url: 'https://fiverr.com' },
        { name: 'Voices.com', url: 'https://voices.com' },
      ],
    },
    {
      keywords: ['translate', 'translation', 'translator', 'language', 'bilingual', 'spanish', 'french', 'german', 'chinese', 'interpreter'],
      title: 'Translation Services',
      description: 'Translate documents, websites, and content for international clients.',
      potential: '$15-50/hour',
      timeRequired: '5-15 hours/week',
      platforms: [
        { name: 'Fiverr', url: 'https://fiverr.com' },
        { name: 'Upwork', url: 'https://upwork.com' },
      ],
    },
  ];

  // Match skills to suggestions
  const matched = allSuggestions.filter(suggestion => {
    // Check if skills match
    return suggestion.keywords.some(keyword => skills.includes(keyword));
  });

  // If no match, return general suggestions
  if (matched.length === 0) {
    return [
      {
        title: 'Online Surveys & Micro Tasks',
        description: 'Complete simple tasks and surveys for quick money. Great for beginners.',
        potential: '$5-20/hour',
        timeRequired: '1-5 hours/week',
        platforms: [
          { name: 'Amazon MTurk', url: 'https://mturk.com' },
          { name: 'Clickworker', url: 'https://clickworker.com' },
        ],
      },
      {
        title: 'Sell Digital Products',
        description: 'Create and sell templates, presets, or digital art on marketplaces.',
        potential: '$50-500/month passive',
        timeRequired: '10-20 hours setup',
        platforms: [
          { name: 'Gumroad', url: 'https://gumroad.com' },
          { name: 'Etsy', url: 'https://etsy.com' },
        ],
      },
      {
        title: 'Resell Products Online',
        description: 'Buy discounted items and resell them on eBay, Facebook Marketplace, or Amazon.',
        potential: '$100-1000/month',
        timeRequired: '5-15 hours/week',
        platforms: [
          { name: 'eBay', url: 'https://ebay.com' },
          { name: 'Facebook Marketplace', url: 'https://facebook.com/marketplace' },
        ],
      },
    ];
  }

  return matched.slice(0, 3); // Return top 3 matches
}
