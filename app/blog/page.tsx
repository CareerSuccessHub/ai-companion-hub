import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { getAllBlogPosts } from "@/lib/blog";
import BlogCard from "./BlogCard";

export default function BlogPage() {
  const blogPosts = getAllBlogPosts();
  
  // Group posts by month/year
  const postsByMonth = blogPosts.reduce((acc: any, post) => {
    const date = new Date(post.date);
    const monthYear = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(post);
    return acc;
  }, {});
  
  const monthKeys = Object.keys(postsByMonth);
  
  return (
    <main className="min-h-screen bg-slate-950 text-gray-100">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 text-blue-400">Career Success Blog</h1>
          <p className="text-xl text-gray-400">
            Actionable guides on salary negotiation, side hustles, career advancement, and professional growth
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {blogPosts.length} articles
            </span>
            <span>•</span>
            <span>Updated weekly</span>
            <span>•</span>
            <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded">
              Latest: {monthKeys[0]}
            </span>
          </div>
        </header>

        {/* Group by month/year */}
        {monthKeys.map((monthYear, monthIndex) => (
          <section key={monthYear} className="mb-16">
            <div className="flex items-center gap-3 mb-6 pb-2 border-b border-slate-800">
              <Calendar className="w-5 h-5 text-blue-400" />
              <h2 className="text-2xl font-bold text-gray-200">{monthYear}</h2>
              <span className="text-sm text-gray-500">
                ({postsByMonth[monthYear].length} {postsByMonth[monthYear].length === 1 ? 'post' : 'posts'})
              </span>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {postsByMonth[monthYear].map((post: any, index: number) => (
                <BlogCard 
                  key={post.slug} 
                  post={post} 
                  index={index + (monthIndex * 10)} 
                />
              ))}
            </div>
          </section>
        ))}

        <div className="mt-12 pt-8 border-t border-slate-800">
          <Link href="/" className="text-blue-400 hover:underline inline-flex items-center gap-2">
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
