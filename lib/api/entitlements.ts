import { apiClient } from "./client";
import type { ApiResponse, ProductEntitlement } from "./types";

export const entitlementsApi = {
    my: async (): Promise<ApiResponse<ProductEntitlement[]>> => {
        return apiClient.get<ProductEntitlement[]>(
            "/users/product-entitlements"
        );
    },
};
