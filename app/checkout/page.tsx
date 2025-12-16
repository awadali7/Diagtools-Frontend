"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CreditCard, MapPin, Package } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import LoginDrawer from "@/components/LoginDrawer";
import RegisterDrawer from "@/components/RegisterDrawer";

export default function CheckoutPage() {
    const router = useRouter();
    const { items, getTotalPrice, clearCart } = useCart();
    const { isAuth, user } = useAuth();
    const [isLoginDrawerOpen, setIsLoginDrawerOpen] = useState(false);
    const [isRegisterDrawerOpen, setIsRegisterDrawerOpen] = useState(false);

    const [formData, setFormData] = useState({
        firstName: user?.first_name || "",
        lastName: user?.last_name || "",
        email: user?.email || "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        paymentMethod: "card",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    // Check if cart is empty
    if (items.length === 0) {
        return (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">
                        Your cart is empty
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Add some products to your cart to continue
                    </p>
                    <Link
                        href="/shop"
                        className="inline-flex items-center px-6 py-3 bg-[#B00000] text-white rounded-lg font-medium hover:bg-red-800 transition-colors"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error for this field
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required";
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required";
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email address";
        }
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        }
        if (!formData.address.trim()) {
            newErrors.address = "Address is required";
        }
        if (!formData.city.trim()) {
            newErrors.city = "City is required";
        }
        if (!formData.state.trim()) {
            newErrors.state = "State is required";
        }
        if (!formData.pincode.trim()) {
            newErrors.pincode = "Pincode is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isAuth) {
            setIsLoginDrawerOpen(true);
            return;
        }

        if (!validateForm()) {
            return;
        }

        // TODO: Integrate with payment gateway
        // For now, just show success message
        alert(
            "Order placed successfully! (This is a demo - integrate payment gateway)"
        );
        clearCart();
        router.push("/");
    };

    const shippingCost = items.some((item) => item.type === "physical")
        ? 200
        : 0;
    const subtotal = getTotalPrice();
    const total = subtotal + shippingCost;

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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Checkout Form */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Shipping Address */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="flex items-center space-x-2 mb-4">
                            <MapPin className="w-5 h-5 text-[#B00000]" />
                            <h2 className="text-xl font-semibold text-slate-900">
                                Shipping Address
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        First Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#B00000] focus:border-transparent ${
                                            errors.firstName
                                                ? "border-red-300"
                                                : "border-gray-300"
                                        }`}
                                    />
                                    {errors.firstName && (
                                        <p className="text-xs text-red-600 mt-1">
                                            {errors.firstName}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Last Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#B00000] focus:border-transparent ${
                                            errors.lastName
                                                ? "border-red-300"
                                                : "border-gray-300"
                                        }`}
                                    />
                                    {errors.lastName && (
                                        <p className="text-xs text-red-600 mt-1">
                                            {errors.lastName}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#B00000] focus:border-transparent ${
                                        errors.email
                                            ? "border-red-300"
                                            : "border-gray-300"
                                    }`}
                                />
                                {errors.email && (
                                    <p className="text-xs text-red-600 mt-1">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#B00000] focus:border-transparent ${
                                        errors.phone
                                            ? "border-red-300"
                                            : "border-gray-300"
                                    }`}
                                />
                                {errors.phone && (
                                    <p className="text-xs text-red-600 mt-1">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Address *
                                </label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#B00000] focus:border-transparent ${
                                        errors.address
                                            ? "border-red-300"
                                            : "border-gray-300"
                                    }`}
                                />
                                {errors.address && (
                                    <p className="text-xs text-red-600 mt-1">
                                        {errors.address}
                                    </p>
                                )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        City *
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#B00000] focus:border-transparent ${
                                            errors.city
                                                ? "border-red-300"
                                                : "border-gray-300"
                                        }`}
                                    />
                                    {errors.city && (
                                        <p className="text-xs text-red-600 mt-1">
                                            {errors.city}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        State *
                                    </label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#B00000] focus:border-transparent ${
                                            errors.state
                                                ? "border-red-300"
                                                : "border-gray-300"
                                        }`}
                                    />
                                    {errors.state && (
                                        <p className="text-xs text-red-600 mt-1">
                                            {errors.state}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Pincode *
                                    </label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#B00000] focus:border-transparent ${
                                            errors.pincode
                                                ? "border-red-300"
                                                : "border-gray-300"
                                        }`}
                                    />
                                    {errors.pincode && (
                                        <p className="text-xs text-red-600 mt-1">
                                            {errors.pincode}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="pt-4 border-t border-gray-200">
                                <div className="flex items-center space-x-2 mb-4">
                                    <CreditCard className="w-5 h-5 text-[#B00000]" />
                                    <h2 className="text-xl font-semibold text-slate-900">
                                        Payment Method
                                    </h2>
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="card"
                                            checked={
                                                formData.paymentMethod ===
                                                "card"
                                            }
                                            onChange={handleInputChange}
                                            className="text-[#B00000] focus:ring-[#B00000]"
                                        />
                                        <span className="text-gray-700">
                                            Credit/Debit Card
                                        </span>
                                    </label>
                                    <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="upi"
                                            checked={
                                                formData.paymentMethod === "upi"
                                            }
                                            onChange={handleInputChange}
                                            className="text-[#B00000] focus:ring-[#B00000]"
                                        />
                                        <span className="text-gray-700">
                                            UPI
                                        </span>
                                    </label>
                                    <label className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="cod"
                                            checked={
                                                formData.paymentMethod === "cod"
                                            }
                                            onChange={handleInputChange}
                                            className="text-[#B00000] focus:ring-[#B00000]"
                                        />
                                        <span className="text-gray-700">
                                            Cash on Delivery (Physical products
                                            only)
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full px-6 py-3 bg-[#B00000] text-white rounded-lg font-medium hover:bg-red-800 transition-colors"
                            >
                                Place Order
                            </button>
                        </form>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
                        <h2 className="text-xl font-semibold text-slate-900 mb-4">
                            Order Summary
                        </h2>
                        <div className="space-y-3 mb-4">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-start space-x-3 pb-3 border-b border-gray-100"
                                >
                                    {item.image && (
                                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-slate-900 line-clamp-2">
                                            {item.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Qty: {item.quantity}
                                        </p>
                                        <p className="text-sm font-semibold text-[#B00000] mt-1">
                                            ₹
                                            {(
                                                item.price * item.quantity
                                            ).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-2 pt-4 border-t border-gray-200">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="text-slate-900">
                                    ₹{subtotal.toFixed(2)}
                                </span>
                            </div>
                            {shippingCost > 0 && (
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">
                                        Shipping
                                    </span>
                                    <span className="text-slate-900">
                                        ₹{shippingCost.toFixed(2)}
                                    </span>
                                </div>
                            )}
                            <div className="flex items-center justify-between text-lg font-bold pt-2 border-t border-gray-200">
                                <span className="text-slate-900">Total</span>
                                <span className="text-[#B00000]">
                                    ₹{total.toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Login Drawer */}
            <LoginDrawer
                isOpen={isLoginDrawerOpen}
                onClose={() => setIsLoginDrawerOpen(false)}
                onSwitchToRegister={() => {
                    setIsLoginDrawerOpen(false);
                    setIsRegisterDrawerOpen(true);
                }}
            />

            {/* Register Drawer */}
            <RegisterDrawer
                isOpen={isRegisterDrawerOpen}
                onClose={() => setIsRegisterDrawerOpen(false)}
                onSwitchToLogin={() => {
                    setIsRegisterDrawerOpen(false);
                    setIsLoginDrawerOpen(true);
                }}
            />
        </div>
    );
}
