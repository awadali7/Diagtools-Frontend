"use client";

import React, { useState } from "react";
import { X, CheckCircle2, Loader2, FileText } from "lucide-react";
import { termsApi } from "@/lib/api/terms";

interface CourseTermsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAccept: () => void;
}

export default function CourseTermsModal({
    isOpen,
    onClose,
    onAccept,
}: CourseTermsModalProps) {
    const [accepting, setAccepting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [scrolledToBottom, setScrolledToBottom] = useState(false);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const element = e.currentTarget;
        const isAtBottom =
            element.scrollHeight - element.scrollTop <= element.clientHeight + 10;
        if (isAtBottom && !scrolledToBottom) {
            setScrolledToBottom(true);
        }
    };

    const handleAccept = async () => {
        setAccepting(true);
        setError(null);

        try {
            const response = await termsApi.acceptCourseTerms();

            if (response.success) {
                onAccept();
            } else {
                setError(response.message || "Failed to accept terms");
            }
        } catch (err: any) {
            setError(err.message || "Failed to accept terms");
        } finally {
            setAccepting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">
                            Course Terms & Conditions
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        disabled={accepting}
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Terms Content */}
                <div
                    onScroll={handleScroll}
                    className="flex-1 overflow-y-auto p-6 space-y-4 text-sm text-slate-700"
                >
                    <div className="prose prose-sm max-w-none">
                        <h3 className="text-lg font-semibold text-slate-900">
                            1. Course Access and Usage
                        </h3>
                        <p>
                            By accepting these terms, you agree to use our courses for
                            educational purposes only. You will have access to the course
                            materials for the duration specified in your purchase.
                        </p>

                        <h3 className="text-lg font-semibold text-slate-900 mt-6">
                            2. Content Ownership
                        </h3>
                        <p>
                            All course content, including videos, documents, and materials,
                            are the intellectual property of the platform. You may not
                            reproduce, distribute, or share this content without explicit
                            permission.
                        </p>

                        <h3 className="text-lg font-semibold text-slate-900 mt-6">
                            3. Payment and Refunds
                        </h3>
                        <p>
                            All course purchases are final. Refunds may be considered on a
                            case-by-case basis within 7 days of purchase if you haven't
                            accessed more than 20% of the course content.
                        </p>

                        <h3 className="text-lg font-semibold text-slate-900 mt-6">
                            4. User Conduct
                        </h3>
                        <p>
                            You agree to use the platform responsibly and not engage in any
                            activities that may harm the platform or other users. This
                            includes not sharing login credentials, attempting to hack the
                            system, or posting inappropriate content.
                        </p>

                        <h3 className="text-lg font-semibold text-slate-900 mt-6">
                            5. Certification and Completion
                        </h3>
                        <p>
                            Certificates of completion will be issued upon successful
                            completion of all course requirements. Certificates are for
                            personal use and should not be altered or misrepresented.
                        </p>

                        <h3 className="text-lg font-semibold text-slate-900 mt-6">
                            6. Platform Changes
                        </h3>
                        <p>
                            We reserve the right to modify course content, pricing, or
                            platform features at any time. Existing students will be
                            notified of significant changes that affect their access.
                        </p>

                        <h3 className="text-lg font-semibold text-slate-900 mt-6">
                            7. Privacy and Data
                        </h3>
                        <p>
                            We are committed to protecting your privacy. Your personal
                            information and progress data will be stored securely and used
                            only for providing and improving our services.
                        </p>

                        <h3 className="text-lg font-semibold text-slate-900 mt-6">
                            8. Support and Communication
                        </h3>
                        <p>
                            We will provide reasonable support for technical issues and
                            course-related questions during business hours (9 AM - 6 PM,
                            business days).
                        </p>

                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
                            <p className="font-semibold text-blue-900">
                                By accepting these terms, you confirm that you have read and
                                understood all conditions and agree to abide by them.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                {!scrolledToBottom && (
                    <div className="px-6 py-2 bg-yellow-50 border-t border-yellow-200 text-center">
                        <p className="text-sm text-yellow-800">
                            ⬇️ Please scroll to the bottom to read all terms
                        </p>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="px-6 py-3 bg-red-50 border-t border-red-200">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
                    <button
                        onClick={onClose}
                        disabled={accepting}
                        className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAccept}
                        disabled={accepting || !scrolledToBottom}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                        {accepting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Accepting...</span>
                            </>
                        ) : (
                            <>
                                <CheckCircle2 className="w-5 h-5" />
                                <span>I Accept & Agree</span>
                            </>
                        )}
                    </button>
                </div>

                {!scrolledToBottom && (
                    <p className="text-xs text-center text-gray-500 pb-2">
                        Button will enable once you've scrolled through all terms
                    </p>
                )}
            </div>
        </div>
    );
}

