<<<<<<< HEAD
import { AssetType, VariantsValues } from "@prisma/client";
import { z } from "zod";
export const product = z.object({
=======
import { z } from "zod";
export const category = z.object({
    id: z.string().cuid("Invalid category ID"),
    name: z.string().min(1, "Category name is required"),
    productCount: z.number().positive("Product count must be a positive number").optional(),
    description: z.string().min(1, "Category description is required").optional(),
  });
  
  export type Category = z.infer<typeof category>;

  export const product = z.object({
>>>>>>> 9c5000243007bd318c219055af0463441e4c2690
    name: z.string().min(1, "Product name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.number().positive("Price must be a positive number"),
    discountPrice: z.number().positive("Discount Prize must be a positive number").optional(),
<<<<<<< HEAD
    category_id: z.string().cuid("Invalid category ID"),
=======
    categoryId: z.string().cuid("Invalid category ID"),
>>>>>>> 9c5000243007bd318c219055af0463441e4c2690
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

<<<<<<< HEAD
export const varient = z.object({
  id: z.string().cuid("Invalid variant ID").optional(),
  productId: z.string().cuid("Invalid product ID"),
  color: z.string().min(1, "Color is required"),
  assets: z.array(
    z.object({
      url: z.string().url("Invalid asset URL"),
      type: z.nativeEnum(AssetType, {
        errorMap: () => ({ message: "Invalid asset type" }),
      }),
    })
  ),
  sizes: z.array(
    z.object({
      size: z.nativeEnum(VariantsValues, {
        errorMap: () => ({ message: "Invalid size value" }),
      }),
=======
export const SizeEnum = z.enum(["SMALL", "MEDIUM", "LARGE", "EXTRA_LARGE"]);

export const varients = z.object({
  id: z.string().cuid("Invalid variant ID").optional(),
  productId: z.string().cuid("Invalid product ID"),
  sizes: z.array(
    z.object({
      size: SizeEnum,
>>>>>>> 9c5000243007bd318c219055af0463441e4c2690
      stock: z.number().int().min(0, "Stock must be a non-negative integer"),
    })
  ),
})
<<<<<<< HEAD

export const review = z.object({
  rating: z.number().min(1, "Rating must be a positive number"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});
export type Review = z.infer<typeof review>;

export type Varient = z.infer<typeof varient>;

export type Product = z.infer<typeof product>;

export const category = z.object({
  id: z.string().cuid("Invalid category ID"),
  name: z.string().min(1, "Category name is required"),
  productCount: z.number().positive("Product count must be a positive number").optional(),
  description: z.string().min(1, "Category description is required").optional(),
});

export type Category = z.infer<typeof category>;

export const addressSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  street: z.string().min(1, "Street address is required"),
  aptNumber: z.string().optional(),
  city: z.string().min(1, "City is required"),
  zipCode: z.string().regex(/^\d{6}$/, "Invalid pincode format (6 digits)"),
  state: z.string().min(1, "State is required"),
  country: z.string(),
  phoneNumber: z.string().regex(/^\d{10}$/, "Invalid mobile number format (10 digits)"),
  addressName: z.string().min(1, "Address name is required"),
  district: z.string().min(1, "District is required"),
});

export type AddressType = z.infer<typeof addressSchema>;

export const LoginSchema = z.object({

  mobileNumber: z
    .string()
    .min(1, "Mobile number is required")
    .regex(
      /^(\+?\d{1,3})?\d{10}$/,
      "Invalid mobile number format"
    ),
  password: z.string().min(1, "Password is required"),
});



export const SignUpSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    mobileNumber: z
      .string()
      .min(1, "Mobile number is required")
      .regex(/^(\+?\d{1,3})?\d{10}$/, "Invalid mobile number format"),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
=======
export type Varient = z.infer<typeof varients>;

export type Product = z.infer<typeof product>;
>>>>>>> 9c5000243007bd318c219055af0463441e4c2690
