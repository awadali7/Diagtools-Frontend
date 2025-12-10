import React from "react";
import { GraduationCap, Users, Award, BookOpen } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-[#B00000] to-red-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                        ABOUT US
                    </h1>
                    <p className="text-xl sm:text-2xl text-gray-100 max-w-3xl mx-auto">
                        India's Leading Provider of Advanced Automotive
                        Diagnostic Solutions
                    </p>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="prose prose-lg max-w-none">
                            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                                DiagTools is India's leading provider of
                                advanced automotive diagnostic tools, key
                                programming solutions, and specialized online
                                training. We offer a complete range of services
                                and products, including scanning and vehicle
                                diagnosis, ECM repairing and programming, key
                                and immobilizer (IMMO) programming, and meter
                                repairing, calibration, and programming.
                            </p>
                            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                                Our mission is to empower technicians,
                                workshops, and automotive professionals with
                                high-quality tools and practical,
                                industry-focused training that meets the demands
                                of modern vehicles. To ensure accessibility for
                                learners across India, DiagTools provides
                                training and support in multiple languages such
                                as Malayalam, English, Tamil, and Hindi,
                                delivered entirely through our flexible and
                                user-friendly online platform.
                            </p>
                            <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                                Backed by expert trainers with real-world
                                experience, we combine technical excellence,
                                reliable support, and multilingual learning to
                                help technicians upgrade their skills, improve
                                accuracy, and confidently tackle complex
                                automotive electronic systems. With DiagTools,
                                customers receive not just tools, but the
                                knowledge and support needed to succeed in
                                today's evolving automotive landscape.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 lg:py-24 bg-slate-50 dark:bg-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            Our Services & Products
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            "Scanning and Vehicle Diagnosis",
                            "ECM Repairing and Programming",
                            "Key and Immobilizer (IMMO) Programming",
                            "Meter Repairing, Calibration, and Programming",
                            "Advanced Diagnostic Tools",
                            "Specialized Online Training",
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-sm"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-6 h-6 bg-[#B00000] rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-white text-sm">
                                            ✓
                                        </span>
                                    </div>
                                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                                        {item}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            Why Choose DiagTools
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: GraduationCap,
                                title: "Expert Trainers",
                                description:
                                    "Backed by expert trainers with real-world experience",
                            },
                            {
                                icon: Users,
                                title: "Multilingual Support",
                                description:
                                    "Training in Malayalam, English, Tamil, and Hindi",
                            },
                            {
                                icon: Award,
                                title: "Technical Excellence",
                                description:
                                    "High-quality tools and industry-focused training",
                            },
                            {
                                icon: BookOpen,
                                title: "Online Platform",
                                description:
                                    "Flexible and user-friendly online learning platform",
                            },
                        ].map((value, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-slate-900 rounded-xl p-6 text-center shadow-sm"
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
