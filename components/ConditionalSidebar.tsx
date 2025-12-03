"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import { useAuth } from "@/contexts/AuthContext";

export default function ConditionalSidebar() {
    const pathname = usePathname();
    const { isAuth } = useAuth();

    // Show sidebar only on dashboard and authenticated pages
    const showSidebar =
        isAuth &&
        (pathname?.startsWith("/dashboard") ||
            pathname?.startsWith("/courses") ||
            pathname?.startsWith("/blog") ||
            pathname?.startsWith("/profile") ||
            pathname?.startsWith("/my-learning") ||
            pathname?.startsWith("/settings") ||
            pathname?.startsWith("/admin"));

    if (!showSidebar) {
        return null;
    }

    return <Sidebar />;
}
