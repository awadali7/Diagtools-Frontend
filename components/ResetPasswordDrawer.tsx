"use client";

import React, { useState, useEffect } from "react";
import {
    X,
    Lock,
    Eye,
    EyeOff,
    Loader2,
    CheckCircle,
    AlertCircle,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { authApi } from "@/lib/api/auth";
import LoginDrawer from "./LoginDrawer";

interface ResetPasswordDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    token?: string;
}

export default function ResetPasswordDrawer({
    isOpen,
    onClose,
    token: propToken,
}: ResetPasswordDrawerProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [token, setToken] = useState<string>("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [validationErrors, setValidationErrors] = useState<{
        [key: string]: string;
    }>({});
    const [isLoginDrawerOpen, setIsLoginDrawerOpen] = useState(false);

    useEffect(() => {
        // Get token from URL params or prop
        const urlToken = searchParams?.get("token");
        const finalToken = propToken || urlToken || "";
        setToken(finalToken);

        // If no token, show error
        if (!finalToken && isOpen) {
            setError(
                "Invalid or missing reset token. Please request a new password reset."
            );
        }
    }, [isOpen, propToken, searchParams]);

    const validateForm = (): boolean => {
        const errors: { [key: string]: string } = {};

        if (!password) {
            errors.password = "Password is required";
        } else if (password.length < 8) {
            errors.password = "Password must be at least 8 characters";
        } else if (!/(?=.*[a-z])/.test(password)) {
            errors.password =
                "Password must contain at least one lowercase letter";
        } else if (!/(?=.*[A-Z])/.test(password)) {
            errors.password =
                "Password must contain at least one uppercase letter";
        } else if (!/(?=.*\d)/.test(password)) {
            errors.password = "Password must contain at least one number";
        }

        if (!confirmPassword) {
            errors.confirmPassword = "Please confirm your password";
        } else if (password !== confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!validateForm()) {
            return;
        }

        if (!token) {
            setError("Invalid or missing reset token");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await authApi.resetPassword(token, password);
            if (response.success) {
                setSuccess(true);
                setPassword("");
                setConfirmPassword("");
            } else {
                setError("Failed to reset password. Please try again.");
            }
        } catch (err: any) {
            setError(
                err.message ||
                    "Failed to reset password. The token may be invalid or expired. Please request a new password reset."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setPassword("");
        setConfirmPassword("");
        setError(null);
        setValidationErrors({});
        setSuccess(false);
        setToken("");
        onClose();
    };

    const handleGoToLogin = () => {
        handleClose();
        setIsLoginDrawerOpen(true);
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
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                            Reset Password
                        </h2>
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
                                    Password Reset Successful
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6">
                                    Your password has been successfully reset.
                                    You can now login with your new password.
                                </p>
                                <button
                                    onClick={handleGoToLogin}
                                    className="w-full px-4 py-2 bg-[#B00000] text-white rounded-lg font-medium hover:bg-red-800 transition-colors"
                                >
                                    Go to Login
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {!token && (
                                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
                                        <div className="flex items-start">
                                            <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2 mt-0.5" />
                                            <p className="text-sm text-yellow-800 dark:text-yellow-300">
                                                No reset token found. Please use
                                                the link from your email or
                                                request a new password reset.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Password Input */}
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    >
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            id="password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            name="password"
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                                if (error) setError(null);
                                                if (validationErrors.password) {
                                                    setValidationErrors(
                                                        (prev) => {
                                                            const newErrors = {
                                                                ...prev,
                                                            };
                                                            delete newErrors.password;
                                                            return newErrors;
                                                        }
                                                    );
                                                }
                                            }}
                                            required
                                            className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-[#B00000] focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                                            placeholder="Enter new password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-5 h-5" />
                                            ) : (
                                                <Eye className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                    {validationErrors.password && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                            {validationErrors.password}
                                        </p>
                                    )}
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        Must be at least 8 characters with
                                        uppercase, lowercase, and number
                                    </p>
                                </div>

                                {/* Confirm Password Input */}
                                <div>
                                    <label
                                        htmlFor="confirmPassword"
                                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                    >
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            id="confirmPassword"
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            name="confirmPassword"
                                            value={confirmPassword}
                                            onChange={(e) => {
                                                setConfirmPassword(
                                                    e.target.value
                                                );
                                                if (error) setError(null);
                                                if (
                                                    validationErrors.confirmPassword
                                                ) {
                                                    setValidationErrors(
                                                        (prev) => {
                                                            const newErrors = {
                                                                ...prev,
                                                            };
                                                            delete newErrors.confirmPassword;
                                                            return newErrors;
                                                        }
                                                    );
                                                }
                                            }}
                                            required
                                            className="w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-[#B00000] focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                                            placeholder="Confirm new password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="w-5 h-5" />
                                            ) : (
                                                <Eye className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                    {validationErrors.confirmPassword && (
                                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                            {validationErrors.confirmPassword}
                                        </p>
                                    )}
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
                                    disabled={
                                        isSubmitting ||
                                        !password ||
                                        !confirmPassword ||
                                        !token
                                    }
                                    className="w-full py-3 bg-[#B00000] text-white rounded-lg font-medium hover:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            Resetting...
                                        </>
                                    ) : (
                                        "Reset Password"
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            {/* Login Drawer (shown after successful reset) */}
            <LoginDrawer
                isOpen={isLoginDrawerOpen}
                onClose={() => setIsLoginDrawerOpen(false)}
            />
        </>
    );
}
