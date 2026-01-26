import { apiClient } from "./client";

export interface BusinessUpgradeData {
    business_id: string;
    business_location_link: string;
    business_proof?: File;
}

export interface BusinessUpgradeResponse {
    success: boolean;
    message: string;
    data: any;
}

export const kycUpgradeApi = {
    /**
     * Upgrade student to business owner by adding business information
     */
    async upgradeToBusiness(
        data: BusinessUpgradeData
    ): Promise<BusinessUpgradeResponse> {
        const formData = new FormData();
        formData.append("business_id", data.business_id);
        formData.append("business_location_link", data.business_location_link);
        
        if (data.business_proof) {
            formData.append("business_proof", data.business_proof);
        }

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/kyc/upgrade-to-business`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
                },
                body: formData,
            }
        );

        return response.json();
    },
};

