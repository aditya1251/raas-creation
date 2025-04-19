import { apiClient } from "../axiosClient";

export const customerApi = {
    getAllCustomers: async (currentPage:number, itemsPerPage:number, debouncedSearchTerm:string) => {
        const response = await apiClient.get("/api/customers/allcustomers", {
            params: {
                page: currentPage,
                limit: itemsPerPage,
                search: debouncedSearchTerm,
            }
        });
        return response;
    },
    changePassword: async (customerId:string, newPassword:string) => {
        const response = await apiClient.post(`/api/customers//change-password`, {
            newPassword: newPassword,
            customerId: customerId,
        });
        return response;
    }
}