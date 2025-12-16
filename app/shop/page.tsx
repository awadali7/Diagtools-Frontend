"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Package, Star, Search, Filter } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

// Mock product data - Replace with API call later
const mockProducts = [
    {
        id: "1",
        name: "Professional OBD-II Scanner",
        slug: "obd-ii-scanner",
        price: 12999,
        image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop",
        category: "Diagnostic Tools",
        type: "physical" as const,
        rating: 4.5,
        reviews: 24,
        inStock: true,
    },
    {
        id: "2",
        name: "Key Programming Tool Kit",
        slug: "key-programming-kit",
        price: 8999,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
        category: "Key Programming Tools",
        type: "physical" as const,
        rating: 4.6,
        reviews: 18,
        inStock: true,
    },
    {
        id: "3",
        name: "ECM Programming Device",
        slug: "ecm-programming-device",
        price: 15999,
        image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&h=400&fit=crop",
        category: "ECM Tools",
        type: "physical" as const,
        rating: 4.9,
        reviews: 32,
        inStock: true,
    },
    {
        id: "4",
        name: "ADAS Calibration Equipment",
        slug: "adas-calibration-equipment",
        price: 24999,
        image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&h=400&fit=crop",
        category: "ADAS Equipment",
        type: "physical" as const,
        rating: 4.7,
        reviews: 21,
        inStock: true,
    },
    {
        id: "5",
        name: "IMMO Programming Tool",
        slug: "immo-programming-tool",
        price: 11999,
        image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&h=400&fit=crop",
        category: "IMMO Tools",
        type: "physical" as const,
        rating: 4.8,
        reviews: 28,
        inStock: true,
    },
    {
        id: "6",
        name: "Meter Calibration Device",
        slug: "meter-calibration-device",
        price: 6999,
        image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop",
        category: "Calibration Tools",
        type: "physical" as const,
        rating: 4.6,
        reviews: 15,
        inStock: true,
    },
    {
        id: "7",
        name: "EV Diagnostic Scanner",
        slug: "ev-diagnostic-scanner",
        price: 18999,
        image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&h=400&fit=crop",
        category: "EV Tools",
        type: "physical" as const,
        rating: 4.9,
        reviews: 19,
        inStock: true,
    },
    {
        id: "8",
        name: "TPMS Service Tool",
        slug: "tpms-service-tool",
        price: 5499,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
        category: "TPMS Tools",
        type: "physical" as const,
        rating: 4.5,
        reviews: 22,
        inStock: true,
    },
];

const categories = [
    "All",
    "Diagnostic Tools",
    "Key Programming Tools",
    "ECM Tools",
    "ADAS Equipment",
    "IMMO Tools",
    "Calibration Tools",
    "EV Tools",
    "TPMS Tools",
];

export default function ShopPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const { addToCart } = useCart();

    const filteredProducts = mockProducts.filter((product) => {
        const matchesCategory =
            selectedCategory === "All" || product.category === selectedCategory;
        const matchesSearch =
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleAddToCart = (product: (typeof mockProducts)[0]) => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            type: product.type,
            quantity: 1,
            slug: product.slug,
        });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Shop</h1>
                <p className="text-slate-600">
                    Professional diagnostic tools and equipment for automotive
                    professionals
                </p>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B00000] focus:border-transparent"
                    />
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap items-center gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                selectedCategory === category
                                    ? "bg-[#B00000] text-white"
                                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No products found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 group"
                        >
                            {/* Product Image */}
                            <Link href={`/shop/${product.slug}`}>
                                <div className="h-48 w-full overflow-hidden bg-gray-100">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            </Link>

                            {/* Product Info */}
                            <div className="p-5">
                                <div className="mb-2">
                                    <span className="text-xs text-gray-500">
                                        {product.category}
                                    </span>
                                </div>
                                <Link href={`/shop/${product.slug}`}>
                                    <h3 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-[#B00000] transition-colors">
                                        {product.name}
                                    </h3>
                                </Link>

                                {/* Rating */}
                                <div className="flex items-center space-x-1 mb-3">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm text-gray-600">
                                        {product.rating} ({product.reviews})
                                    </span>
                                </div>

                                {/* Price and Add to Cart */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div>
                                        <p className="text-xl font-bold text-[#B00000]">
                                            ₹{product.price.toLocaleString()}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {product.inStock
                                                ? "In Stock"
                                                : "Out of Stock"}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        disabled={!product.inStock}
                                        className="px-4 py-2 bg-[#B00000] text-white rounded-lg text-sm font-medium hover:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
