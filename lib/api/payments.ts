import { apiClient } from "./client";
import type { ApiResponse } from "./types";

export interface RazorpayCreateOrderResponse {
    key_id: string;
    razorpay_order_id: string;
    amount: number; // paise
    currency: string;
    internal_order_id: string;
}

export interface RazorpayVerifyRequest {
    internal_order_id: string;
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}

export const paymentsApi = {
    createRazorpayOrder: async (payload: {
        order_id: string;
    }): Promise<ApiResponse<RazorpayCreateOrderResponse>> => {
        return apiClient.post<RazorpayCreateOrderResponse>(
            "/payments/razorpay/order",
            payload
        );
    },

    verifyRazorpayPayment: async (
        payload: RazorpayVerifyRequest
    ): Promise<ApiResponse<{ message: string }>> => {
        return apiClient.post<{ message: string }>(
            "/payments/razorpay/verify",
            payload
        );
    },
};
