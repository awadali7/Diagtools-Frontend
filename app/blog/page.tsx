"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { blogsApi } from "@/lib/api";
import type { BlogPost } from "@/lib/api/types";

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [pagination, setPagination] = useState({
        total: 0,
        limit: 10,
        offset: 0,
        hasMore: false,
    });

    useEffect(() => {
        // Reset to first page when search changes
        setPagination((prev) => ({ ...prev, offset: 0 }));
        setPosts([]);
    }, [searchQuery]);

    useEffect(() => {
        fetchBlogPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagination.offset, searchQuery]);

    const fetchBlogPosts = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await blogsApi.getAll({
                limit: pagination.limit,
                offset: pagination.offset,
                search: searchQuery || undefined,
            });

            if (response.success && response.data) {
                // Handle both response structures (backward compatibility)
                const postsData = response.data.data || [];
                const paginationData = response.data.pagination || {
                    total: postsData.length,
                    limit: pagination.limit,
                    offset: pagination.offset,
                    hasMore: false,
                };

                if (pagination.offset === 0) {
                    // First load - replace posts
                    setPosts(postsData);
                } else {
                    // Load more - append posts
                    setPosts((prev) => [...prev, ...postsData]);
                }
                setPagination(paginationData);
            } else {
                setError(response.message || "Failed to load blog posts");
            }
        } catch (err: any) {
            console.error("Error fetching blog posts:", err);
            setError(err.message || "Failed to load blog posts");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="p-6 lg:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
                        Blog
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                        Latest articles, tips, and insights from our experts
                    </p>
                    {/* Search Bar */}
                    <div className="max-w-md">
                        <input
                            type="text"
                            placeholder="Search blog posts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-[#B00000] focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                    </div>
                </div>

                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B00000]"></div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                        <p className="text-red-800 dark:text-red-200">
                            {error}
                        </p>
                    </div>
                )}

                {!loading && !error && posts.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-slate-600 dark:text-slate-400 text-lg">
                            No blog posts available yet. Check back soon!
                        </p>
                    </div>
                )}

                {!loading && !error && posts.length > 0 && (
                    <>
                        {/* Blog Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {posts.map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/blog/${post.slug}`}
                                    className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block"
                                >
                                    {post.cover_image ? (
                                        <div className="h-48 overflow-hidden">
                                            <img
                                                src={post.cover_image}
                                                alt={post.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-48 bg-linear-to-br from-blue-500 to-purple-600"></div>
                                    )}
                                    <div className="p-6">
                                        <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400 mb-3">
                                            <span>📅</span>
                                            <span>
                                                {formatDate(
                                                    post.published_at ||
                                                        post.created_at
                                                )}
                                            </span>
                                            {post.views > 0 && (
                                                <>
                                                    <span>•</span>
                                                    <span>
                                                        {post.views} views
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">
                                            {post.title}
                                        </h2>
                                        {post.excerpt && (
                                            <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                                                {post.excerpt}
                                            </p>
                                        )}
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-slate-500 dark:text-slate-400">
                                                {post.author_name}
                                            </span>
                                            <span className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                                                Read More →
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        {pagination.hasMore && (
                            <div className="mt-8 flex justify-center">
                                <button
                                    onClick={() => {
                                        setPagination((prev) => ({
                                            ...prev,
                                            offset: prev.offset + prev.limit,
                                        }));
                                    }}
                                    disabled={loading}
                                    className="px-6 py-2 bg-[#B00000] text-white rounded-lg hover:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? "Loading..." : "Load More"}
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
