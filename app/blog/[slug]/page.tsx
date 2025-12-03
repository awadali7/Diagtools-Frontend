"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { blogsApi } from "@/lib/api";
import type { BlogPost } from "@/lib/api/types";

export default function BlogPostPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;

    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (slug) {
            fetchBlogPost();
        }
    }, [slug]);

    const fetchBlogPost = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await blogsApi.getBySlug(slug);

            if (response.success && response.data) {
                setPost(response.data);
            } else {
                setError(response.message || "Blog post not found");
            }
        } catch (err: any) {
            console.error("Error fetching blog post:", err);
            setError(err.message || "Failed to load blog post");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    if (loading) {
        return (
            <div className="p-6 lg:p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B00000]"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="p-6 lg:p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                        <p className="text-red-800 dark:text-red-200">
                            {error || "Blog post not found"}
                        </p>
                    </div>
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-[#B00000] hover:underline"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <Link
                    href="/blog"
                    className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-[#B00000] dark:hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Blog
                </Link>

                {/* Cover Image */}
                {post.cover_image && (
                    <div className="mb-8 rounded-xl overflow-hidden">
                        <img
                            src={post.cover_image}
                            alt={post.title}
                            className="w-full h-64 md:h-96 object-cover"
                        />
                    </div>
                )}

                {/* Post Header */}
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-6">
                        <div className="flex items-center space-x-2">
                            <span>📅</span>
                            <span>
                                {formatDate(
                                    post.published_at || post.created_at
                                )}
                            </span>
                        </div>
                        {post.views > 0 && (
                            <div className="flex items-center space-x-2">
                                <span>👁️</span>
                                <span>{post.views} views</span>
                            </div>
                        )}
                        <div className="flex items-center space-x-2">
                            <span>✍️</span>
                            <span>{post.author_name}</span>
                        </div>
                    </div>

                    {post.excerpt && (
                        <p className="text-xl text-slate-600 dark:text-slate-400 italic border-l-4 border-[#B00000] pl-4">
                            {post.excerpt}
                        </p>
                    )}
                </div>

                {/* Post Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            // Custom rendering for iframes
                            iframe: ({ node, ...props }: any) => (
                                <div className="my-6 rounded-lg overflow-hidden">
                                    <iframe
                                        {...props}
                                        className="w-full h-96"
                                        allowFullScreen
                                    />
                                </div>
                            ),
                            // Custom rendering for images
                            img: ({ node, ...props }: any) => (
                                <img
                                    {...props}
                                    className="my-6 rounded-lg w-full h-auto"
                                    loading="lazy"
                                />
                            ),
                            // Custom rendering for links (especially document links)
                            a: ({ node, href, children, ...props }: any) => {
                                // Check if it's a document file
                                const isDocument = href?.match(
                                    /\.(pdf|doc|docx|xls|xlsx|ppt|pptx)$/i
                                );

                                if (isDocument) {
                                    return (
                                        <a
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 underline"
                                            {...props}
                                        >
                                            <span>{children}</span>
                                            <span className="text-xs">📄</span>
                                        </a>
                                    );
                                }

                                return (
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 underline"
                                        {...props}
                                    >
                                        {children}
                                    </a>
                                );
                            },
                        }}
                    >
                        {post.content || ""}
                    </ReactMarkdown>
                </div>

                {/* Footer */}
                <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Written by <strong>{post.author_name}</strong>
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                                Published on{" "}
                                {formatDate(
                                    post.published_at || post.created_at
                                )}
                            </p>
                        </div>
                        <Link
                            href="/blog"
                            className="px-4 py-2 bg-[#B00000] text-white rounded-lg hover:bg-red-800 transition-colors"
                        >
                            View All Posts
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
