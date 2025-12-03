import { apiClient } from "./client";
import type {
    ApiResponse,
    CourseRequest,
    CreateCourseRequest,
    ApproveCourseRequest,
} from "./types";

// Course Requests API Services
export const requestsApi = {
    // Create course access request
    create: async (
        data: CreateCourseRequest
    ): Promise<ApiResponse<CourseRequest>> => {
        return apiClient.post<CourseRequest>("/course-requests", data);
    },

    // Get user's course requests
    getMyRequests: async (): Promise<ApiResponse<CourseRequest[]>> => {
        return apiClient.get<CourseRequest[]>("/course-requests");
    },

    // Get specific request details
    getById: async (id: string): Promise<ApiResponse<CourseRequest>> => {
        return apiClient.get<CourseRequest>(`/course-requests/${id}`);
    },

    // Get all requests (Admin only)
    getAll: async (): Promise<ApiResponse<CourseRequest[]>> => {
        return apiClient.get<CourseRequest[]>("/course-requests/admin/all");
    },

    // Approve request (Admin only)
    approve: async (
        id: string,
        data: ApproveCourseRequest
    ): Promise<ApiResponse<CourseRequest>> => {
        return apiClient.put<CourseRequest>(
            `/course-requests/${id}/approve`,
            data
        );
    },

    // Reject request (Admin only)
    reject: async (id: string): Promise<ApiResponse<CourseRequest>> => {
        return apiClient.put<CourseRequest>(
            `/course-requests/${id}/reject`,
            {}
        );
    },
};
