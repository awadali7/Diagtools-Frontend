"use client";

import React, { useState } from "react";
import { X, Building2, Loader2, Upload, CheckCircle2, AlertCircle } from "lucide-react";
import { kycUpgradeApi } from "@/lib/api/kyc-upgrade";
import ProductTermsModal from "./ProductTermsModal";

interface BusinessUpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function BusinessUpgradeModal({
    isOpen,
    onClose,
    onSuccess,
}: BusinessUpgradeModalProps) {
    const [step, setStep] = useState<"form" | "terms">("form");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        business_id: "",
        business_location_link: "",
    });

    const [businessProof, setBusinessProof] = useState<File | null>(null);
    const [businessProofPreview, setBusinessProofPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setBusinessProof(file);
            
            // Create preview for images
            if (file.type.startsWith("image/")) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setBusinessProofPreview(reader.result as string);
                };
                reader.readAsDataURL(file);
            } else {
                setBusinessProofPreview(null);
            }
        }
    };

    const removeFile = () => {
        setBusinessProof(null);
        setBusinessProofPreview(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        try {
            const response = await kycUpgradeApi.upgradeToBusiness({
                business_id: formData.business_id,
                business_location_link: formData.business_location_link,
                business_proof: businessProof || undefined,
            });

            if (response.success) {
                setSuccess(true);
                // Show product terms modal next
                setTimeout(() => {
                    setStep("terms");
                }, 1000);
            } else {
                setError(response.message || "Failed to submit upgrade");
            }
        } catch (err: any) {
            setError(err.message || "Failed to submit upgrade");
        } finally {
            setSubmitting(false);
        }
    };

    const handleTermsAccept = () => {
        onSuccess();
        handleClose();
    };

    const handleClose = () => {
        setStep("form");
        setFormData({ business_id: "", business_location_link: "" });
        setBusinessProof(null);
        setBusinessProofPreview(null);
        setError(null);
        setSuccess(false);
        onClose();
    };

    if (!isOpen) return null;

    // Show Product Terms Modal after successful submission
    if (step === "terms") {
        return (
            <ProductTermsModal
                isOpen={true}
                onClose={handleClose}
                onAccept={handleTermsAccept}
            />
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">
                                Upgrade to Business Owner
                            </h2>
                            <p className="text-sm text-slate-600">
                                Add your business information to purchase KYC-required products
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        disabled={submitting}
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="m-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                        <div>
                            <p className="text-green-800 font-medium">
                                Business upgrade submitted successfully!
                            </p>
                            <p className="text-sm text-green-700">
                                Please accept the product terms to continue...
                            </p>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="m-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                        <AlertCircle className="w-6 h-6 text-red-600" />
                        <p className="text-red-700">{error}</p>
                    </div>
                )}

                {/* Info Banner */}
                <div className="m-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                        <strong>Required for KYC products:</strong> Business owners can
                        purchase products that require identity verification and place bulk
                        orders. Your information will be verified by our admin team (9am-6pm
                        business days).
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Business ID */}
                    <div>
                        <label
                            htmlFor="business_id"
                            className="block text-sm font-medium text-slate-700 mb-2"
                        >
                            Business ID / Registration Number{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="business_id"
                            value={formData.business_id}
                            onChange={(e) =>
                                setFormData({ ...formData, business_id: e.target.value })
                            }
                            placeholder="e.g., GST Number, Business License Number"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            required
                            disabled={submitting || success}
                        />
                        <p className="text-xs text-slate-500 mt-1">
                            Enter your GST number, business license, or company registration
                            number
                        </p>
                    </div>

                    {/* Business Location Link */}
                    <div>
                        <label
                            htmlFor="business_location_link"
                            className="block text-sm font-medium text-slate-700 mb-2"
                        >
                            Business Location Link{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="url"
                            id="business_location_link"
                            value={formData.business_location_link}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    business_location_link: e.target.value,
                                })
                            }
                            placeholder="e.g., Google Maps link, website URL"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            required
                            disabled={submitting || success}
                        />
                        <p className="text-xs text-slate-500 mt-1">
                            Provide a Google Maps link to your business location or your
                            business website
                        </p>
                    </div>

                    {/* Business Proof Upload (Optional) */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Business Proof Document (Optional)
                        </label>
                        
                        {!businessProof ? (
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
                                <input
                                    type="file"
                                    id="business_proof"
                                    accept="image/*,.pdf"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    disabled={submitting || success}
                                />
                                <label
                                    htmlFor="business_proof"
                                    className="cursor-pointer flex flex-col items-center space-y-2"
                                >
                                    <Upload className="w-10 h-10 text-gray-400" />
                                    <span className="text-sm text-gray-600">
                                        Click to upload business document
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        PNG, JPG, PDF up to 10MB
                                    </span>
                                </label>
                            </div>
                        ) : (
                            <div className="border border-gray-300 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        {businessProofPreview ? (
                                            <img
                                                src={businessProofPreview}
                                                alt="Business proof preview"
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                                                <Upload className="w-6 h-6 text-gray-400" />
                                            </div>
                                        )}
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">
                                                {businessProof.name}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                {(businessProof.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={removeFile}
                                        className="text-red-500 hover:text-red-700 transition-colors"
                                        disabled={submitting || success}
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}
                        <p className="text-xs text-slate-500 mt-2">
                            Upload GST certificate, business license, or company registration
                            document (optional but recommended)
                        </p>
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={submitting || success}
                            className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting || success}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Submitting...</span>
                                </>
                            ) : success ? (
                                <>
                                    <CheckCircle2 className="w-5 h-5" />
                                    <span>Submitted</span>
                                </>
                            ) : (
                                <>
                                    <Building2 className="w-5 h-5" />
                                    <span>Submit Upgrade</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

