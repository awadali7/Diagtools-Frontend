"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ResetPasswordDrawer from "@/components/ResetPasswordDrawer";
import { Loader2 } from "lucide-react";

function ResetPasswordContent() {
    const searchParams = useSearchParams();
    const [token, setToken] = useState<string | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        const urlToken = searchParams?.get("token");
        if (urlToken) {
            setToken(urlToken);
            setIsDrawerOpen(true);
        }
    }, [searchParams]);

    if (!token) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-slate-900">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-[#B00000] mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        Loading...
                    </h1>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
            <ResetPasswordDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                token={token}
            />
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-slate-900">
                    <div className="text-center">
                        <Loader2 className="w-8 h-8 animate-spin text-[#B00000] mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                            Loading...
                        </h1>
                    </div>
                </div>
            }
        >
            <ResetPasswordContent />
        </Suspense>
    );
}
