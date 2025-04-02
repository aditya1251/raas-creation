import { product } from "@/types/types";
import { apiClient } from "../axiosClient";
import { Varient } from "@/types/types";


interface InventoryOverview {
  totalProducts: number;
  lowStockItems: number;
  outOfStock: number;
  restockAlerts: number;
}
const getInventoryOverview = async (): Promise<InventoryOverview> => {
  const response = await apiClient.get('/api/inventory/overview');
  return response.data;
};

export interface InventoryItem {
  id: number;
  name: string;
  inStock: number;
  lowStockThreshold: number;
}

const getInventory = async (currentPage: number, itemsPerPage: number, debouncedSearchTerm: string): Promise<{ products: InventoryItem[], pagination: { totalPages: number } }> => {
  const response = await apiClient.get(`/api/inventory/all`, {
    params: {
      page: currentPage,
      limit: itemsPerPage,
      search: debouncedSearchTerm,
    }
  });
  return response.data;
};

interface Size {
  id: string;
  size: string;
  stock: number;
  colorId: string;
}

const updateStock = async (variantId: string, stock: number): Promise<Size> => {
  const response = await apiClient.put(`/api/products/stock`, {
    stock,
    variantId,
  });
  return response.data.updatedVariant;
};

const addNewSize = async (colorId: string, sizes: Array<{ size: string; stock: number }>): Promise<Varient[]> => {
  const response = await apiClient.post(`/api/products/sizes`, {
    productId: product,
    sizes
  });
  return response.data.variants;
};



export const inventoryApi = {
  getInventoryOverview,
  getInventory,
  updateStock,
  addNewSize,
};