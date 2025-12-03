"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { pushNotificationService } from "@/lib/services/pushNotificationService";

export default function PushNotificationInitializer() {
    const { isAuth } = useAuth();

    useEffect(() => {
        if (isAuth && typeof window !== "undefined") {
            // Initialize push notifications when user is authenticated
            pushNotificationService.initialize().catch((error) => {
                console.error(
                    "Failed to initialize push notifications:",
                    error
                );
            });
        }

        return () => {
            // Cleanup if needed
        };
    }, [isAuth]);

    return null;
}
