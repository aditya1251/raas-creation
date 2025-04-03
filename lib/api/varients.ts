import { apiClient } from "../axiosClient";
import { Varient } from "@/types/types";

export const varientApi = {
  getAll: async (): Promise<Varient[]> => {
    const response = await apiClient.get("/api/products");
    return response.data.varients;
  },
  // getById: async (id: string): Promise<Varient> => {
  //   const response = await apiClient.get(/api/products/color/${id});
  //   return response.data;
  // },
  addVarient: async (varient: Varient): Promise<Varient> => {
    const response = await apiClient.post("/api/products/size", varient);
    return response.data;
  },
  // updateVarient: async (id: string | undefined, varient: Varient): Promise<Varient> => {
  //   if(!id) throw new Error("Invalid varient id");
  //   const response = await apiClient.put(/api/products/color/${id}, varient);
  //   return response.data;
  // },
  // deleteVarient: async (id: string): Promise<void> => {
  //   await apiClient.delete(/api/products/color/${id});
  // },        
};