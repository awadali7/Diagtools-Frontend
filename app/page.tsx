"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import RegisterDrawer from "@/components/RegisterDrawer";
import LoginDrawer from "@/components/LoginDrawer";

export default function LandingPage() {
    const [isRegisterDrawerOpen, setIsRegisterDrawerOpen] = useState(false);
    const [isLoginDrawerOpen, setIsLoginDrawerOpen] = useState(false);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-[#B00000] via-red-700 to-red-900 text-white py-20 lg:py-32">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                                Master Automotive Technology with{" "}
                                <span className="text-yellow-300">
                                    Diag Wheels
                                </span>
                            </h1>
                            <p className="text-xl sm:text-2xl mb-8 text-gray-100">
                                Professional e-learning platform for modern
                                automotive diagnostics, repairs, and technology.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() =>
                                        setIsRegisterDrawerOpen(true)
                                    }
                                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#B00000] rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                                >
                                    Join Now
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </button>
                                <Link
                                    href="/courses"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white/10 transition-all duration-300"
                                >
                                    <Play className="mr-2 w-5 h-5" />
                                    Explore Courses
                                </Link>
                            </div>
                        </div>
                        <div className="hidden lg:block">
                            <div className="relative">
                                <div className="absolute inset-0 bg-white/20 rounded-3xl blur-3xl"></div>
                                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 overflow-hidden">
                                    <div className="aspect-video rounded-xl overflow-hidden relative">
                                        <iframe
                                            width="560"
                                            height="315"
                                            src="https://www.youtube.com/embed/IIBU1v3Ae0E?si=_3Ifnu-vi2K5xSyq"
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                            className="w-full h-full rounded-xl"
                                        ></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
                            Why Choose Diag Wheels?
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            Learn from industry experts with hands-on training
                            in automotive diagnostics and repair
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop",
                                title: "Expert Courses",
                                description:
                                    "Comprehensive courses covering ADAS, EV systems, diagnostics, and more",
                            },
                            {
                                image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop",
                                title: "Learn from Experts",
                                description:
                                    "Taught by certified automotive professionals with years of experience",
                            },
                            {
                                image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=300&fit=crop",
                                title: "Certification",
                                description:
                                    "Earn certificates upon completion to boost your career",
                            },
                            {
                                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
                                title: "Video Tutorials",
                                description:
                                    "Watch detailed video demonstrations and hands-on training",
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200"
                            >
                                <div className="h-48 w-full overflow-hidden relative">
                                    <Image
                                        src={feature.image}
                                        alt={feature.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-600">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Courses Preview Section */}
            <section className="py-16 lg:py-24 bg-[#0D121C]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                            Featured Courses
                        </h2>
                        <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                            Master the latest automotive technologies and
                            diagnostic techniques
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "ADAS Calibration",
                                description:
                                    "Advanced Driver Assistance Systems calibration and repair",
                                image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&h=400&fit=crop",
                            },
                            {
                                title: "EV Charger Installation",
                                description:
                                    "Electric vehicle charging station installation and diagnostics",
                                image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&h=400&fit=crop&auto=format",
                            },
                            {
                                title: "Diagnostic Tools",
                                description:
                                    "Modern diagnostic equipment and software training",
                                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
                            },
                        ].map((course, index) => (
                            <Link
                                key={index}
                                href="/courses"
                                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                            >
                                <div className="h-48 w-full overflow-hidden relative">
                                    <Image
                                        src={course.image}
                                        alt={course.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#B00000] transition-colors">
                                        {course.title}
                                    </h3>
                                    <p className="text-slate-600 mb-4">
                                        {course.description}
                                    </p>
                                    <div className="flex items-center text-[#B00000] font-medium">
                                        Learn More
                                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Link
                            href="/courses"
                            className="inline-flex items-center px-8 py-4 bg-[#B00000] text-white rounded-lg font-bold text-lg hover:bg-red-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            View All Courses
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 lg:py-24 bg-[#B00000] text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                        {[
                            { value: "9+", label: "Expert Courses" },
                            { value: "2.5K+", label: "Students Enrolled" },
                            { value: "95%", label: "Completion Rate" },
                            { value: "50+", label: "Certified Experts" },
                        ].map((stat, index) => (
                            <div key={index}>
                                <div className="text-4xl lg:text-5xl font-bold mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-lg text-gray-200">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 lg:py-24 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                        Ready to Start Learning?
                    </h2>
                    <p className="text-xl text-slate-600 mb-8">
                        Join thousands of professionals mastering automotive
                        technology today
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => setIsRegisterDrawerOpen(true)}
                            className="inline-flex items-center justify-center px-8 py-4 bg-[#B00000] text-white rounded-lg font-bold text-lg hover:bg-red-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Join Now - It's Free
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </button>
                        <Link
                            href="/courses"
                            className="inline-flex items-center justify-center px-8 py-4 bg-slate-200 text-slate-900 rounded-lg font-bold text-lg hover:bg-slate-300 transition-all duration-300"
                        >
                            Browse Courses
                        </Link>
                    </div>
                </div>
            </section>

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
