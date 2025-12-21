"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { ordersApi } from "@/lib/api/orders";
import type { AdminOrderSummary } from "@/lib/api/types";

function formatDate(dateString: string) {
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) return dateString;
    return d.toLocaleString();
}

function StatusPill({ status }: { status: string }) {
    const styles =
        status === "paid"
            ? "bg-green-50 text-green-700 border-green-200"
            : status === "pending"
            ? "bg-yellow-50 text-yellow-700 border-yellow-200"
            : "bg-gray-50 text-gray-700 border-gray-200";
    return (
        <span
            className={`inline-flex px-2 py-1 text-xs font-medium border rounded-full ${styles}`}
        >
            {status.toUpperCase()}
        </span>
    );
}

export const OrdersTab: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [orders, setOrders] = useState<AdminOrderSummary[]>([]);
    const [markingId, setMarkingId] = useState<string | null>(null);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError(null);
            const resp = await ordersApi.adminAll();
            setOrders(Array.isArray(resp.data) ? resp.data : []);
        } catch (e: any) {
            setError(e?.message || "Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const markPaid = async (id: string) => {
        if (
            !confirm(
                "Mark this order as PAID? This will unlock digital downloads."
            )
        ) {
            return;
        }
        try {
            setMarkingId(id);
            await ordersApi.adminMarkPaid(id, {
                payment_provider: "manual",
                payment_reference: `admin-${Date.now()}`,
            });
            await fetchOrders();
        } catch (e: any) {
            alert(e?.message || "Failed to mark paid");
        } finally {
            setMarkingId(null);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                        Orders
                    </h2>
                    <p className="text-sm text-gray-500">
                        Mark orders as paid to unlock digital downloads
                    </p>
                </div>
                <button
                    onClick={fetchOrders}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-slate-900 hover:bg-gray-50"
                >
                    Refresh
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
                                Order
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                User
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Items
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="px-6 py-10 text-center text-gray-500"
                                >
                                    Loading...
                                </td>
                            </tr>
                        ) : orders.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="px-6 py-10 text-center text-gray-500"
                                >
                                    No orders yet
                                </td>
                            </tr>
                        ) : (
                            orders.map((o) => (
                                <tr key={o.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-slate-900">
                                            #{o.id.slice(0, 8)}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {o.id}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-slate-900">
                                            {o.user_email}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {o.first_name} {o.last_name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <StatusPill status={o.status} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#B00000]">
                                        ₹{Number(o.total).toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {Number(o.physical_items)} physical •{" "}
                                        {Number(o.digital_items)} digital
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {formatDate(o.created_at)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {o.status === "paid" ? (
                                            <span className="inline-flex items-center gap-2 text-green-700">
                                                <CheckCircle className="w-4 h-4" />
                                                Paid
                                            </span>
                                        ) : (
                                            <button
                                                onClick={() => markPaid(o.id)}
                                                disabled={markingId === o.id}
                                                className="inline-flex items-center gap-2 px-3 py-2 bg-[#B00000] text-white rounded-lg hover:bg-red-800 transition-colors disabled:opacity-60"
                                            >
                                                {markingId === o.id ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <CheckCircle className="w-4 h-4" />
                                                )}
                                                Mark Paid
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
