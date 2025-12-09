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

        <div className="mt-16 p-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-800/50 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-3 text-blue-300">Want personalized advice?</h3>
          <p className="text-gray-400 mb-6">
            Chat with our AI career mentor for free, customized guidance on your specific situation
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Try AI Mentor Now →
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800">
          <Link href="/" className="text-blue-400 hover:underline">← Back to Home</Link>
        </div>
      </div>
    </main>
  );
}
