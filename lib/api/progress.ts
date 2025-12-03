import { apiClient } from "./client";
import type {
    ApiResponse,
    VideoProgress,
    MarkVideoWatchedResponse,
    UnlockNextVideoResponse,
    CourseProgress,
} from "./types";

// Progress API Services
export const progressApi = {
    // Mark video as watched
    markVideoWatched: async (
        videoId: string
    ): Promise<ApiResponse<MarkVideoWatchedResponse>> => {
        return apiClient.post<MarkVideoWatchedResponse>(
            `/progress/videos/${videoId}/watch`,
            {}
        );
    },

    // Unlock next video (after watching current)
    unlockNextVideo: async (
        videoId: string
    ): Promise<ApiResponse<UnlockNextVideoResponse>> => {
        return apiClient.post<UnlockNextVideoResponse>(
            `/progress/videos/${videoId}/unlock-next`,
            {}
        );
    },

    // Get progress for a course
    getCourseProgress: async (
        courseId: string
    ): Promise<ApiResponse<CourseProgress>> => {
        return apiClient.get<CourseProgress>(`/progress/courses/${courseId}`);
    },

    // Get user's enrolled courses
    getMyCourses: async (): Promise<ApiResponse<any[]>> => {
        return apiClient.get<any[]>("/users/courses");
    },
};
