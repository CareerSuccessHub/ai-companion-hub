import { notFound } from 'next/navigation';
import { getAllBlogPosts } from '@/lib/blog';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const blogDir = path.join(process.cwd(), 'app/blog');
  const mdxPath = path.join(blogDir, `${params.slug}.mdx`);
  
  // Check if it's an MDX file (new posts)
  if (fs.existsSync(mdxPath)) {
    const fileContents = fs.readFileSync(mdxPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Calculate read time
    const words = content.split(/\s+/).length;
    const readTime = `${Math.ceil(words / 200)} min read`;
    
    return (
      <main className="min-h-screen bg-slate-950 text-gray-100">
        <article className="container mx-auto px-4 py-12 max-w-4xl">
          <Link href="/blog" className="inline-flex items-center text-blue-400 hover:underline mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>

          <header className="mb-12">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(data.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {readTime}
              </span>
              {data.tags && data.tags[0] && (
                <>
                  <span>•</span>
                  <span className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-xs font-semibold">
                    {data.tags[0]}
                  </span>
                </>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              {data.title}
            </h1>

            {data.description && (
              <p className="text-xl text-gray-300 leading-relaxed">
                {data.description}
              </p>
            )}
          </header>

          {/* Ad Space - Top of Content */}
          <div className="mb-8 p-6 bg-slate-900 border border-slate-800 rounded-lg text-center">
            <p className="text-gray-500 text-sm mb-2">Advertisement</p>
            <div className="bg-slate-800 h-24 flex items-center justify-center text-gray-600">
              Ad Space (728x90)
            </div>
          </div>

          <div className="prose prose-invert prose-blue prose-lg max-w-none
            prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:text-3xl prose-h2:text-blue-300 prose-h2:mb-6 prose-h2:mt-12 prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-800
            prose-h3:text-2xl prose-h3:text-blue-300 prose-h3:mb-4 prose-h3:mt-8
            prose-h4:text-xl prose-h4:text-cyan-300 prose-h4:mb-3 prose-h4:mt-6
            prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
            prose-a:text-blue-400 prose-a:font-medium prose-a:no-underline hover:prose-a:underline hover:prose-a:text-blue-300
            prose-strong:text-blue-200 prose-strong:font-bold
            prose-em:text-cyan-300
            prose-ul:text-gray-300 prose-ul:mb-6 prose-ul:space-y-2
            prose-ol:text-gray-300 prose-ol:mb-6 prose-ol:space-y-2
            prose-li:mb-2 prose-li:text-lg prose-li:leading-relaxed
            prose-li:marker:text-blue-400
            prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-slate-900/50 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:italic prose-blockquote:text-gray-400
            prose-code:text-cyan-400 prose-code:bg-slate-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
            prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800 prose-pre:rounded-lg
            prose-img:rounded-lg prose-img:shadow-xl
            prose-hr:border-slate-800 prose-hr:my-12
          ">
            <MDXRemote source={content} />
          </div>

          {/* Ad Space - Bottom of Content */}
          <div className="mt-12 mb-8 p-6 bg-slate-900 border border-slate-800 rounded-lg text-center">
            <p className="text-gray-500 text-sm mb-2">Advertisement</p>
            <div className="bg-slate-800 h-24 flex items-center justify-center text-gray-600">
              Ad Space (728x90)
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-800">
            <Link href="/blog" className="text-blue-400 hover:underline">← Back to Blog</Link>
          </div>
        </article>
      </main>
    );
  }
  
  // If not MDX, it might be a folder-based route (old posts)
  // Those have their own page.tsx, so this shouldn't be reached
  notFound();
}
