import { AddressType } from "@/types/types";
import { apiClient } from "../axiosClient";

export const AddressApi = {
  getAddress: async (): Promise<AddressType[]> => {
    const response = await apiClient.get("/api/customers/address");
    return response.data.address;
  },
  addAddress: async (formData: AddressType): Promise<any> => {
    const response = await apiClient.post("/api/customers/address", formData);
    return response.data;
  },
  deleteAddress: async (id: string): Promise<any> => {
    const response=await apiClient.delete(`/api/customers/address/${id}`,{
      params:{
        addressId: id
      }
    });
    return response.data;
  }
};
