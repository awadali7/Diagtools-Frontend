"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useSidebar } from "./SidebarContext";
import { useAuth } from "@/contexts/AuthContext";

export default function MainContent({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const { isMinimized } = useSidebar();
    const pathname = usePathname();
    const { isAuth } = useAuth();

    // Check if sidebar should be shown
    const showSidebar =
        isAuth &&
        (pathname?.startsWith("/dashboard") ||
            pathname?.startsWith("/courses") ||
            pathname?.startsWith("/blog") ||
            pathname?.startsWith("/profile") ||
            pathname?.startsWith("/my-learning") ||
            pathname?.startsWith("/settings") ||
            pathname?.startsWith("/admin"));

    return (
        <main
            className={`pt-[73px] min-h-screen transition-all duration-300 ${
                showSidebar ? (isMinimized ? "lg:ml-20" : "lg:ml-72") : "ml-0"
            } ${className}`}
        >
            {children}
        </main>
    );
}
