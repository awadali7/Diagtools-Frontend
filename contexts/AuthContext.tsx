"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import {
    authApi,
    getStoredUser,
    isAuthenticated,
    clearAuth as clearAuthStorage,
} from "@/lib/api";
import type {
    User,
    LoginRequest,
    RegisterRequest,
    UpdateProfileRequest,
} from "@/lib/api/types";
import { useRouter } from "next/navigation";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAuth: boolean;
    login: (data: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => Promise<void>;
    updateUser: (data: UpdateProfileRequest) => Promise<void>;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Refresh user profile from server
    const refreshProfile = async () => {
        try {
            const response = await authApi.getProfile();
            if (response.success && response.data) {
                setUser(response.data);
                return;
            }
        } catch (error) {
            console.error("Failed to refresh profile:", error);
            throw error;
        }
    };

    // Handle session expiration
    useEffect(() => {
        const handleSessionExpired = (event: CustomEvent) => {
            const message =
                event.detail?.message ||
                "Your session has expired. Please login again.";
            clearAuthStorage();
            setUser(null);
            // Dispatch event to show login drawer instead of redirecting
            if (typeof window !== "undefined") {
                console.warn("Session expired:", message);
                // Dispatch custom event to show login drawer
                window.dispatchEvent(
                    new CustomEvent("show-login-drawer", {
                        detail: { message },
                    })
                );
            }
        };

        window.addEventListener(
            "session-expired",
            handleSessionExpired as EventListener
        );

        return () => {
            window.removeEventListener(
                "session-expired",
                handleSessionExpired as EventListener
            );
        };
    }, [router]);

    // Check for stored user on mount
    useEffect(() => {
        const initializeAuth = async () => {
            const storedUser = getStoredUser();
            if (storedUser && isAuthenticated()) {
                setUser(storedUser);
                // Optionally refresh profile from server
                try {
                    await refreshProfile();
                } catch {
                    // If refresh fails, clear auth
                    clearAuthStorage();
                    setUser(null);
                }
            }
            setLoading(false);
        };
        initializeAuth();
    }, []);

    // Login function
    const login = async (data: LoginRequest) => {
        try {
            const response = await authApi.login(data);
            if (response.success && response.data) {
                setUser(response.data.user);
            } else {
                throw new Error(response.message || "Login failed");
            }
        } catch (error: any) {
            throw error;
        }
    };

    // Register function
    const register = async (data: RegisterRequest) => {
        try {
            const response = await authApi.register(data);
            if (response.success && response.data) {
                setUser(response.data.user);
            } else {
                throw new Error(response.message || "Registration failed");
            }
        } catch (error: any) {
            throw error;
        }
    };

    // Logout function
    const logout = async () => {
        try {
            await authApi.logout();
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            clearAuthStorage();
            setUser(null);
        }
    };

    // Update user profile
    const updateUser = async (data: UpdateProfileRequest) => {
        try {
            const response = await authApi.updateProfile(data);
            if (response.success && response.data) {
                setUser(response.data);
            } else {
                throw new Error(response.message || "Update failed");
            }
        } catch (error: any) {
            throw error;
        }
    };

    const value: AuthContextType = {
        user,
        loading,
        isAuth: !!user && isAuthenticated(),
        login,
        register,
        logout,
        updateUser,
        refreshProfile,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}

// Hook to use auth context
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
