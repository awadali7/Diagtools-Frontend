import { apiClient } from "./client";
import type { ApiResponse } from "./types";

export interface TermsStatus {
    course_terms_accepted: boolean;
    course_terms_accepted_at: string | null;
    product_terms_accepted: boolean;
    product_terms_accepted_at: string | null;
    user_type: "student" | "business_owner" | null;
}

export const termsApi = {
    /**
     * Get current user's terms acceptance status
     */
    async getStatus(): Promise<ApiResponse<TermsStatus>> {
        return apiClient.get("/terms/status");
    },

    /**
     * Set user type (student or business_owner)
     */
    async setUserType(
        userType: "student" | "business_owner"
    ): Promise<ApiResponse<{ user_type: "student" | "business_owner" }>> {
        return apiClient.post("/terms/user-type", { user_type: userType });
    },

    /**
     * Accept course terms and conditions
     */
    async acceptCourseTerms(): Promise<ApiResponse<{ accepted_at: string }>> {
        return apiClient.post("/terms/course/accept", {});
    },

    /**
     * Accept product terms and conditions
     */
    async acceptProductTerms(): Promise<ApiResponse<{ accepted_at: string }>> {
        return apiClient.post("/terms/product/accept", {});
    },
};

