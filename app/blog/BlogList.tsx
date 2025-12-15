'use client';

import { useState, useMemo } from "react";
import { Calendar, Search, ChevronDown, Filter } from "lucide-react";
import BlogCard from "./BlogCard";
import type { BlogPost } from "@/lib/blog";

interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [postsToShow, setPostsToShow] = useState(12); // Pagination: show 12 initially
  
  // Filter posts by search and year
  const filteredPosts = useMemo(() => {
    let filtered = posts;
    
    // Filter by year
    if (selectedYear !== 'all') {
      filtered = filtered.filter(post => {
        const year = new Date(post.date).getFullYear().toString();
        return year === selectedYear;
      });
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  }, [posts, searchQuery, selectedYear]);
  
  // Get visible posts (pagination)
  const visiblePosts = filteredPosts.slice(0, postsToShow);
  const hasMore = filteredPosts.length > postsToShow;
  
  // Group visible posts by month/year
  const postsByMonth = visiblePosts.reduce((acc: any, post) => {
    const date = new Date(post.date);
    const monthYear = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(post);
    return acc;
  }, {});
  
  const monthKeys = Object.keys(postsByMonth);
  
  // Get available years for filter
  const availableYears = useMemo(() => {
    const years = new Set(posts.map(post => new Date(post.date).getFullYear().toString()));
    return Array.from(years).sort((a, b) => Number(b) - Number(a));
  }, [posts]);
  
  return (
    <>
      {/* Search and Filter Bar */}
      {posts.length > 6 && (
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
            />
          </div>
          
          {/* Year Filter */}
          {availableYears.length > 1 && (
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full md:w-48 pl-10 pr-10 py-3 bg-slate-900 border border-slate-800 rounded-lg text-gray-200 focus:outline-none focus:border-blue-500 transition appearance-none cursor-pointer"
              >
                <option value="all">All Years</option>
                {availableYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          )}
        </div>
      )}

      {/* Results count */}
      {(searchQuery || selectedYear !== 'all') && (
        <div className="mb-6 text-gray-400 text-sm">
          Found {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
          {searchQuery && ` matching "${searchQuery}"`}
          {selectedYear !== 'all' && ` from ${selectedYear}`}
        </div>
      )}

      {/* No results */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <Search className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No articles found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedYear('all');
            }}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
          >
            Clear Filters
          </button>
        </div>
      )}

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
            {postsByMonth[monthYear].map((post: BlogPost, index: number) => (
              <BlogCard 
                key={post.slug} 
                post={post} 
                index={index + (monthIndex * 10)} 
              />
            ))}
          </div>
        </section>
      ))}

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center mt-12">
          <button
            onClick={() => setPostsToShow(prev => prev + 12)}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition inline-flex items-center gap-2"
          >
            Load More Articles
            <ChevronDown className="w-5 h-5" />
          </button>
          <p className="mt-3 text-sm text-gray-500">
            Showing {visiblePosts.length} of {filteredPosts.length} articles
          </p>
        </div>
      )}
    </>
  );
}
