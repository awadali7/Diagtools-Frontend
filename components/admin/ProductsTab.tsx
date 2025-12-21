"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Edit2, Plus, Trash2, X } from "lucide-react";
import { productsApi } from "@/lib/api/products";
import { adminApi } from "@/lib/api/admin";
import type { Product, ProductType, User } from "@/lib/api/types";
import { generateSlug } from "./utils";

type ProductFormState = {
    name: string;
    slug: string;
    category: string;
    description: string;
    product_type: ProductType;
    price: number;
    stock_quantity: number;
    is_active: boolean;
    cover_image: File | null;
    digital_file: File | null;
};

const defaultForm: ProductFormState = {
    name: "",
    slug: "",
    category: "",
    description: "",
    product_type: "physical",
    price: 0,
    stock_quantity: 0,
    is_active: true,
    cover_image: null,
    digital_file: null,
};

export const ProductsTab: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [products, setProducts] = useState<Product[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editing, setEditing] = useState<Product | null>(null);
    const [form, setForm] = useState<ProductFormState>(defaultForm);

    const [isGrantModalOpen, setIsGrantModalOpen] = useState(false);
    const [grantProduct, setGrantProduct] = useState<Product | null>(null);
    const [grantUsers, setGrantUsers] = useState<User[]>([]);
    const [grantUserId, setGrantUserId] = useState("");
    const [grantNote, setGrantNote] = useState("");
    const [grantLoading, setGrantLoading] = useState(false);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const resp = await productsApi.adminListAll();
            setProducts(Array.isArray(resp.data) ? resp.data : []);
        } catch (e: any) {
            setError(e?.message || "Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const openCreate = () => {
        setEditing(null);
        setForm(defaultForm);
        setIsModalOpen(true);
    };

    const openEdit = (p: Product) => {
        setEditing(p);
        setForm({
            name: p.name,
            slug: p.slug,
            category: p.category || "",
            description: p.description || "",
            product_type: p.type,
            price: Number(p.price || 0),
            stock_quantity: Number(p.stock_quantity || 0),
            is_active: p.is_active !== false,
            cover_image: null,
            digital_file: null,
        });
        setIsModalOpen(true);
    };

    const onNameChange = (val: string) => {
        setForm((prev) => ({
            ...prev,
            name: val,
            slug: prev.slug || generateSlug(val),
        }));
    };

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            setError(null);

            if (!form.name.trim()) throw new Error("Name is required");
            if (!form.slug.trim()) throw new Error("Slug is required");

            if (
                form.product_type === "digital" &&
                !editing &&
                !form.digital_file
            ) {
                throw new Error("Digital file (ZIP/RAR) is required");
            }

            if (!editing) {
                await productsApi.adminCreate({
                    name: form.name,
                    slug: form.slug,
                    description: form.description || undefined,
                    category: form.category || undefined,
                    product_type: form.product_type,
                    price: form.price,
                    stock_quantity: form.stock_quantity,
                    cover_image: form.cover_image,
                    digital_file: form.digital_file,
                });
            } else {
                await productsApi.adminUpdate(editing.id, {
                    name: form.name,
                    slug: form.slug,
                    description: form.description,
                    category: form.category,
                    product_type: form.product_type,
                    price: form.price,
                    stock_quantity: form.stock_quantity,
                    is_active: form.is_active,
                    cover_image: form.cover_image,
                    digital_file: form.digital_file,
                });
            }

            setIsModalOpen(false);
            setEditing(null);
            setForm(defaultForm);
            await fetchProducts();
        } catch (e: any) {
            setError(e?.message || "Failed to save product");
        } finally {
            setIsSubmitting(false);
        }
    };

    const deleteProduct = async (p: Product) => {
        if (!confirm(`Delete product "${p.name}"?`)) return;
        try {
            await productsApi.adminDelete(p.id);
            await fetchProducts();
        } catch (e: any) {
            alert(e?.message || "Failed to delete product");
        }
    };

    const openGrant = async (p: Product) => {
        setGrantProduct(p);
        setGrantUserId("");
        setGrantNote("");
        setIsGrantModalOpen(true);
        try {
            setGrantLoading(true);
            const resp = await adminApi.getAllUsers(1, 100);
            const users = (resp.data as any)?.users || resp.data;
            setGrantUsers(Array.isArray(users) ? users : []);
        } catch (e: any) {
            setGrantUsers([]);
        } finally {
            setGrantLoading(false);
        }
    };

    const submitGrant = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!grantProduct) return;
        try {
            setGrantLoading(true);
            if (!grantUserId) throw new Error("Select a user");
            await adminApi.grantProductEntitlement({
                user_id: grantUserId,
                product_id: grantProduct.id,
                note: grantNote || undefined,
            });
            setIsGrantModalOpen(false);
            setGrantProduct(null);
        } catch (e: any) {
            alert(e?.message || "Failed to grant product");
        } finally {
            setGrantLoading(false);
        }
    };

    const digitalProducts = useMemo(
        () => products.filter((p) => p.type === "digital"),
        [products]
    );

    return (
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                        Products
                    </h2>
                    <p className="text-sm text-gray-500">
                        Physical + Digital (ZIP/RAR)
                    </p>
                </div>
                <button
                    onClick={openCreate}
                    className="flex items-center space-x-2 px-4 py-2 bg-[#B00000] text-white rounded-lg hover:bg-red-800 transition-all duration-300 text-sm font-medium"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add Product</span>
                </button>
            </div>

            {error && (
                <div className="p-4 bg-red-50 border-b border-red-200">
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Product
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Category
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-6 py-10 text-center text-gray-500"
                                >
                                    Loading...
                                </td>
                            </tr>
                        ) : products.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-6 py-10 text-center text-gray-500"
                                >
                                    No products yet
                                </td>
                            </tr>
                        ) : (
                            products.map((p) => (
                                <tr key={p.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-slate-900">
                                            {p.name}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {p.slug}
                                        </div>
                                        {p.type === "digital" &&
                                            p.digital_file_name && (
                                                <div className="text-xs text-gray-500 mt-1">
                                                    File: {p.digital_file_name}
                                                </div>
                                            )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${
                                                p.type === "digital"
                                                    ? "bg-blue-50 text-blue-700 border-blue-200"
                                                    : "bg-emerald-50 text-emerald-700 border-emerald-200"
                                            }`}
                                        >
                                            {p.type.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {p.category || "-"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#B00000]">
                                        ₹{Number(p.price).toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {p.is_active === false
                                            ? "Inactive"
                                            : "Active"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end gap-2">
                                            {p.type === "digital" && (
                                                <button
                                                    onClick={() => openGrant(p)}
                                                    className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700"
                                                >
                                                    Grant
                                                </button>
                                            )}
                                            <button
                                                onClick={() => openEdit(p)}
                                                className="p-2 text-gray-500 hover:text-[#B00000] hover:bg-gray-100 rounded-lg transition-colors"
                                                aria-label="Edit"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => deleteProduct(p)}
                                                className="p-2 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
                                                aria-label="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Create/Edit Modal */}
            {isModalOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 z-50"
                        onClick={() => setIsModalOpen(false)}
                    />
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg shadow-xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
                                <h2 className="text-xl font-bold text-slate-900">
                                    {editing ? "Edit Product" : "Add Product"}
                                </h2>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    aria-label="Close modal"
                                >
                                    <X className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>

                            <form onSubmit={submit} className="p-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Name *
                                        </label>
                                        <input
                                            value={form.name}
                                            onChange={(e) =>
                                                onNameChange(e.target.value)
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B00000] focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Slug *
                                        </label>
                                        <input
                                            value={form.slug}
                                            onChange={(e) =>
                                                setForm((p) => ({
                                                    ...p,
                                                    slug: e.target.value,
                                                }))
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B00000] focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Type *
                                        </label>
                                        <select
                                            value={form.product_type}
                                            onChange={(e) =>
                                                setForm((p) => ({
                                                    ...p,
                                                    product_type: e.target
                                                        .value as ProductType,
                                                }))
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B00000] focus:border-transparent"
                                        >
                                            <option value="physical">
                                                Physical
                                            </option>
                                            <option value="digital">
                                                Digital
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Category
                                        </label>
                                        <input
                                            value={form.category}
                                            onChange={(e) =>
                                                setForm((p) => ({
                                                    ...p,
                                                    category: e.target.value,
                                                }))
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B00000] focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        value={form.description}
                                        onChange={(e) =>
                                            setForm((p) => ({
                                                ...p,
                                                description: e.target.value,
                                            }))
                                        }
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B00000] focus:border-transparent"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Price *
                                        </label>
                                        <input
                                            type="number"
                                            value={form.price}
                                            onChange={(e) =>
                                                setForm((p) => ({
                                                    ...p,
                                                    price: Number(
                                                        e.target.value
                                                    ),
                                                }))
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B00000] focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Stock (physical)
                                        </label>
                                        <input
                                            type="number"
                                            value={form.stock_quantity}
                                            onChange={(e) =>
                                                setForm((p) => ({
                                                    ...p,
                                                    stock_quantity: Number(
                                                        e.target.value
                                                    ),
                                                }))
                                            }
                                            disabled={
                                                form.product_type !== "physical"
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B00000] focus:border-transparent disabled:bg-gray-50"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Cover Image
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                setForm((p) => ({
                                                    ...p,
                                                    cover_image:
                                                        e.target.files?.[0] ||
                                                        null,
                                                }))
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#B00000] file:text-white hover:file:bg-red-800 file:cursor-pointer"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Digital File (ZIP/RAR)
                                        </label>
                                        <input
                                            type="file"
                                            accept=".zip,.rar"
                                            onChange={(e) =>
                                                setForm((p) => ({
                                                    ...p,
                                                    digital_file:
                                                        e.target.files?.[0] ||
                                                        null,
                                                }))
                                            }
                                            disabled={
                                                form.product_type !== "digital"
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#B00000] file:text-white hover:file:bg-red-800 file:cursor-pointer disabled:bg-gray-50"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                    <label className="inline-flex items-center gap-2 text-sm font-medium text-gray-700">
                                        <input
                                            type="checkbox"
                                            checked={form.is_active}
                                            onChange={(e) =>
                                                setForm((p) => ({
                                                    ...p,
                                                    is_active: e.target.checked,
                                                }))
                                            }
                                            className="w-4 h-4 text-[#B00000] border-gray-300 rounded focus:ring-[#B00000]"
                                        />
                                        Active
                                    </label>

                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setIsModalOpen(false)
                                            }
                                            className="px-4 py-2 border border-gray-300 text-slate-900 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="px-4 py-2 bg-[#B00000] text-white rounded-lg font-medium hover:bg-red-800 transition-colors disabled:opacity-60"
                                        >
                                            {isSubmitting
                                                ? "Saving..."
                                                : editing
                                                ? "Save"
                                                : "Create"}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}

            {/* Grant Modal */}
            {isGrantModalOpen && grantProduct && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 z-50"
                        onClick={() => setIsGrantModalOpen(false)}
                    />
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
                            <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                <h2 className="text-xl font-bold text-slate-900">
                                    Grant “{grantProduct.name}”
                                </h2>
                                <button
                                    onClick={() => setIsGrantModalOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    aria-label="Close modal"
                                >
                                    <X className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                            <form
                                onSubmit={submitGrant}
                                className="p-6 space-y-4"
                            >
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        User *
                                    </label>
                                    <select
                                        value={grantUserId}
                                        onChange={(e) =>
                                            setGrantUserId(e.target.value)
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B00000] focus:border-transparent"
                                    >
                                        <option value="">
                                            {grantLoading
                                                ? "Loading users..."
                                                : "Select user"}
                                        </option>
                                        {grantUsers.map((u) => (
                                            <option key={u.id} value={u.id}>
                                                {u.email} ({u.first_name}{" "}
                                                {u.last_name})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Note (optional)
                                    </label>
                                    <input
                                        value={grantNote}
                                        onChange={(e) =>
                                            setGrantNote(e.target.value)
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B00000] focus:border-transparent"
                                    />
                                </div>
                                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setIsGrantModalOpen(false)
                                        }
                                        className="px-4 py-2 border border-gray-300 text-slate-900 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={grantLoading}
                                        className="px-4 py-2 bg-[#B00000] text-white rounded-lg font-medium hover:bg-red-800 transition-colors disabled:opacity-60"
                                    >
                                        Grant Access
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
