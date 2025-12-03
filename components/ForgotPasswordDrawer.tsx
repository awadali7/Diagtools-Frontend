"use client";

import React, { useState } from "react";
import { X, Mail, Loader2, ArrowLeft, CheckCircle } from "lucide-react";
import { authApi } from "@/lib/api/auth";

interface ForgotPasswordDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToLogin?: () => void;
}

export default function ForgotPasswordDrawer({
    isOpen,
    onClose,
    onSwitchToLogin,
}: ForgotPasswordDrawerProps) {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            const response = await authApi.forgotPassword(email);
            if (response.success) {
                setSuccess(true);
                setEmail("");
            } else {
                setError("Failed to send reset email. Please try again.");
            }
        } catch (err: any) {
            setError(
                err.message ||
                    "Failed to send reset email. Please check your email and try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setEmail("");
        setError(null);
        setSuccess(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-40 transition-opacity"
                onClick={handleClose}
            />

            {/* Drawer */}
            <div
                className={`fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
                        <div className="flex items-center space-x-3">
                            {onSwitchToLogin && (
                                <button
                                    onClick={onSwitchToLogin}
                                    className="p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded transition-colors"
                                    aria-label="Back to login"
                                >
                                    <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                </button>
                            )}
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                Forgot Password
                            </h2>
                        </div>
                        <button
                            onClick={handleClose}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded transition-colors"
                            aria-label="Close"
                        >
                            <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {success ? (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                                    Check Your Email
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6">
                                    If an account exists with this email, a
                                    password reset link has been sent. Please
                                    check your inbox and follow the
                                    instructions.
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
                                    The reset link will expire in 1 hour.
                                </p>
                                {onSwitchToLogin && (
                                    <button
                                        onClick={onSwitchToLogin}
                                        className="w-full px-4 py-2 bg-[#B00000] text-white rounded-lg font-medium hover:bg-red-800 transition-colors"
                                    >
                                        Back to Login
                                    </button>
                                )}
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                        Enter your email address and we'll send
                                        you a link to reset your password.
                                    </p>
                                </div>

                                {/* Email Input */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    >
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                if (error) setError(null);
                                            }}
                                            required
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-[#B00000] focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                                        <p className="text-sm text-red-600 dark:text-red-400">
                                            {error}
                                        </p>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !email}
                                    className="w-full py-3 bg-[#B00000] text-white rounded-lg font-medium hover:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        "Send Reset Link"
                                    )}
                                </button>

                                {/* Back to Login */}
                                {onSwitchToLogin && (
                                    <div className="text-center">
                                        <button
                                            type="button"
                                            onClick={onSwitchToLogin}
                                            className="text-sm text-[#B00000] hover:underline"
                                        >
                                            Back to Login
                                        </button>
                                    </div>
                                )}
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
