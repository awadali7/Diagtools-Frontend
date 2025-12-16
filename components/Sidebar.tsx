"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    BookOpen,
    FileText,
    Target,
    Settings,
    User,
    Menu,
    X,
    ChevronRight,
    ChevronLeft,
    Shield,
} from "lucide-react";
import { useSidebar } from "./SidebarContext";
import { useAuth } from "@/contexts/AuthContext";

export default function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { isMinimized, setIsMinimized } = useSidebar();
    const pathname = usePathname();
    const { user } = useAuth();

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleMinimize = () => setIsMinimized(!isMinimized);

    const isActive = (path: string) => {
        // For root path, only match exactly
        if (path === "/") {
            return pathname === "/";
        }
        // For other paths, match exact or starts with path
        return pathname === path || pathname.startsWith(path + "/");
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={toggleSidebar}
                className="lg:hidden fixed top-[85px] left-4 z-40 p-2 rounded-lg bg-[#B00000] text-white hover:bg-red-800 transition-all duration-300"
                aria-label="Toggle Menu"
            >
                {isSidebarOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <Menu className="w-6 h-6" />
                )}
            </button>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-20 backdrop-blur-sm transition-opacity duration-300"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed top-[73px] left-0 z-30 h-[calc(100vh-73px)] bg-white
          transform transition-all duration-300 ease-in-out
          lg:translate-x-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          ${isMinimized ? "w-20" : "w-72"}
          border-r border-gray-200
        `}
            >
                <div className="flex flex-col h-full">
                    {/* Minimize Button */}
                    <button
                        onClick={toggleMinimize}
                        className="hidden lg:flex absolute -right-3 top-6 z-40 w-6 h-6 rounded-full bg-[#B00000] text-white items-center justify-center hover:bg-red-800 transition-all duration-300 hover:scale-110"
                        aria-label={
                            isMinimized ? "Expand Sidebar" : "Minimize Sidebar"
                        }
                    >
                        {isMinimized ? (
                            <ChevronRight className="w-4 h-4" />
                        ) : (
                            <ChevronLeft className="w-4 h-4" />
                        )}
                    </button>

                    {/* Navigation */}
                    <nav
                        className={`flex-1 overflow-y-auto py-6 space-y-2 custom-scrollbar transition-all duration-300 ${
                            isMinimized ? "px-2" : "px-4"
                        }`}
                    >
                        {/* Dashboard */}
                        <Link
                            href="/dashboard"
                            onClick={() => {
                                // Close mobile sidebar when link is clicked
                                if (window.innerWidth < 1024) {
                                    setIsSidebarOpen(false);
                                }
                            }}
                            className={`
                flex items-center ${
                    isMinimized ? "justify-center" : "space-x-3"
                } ${
                                isMinimized ? "px-2" : "px-4"
                            } py-3 rounded-xl transition-all duration-300
                ${
                    isActive("/dashboard")
                        ? "bg-[#B00000] text-white"
                        : "text-gray-700 hover:bg-gray-100 hover:text-[#B00000]"
                }
              `}
                            title={isMinimized ? "Dashboard" : ""}
                        >
                            <Home className="w-5 h-5 shrink-0" />
                            <span
                                className={`font-medium transition-all duration-300 ${
                                    isMinimized
                                        ? "opacity-0 w-0 overflow-hidden"
                                        : "opacity-100"
                                }`}
                            >
                                Dashboard
                            </span>
                        </Link>

                        {/* Courses */}
                        <Link
                            href="/courses"
                            onClick={() => {
                                // Close mobile sidebar when link is clicked
                                if (window.innerWidth < 1024) {
                                    setIsSidebarOpen(false);
                                }
                            }}
                            className={`
                flex items-center ${
                    isMinimized ? "justify-center" : "space-x-3"
                } ${
                                isMinimized ? "px-2" : "px-4"
                            } py-3 rounded-xl transition-all duration-300
                ${
                    isActive("/courses")
                        ? "bg-[#B00000] text-white"
                        : "text-gray-700 hover:bg-gray-100 hover:text-[#B00000]"
                }
              `}
                            title={isMinimized ? "Courses" : ""}
                        >
                            <BookOpen className="w-5 h-5 shrink-0" />
                            <span
                                className={`font-medium transition-all duration-300 ${
                                    isMinimized
                                        ? "opacity-0 w-0 overflow-hidden"
                                        : "opacity-100"
                                }`}
                            >
                                Courses
                            </span>
                        </Link>

                        {/* Blog */}
                        <Link
                            href="/blog"
                            onClick={() => {
                                // Close mobile sidebar when link is clicked
                                if (window.innerWidth < 1024) {
                                    setIsSidebarOpen(false);
                                }
                            }}
                            className={`
                flex items-center ${
                    isMinimized ? "justify-center" : "space-x-3"
                } ${
                                isMinimized ? "px-2" : "px-4"
                            } py-3 rounded-xl transition-all duration-300
                ${
                    isActive("/blog")
                        ? "bg-[#B00000] text-white"
                        : "text-gray-700 hover:bg-gray-100 hover:text-[#B00000]"
                }
              `}
                            title={isMinimized ? "Blog" : ""}
                        >
                            <FileText className="w-5 h-5 shrink-0" />
                            <span
                                className={`font-medium transition-all duration-300 ${
                                    isMinimized
                                        ? "opacity-0 w-0 overflow-hidden"
                                        : "opacity-100"
                                }`}
                            >
                                Blog
                            </span>
                        </Link>

                        {/* My Learning */}
                        <Link
                            href="/my-learning"
                            onClick={() => {
                                // Close mobile sidebar when link is clicked
                                if (window.innerWidth < 1024) {
                                    setIsSidebarOpen(false);
                                }
                            }}
                            className={`
                flex items-center ${
                    isMinimized ? "justify-center" : "space-x-3"
                } ${
                                isMinimized ? "px-2" : "px-4"
                            } py-3 rounded-xl transition-all duration-300
                ${
                    isActive("/my-learning")
                        ? "bg-[#B00000] text-white"
                        : "text-gray-700 hover:bg-gray-100 hover:text-[#B00000]"
                }
              `}
                            title={isMinimized ? "My Learning" : ""}
                        >
                            <Target className="w-5 h-5 shrink-0" />
                            <span
                                className={`font-medium transition-all duration-300 ${
                                    isMinimized
                                        ? "opacity-0 w-0 overflow-hidden"
                                        : "opacity-100"
                                }`}
                            >
                                My Learning
                            </span>
                        </Link>

                        {/* Settings */}
                        <Link
                            href="/settings"
                            onClick={() => {
                                // Close mobile sidebar when link is clicked
                                if (window.innerWidth < 1024) {
                                    setIsSidebarOpen(false);
                                }
                            }}
                            className={`
                flex items-center ${
                    isMinimized ? "justify-center" : "space-x-3"
                } ${
                                isMinimized ? "px-2" : "px-4"
                            } py-3 rounded-xl transition-all duration-300
                ${
                    isActive("/settings")
                        ? "bg-[#B00000] text-white"
                        : "text-gray-700 hover:bg-gray-100 hover:text-[#B00000]"
                }
              `}
                            title={isMinimized ? "Settings" : ""}
                        >
                            <Settings className="w-5 h-5 shrink-0" />
                            <span
                                className={`font-medium transition-all duration-300 ${
                                    isMinimized
                                        ? "opacity-0 w-0 overflow-hidden"
                                        : "opacity-100"
                                }`}
                            >
                                Settings
                            </span>
                        </Link>

                        {/* Admin (Only visible to admins) */}
                        {user?.role === "admin" && (
                            <Link
                                href="/admin"
                                onClick={() => {
                                    // Close mobile sidebar when link is clicked
                                    if (window.innerWidth < 1024) {
                                        setIsSidebarOpen(false);
                                    }
                                }}
                                className={`
                flex items-center ${
                    isMinimized ? "justify-center" : "space-x-3"
                } ${
                                    isMinimized ? "px-2" : "px-4"
                                } py-3 rounded-xl transition-all duration-300
                ${
                    isActive("/admin")
                        ? "bg-[#B00000] text-white"
                        : "text-gray-700 hover:bg-gray-100 hover:text-[#B00000]"
                }
              `}
                                title={isMinimized ? "Admin" : ""}
                            >
                                <Shield className="w-5 h-5 shrink-0" />
                                <span
                                    className={`font-medium transition-all duration-300 ${
                                        isMinimized
                                            ? "opacity-0 w-0 overflow-hidden"
                                            : "opacity-100"
                                    }`}
                                >
                                    Admin
                                </span>
                            </Link>
                        )}
                    </nav>

                    {/* User Profile Section */}
                    <div
                        className={`${
                            isMinimized ? "p-2" : "p-4"
                        } border-t border-gray-200 transition-all duration-300`}
                    >
                        <div
                            className={`flex items-center ${
                                isMinimized ? "justify-center" : "space-x-3"
                            } ${
                                isMinimized ? "px-2" : "px-3"
                            } py-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-300 cursor-pointer group`}
                        >
                            <div className="w-10 h-10 rounded-full bg-[#B00000] flex items-center justify-center transition-all duration-300 shrink-0">
                                <User className="w-5 h-5 text-white" />
                            </div>
                            <div
                                className={`flex-1 transition-all duration-300 ${
                                    isMinimized
                                        ? "opacity-0 w-0 overflow-hidden"
                                        : "opacity-100"
                                }`}
                            >
                                <p className="text-sm font-medium text-black">
                                    John Doe
                                </p>
                                <p className="text-xs text-gray-600">
                                    john@example.com
                                </p>
                            </div>
                            <ChevronRight
                                className={`w-5 h-5 text-gray-600 group-hover:text-[#B00000] transition-all duration-300 ${
                                    isMinimized
                                        ? "opacity-0 w-0 overflow-hidden"
                                        : "opacity-100"
                                }`}
                            />
                        </div>
                    </div>
                </div>
            </aside>

            {/* Custom Scrollbar Styles */}
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(229, 231, 235, 0.5);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #b00000;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #8b0000;
                }
            `}</style>
        </>
    );
}
