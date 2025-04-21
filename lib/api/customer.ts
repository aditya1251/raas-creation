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
    getCustomer: async () => {
        const response = await apiClient.get("/api/customers/customer");
        return response.data.customer;
    },
    changePassword: async (customerId:string, newPassword:string) => {
        const response = await apiClient.post(`/api/customers//change-password`, {
            newPassword: newPassword,
            customerId: customerId,
        });
        return response;
    }
}