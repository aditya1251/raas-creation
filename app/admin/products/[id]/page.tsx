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
  
  const [product, setProduct] = useState<ProductData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedColor, setSelectedColor] = useState("orange");
  const [selectedSize, setSelectedSize] = useState("40");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("descriptions");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewName, setReviewName] = useState("");
  const [reviewEmail, setReviewEmail] = useState("");
  const [reviewText, setReviewText] = useState("");

  // Fetch individual product data
  useEffect(() => {
    const fetchProductData = async () => {
      if (!id) {
        setError("Product ID is missing");
        setIsLoading(false);
        return;
      }

      try {
        // In a real application, replace this with your actual API endpoint
        // const response = await fetch(`/api/products/${id}`);
        // const data = await response.json();
        
        // For now, we'll simulate the API response with mock data
        // In production, replace this with actual API call
        setTimeout(() => {
          const mockData: ProductData = {
            name: 'custom',
            description: 'custom testing',
            price: 600,
            discount: 400,
            categoryId: 'cm905us120000txowlqbyanmk',
            material: 'testing',
            assets: [
              {
                url: 'https://res.cloudinary.com/dk8ktsnp0/image/upload/v1743613138/uploads/fipfbqlpmzzfgr9tbttg.png',
                type: 'IMAGE'
              }
            ],
            status: 'PUBLISHED'
          };
          
          setProduct(mockData);
          setIsLoading(false);
        }, 500);
      } catch (err) {
        setError("Failed to fetch product data");
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

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
                  src={product.assets[0].url}
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
                      src={asset.url}
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
            <h1 className="text-xl sm:text-2xl font-medium mb-2">{product.name}</h1>
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
                ₹{product.price.toFixed(2)}
              </span>
              {product.discount > 0 && (
                <span className="ml-2 text-gray-500 line-through">
                  ₹{(product.price + product.discount).toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">{product.description}</p>

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

            {/* Quantity and Add to Cart */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                  onClick={decreaseQuantity}
                  disabled={product.status !== "PUBLISHED"}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                  onClick={increaseQuantity}
                  disabled={product.status !== "PUBLISHED"}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <Button
                className="flex-1 bg-[#a08452] hover:bg-[#8c703d] text-white transition-colors h-auto py-2 text-sm"
                onClick={handleAddToCart}
                disabled={product.status !== "PUBLISHED"}
              >
                Add to Cart
              </Button>

              <Button
                variant="outline"
                className="border-gray-300 hover:bg-gray-50 transition-colors w-8 h-8 p-0 flex items-center justify-center"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mb-10 md:mb-16">
          <Tabs defaultValue="descriptions" className="w-full">
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <TabsList className="border-b w-full justify-start rounded-none bg-transparent mb-4 sm:mb-6 min-w-max">
                <TabsTrigger
                  value="descriptions"
                  className={`pb-2 rounded-none text-sm ${
                    activeTab === "descriptions"
                      ? "border-b-2 border-[#a08452] text-[#a08452]"
                      : "text-gray-600"
                  }`}
                  onClick={() => setActiveTab("descriptions")}
                >
                  Descriptions
                </TabsTrigger>
                <TabsTrigger
                  value="additional"
                  className={`pb-2 rounded-none text-sm ${
                    activeTab === "additional"
                      ? "border-b-2 border-[#a08452] text-[#a08452]"
                      : "text-gray-600"
                  }`}
                  onClick={() => setActiveTab("additional")}
                >
                  Additional Information
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className={`pb-2 rounded-none text-sm ${
                    activeTab === "reviews"
                      ? "border-b-2 border-[#a08452] text-[#a08452]"
                      : "text-gray-600"
                  }`}
                  onClick={() => setActiveTab("reviews")}
                >
                  Reviews
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="descriptions" className="mt-0">
              <div className="prose max-w-none text-sm sm:text-base">
                <p>{product.description}</p>
                <p className="mt-4">
                  <strong>Features:</strong>
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Premium quality {product.material} fabric</li>
                  <li>Intricate embroidery work</li>
                  <li>Comfortable fit for all-day wear</li>
                  <li>Perfect for everyday use and special occasions</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="additional" className="mt-0">
              <div className="space-y-4 text-sm sm:text-base">
                <div>
                  <h3 className="text-sm font-medium mb-2">Color</h3>
                  <div className="flex space-x-2">
                    {productColors.map((color) => (
                      <div
                        key={color}
                        className="w-8 h-8 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {productSizes.map((size) => (
                      <div
                        key={size}
                        className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md"
                      >
                        {size}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Material</h3>
                  <p>{product.material}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Care Instructions</h3>
                  <p>Dry clean only</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-0">
              <div>
                <h2 className="text-lg sm:text-xl font-medium mb-4 sm:mb-6">Customer Reviews</h2>

                {/* Customer Reviews List */}
                <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-12">
                  {customerReviews.map((review) => (
                    <div key={review.id} className="border-b pb-6 sm:pb-8">
                      <div className="flex items-start">
                        <div className="mr-3 sm:mr-4 hidden xs:block">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden">
                            <Image
                              src={review.avatar || "/placeholder.svg"}
                              alt={review.name}
                              width={48}
                              height={48}
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium text-sm sm:text-base">{review.name}</h3>
                          <div className="flex my-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <p className="font-medium mb-1 sm:mb-2 text-sm">{review.text}</p>
                          <p className="text-gray-600 text-xs sm:text-sm mb-2">
                            {review.details}
                          </p>
                          <p className="text-xs text-gray-500">
                            Verified purchase on {review.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Review Form */}
                <div>
                  <h2 className="text-lg sm:text-xl font-medium mb-4 sm:mb-6">Add your Review</h2>

                  <form onSubmit={handleReviewSubmit} className="text-sm sm:text-base">
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <p className="text-sm font-medium mb-2">Your Rating</p>
                        <div className="flex space-x-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              type="button"
                              className="p-1"
                              onClick={() => setReviewRating(rating)}
                            >
                              <Star
                                className={`h-5 w-5 ${
                                  rating <= reviewRating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="review-name"
                          className="block text-sm font-medium mb-1"
                        >
                          Name
                        </label>
                        <input
                          id="review-name"
                          type="text"
                          value={reviewName}
                          onChange={(e) => setReviewName(e.target.value)}
                          placeholder="Enter Your Name"
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a08452] text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="review-email"
                          className="block text-sm font-medium mb-1"
                        >
                          Email Address
                        </label>
                        <input
                          id="review-email"
                          type="email"
                          value={reviewEmail}
                          onChange={(e) => setReviewEmail(e.target.value)}
                          placeholder="Enter Your Email"
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a08452] text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="review-text"
                          className="block text-sm font-medium mb-1"
                        >
                          Your Review
                        </label>
                        <textarea
                          id="review-text"
                          value={reviewText}
                          onChange={(e) => setReviewText(e.target.value)}
                          placeholder="Enter Your Review"
                          rows={5}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a08452] text-sm"
                          required
                        />
                      </div>

                      <div>
                        <Button
                          type="submit"
                          className="bg-[#a08452] hover:bg-[#8c703d] text-white px-4 sm:px-8 text-sm"
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mb-10 md:mb-16">
          <h2 className="text-xl sm:text-2xl font-medium mb-4 sm:mb-8">Related Products</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((product) => (
              <div key={product.id} className="group">
                <Link href={`/shop/product/${product.id}`}>
                  <div className="aspect-[3/4] relative overflow-hidden bg-gray-100 rounded-md mb-2 sm:mb-3">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-xs sm:text-sm font-medium line-clamp-2">{product.name}</h3>
                  <p className="text-[#a08452] text-xs sm:text-sm font-medium mt-1">
                    ₹{product.price.toFixed(2)}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="py-6 sm:py-10 border-t border-b">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div className="flex flex-col items-center">
              <Package className="h-8 w-8 sm:h-10 sm:w-10 mb-2 sm:mb-3 text-[#a08452]" />
              <h3 className="font-medium text-sm sm:text-base mb-1">Free Shipping</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Free shipping for order above ₹1500
              </p>
            </div>
            <div className="flex flex-col items-center">
              <RefreshCw className="h-8 w-8 sm:h-10 sm:w-10 mb-2 sm:mb-3 text-[#a08452]" />
              <h3 className="font-medium text-sm sm:text-base mb-1">Money Guarantee</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Within 30 days for an exchange
              </p>
            </div>
            <div className="flex flex-col items-center">
              <HeadphonesIcon className="h-8 w-8 sm:h-10 sm:w-10 mb-2 sm:mb-3 text-[#a08452]" />
              <h3 className="font-medium text-sm sm:text-base mb-1">Online Support</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                24 hours a day, 7 days a week
              </p>
            </div>
            <div className="flex flex-col items-center">
              <CreditCard className="h-8 w-8 sm:h-10 sm:w-10 mb-2 sm:mb-3 text-[#a08452]" />
              <h3 className="font-medium text-sm sm:text-base mb-1">Flexible Payment</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Pay with multiple credit cards
              </p>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}