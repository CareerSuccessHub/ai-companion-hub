import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { getAllBlogPosts } from "@/lib/blog";

export default function BlogPage() {
  const blogPosts = getAllBlogPosts();
  return (
    <main className="min-h-screen bg-slate-950 text-gray-100">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl font-bold mb-4 text-blue-400">Career Success Blog</h1>
          <p className="text-xl text-gray-400">
            Actionable guides on salary negotiation, side hustles, career advancement, and professional growth
          </p>
        </motion.header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group bg-slate-900 border border-slate-800 rounded-lg overflow-hidden hover:border-blue-500 transition-colors block h-full"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <span className="inline-block px-3 py-1 bg-blue-600/20 text-blue-400 text-xs font-semibold rounded-full mb-3">
                    {post.category}
                  </span>

                  <h2 className="text-xl font-bold mb-3 text-gray-100 group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-gray-400 mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center text-blue-400 font-semibold group-hover:gap-2 transition-all">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
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
