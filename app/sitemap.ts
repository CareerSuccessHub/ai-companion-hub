import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ai-companion-hub.vercel.app';
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    // Add more pages as you build them
    // {
    //   url: `${baseUrl}/scholarships`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.8,
    // },
    // {
    //   url: `${baseUrl}/jobs`,
    //   lastModified: new Date(),
    //   changeFrequency: 'daily',
    //   priority: 0.8,
    // },
  ];
}
