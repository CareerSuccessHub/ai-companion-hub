import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { getAllBlogPosts } from "@/lib/blog";
import BlogCard from "./BlogCard";

export default function BlogPage() {
  const blogPosts = getAllBlogPosts();
  return (
    <main className="min-h-screen bg-slate-950 text-gray-100">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 text-blue-400">Career Success Blog</h1>
          <p className="text-xl text-gray-400">
            Actionable guides on salary negotiation, side hustles, career advancement, and professional growth
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800">
          <Link href="/" className="text-blue-400 hover:underline">← Back to Home</Link>
        </div>
      </div>
    </main>
  );
}
