import { z } from "zod";
export const category = z.object({
    id: z.string().cuid("Invalid category ID"),
    name: z.string().min(1, "Category name is required"),
    productCount: z.number().positive("Product count must be a positive number").optional(),
    description: z.string().min(1, "Category description is required").optional(),
  });
  
  export type Category = z.infer<typeof category>;

  export const product = z.object({
    name: z.string().min(1, "Product name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().positive("Price must be a positive number"),
    discount: z.number().positive("Discount Prize must be a positive number").optional(),
    categoryId: z.string().cuid("Invalid category ID"),
    material: z.string().min(1, "Material is required"),
    assets: z
      .array(
        z.object({
          url: z.string().url("Invalid asset URL"),
          type: z.enum(["IMAGE", "VIDEO"]),
        })
      )
      .optional(),
    status: z.enum(['DRAFT', 'PUBLISHED']),
  });

export const SizeEnum = z.enum(["SIZE_5",
  "SIZE_6",
  "SIZE_7",
  "SIZE_8",
  "SIZE_9",
  "SIZE_10",
  "SIZE_11",
  "SIZE_12",]);

  export const variants = z.object({
    id: z.string().cuid("Invalid variant ID").optional(),
    productId: z.string().cuid("Invalid product ID"),
    sizes: z.array(
      z.object({
        size: SizeEnum,
        stock: z.number().int().min(0, "Stock must be a non-negative integer"),
      })
    ),
  });


export type Variants = z.infer<typeof variants>;

export type Product = z.infer<typeof product>;
