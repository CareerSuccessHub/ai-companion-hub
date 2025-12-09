"use client";

import Link from "next/link";
import { BlogPost } from "@/lib/blog";

interface LatestBlogPostsProps {
  posts: BlogPost[];
}

export default function LatestBlogPosts({ posts }: LatestBlogPostsProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-blue-500/50 transition-all group"
        >
          <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-400 mb-4">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{post.readTime}</span>
            <span className="text-blue-400 font-semibold">Read More →</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
