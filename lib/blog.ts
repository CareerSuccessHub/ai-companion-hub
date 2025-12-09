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
  const files = fs.readdirSync(blogDir);
  
  const posts = files
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const filePath = path.join(blogDir, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
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
      
      return {
        slug: file.replace('.mdx', ''),
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
      };
    })
    .sort((a, b) => {
      // Sort by date descending (newest first)
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  
  return posts;
}
