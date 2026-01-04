"use client";

import React from "react";
import {
    Users,
    BookOpen,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    TrendingUp,
    Loader2,
} from "lucide-react";
import type { DashboardStats } from "@/lib/api/types";

interface DashboardTabProps {
    stats: DashboardStats | null;
    loading?: boolean;
    onTabChange?: (
        tab:
            | "dashboard"
            | "users"
            | "requests"
            | "courses"
            | "blogs"
            | "kyc"
            | "products"
            | "orders"
    ) => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
    stats,
    loading = false,
    onTabChange,
}) => {
    if (loading || !stats) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Main Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Total Users */}
                <div
                    onClick={() => onTabChange?.("users")}
                    className="bg-slate-50 border border-slate-200 rounded-lg p-6 cursor-pointer transition-all hover:border-slate-300 hover:bg-slate-100"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">
                                Total Users
                            </p>
                            <p className="text-3xl font-light text-slate-900">
                                {stats.total_users}
                            </p>
                        </div>
                        <div className="p-2 bg-slate-100 rounded-lg">
                            <Users className="w-5 h-5 text-slate-600" />
                        </div>
                    </div>
                </div>

                {/* Total Courses */}
                <div
                    onClick={() => onTabChange?.("courses")}
                    className="bg-slate-50 border border-slate-200 rounded-lg p-6 cursor-pointer transition-all hover:border-slate-300 hover:bg-slate-100"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">
                                Total Courses
                            </p>
                            <p className="text-3xl font-light text-slate-900">
                                {stats.total_courses}
                            </p>
                        </div>
                        <div className="p-2 bg-slate-100 rounded-lg">
                            <BookOpen className="w-5 h-5 text-slate-600" />
                        </div>
                    </div>
                </div>

                {/* Pending Requests */}
                <div
                    onClick={() => onTabChange?.("requests")}
                    className="bg-slate-50 border border-slate-200 rounded-lg p-6 cursor-pointer transition-all hover:border-slate-300 hover:bg-slate-100"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">
                                Pending Requests
                            </p>
                            <p className="text-3xl font-light text-slate-900">
                                {stats.pending_requests}
                            </p>
                        </div>
                        <div className="p-2 bg-slate-100 rounded-lg">
                            <Clock className="w-5 h-5 text-slate-600" />
                        </div>
                    </div>
                </div>

                {/* Total Requests */}
                <div
                    onClick={() => onTabChange?.("requests")}
                    className="bg-slate-50 border border-slate-200 rounded-lg p-6 cursor-pointer transition-all hover:border-slate-300 hover:bg-slate-100"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">
                                Total Requests
                            </p>
                            <p className="text-3xl font-light text-slate-900">
                                {stats.total_requests}
                            </p>
                        </div>
                        <div className="p-2 bg-slate-100 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-slate-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Request Status Breakdown */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-sm font-medium text-slate-700 mb-5">
                    Request Status
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Approved */}
                    <div
                        onClick={() => onTabChange?.("requests")}
                        className="flex items-center space-x-4 cursor-pointer transition-all hover:bg-slate-50 p-3 rounded-lg -m-3"
                    >
                        <div className="p-2 bg-emerald-50 rounded-lg">
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 mb-1">Approved</p>
                            <p className="text-xl font-light text-slate-900">
                                {stats.approved_requests || 0}
                            </p>
                        </div>
                    </div>

                    {/* Rejected */}
                    <div
                        onClick={() => onTabChange?.("requests")}
                        className="flex items-center space-x-4 cursor-pointer transition-all hover:bg-slate-50 p-3 rounded-lg -m-3"
                    >
                        <div className="p-2 bg-rose-50 rounded-lg">
                            <XCircle className="w-4 h-4 text-rose-600" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 mb-1">Rejected</p>
                            <p className="text-xl font-light text-slate-900">
                                {stats.rejected_requests || 0}
                            </p>
                        </div>
                    </div>

                    {/* Pending */}
                    <div
                        onClick={() => onTabChange?.("requests")}
                        className="flex items-center space-x-4 cursor-pointer transition-all hover:bg-slate-50 p-3 rounded-lg -m-3"
                    >
                        <div className="p-2 bg-amber-50 rounded-lg">
                            <AlertCircle className="w-4 h-4 text-amber-600" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 mb-1">Pending</p>
                            <p className="text-xl font-light text-slate-900">
                                {stats.pending_requests}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
