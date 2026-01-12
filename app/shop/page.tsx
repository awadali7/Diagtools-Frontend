"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Download, Package, Star, Search, Truck, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { productsApi } from "@/lib/api/products";
import type { Product } from "@/lib/api/types";
import CascadingCategoryFilter from "@/components/shop/CascadingCategoryFilter";

type ProductType = "physical" | "digital";
type DigitalFileFormat = "zip" | "rar";

type ShopProduct = {
    id: string;
    name: string;
    slug: string;
    price: number;
    image: string;
    category: string;
    categories?: string[];
    type: ProductType;
    rating: number;
    reviews: number;
    inStock?: boolean; // physical only
    digitalFile?: {
        format?: DigitalFileFormat;
        filename?: string;
    };
};

const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&h=400&fit=crop";

function mapApiProductToShopProduct(p: Product): ShopProduct {
    return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        price: Number(p.price),
        image: p.cover_image || FALLBACK_IMAGE,
        category: p.category || "Other",
        categories: p.categories || [],
        type: p.type,
        rating: Number(p.rating ?? 0),
        reviews: Number(p.reviews_count ?? 0),
        inStock:
            p.type === "digital"
                ? true
                : p.in_stock ?? (p.stock_quantity ?? 0) > 0,
        digitalFile:
            p.type === "digital"
                ? {
                      format: p.digital_file_format || undefined,
                      filename: p.digital_file_name || undefined,
                  }
                : undefined,
    };
}

export default function ShopPage() {
    const [products, setProducts] = useState<ShopProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategoryPath, setSelectedCategoryPath] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const { addToCart, setIsOpen } = useCart();

    const normalizedQuery = searchQuery.trim().toLowerCase();

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                setLoading(true);
                setError(null);
                const resp = await productsApi.list();
                if (!mounted) return;
                const list = Array.isArray(resp.data) ? resp.data : [];
                setProducts(list.map(mapApiProductToShopProduct));
            } catch (e: any) {
                if (!mounted) return;
                setError(e?.message || "Failed to load products");
            } finally {
                if (!mounted) return;
                setLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, []);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            // Category Path Filtering - Check if product's category path starts with selected path
            const matchesCategory =
                selectedCategoryPath.length === 0 ||
                (() => {
                    const productCats = product.categories || (product.category ? [product.category] : []);
                    // Check if the product's category path starts with the selected path
                    return selectedCategoryPath.every((selectedCat, index) => 
                        productCats[index] === selectedCat
                    );
                })();
            
            // Search in name or any of the categories
            const matchesSearch =
                normalizedQuery.length === 0 ||
                product.name.toLowerCase().includes(normalizedQuery) ||
                (product.categories && Array.isArray(product.categories)
                    ? product.categories.some(cat => cat.toLowerCase().includes(normalizedQuery))
                    : product.category?.toLowerCase().includes(normalizedQuery));
            
            return matchesCategory && matchesSearch;
        });
    }, [normalizedQuery, products, selectedCategoryPath]);

    const handleAddToCart = (product: ShopProduct) => {
        const isPhysicalInStock =
            product.type !== "physical" ? true : !!product.inStock;
        if (!isPhysicalInStock) return;

        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            type: product.type,
            quantity: 1,
            slug: product.slug,
        });
        
        // Open the cart drawer
        setIsOpen(true);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-5 flex items-center justify-between gap-4">
                <h1 className="text-3xl font-bold text-slate-900">Shop</h1>
                <div className="text-sm text-gray-500 whitespace-nowrap">
                    {filteredProducts.length}{" "}
                    {filteredProducts.length === 1 ? "item" : "items"}
                </div>
            </div>

            {/* Search and Filters - Minimal Single Row */}
            <div className="mb-6 flex flex-col lg:flex-row gap-4 items-start lg:items-center border-b border-gray-200 pb-4">
                {/* Search Bar - Minimal */}
                <div className="relative flex-1 lg:max-w-xs">
                    <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="search"
                        placeholder="Search…"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-10 pl-6 pr-6 text-sm bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:border-[#B00000] transition-colors"
                    />
                    {searchQuery.trim().length > 0 && (
                        <button
                            type="button"
                            onClick={() => setSearchQuery("")}
                            className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
                            aria-label="Clear search"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>

                {/* Divider - Desktop only */}
                <div className="hidden lg:block h-8 w-px bg-gray-200"></div>

                {/* Cascading Category Filter - Minimal */}
                <div className="flex-1">
                    <CascadingCategoryFilter
                        products={products}
                        onFilterChange={setSelectedCategoryPath}
                    />
                </div>
            </div>

            {/* Products Grid */}
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            )}

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse"
                        >
                            <div className="h-48 w-full bg-gray-100" />
                            <div className="p-5 space-y-3">
                                <div className="h-4 w-28 bg-gray-100 rounded" />
                                <div className="h-5 w-3/4 bg-gray-100 rounded" />
                                <div className="h-4 w-24 bg-gray-100 rounded" />
                                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                    <div className="h-6 w-24 bg-gray-100 rounded" />
                                    <div className="h-9 w-28 bg-gray-100 rounded-lg" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : filteredProducts.length === 0 ? (
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
                                {/* Product Title First */}
                                <Link href={`/shop/${product.slug}`}>
                                    <h3 className="text-lg font-semibold text-slate-900 mb-3 line-clamp-2 group-hover:text-[#B00000] transition-colors">
                                        {product.name}
                                    </h3>
                                </Link>

                                {/* Category Breadcrumb & Type Badge Row */}
                                <div className="mb-3 flex items-center justify-between gap-2">
                                    {/* Category Breadcrumb Path */}
                                    <div className="flex items-center gap-1.5 flex-1 min-w-0 text-xs">
                                        {(product.categories && product.categories.length > 0 
                                            ? product.categories 
                                            : product.category ? [product.category] : ["Uncategorized"]
                                        ).filter(cat => cat && cat.trim()).map((cat, idx, arr) => (
                                            <React.Fragment key={idx}>
                                                <span 
                                                    className="text-[#B00000] font-medium hover:underline cursor-pointer truncate"
                                                    title={cat}
                                                >
                                                    {cat}
                                                </span>
                                                {idx < arr.length - 1 && (
                                                    <span className="text-gray-400 font-light">›</span>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                    
                                    {/* Product Type Badge */}
                                    <span
                                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border shrink-0 ${
                                            product.type === "digital"
                                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                                : "bg-emerald-50 text-emerald-700 border-emerald-200"
                                        }`}
                                    >
                                        {product.type === "digital" ? (
                                            <Download className="w-3 h-3" />
                                        ) : (
                                            <Truck className="w-3 h-3" />
                                        )}
                                        {product.type === "digital"
                                            ? `${
                                                  product.digitalFile?.format?.toUpperCase() ||
                                                  "DIGITAL"
                                              }`
                                            : "PHYSICAL"}
                                    </span>
                                </div>

                                {/* Price and Add to Cart */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div>
                                        <p className="text-xl font-bold text-[#B00000]">
                                            ₹{product.price.toLocaleString()}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {product.type === "digital"
                                                ? "Instant download after purchase"
                                                : product.inStock
                                                ? "In Stock"
                                                : "Out of Stock"}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        disabled={
                                            product.type === "physical" &&
                                            !product.inStock
                                        }
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
