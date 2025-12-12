import { NextResponse } from 'next/server';
import { getAllBlogPosts } from '@/lib/blog';

export async function GET() {
  const baseUrl = 'https://ai-companion-hub-self.vercel.app';
  
  // Get all blog posts dynamically
  const blogPosts = getAllBlogPosts();
  
  const staticUrls = [
    { loc: baseUrl, lastmod: new Date().toISOString(), changefreq: 'weekly', priority: 1.0 },
    { loc: `${baseUrl}/blog`, lastmod: new Date().toISOString(), changefreq: 'weekly', priority: 0.9 },
    { loc: `${baseUrl}/scholarships`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.8 },
    { loc: `${baseUrl}/tools/salary-negotiator`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.8 },
    { loc: `${baseUrl}/tools/resume-reviewer`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.8 },
    { loc: `${baseUrl}/tools/side-hustle`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.8 },
    { loc: `${baseUrl}/privacy`, lastmod: new Date().toISOString(), changefreq: 'yearly', priority: 0.3 },
    { loc: `${baseUrl}/terms`, lastmod: new Date().toISOString(), changefreq: 'yearly', priority: 0.3 },
    { loc: `${baseUrl}/about`, lastmod: new Date().toISOString(), changefreq: 'monthly', priority: 0.5 },
  ];

  const blogUrls = blogPosts.map((post) => ({
    loc: `${baseUrl}/blog/${post.slug}`,
    lastmod: new Date(post.date).toISOString(),
    changefreq: 'monthly',
    priority: 0.7,
  }));

  const allUrls = [...staticUrls, ...blogUrls];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map((url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
