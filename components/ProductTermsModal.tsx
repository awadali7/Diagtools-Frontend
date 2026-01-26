"use client";

import React, { useState } from "react";
import { X, CheckCircle2, Loader2, ShoppingCart } from "lucide-react";
import { termsApi } from "@/lib/api/terms";

interface ProductTermsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAccept: () => void;
}

export default function ProductTermsModal({
    isOpen,
    onClose,
    onAccept,
}: ProductTermsModalProps) {
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
            const response = await termsApi.acceptProductTerms();

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
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <ShoppingCart className="w-5 h-5 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">
                            Product Terms & Conditions
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
                            1. Product Orders and Payment
                        </h3>
                        <p>
                            By accepting these terms, you agree to purchase products through
                            our platform. All orders are subject to availability and
                            confirmation of payment.
                        </p>

                        <h3 className="text-lg font-semibold text-slate-900 mt-6">
                            2. Bulk Orders and Business Accounts
                        </h3>
                        <p>
                            Business accounts with verified KYC can place bulk orders.
                            Special pricing and terms may apply to bulk purchases. Contact
                            support for bulk order arrangements.
                        </p>

                        <h3 className="text-lg font-semibold text-slate-900 mt-6">
                            3. Product Delivery and Shipping
                        </h3>
                        <p>
                            Physical products will be shipped to the address provided during
                            checkout. Delivery times vary based on location. Digital
                            products will be available for download immediately after
                            payment confirmation.
                        </p>

                        <h3 className="text-lg font-semibold text-slate-900 mt-6">
                            4. Returns and Refunds
                        </h3>
                        <p>
                            Physical products may be returned within 7 days if unopened and
                            in original condition. Digital products are non-refundable once
                            accessed. KYC-required products have specific return policies
                            outlined at purchase.
                        </p>

                        <h3 className="text-lg font-semibold text-slate-900 mt-6">
                            5. KYC Requirements
                        </h3>
                        <p>
                            Certain products require verified KYC (Know Your Customer)
                            documentation. Business owners must maintain valid business
                            registration and identification documents. We reserve the right
                            to verify identity before processing orders.
                        </p>

                        <h3 className="text-lg font-semibold text-slate-900 mt-6">
                            6. Product Quality and Warranties
                        </h3>
                        <p>
                            All products are sold as described. Manufacturer warranties apply
                            where applicable. For defective products, contact support within
                            30 days of delivery for replacement or refund.
                        </p>

                        <h3 className="text-lg font-semibold text-slate-900 mt-6">
                            7. Pricing and Availability
                        </h3>
                        <p>
                            Prices are subject to change without notice. We reserve the
                            right to limit quantities. Bulk pricing tiers are displayed at
                            checkout and may vary based on order volume.
                        </p>

                        <h3 className="text-lg font-semibold text-slate-900 mt-6">
                            8. Business Verification
                        </h3>
                        <p>
                            Business accounts must provide valid business documentation
                            including business ID, location verification, and proof of
                            business operation. Orders may be held pending verification.
                        </p>

                        <h3 className="text-lg font-semibold text-slate-900 mt-6">
                            9. Order Processing
                        </h3>
                        <p>
                            Orders are processed during business hours (9 AM - 6 PM,
                            business days). Expect confirmation within 1-2 business days for
                            KYC-required products after verification.
                        </p>

                        <h3 className="text-lg font-semibold text-slate-900 mt-6">
                            10. Privacy and Data Security
                        </h3>
                        <p>
                            Your business and personal information will be stored securely
                            and used only for order processing and verification. We comply
                            with all data protection regulations.
                        </p>

                        <div className="bg-green-50 border-l-4 border-green-500 p-4 mt-6">
                            <p className="font-semibold text-green-900">
                                By accepting these terms, you confirm that you have read and
                                understood all conditions and agree to abide by them for all
                                product purchases.
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
                        className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
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

