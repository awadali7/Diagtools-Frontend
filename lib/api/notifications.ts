import { apiClient } from "./client";
import type { ApiResponse } from "./types";

export interface Notification {
    id: string;
    type: string;
    title: string;
    message: string;
    data: any;
    is_read: boolean;
    read_at: string | null;
    created_at: string;
}

export interface NotificationsResponse {
    notifications: Notification[];
    unread_count: number;
}

export interface PushSubscriptionData {
    endpoint: string;
    keys: {
        p256dh: string;
        auth: string;
    };
    userAgent?: string;
    deviceInfo?: any;
}

// Notifications API Services
export const notificationsApi = {
    // Get user's notifications
    getMyNotifications: async (
        limit = 50,
        offset = 0,
        unreadOnly = false
    ): Promise<ApiResponse<NotificationsResponse>> => {
        return apiClient.get<NotificationsResponse>(
            `/notifications?limit=${limit}&offset=${offset}&unread_only=${unreadOnly}`
        );
    },

    // Mark notification as read
    markAsRead: async (id: string): Promise<ApiResponse<Notification>> => {
        return apiClient.put<Notification>(`/notifications/${id}/read`);
    },

    // Mark all notifications as read
    markAllAsRead: async (): Promise<ApiResponse<void>> => {
        return apiClient.put<void>("/notifications/read-all");
    },

    // Register push subscription
    registerPushSubscription: async (
        data: PushSubscriptionData
    ): Promise<ApiResponse<any>> => {
        return apiClient.post<any>("/notifications/push/subscribe", data);
    },

    // Unregister push subscription
    unregisterPushSubscription: async (
        endpoint: string
    ): Promise<ApiResponse<void>> => {
        return apiClient.post<void>("/notifications/push/unsubscribe", {
            endpoint,
        });
    },
};
