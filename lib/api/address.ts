import { AddressType } from "@/types/types";
import { apiClient } from "../axiosClient";



export const AddressApi = {
  getAddress: async (): Promise<AddressType[]> => {
    const response = await apiClient.get("/api/customers/address");
    return response.data.address;
  },
  addAddress: async (formData: AddressType): Promise<void> => {
   await apiClient.post(
      "/api/customers/address",
      formData
    );
  },
};
