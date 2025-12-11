import { NextRequest, NextResponse } from 'next/server';

// Side hustle suggestion logic with AI-powered matching
export async function POST(req: NextRequest) {
  let skills = '';
  let timeAvailable = '';
  
  try {
    const body = await req.json();
    skills = body.skills;
    timeAvailable = body.timeAvailable;

    if (!skills) {
      return NextResponse.json({ error: 'Skills are required' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      // Fallback to keyword matching if no API key
      const suggestions = generateSuggestions(skills.toLowerCase(), timeAvailable);
      return NextResponse.json({ suggestions });
    }

    // Use AI to intelligently match skills to side hustles
    const suggestions = await generateAISuggestions(skills, timeAvailable);

    return NextResponse.json({ suggestions });
  } catch (error: any) {
    console.error('Side hustle API error:', error);
    
    // Fallback to keyword matching on error (if skills were parsed)
    if (skills) {
      try {
        const suggestions = generateSuggestions(skills.toLowerCase(), timeAvailable);
        return NextResponse.json({ suggestions });
      } catch {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }
    
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// AI-powered skill matching
async function generateAISuggestions(skills: string, timeAvailable: string) {
  const sidehustleCategories = `
1. Freelance Web Development - Build websites/apps (needs: coding, programming, web dev skills)
2. Graphic Design Services - Create logos, graphics (needs: design, visual, creative skills)
3. Freelance Writing & Content Creation - Write blogs, articles (needs: writing, content, communication skills)
4. Video Editing Services - Edit videos for creators (needs: video editing, filmmaking, multimedia skills)
5. Photography & Photo Editing - Take/edit photos (needs: photography, camera, visual skills)
6. Online Tutoring - Teach subjects online (needs: teaching, academic, subject expertise)
7. Social Media Management - Manage social accounts (needs: social media, marketing, content skills)
8. Virtual Assistant / Data Entry - Admin tasks (needs: organization, data entry, admin skills)
9. Voiceover & Audio Services - Voice work for videos/podcasts (needs: voice, speaking, audio skills)
10. Translation Services - Translate documents/content (needs: bilingual, language skills)
11. SEO & Digital Marketing - Help businesses with online visibility (needs: marketing, SEO, analytics skills)
12. Custom Crafts & Products - Sell handmade items (needs: crafting, DIY, art skills)
13. Online Surveys & Micro Tasks - Simple tasks for beginners (needs: no specific skills)
14. Reselling Products - Buy low, sell high online (needs: business sense, no specific skills)
`;

  const timeContext = timeAvailable 
    ? `User has ${timeAvailable} available per week. Prioritize side hustles matching their time commitment.`
    : '';

  const prompt = `You are a career advisor. Based on these skills: "${skills}"

${timeContext}

Available side hustle categories:
${sidehustleCategories}

Analyze the skills and select the TOP 3 most relevant side hustle categories that match their skills. Consider:
- Direct skill matches (e.g., "video editor" → Video Editing)
- Related skills (e.g., "storytelling" → Writing or Video Editing)
- Transferable skills (e.g., "organized" → Virtual Assistant)
- If time is limited (1-5 hours), prefer lower-commitment options
- If skills are vague/general, suggest beginner-friendly options

Return ONLY a JSON array with exactly 3 suggestions in this format:
[
  {
    "category": "Category Name",
    "reason": "Brief 1-sentence explanation why this matches their skills"
  }
]

Be specific and accurate. No extra text, just the JSON array.`;

  try {
    const apiKey = process.env.GEMINI_API_KEY!;
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.3, // Lower temp for consistent matching
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    
    // Parse AI response
    let aiMatches = [];
    try {
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        aiMatches = JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      console.error('Failed to parse AI response, falling back to keyword matching');
      throw new Error('AI parsing failed');
    }

    // Map AI matches to full suggestion objects
    const categoryMap = getCategoryDetails();
    const suggestions = aiMatches
      .map((match: any) => {
        const category = categoryMap[match.category as keyof typeof categoryMap];
        if (!category) return null;
        
        return {
          ...category,
          aiReason: match.reason, // Add AI's reasoning
        };
      })
      .filter(Boolean);

    return suggestions.length > 0 ? suggestions : generateSuggestions(skills, timeAvailable);
  } catch (error) {
    console.error('AI suggestion error:', error);
    throw error; // Will trigger fallback in main function
  }
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
function generateSuggestions(skills: string, timeAvailable: string) {
  // Parse time availability for filtering
  const getMaxHours = (time: string): number => {
    if (!time) return 999; // No filter if not specified
    if (time.includes('1-5')) return 5;
    if (time.includes('5-10')) return 10;
    if (time.includes('10-20')) return 20;
    return 999; // 20+ hours
  };
  
  const maxHours = getMaxHours(timeAvailable);
  
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

  // Match skills to suggestions and filter by time availability
  const matched = allSuggestions.filter(suggestion => {
    // Check if skills match
    const skillMatch = suggestion.keywords.some(keyword => skills.includes(keyword));
    if (!skillMatch) return false;
    
    // Filter by time if specified
    if (timeAvailable) {
      const minHours = parseInt(suggestion.timeRequired.split('-')[0]);
      return minHours <= maxHours;
    }
    
    return true;
  });

  // If no match, return general suggestions (filtered by time)
  if (matched.length === 0) {
    const generalSuggestions = [
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
    
    // Filter general suggestions by time
    if (timeAvailable) {
      return generalSuggestions.filter(s => {
        const minHours = parseInt(s.timeRequired.split('-')[0]);
        return minHours <= maxHours;
      });
    }
    
    return generalSuggestions;
  }

  // Sort matched by time requirement (lower time first if user has limited availability)
  if (timeAvailable && maxHours < 20) {
    matched.sort((a, b) => {
      const aHours = parseInt(a.timeRequired.split('-')[0]);
      const bHours = parseInt(b.timeRequired.split('-')[0]);
      return aHours - bHours;
    });
  }

  return matched.slice(0, 3); // Return top 3 matches
}
