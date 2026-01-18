"use client";

import React from "react";
import { X, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { formatDate } from "./utils";
import type { ProductKYCVerification } from "@/lib/api/types";

interface ProductKYCModalProps {
    isOpen: boolean;
    kyc: ProductKYCVerification | null;
    kycAction: "verify" | "reject" | null;
    rejectionReason: string;
    isProcessing: boolean;
    success: string | null;
    error: string | null;
    onClose: () => void;
    onVerify: () => void;
    onReject: () => void;
    onAction: () => void;
    onRejectionReasonChange: (reason: string) => void;
    onCancelAction: () => void;
}

export const ProductKYCModal: React.FC<ProductKYCModalProps> = ({
    isOpen,
    kyc,
    kycAction,
    rejectionReason,
    isProcessing,
    success,
    error,
    onClose,
    onVerify,
    onReject,
    onAction,
    onRejectionReasonChange,
    onCancelAction,
}) => {
    if (!isOpen || !kyc) return null;

    // Get backend base URL (without /api) for static file serving
    const getBackendBaseUrl = () => {
        const apiUrl =
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
        return apiUrl.replace(/\/api\/?$/, "");
    };

    const BACKEND_BASE_URL = getBackendBaseUrl();

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                    <h2 className="text-xl font-bold text-slate-900">
                        Product KYC Verification Details
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                <div className="p-6">
                    {/* Success Message */}
                    {success && (
                        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
                            <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
                            <p className="text-sm text-green-600 font-medium">
                                {success}
                            </p>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                            <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                            <p className="text-sm text-red-600 font-medium">
                                {error}
                            </p>
                        </div>
                    )}

                    {!success && (
                        <>
                            {/* User Information */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                                    User Information
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">
                                            User Email
                                        </label>
                                        <p className="text-sm text-slate-900 mt-1">
                                            {kyc.user_email || "N/A"}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">
                                            Status
                                        </label>
                                        <div className="mt-1">
                                            <StatusBadge status={kyc.status} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Personal Information */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                                    Personal Information
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">
                                            Full Name
                                        </label>
                                        <p className="text-sm text-slate-900 mt-1">
                                            {kyc.full_name}
                                        </p>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-sm font-medium text-gray-600">
                                            Address
                                        </label>
                                        <p className="text-sm text-slate-900 mt-1">
                                            {kyc.address}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">
                                            Contact Number
                                        </label>
                                        <p className="text-sm text-slate-900 mt-1">
                                            {kyc.contact_number}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">
                                            WhatsApp Number
                                        </label>
                                        <p className="text-sm text-slate-900 mt-1">
                                            {kyc.whatsapp_number}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Documents */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                                    Documents
                                </h3>
                                
                                {/* ID Proofs */}
                                <div className="mb-6">
                                    <label className="text-sm font-medium text-gray-600 mb-2 block">
                                        ID Proof Documents ({kyc.id_proofs?.length || 0})
                                    </label>
                                    {kyc.id_proofs && kyc.id_proofs.length > 0 ? (
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {kyc.id_proofs.map((url: string, idx: number) => (
                                                <a
                                                    key={idx}
                                                    href={`${BACKEND_BASE_URL}${url}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block"
                                                >
                                                    {url.endsWith('.pdf') ? (
                                                        <div className="w-full h-32 p-4 border border-gray-200 rounded-lg bg-gray-50 flex flex-col items-center justify-center hover:bg-gray-100 transition-colors">
                                                            <p className="text-center text-slate-600 text-sm">
                                                                PDF Document
                                                            </p>
                                                            <p className="text-center text-xs text-slate-500 mt-1">
                                                                Click to view
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <img
                                                            src={`${BACKEND_BASE_URL}${url}`}
                                                            alt={`ID Proof ${idx + 1}`}
                                                            className="w-full h-32 object-contain border border-gray-200 rounded-lg bg-gray-50 hover:scale-105 transition-transform"
                                                        />
                                                    )}
                                                </a>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-gray-500">
                                            No ID proof documents uploaded
                                        </p>
                                    )}
                                </div>

                                {/* Business Proofs */}
                                {kyc.business_proofs && kyc.business_proofs.length > 0 && (
                                    <div>
                                        <label className="text-sm font-medium text-gray-600 mb-2 block">
                                            Business Proof Documents ({kyc.business_proofs.length})
                                        </label>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {kyc.business_proofs.map((url: string, idx: number) => (
                                                <a
                                                    key={idx}
                                                    href={`${BACKEND_BASE_URL}${url}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block"
                                                >
                                                    {url.endsWith('.pdf') ? (
                                                        <div className="w-full h-32 p-4 border border-gray-200 rounded-lg bg-gray-50 flex flex-col items-center justify-center hover:bg-gray-100 transition-colors">
                                                            <p className="text-center text-slate-600 text-sm">
                                                                PDF Document
                                                            </p>
                                                            <p className="text-center text-xs text-slate-500 mt-1">
                                                                Click to view
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <img
                                                            src={`${BACKEND_BASE_URL}${url}`}
                                                            alt={`Business Proof ${idx + 1}`}
                                                            className="w-full h-32 object-contain border border-gray-200 rounded-lg bg-gray-50 hover:scale-105 transition-transform"
                                                        />
                                                    )}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Rejection Reason (if rejected) */}
                            {kyc.status === "rejected" &&
                                kyc.rejection_reason && (
                                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                        <label className="text-sm font-medium text-red-600 mb-2 block">
                                            Rejection Reason
                                        </label>
                                        <p className="text-sm text-red-700">
                                            {kyc.rejection_reason}
                                        </p>
                                    </div>
                                )}

                            {/* Action Form (if pending) */}
                            {kyc.status === "pending" && kycAction && (
                                <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                    <h4 className="text-md font-semibold text-slate-900 mb-4">
                                        {kycAction === "verify"
                                            ? "Verify Product KYC"
                                            : "Reject Product KYC"}
                                    </h4>
                                    {kycAction === "reject" && (
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Rejection Reason{" "}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <textarea
                                                value={rejectionReason}
                                                onChange={(e) =>
                                                    onRejectionReasonChange(
                                                        e.target.value
                                                    )
                                                }
                                                rows={4}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B00000] focus:border-transparent"
                                                placeholder="Enter reason for rejection..."
                                            />
                                        </div>
                                    )}
                                    {kycAction === "verify" && (
                                        <p className="text-sm text-gray-600 mb-4">
                                            Are you sure you want to verify this
                                            Product KYC application? This will allow the
                                            user to purchase products that require KYC.
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Action Buttons */}
                            {kyc.status === "pending" && !kycAction && (
                                <div className="flex space-x-3">
                                    <button
                                        onClick={onVerify}
                                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                                    >
                                        <CheckCircle className="w-4 h-4" />
                                        <span>Verify Product KYC</span>
                                    </button>
                                    <button
                                        onClick={onReject}
                                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                                    >
                                        <XCircle className="w-4 h-4" />
                                        <span>Reject Product KYC</span>
                                    </button>
                                </div>
                            )}

                            {kycAction && (
                                <div className="flex space-x-3">
                                    <button
                                        onClick={onAction}
                                        disabled={
                                            isProcessing ||
                                            (kycAction === "reject" &&
                                                !rejectionReason.trim())
                                        }
                                        className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                                            kycAction === "verify"
                                                ? "bg-green-600 hover:bg-green-700"
                                                : "bg-red-600 hover:bg-red-700"
                                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                                    >
                                        {isProcessing ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                <span>
                                                    {kycAction === "verify"
                                                        ? "Verifying..."
                                                        : "Rejecting..."}
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                {kycAction === "verify" ? (
                                                    <>
                                                        <CheckCircle className="w-4 h-4" />
                                                        <span>
                                                            Confirm Verify
                                                        </span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <XCircle className="w-4 h-4" />
                                                        <span>
                                                            Confirm Reject
                                                        </span>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={onCancelAction}
                                        disabled={isProcessing}
                                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}

                            {success && (
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    Close
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

