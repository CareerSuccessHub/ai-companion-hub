import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags?: string[];
}

export function getAllBlogPosts(): BlogPost[] {
  const blogDir = path.join(process.cwd(), 'app/blog');
  const items = fs.readdirSync(blogDir);
  
  const posts: BlogPost[] = [];
  
  for (const item of items) {
    const itemPath = path.join(blogDir, item);
    const stat = fs.statSync(itemPath);
    
    // Handle MDX files (new auto-generated posts)
    if (item.endsWith('.mdx')) {
      const fileContents = fs.readFileSync(itemPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      // Extract first paragraph as excerpt
      const excerpt = content
        .replace(/^#.*$/gm, '') // Remove headings
        .replace(/^-.*$/gm, '') // Remove list items
        .trim()
        .split('\n\n')[0]
        .substring(0, 200) + '...';
      
      // Estimate read time (200 words per minute)
      const words = content.split(/\s+/).length;
      const readTime = `${Math.ceil(words / 200)} min read`;
      
      posts.push({
        slug: item.replace('.mdx', ''),
        title: data.title || 'Untitled',
        excerpt: data.description || excerpt,
        date: new Date(data.date).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        readTime,
        category: data.tags?.[0] || 'Career',
        tags: data.tags,
      });
    }
    
    // Handle folder-based blog posts (original posts with page.tsx)
    else if (stat.isDirectory() && !item.startsWith('[')) {
      const pagePath = path.join(itemPath, 'page.tsx');
      if (fs.existsSync(pagePath)) {
        // Read the page.tsx file to extract metadata
        const pageContents = fs.readFileSync(pagePath, 'utf8');
        
        // Extract metadata description
        const descriptionMatch = pageContents.match(/description:\s*["'](.*?)["']/);
        const excerpt = descriptionMatch ? descriptionMatch[1] : '';
        
        // Extract title from metadata
        const titleMatch = pageContents.match(/title:\s*["'](.*?)["']/);
        const metaTitle = titleMatch ? titleMatch[1].split('|')[0].trim() : '';
        
        // Fallback to h1 if no metadata title
        const h1Match = pageContents.match(/<h1[^>]*>(.*?)<\/h1>/);
        const h1Title = h1Match ? h1Match[1].replace(/<[^>]*>/g, '').replace(/&apos;/g, "'") : item.replace(/-/g, ' ');
        
        posts.push({
          slug: item,
          title: metaTitle || h1Title,
          excerpt: excerpt,
          date: 'November 20, 2024', // Default date for original posts
          readTime: '8 min read',
          category: 'Career',
        });
      }
    }
  }
  
  // Sort by date descending (newest first)
  posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  
  return posts;
}
