"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Upload, X, CheckCircle2, AlertCircle, Loader2, Plus } from "lucide-react";
import { productKycApi } from "@/lib/api/product-kyc";
import { useAuth } from "@/contexts/AuthContext";
import type { ProductKYCVerification } from "@/lib/api/types";

function ProductKYCContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user } = useAuth();
    const redirectPath = searchParams.get("redirect");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [kycData, setKycData] = useState<ProductKYCVerification | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    // Form fields
    const [formData, setFormData] = useState({
        full_name: "",
        address: "",
        contact_number: "",
        whatsapp_number: "",
    });

    // File states
    const [idProofFiles, setIdProofFiles] = useState<File[]>([]);
    const [idProofPreviews, setIdProofPreviews] = useState<Array<{ file: File | null; preview: string }>>([]);
    const [businessProofFiles, setBusinessProofFiles] = useState<File[]>([]);
    const [businessProofPreviews, setBusinessProofPreviews] = useState<Array<{ file: File | null; preview: string }>>([]);

    // Redirect if not authenticated
    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    // Fetch existing Product KYC data
    useEffect(() => {
        const fetchProductKYC = async () => {
            if (!user) return;

            try {
                setLoading(true);
                const response = await productKycApi.getMyProductKYC();

                if (response.success && response.data) {
                    setKycData(response.data);
                    setFormData({
                        full_name: response.data.full_name || "",
                        address: response.data.address || "",
                        contact_number: response.data.contact_number || "",
                        whatsapp_number: response.data.whatsapp_number || "",
                    });

                    // Set preview URLs if files exist
                    if (response.data.id_proofs && response.data.id_proofs.length > 0) {
                        const baseUrl =
                            process.env.NEXT_PUBLIC_API_URL ||
                            "http://localhost:5001";
                        const cleanBaseUrl = baseUrl.replace(/\/api$/, "");
                        setIdProofPreviews(
                            response.data.id_proofs.map((url: string) => ({
                                file: null,
                                preview: `${cleanBaseUrl}${url}`
                            }))
                        );
                    }
                    
                    if (response.data.business_proofs && response.data.business_proofs.length > 0) {
                        const baseUrl =
                            process.env.NEXT_PUBLIC_API_URL ||
                            "http://localhost:5001";
                        const cleanBaseUrl = baseUrl.replace(/\/api$/, "");
                        setBusinessProofPreviews(
                            response.data.business_proofs.map((url: string) => ({
                                file: null,
                                preview: `${cleanBaseUrl}${url}`
                            }))
                        );
                    }
                }
            } catch (err: any) {
                console.error("Failed to fetch Product KYC:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProductKYC();
    }, [user]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleIdProofChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            const allowedTypes = [
                "image/jpeg",
                "image/jpg",
                "image/png",
                "image/webp",
                "application/pdf",
            ];

            for (const file of files) {
                if (!allowedTypes.includes(file.type)) {
                    setError(
                        "Invalid file type. Only JPEG, PNG, WebP images and PDF files are allowed."
                    );
                    return;
                }

                if (file.size > 10 * 1024 * 1024) {
                    setError("File size must be less than 10MB per file");
                    return;
                }
            }

            const newFiles = [...idProofFiles, ...files];
            setIdProofFiles(newFiles);
            setError(null);

            files.forEach((file) => {
                if (file.type.startsWith("image/")) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setIdProofPreviews((prev) => [
                            ...prev,
                            { file, preview: reader.result as string },
                        ]);
                    };
                    reader.readAsDataURL(file);
                } else {
                    setIdProofPreviews((prev) => [
                        ...prev,
                        { file, preview: "" },
                    ]);
                }
            });
        }
        e.target.value = "";
    };

    const handleBusinessProofChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            const allowedTypes = [
                "image/jpeg",
                "image/jpg",
                "image/png",
                "image/webp",
                "application/pdf",
            ];

            for (const file of files) {
                if (!allowedTypes.includes(file.type)) {
                    setError(
                        "Invalid file type. Only JPEG, PNG, WebP images and PDF files are allowed."
                    );
                    return;
                }

                if (file.size > 10 * 1024 * 1024) {
                    setError("File size must be less than 10MB per file");
                    return;
                }
            }

            const newFiles = [...businessProofFiles, ...files];
            setBusinessProofFiles(newFiles);
            setError(null);

            files.forEach((file) => {
                if (file.type.startsWith("image/")) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setBusinessProofPreviews((prev) => [
                            ...prev,
                            { file, preview: reader.result as string },
                        ]);
                    };
                    reader.readAsDataURL(file);
                } else {
                    setBusinessProofPreviews((prev) => [
                        ...prev,
                        { file, preview: "" },
                    ]);
                }
            });
        }
        e.target.value = "";
    };

    const removeIdProof = (index: number) => {
        setIdProofFiles((prev) => prev.filter((_, i) => i !== index));
        setIdProofPreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const removeBusinessProof = (index: number) => {
        setBusinessProofFiles((prev) => prev.filter((_, i) => i !== index));
        setBusinessProofPreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        // Validation
        if (
            !formData.full_name ||
            !formData.address ||
            !formData.contact_number ||
            !formData.whatsapp_number
        ) {
            setError("All fields are required");
            return;
        }

        // Check if files are provided (either new files or existing KYC)
        if (idProofFiles.length < 2 && (!kycData?.id_proofs || kycData.id_proofs.length < 2)) {
            setError("At least 2 ID proof documents are required");
            return;
        }

        setSubmitting(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("full_name", formData.full_name);
            formDataToSend.append("address", formData.address);
            formDataToSend.append("contact_number", formData.contact_number);
            formDataToSend.append("whatsapp_number", formData.whatsapp_number);

            idProofFiles.forEach((file) => {
                formDataToSend.append("id_proofs", file);
            });
            
            businessProofFiles.forEach((file) => {
                formDataToSend.append("business_proofs", file);
            });

            const response = await productKycApi.submit(formDataToSend);

            if (response.success) {
                setSuccess(true);
                setKycData(response.data || null);
                
                // Refresh KYC data
                const kycResponse = await productKycApi.getMyProductKYC();
                if (kycResponse.success && kycResponse.data) {
                    setKycData(kycResponse.data);
                }

                // Redirect after short delay if redirect path is provided
                if (redirectPath) {
                    setTimeout(() => {
                        router.push(redirectPath);
                    }, 2000);
                }
            } else {
                setError(
                    response.message ||
                        "Failed to submit Product KYC. Please try again."
                );
            }
        } catch (err: any) {
            setError(
                err.message ||
                    "Failed to submit Product KYC. Please check your connection and try again."
            );
        } finally {
            setSubmitting(false);
        }
    };

    if (!user) {
        return null;
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[#B00000]" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-slate-900 flex items-center">
                    Product KYC Verification
                </h1>
                <p className="text-sm text-slate-600 mt-2">
                    Complete your Product KYC verification to purchase products that require it
                </p>
            </div>

            {/* Status Banner */}
            {kycData && (
                <div
                    className={`mb-8 p-4 rounded-lg ${
                        kycData.status === "verified"
                            ? "bg-green-50 border border-green-200"
                            : kycData.status === "rejected"
                            ? "bg-red-50 border border-red-200"
                            : "bg-yellow-50 border border-yellow-200"
                    }`}
                >
                    <div className="flex items-start space-x-3">
                        {kycData.status === "verified" ? (
                            <CheckCircle2 className="w-6 h-6 text-green-600 mt-0.5" />
                        ) : kycData.status === "rejected" ? (
                            <AlertCircle className="w-6 h-6 text-red-600 mt-0.5" />
                        ) : (
                            <Loader2 className="w-6 h-6 text-yellow-600 mt-0.5 animate-spin" />
                        )}
                        <div className="flex-1">
                            <h3
                                className={`font-semibold ${
                                    kycData.status === "verified"
                                        ? "text-green-800"
                                        : kycData.status === "rejected"
                                        ? "text-red-800"
                                        : "text-yellow-800"
                                }`}
                            >
                                Status: {kycData.status.toUpperCase()}
                            </h3>
                            {kycData.status === "verified" && (
                                <p className="text-green-700 text-sm mt-1">
                                    Your Product KYC has been verified. You can
                                    now purchase products that require KYC.
                                </p>
                            )}
                            {kycData.status === "rejected" &&
                                kycData.rejection_reason && (
                                    <p className="text-red-700 text-sm mt-1">
                                        <strong>Reason:</strong>{" "}
                                        {kycData.rejection_reason}
                                    </p>
                                )}
                            {kycData.status === "pending" && (
                                <p className="text-yellow-700 text-sm mt-1">
                                    Your Product KYC is under review. Please
                                    wait for admin approval.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Success Message */}
            {success && (
                <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                        <p className="text-green-800">
                            Product KYC information submitted successfully! Your
                            request is pending admin review.
                        </p>
                    </div>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                        <AlertCircle className="w-6 h-6 text-red-600" />
                        <p className="text-red-800">{error}</p>
                    </div>
                </div>
            )}

            {/* KYC Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">
                        Personal Information
                    </h2>

                    <div className="grid grid-cols-1 gap-6">
                        {/* Full Name */}
                        <div>
                            <label
                                htmlFor="full_name"
                                className="block text-sm font-medium text-slate-700 mb-2"
                            >
                                Full Name{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="full_name"
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B00000] focus:border-transparent outline-none"
                                disabled={kycData?.status === "verified"}
                            />
                        </div>

                        {/* Address */}
                        <div>
                            <label
                                htmlFor="address"
                                className="block text-sm font-medium text-slate-700 mb-2"
                            >
                                Address{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B00000] focus:border-transparent outline-none"
                                disabled={kycData?.status === "verified"}
                            />
                        </div>

                        {/* Contact Number */}
                        <div>
                            <label
                                htmlFor="contact_number"
                                className="block text-sm font-medium text-slate-700 mb-2"
                            >
                                Contact Number{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                id="contact_number"
                                name="contact_number"
                                value={formData.contact_number}
                                onChange={handleInputChange}
                                required
                                placeholder="+91 1234567890"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B00000] focus:border-transparent outline-none"
                                disabled={kycData?.status === "verified"}
                            />
                        </div>

                        {/* WhatsApp Number */}
                        <div>
                            <label
                                htmlFor="whatsapp_number"
                                className="block text-sm font-medium text-slate-700 mb-2"
                            >
                                WhatsApp Number{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                id="whatsapp_number"
                                name="whatsapp_number"
                                value={formData.whatsapp_number}
                                onChange={handleInputChange}
                                required
                                placeholder="+91 1234567890"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B00000] focus:border-transparent outline-none"
                                disabled={kycData?.status === "verified"}
                            />
                        </div>
                    </div>
                </div>

                {/* ID Proof Upload */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">
                        ID Proof Documents
                    </h2>
                    <p className="text-sm text-slate-600 mb-4">
                        Upload at least 2 ID proof documents (Aadhaar, PAN card, Passport, Voter ID, etc.) 
                        in JPEG, PNG, WebP, or PDF format (Max 10MB per file).
                    </p>

                    {idProofPreviews.length > 0 ? (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {idProofPreviews.map((previewItem, index) => (
                                    <div key={index} className="relative">
                                        {previewItem.file?.type.startsWith("image/") ||
                                        (previewItem.preview &&
                                            !previewItem.preview.includes(".pdf")) ? (
                                            <img
                                                src={previewItem.preview}
                                                alt={`ID Proof ${index + 1}`}
                                                className="w-full h-48 object-cover rounded-lg border border-gray-300"
                                            />
                                        ) : (
                                            <div className="w-full h-48 p-8 border border-gray-300 rounded-lg bg-gray-50 flex flex-col items-center justify-center">
                                                <p className="text-center text-slate-600">
                                                    PDF File
                                                </p>
                                                <p className="text-center text-sm text-slate-500 mt-2">
                                                    {previewItem.file?.name}
                                                </p>
                                            </div>
                                        )}
                                        {kycData?.status !== "verified" && (
                                            <button
                                                type="button"
                                                onClick={() => removeIdProof(index)}
                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {kycData?.status !== "verified" && (
                                <div className="flex justify-center">
                                    <label
                                        htmlFor="id_proofs_add"
                                        className="flex items-center justify-center px-6 py-3 bg-white border-2 border-dashed border-[#B00000] rounded-lg cursor-pointer hover:bg-[#B00000] hover:text-white transition-all duration-200 group"
                                    >
                                        <Plus className="w-5 h-5 mr-2 text-[#B00000] group-hover:text-white transition-colors" />
                                        <span className="text-sm font-semibold text-[#B00000] group-hover:text-white transition-colors">
                                            Add More ID Proof Documents
                                        </span>
                                        <input
                                            id="id_proofs_add"
                                            type="file"
                                            className="hidden"
                                            accept="image/jpeg,image/jpg,image/png,image/webp,application/pdf"
                                            onChange={handleIdProofChange}
                                            multiple
                                        />
                                    </label>
                                </div>
                            )}
                        </div>
                    ) : (
                        <label
                            htmlFor="id_proofs"
                            className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                                kycData?.status === "verified"
                                    ? "border-gray-300 bg-gray-50 cursor-not-allowed"
                                    : "border-gray-300 hover:border-[#B00000] hover:bg-gray-50"
                            }`}
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-10 h-10 mb-3 text-gray-400" />
                                <p className="mb-2 text-sm text-gray-500">
                                    <span className="font-semibold">
                                        Click to upload
                                    </span>{" "}
                                    or drag and drop
                                </p>
                                <p className="text-xs text-gray-500">
                                    JPEG, PNG, WebP, or PDF (MAX. 10MB per file) - Minimum 2 files
                                </p>
                            </div>
                            <input
                                id="id_proofs"
                                type="file"
                                className="hidden"
                                accept="image/jpeg,image/jpg,image/png,image/webp,application/pdf"
                                onChange={handleIdProofChange}
                                multiple
                                disabled={kycData?.status === "verified"}
                            />
                        </label>
                    )}
                </div>

                {/* Business Proof Upload (Optional) */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6">
                        Business Proof Documents (Optional)
                    </h2>
                    <p className="text-sm text-slate-600 mb-4">
                        Upload business proof documents if applicable (GST certificate, Shop license, Company registration, etc.) 
                        in JPEG, PNG, WebP, or PDF format (Max 10MB per file).
                    </p>

                    {businessProofPreviews.length > 0 ? (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {businessProofPreviews.map((previewItem, index) => (
                                    <div key={index} className="relative">
                                        {previewItem.file?.type.startsWith("image/") ||
                                        (previewItem.preview &&
                                            !previewItem.preview.includes(".pdf")) ? (
                                            <img
                                                src={previewItem.preview}
                                                alt={`Business Proof ${index + 1}`}
                                                className="w-full h-48 object-cover rounded-lg border border-gray-300"
                                            />
                                        ) : (
                                            <div className="w-full h-48 p-8 border border-gray-300 rounded-lg bg-gray-50 flex flex-col items-center justify-center">
                                                <p className="text-center text-slate-600">
                                                    PDF File
                                                </p>
                                                <p className="text-center text-sm text-slate-500 mt-2">
                                                    {previewItem.file?.name}
                                                </p>
                                            </div>
                                        )}
                                        {kycData?.status !== "verified" && (
                                            <button
                                                type="button"
                                                onClick={() => removeBusinessProof(index)}
                                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {kycData?.status !== "verified" && (
                                <div className="flex justify-center">
                                    <label
                                        htmlFor="business_proofs_add"
                                        className="flex items-center justify-center px-6 py-3 bg-white border-2 border-dashed border-[#B00000] rounded-lg cursor-pointer hover:bg-[#B00000] hover:text-white transition-all duration-200 group"
                                    >
                                        <Plus className="w-5 h-5 mr-2 text-[#B00000] group-hover:text-white transition-colors" />
                                        <span className="text-sm font-semibold text-[#B00000] group-hover:text-white transition-colors">
                                            Add More Business Documents
                                        </span>
                                        <input
                                            id="business_proofs_add"
                                            type="file"
                                            className="hidden"
                                            accept="image/jpeg,image/jpg,image/png,image/webp,application/pdf"
                                            onChange={handleBusinessProofChange}
                                            multiple
                                        />
                                    </label>
                                </div>
                            )}
                        </div>
                    ) : (
                        <label
                            htmlFor="business_proofs"
                            className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                                kycData?.status === "verified"
                                    ? "border-gray-300 bg-gray-50 cursor-not-allowed"
                                    : "border-gray-300 hover:border-[#B00000] hover:bg-gray-50"
                            }`}
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-10 h-10 mb-3 text-gray-400" />
                                <p className="mb-2 text-sm text-gray-500">
                                    <span className="font-semibold">
                                        Click to upload
                                    </span>{" "}
                                    or drag and drop
                                </p>
                                <p className="text-xs text-gray-500">
                                    JPEG, PNG, WebP, or PDF (MAX. 10MB per file) - Optional
                                </p>
                            </div>
                            <input
                                id="business_proofs"
                                type="file"
                                className="hidden"
                                accept="image/jpeg,image/jpg,image/png,image/webp,application/pdf"
                                onChange={handleBusinessProofChange}
                                multiple
                                disabled={kycData?.status === "verified"}
                            />
                        </label>
                    )}
                </div>

                {/* Submit Button */}
                {kycData?.status !== "verified" && (
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-6 py-3 border border-gray-300 rounded-lg text-slate-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-6 py-3 bg-[#B00000] text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                        >
                            {submitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Submitting...</span>
                                </>
                            ) : (
                                <span>
                                    {kycData
                                        ? "Update Product KYC"
                                        : "Submit Product KYC"}
                                </span>
                            )}
                        </button>
                    </div>
                )}

                {kycData?.status === "verified" && (
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => router.push("/shop")}
                            className="px-6 py-3 bg-[#B00000] text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Browse Products
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}

export default function ProductKYCPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-white flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-[#B00000]" />
                </div>
            }
        >
            <ProductKYCContent />
        </Suspense>
    );
}

