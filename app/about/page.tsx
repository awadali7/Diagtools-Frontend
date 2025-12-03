import React from "react";
import { GraduationCap, Users, Award, BookOpen } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-[#B00000] to-red-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                        About Diag Wheels
                    </h1>
                    <p className="text-xl sm:text-2xl text-gray-100 max-w-3xl mx-auto">
                        Empowering automotive professionals with cutting-edge
                        knowledge and skills
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                                Our Mission
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
                                Diag Wheels is dedicated to providing
                                world-class automotive technology education to
                                professionals and enthusiasts alike. We believe
                                in making advanced diagnostic and repair
                                knowledge accessible to everyone.
                            </p>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
                                Our platform offers comprehensive courses
                                covering modern automotive systems including
                                ADAS calibration, EV technology, diagnostic
                                tools, and much more.
                            </p>
                            <p className="text-lg text-slate-600 dark:text-slate-400">
                                We partner with industry experts and certified
                                professionals to deliver hands-on training that
                                prepares you for real-world challenges.
                            </p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                                What We Offer
                            </h3>
                            <div className="space-y-4">
                                {[
                                    "Expert-led video courses",
                                    "Hands-on diagnostic training",
                                    "Industry certifications",
                                    "Live support and community",
                                    "Latest technology updates",
                                    "Practical case studies",
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center space-x-3"
                                    >
                                        <div className="w-6 h-6 bg-[#B00000] rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-white text-sm">
                                                ✓
                                            </span>
                                        </div>
                                        <span className="text-slate-700 dark:text-slate-300">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            Our Values
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: GraduationCap,
                                title: "Excellence",
                                description:
                                    "We strive for excellence in every course and training module",
                            },
                            {
                                icon: Users,
                                title: "Community",
                                description:
                                    "Building a strong community of automotive professionals",
                            },
                            {
                                icon: Award,
                                title: "Quality",
                                description:
                                    "High-quality content taught by industry experts",
                            },
                            {
                                icon: BookOpen,
                                title: "Innovation",
                                description:
                                    "Staying ahead with the latest automotive technologies",
                            },
                        ].map((value, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-slate-900 rounded-xl p-6 text-center"
                            >
                                <div className="w-16 h-16 bg-[#B00000] rounded-full flex items-center justify-center mx-auto mb-4">
                                    <value.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                    {value.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
