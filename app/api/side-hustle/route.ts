import { NextRequest, NextResponse } from 'next/server';

// Side hustle suggestion logic with affiliate opportunities
export async function POST(req: NextRequest) {
  try {
    const { skills, timeAvailable } = await req.json();

    if (!skills) {
      return NextResponse.json({ error: 'Skills are required' }, { status: 400 });
    }

    // Generate suggestions based on skills
    const suggestions = generateSuggestions(skills.toLowerCase(), timeAvailable);

    return NextResponse.json({ suggestions });
  } catch (error: any) {
    console.error('Side hustle API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

function generateSuggestions(skills: string, timeAvailable: string) {
  const allSuggestions = [
    {
      keywords: ['code', 'coding', 'programming', 'developer', 'web', 'app'],
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
      keywords: ['design', 'graphic', 'logo', 'ui', 'ux', 'photoshop', 'figma'],
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
      keywords: ['write', 'writing', 'content', 'blog', 'article', 'copywriting'],
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
      keywords: ['video', 'editing', 'youtube', 'premiere', 'davinci'],
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
      keywords: ['tutor', 'teach', 'teaching', 'math', 'science', 'english'],
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
      keywords: ['social', 'media', 'instagram', 'tiktok', 'marketing'],
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
      keywords: ['data', 'entry', 'excel', 'spreadsheet', 'admin'],
      title: 'Virtual Assistant / Data Entry',
      description: 'Help businesses with administrative tasks, data entry, and organization.',
      potential: '$10-25/hour',
      timeRequired: '5-20 hours/week',
      platforms: [
        { name: 'Fiverr', url: 'https://fiverr.com' },
        { name: 'Upwork', url: 'https://upwork.com' },
      ],
    },
  ];

  // Match skills to suggestions
  const matched = allSuggestions.filter(suggestion =>
    suggestion.keywords.some(keyword => skills.includes(keyword))
  );

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
    ];
  }

  return matched.slice(0, 3); // Return top 3 matches
}
