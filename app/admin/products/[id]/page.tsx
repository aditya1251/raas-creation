"use client";
import { useState, useEffect } from "react";
import type React from "react";

import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  Heart,
  Package,
  RefreshCw,
  HeadphonesIcon,
  CreditCard,
  Star,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/cart-context";
import Navbar from "@/components/navbar";
import SiteFooter from "@/components/site-footer";
import { useParams } from "next/navigation";
import { productApi } from "@/lib/api/productdetails";
import { useQuery } from "@tanstack/react-query";

// Define the interface for the product data coming from the API
interface ProductAsset {
  url: string;
  type: string;
}

interface ProductData {
  id?: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  categoryId: string;
  material: string;
  assets: ProductAsset[];
  status: string;
}

export default function ProductDetailPage() {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { id } = useParams();
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState("orange");
  const [selectedSize, setSelectedSize] = useState("40");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("descriptions");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewName, setReviewName] = useState("");
  const [reviewEmail, setReviewEmail] = useState("");
  const [reviewText, setReviewText] = useState("");

  if (!id) {
    setError("Product ID is missing");
    return;
  }
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: ({ queryKey }) => productApi.getById(queryKey[1] as string),
  });

  if (!id) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl font-medium text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">Product ID is not valid</p>
        </div>
      </main>
    );
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle review submission
    console.log({ reviewRating, reviewName, reviewEmail, reviewText });
    // Reset form
    setReviewRating(0);
    setReviewName("");
    setReviewEmail("");
    setReviewText("");

    // Show success toast
    toast({
      title: "Review submitted",
      description: "Thank you for your review!",
    });
  };

  const handleAddToCart = () => {
    if (!product) return;

    // Add item to cart
    addToCart({
      id: id as string,
      name: product.name,
      price: product.price,
      originalPrice: product.discount + product.price, // Original price is discount + price
      quantity: quantity,
      color: selectedColor,
      size: selectedSize,
      image: product.assets[0]?.url || "/placeholder.svg",
    });

    // Show success toast
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  // Mock colors and sizes - in a real app these would come from the API
  const productColors = ["orange", "blue", "black"];
  const productSizes = ["38", "40", "44", "46", "48"];

  // Mock customer reviews
  const customerReviews = [
    {
      id: 1,
      name: "Sakhi Sharma",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 5,
      date: "May 29, 2024",
      verified: true,
      text: "Love this product, the fabric is soft & good ❤️❤️",
      details:
        "I love this product! The fabric is soft, high-quality, and extremely comfortable. The craftsmanship is impressive, making it both durable and stylish. Highly recommended!",
    },
    {
      id: 2,
      name: "Tanya Kapoor",
      avatar: "/placeholder.svg?height=50&width=50",
      rating: 5,
      date: "May 29, 2024",
      verified: true,
      text: "Love this product, the fabric is soft & good ❤️❤️",
      details:
        "I love this product! The fabric is soft, high-quality, and extremely comfortable. The craftsmanship is impressive, making it both durable and stylish. Highly recommended!",
    },
  ];

  const relatedProducts = [
    {
      id: "1",
      name: "Raas Scarlet Red Ikkat Print Suit Set",
      price: 3490.0,
      image: "/lot_0005__PUN0762.png?height=300&width=250",
    },
    {
      id: "2",
      name: "Raas Scarlet Red Ikkat Print Suit Set",
      price: 3490.0,
      image: "/lot_0009__PUN0747.png?height=300&width=250",
    },
    {
      id: "3",
      name: "Raas Scarlet Red Ikkat Print Suit Set",
      price: 3490.0,
      image: "/image.png?height=300&width=250",
    },
    {
      id: "4",
      name: "Raas Scarlet Red Ikkat Print Suit Set",
      price: 3490.0,
      image: "/image 100.png?height=300&width=250",
    },
  ];

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin text-[#a08452] mx-auto mb-4" />
            <p className="text-gray-600">Loading product details...</p>
          </div>
        </div>
        <SiteFooter />
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="text-center p-8 bg-red-50 rounded-lg">
            <h2 className="text-2xl font-medium text-red-600 mb-2">Error</h2>
            <p className="text-gray-600">{error || "Failed to load product"}</p>
          </div>
        </div>
        <SiteFooter />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Product Detail Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10 md:mb-16">
          {/* Product Images */}
          <div className="order-2 md:order-1">
            <div className="mb-4 aspect-[3/4] relative rounded-md overflow-hidden">
              {product.assets && product.assets.length > 0 ? (
                <Image
                  src={product.assets[0].asset_url}
                  alt={product.name}
                  fill
                  className="object-cover rounded-md"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">No image available</p>
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.assets && product.assets.length > 0 ? (
                product.assets.map((asset, index) => (
                  <div
                    key={index}
                    className="aspect-square relative border rounded-md overflow-hidden"
                  >
                    <Image
                      src={asset.asset_url}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-4 h-20 bg-gray-100 flex items-center justify-center rounded-md">
                  <p className="text-gray-500 text-sm">No additional images</p>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="order-1 md:order-2">
            <h1 className="text-xl sm:text-2xl font-medium mb-2">
              {product.name}
            </h1>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              {product.description}
            </p>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-xs sm:text-sm text-gray-600">
                4.9 (2890 Reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center mb-4 sm:mb-6">
              <span className="text-lg sm:text-xl font-medium">
                ₹{product.discount.toFixed(2)}
              </span>
              {product.discount > 0 && (
                <span className="ml-2 text-gray-500 line-through">
                  ₹{(product.price).toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
              {product.description}
            </p>

            {/* Stock Status */}
            <div className="mb-4 sm:mb-6">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                {product.status === "PUBLISHED" ? "In Stock" : "Out of Stock"}
              </span>

              {product.material && (
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full ml-2">
                  Material: {product.material}
                </span>
              )}
            </div>

            {/* Color Selection */}
            <div className="mb-4 sm:mb-6">
              <h3 className="text-xs sm:text-sm font-medium mb-2">Color</h3>
              <div className="flex space-x-2">
                {productColors.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full ${
                      selectedColor === color
                        ? "ring-2 ring-offset-2 ring-[#a08452]"
                        : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select ${color} color`}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-4 sm:mb-6">
              <h3 className="text-xs sm:text-sm font-medium mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                {productSizes.map((size) => (
                  <button
                    key={size}
                    className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center border rounded-md ${
                      selectedSize === size
                        ? "bg-[#a08452] text-white border-[#a08452]"
                        : "border-gray-300 text-gray-700 hover:border-[#a08452]"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
