"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    Star,
    ShoppingCart,
    Package,
    Download,
    Play,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";

// Mock product data - Replace with API call later
const getProductBySlug = (slug: string) => {
    const products = [
        {
            id: "1",
            name: "Professional OBD-II Scanner",
            slug: "obd-ii-scanner",
            price: 12999,
            image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop",
            category: "Diagnostic Tools",
            type: "physical" as const,
            rating: 4.5,
            reviews: 24,
            inStock: true,
            description:
                "Professional-grade OBD-II scanner with advanced diagnostic capabilities. Compatible with all vehicles manufactured after 1996. Features include real-time data streaming, freeze frame data, and comprehensive code reading.",
            specifications: [
                "Compatible with OBD-II protocols",
                "Real-time data streaming",
                "Freeze frame data capture",
                "Code reading and clearing",
                "Works with all vehicles post-1996",
            ],
            features: [
                "Large color display",
                "Wireless connectivity",
                "Regular firmware updates",
                "1-year warranty",
            ],
        },
        {
            id: "2",
            name: "Key Programming Tool Kit",
            slug: "key-programming-kit",
            price: 8999,
            image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
            category: "Key Programming Tools",
            type: "physical" as const,
            rating: 4.6,
            reviews: 18,
            inStock: true,
            description:
                "Complete key programming tool kit for automotive key cutting and programming. Includes all necessary tools and software for modern vehicle key programming.",
            specifications: [
                "Universal key programmer",
                "Key cutting machine",
                "Software included",
                "Compatible with major brands",
            ],
            features: [
                "Easy to use interface",
                "Regular software updates",
                "Technical support",
                "6-month warranty",
            ],
        },
        {
            id: "3",
            name: "ECM Programming Device",
            slug: "ecm-programming-device",
            price: 15999,
            image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop",
            category: "ECM Tools",
            type: "physical" as const,
            rating: 4.9,
            reviews: 32,
            inStock: true,
            description:
                "Advanced ECM (Engine Control Module) programming device for reading, writing, and repairing engine control modules. Supports multiple vehicle makes and models.",
            specifications: [
                "Multi-protocol support",
                "High-speed programming",
                "Backup and restore functions",
                "Compatible with 1000+ ECM models",
            ],
            features: [
                "User-friendly software",
                "Regular database updates",
                "Expert technical support",
                "1-year warranty",
            ],
        },
        {
            id: "4",
            name: "ADAS Calibration Equipment",
            slug: "adas-calibration-equipment",
            price: 24999,
            image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&h=600&fit=crop",
            category: "ADAS Equipment",
            type: "physical" as const,
            rating: 4.7,
            reviews: 21,
            inStock: true,
            description:
                "Professional ADAS (Advanced Driver Assistance Systems) calibration equipment for accurate sensor alignment and calibration. Essential for modern vehicle service.",
            specifications: [
                "Laser alignment system",
                "Target boards included",
                "Software calibration tools",
                "Works with all ADAS systems",
            ],
            features: [
                "Precision calibration",
                "Step-by-step guidance",
                "Regular updates",
                "2-year warranty",
            ],
        },
        {
            id: "5",
            name: "IMMO Programming Tool",
            slug: "immo-programming-tool",
            price: 11999,
            image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop",
            category: "IMMO Tools",
            type: "physical" as const,
            rating: 4.8,
            reviews: 28,
            inStock: true,
            description:
                "Immobilizer (IMMO) programming tool for key programming and immobilizer system management. Supports various vehicle brands and models.",
            specifications: [
                "IMMO code reading",
                "Key programming",
                "ECU programming",
                "Multi-brand support",
            ],
            features: [
                "Easy operation",
                "Regular updates",
                "Technical support",
                "1-year warranty",
            ],
        },
        {
            id: "6",
            name: "Meter Calibration Device",
            slug: "meter-calibration-device",
            price: 6999,
            image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop",
            category: "Calibration Tools",
            type: "physical" as const,
            rating: 4.6,
            reviews: 15,
            inStock: true,
            description:
                "Precision meter calibration device for speedometer, odometer, and other vehicle meter calibration. Ensures accurate readings and compliance.",
            specifications: [
                "Multi-meter support",
                "High precision",
                "Easy calibration process",
                "Portable design",
            ],
            features: [
                "User-friendly interface",
                "Regular updates",
                "Support included",
                "6-month warranty",
            ],
        },
    ];
    return products.find((p) => p.slug === slug);
};

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const product = getProductBySlug(slug);
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-red-600">Product not found</p>
                </div>
                <Link
                    href="/shop"
                    className="inline-flex items-center text-[#B00000] hover:underline text-sm"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Shop
                </Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            type: product.type,
            quantity: quantity,
            slug: product.slug,
        });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Back Button */}
            <Link
                href="/shop"
                className="inline-flex items-center text-gray-600 hover:text-[#B00000] mb-6 transition-colors text-sm"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Shop
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-96 object-cover"
                    />
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <div>
                        <span className="text-sm text-gray-500">
                            {product.category}
                        </span>
                        <h1 className="text-3xl font-bold text-slate-900 mt-2 mb-4">
                            {product.name}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${
                                            i < Math.floor(product.rating)
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-gray-300"
                                        }`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-gray-600">
                                {product.rating} ({product.reviews} reviews)
                            </span>
                        </div>

                        {/* Price */}
                        <div className="mb-6">
                            <p className="text-4xl font-bold text-[#B00000]">
                                ₹{product.price.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                {product.inStock
                                    ? "In Stock - Ready to Ship"
                                    : "Out of Stock"}
                            </p>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 leading-relaxed mb-6">
                            {product.description}
                        </p>

                        {/* Quantity */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Quantity
                            </label>
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() =>
                                        setQuantity(Math.max(1, quantity - 1))
                                    }
                                    className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    -
                                </button>
                                <span className="w-12 text-center font-medium">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            disabled={!product.inStock}
                            className="w-full px-6 py-3 bg-[#B00000] text-white rounded-lg font-medium hover:bg-red-800 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            <span>
                                {product.inStock
                                    ? "Add to Cart"
                                    : "Out of Stock"}
                            </span>
                        </button>

                        {/* Stock Status */}
                        <div className="pt-4 border-t border-gray-200">
                            <div className="flex items-center space-x-2">
                                {product.inStock ? (
                                    <>
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        <span className="text-sm text-gray-600">
                                            In Stock
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <span className="text-sm text-gray-600">
                                            Out of Stock
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Specifications and Features */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Specifications */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-slate-900 mb-4">
                        Specifications
                    </h2>
                    <ul className="space-y-2">
                        {product.specifications.map((spec, index) => (
                            <li
                                key={index}
                                className="flex items-start space-x-2"
                            >
                                <Package className="w-5 h-5 text-[#B00000] mt-0.5 shrink-0" />
                                <span className="text-gray-600">{spec}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Features */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h2 className="text-xl font-semibold text-slate-900 mb-4">
                        Features
                    </h2>
                    <ul className="space-y-2">
                        {product.features.map((feature, index) => (
                            <li
                                key={index}
                                className="flex items-start space-x-2"
                            >
                                <Star className="w-5 h-5 text-[#B00000] mt-0.5 shrink-0" />
                                <span className="text-gray-600">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
