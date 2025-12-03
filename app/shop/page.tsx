"use client";

import React, { useState } from "react";
import { ShoppingCart, Package, Star } from "lucide-react";
import RegisterDrawer from "@/components/RegisterDrawer";
import LoginDrawer from "@/components/LoginDrawer";

export default function ShopPage() {
    const [isRegisterDrawerOpen, setIsRegisterDrawerOpen] = useState(false);
    const [isLoginDrawerOpen, setIsLoginDrawerOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                        Diag Wheels Shop
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                        Professional diagnostic tools, equipment, and resources
                        for automotive professionals
                    </p>
                </div>

                {/* Coming Soon Section */}
                <div className="bg-gradient-to-br from-[#B00000] to-red-800 rounded-2xl p-12 text-center text-white">
                    <ShoppingCart className="w-20 h-20 mx-auto mb-6 opacity-80" />
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Coming Soon
                    </h2>
                    <p className="text-xl text-gray-100 max-w-2xl mx-auto mb-8">
                        Our shop is under construction. We'll be offering
                        professional diagnostic tools, course materials, and
                        exclusive resources soon!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => setIsRegisterDrawerOpen(true)}
                            className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#B00000] rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300"
                        >
                            Get Notified
                        </button>
                        <a
                            href="/courses"
                            className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white/10 transition-all duration-300"
                        >
                            Browse Courses
                        </a>
                    </div>
                </div>

                {/* Preview Products */}
                <div className="mt-16">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
                        What's Coming
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Diagnostic Tools",
                                description:
                                    "Professional OBD scanners and diagnostic equipment",
                                icon: Package,
                            },
                            {
                                title: "Course Materials",
                                description:
                                    "PDF guides, manuals, and downloadable resources",
                                icon: Package,
                            },
                            {
                                title: "Premium Courses",
                                description:
                                    "Exclusive advanced courses with certificates",
                                icon: Star,
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 text-center border-2 border-dashed border-gray-300 dark:border-slate-700"
                            >
                                <div className="w-16 h-16 bg-[#B00000]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <item.icon className="w-8 h-8 text-[#B00000] dark:text-red-400" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Register Drawer */}
            <RegisterDrawer
                isOpen={isRegisterDrawerOpen}
                onClose={() => setIsRegisterDrawerOpen(false)}
                onSwitchToLogin={() => {
                    setIsRegisterDrawerOpen(false);
                    setIsLoginDrawerOpen(true);
                }}
            />

            {/* Login Drawer */}
            <LoginDrawer
                isOpen={isLoginDrawerOpen}
                onClose={() => setIsLoginDrawerOpen(false)}
                onSwitchToRegister={() => {
                    setIsLoginDrawerOpen(false);
                    setIsRegisterDrawerOpen(true);
                }}
            />
        </div>
    );
}
