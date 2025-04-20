"use client";
import Image from "next/image";
import {
  Heart,
  Package,
  RefreshCw,
  HeadphonesIcon,
  CreditCard,
  ShoppingBag,
} from "lucide-react";
import Navbar from "@/components/navbar";
import HeroBanner from "@/components/hero-banner";
import RaasKurtiesSection from "@/components/raas-kurties-section";
import BrowseCategorySection from "@/components/browse-category-section";
import SiteFooter from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { analyticApi } from "@/lib/api/analyticApi";
import { LoadingProducts } from "@/components/ui/loader";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/cart-context";
import Link from "next/link";

export default function Home() {
  const { data: bestSellers, isLoading: bestSellerLoad } = useQuery({
    queryKey: ["bestSellers"],
    queryFn: analyticApi.getBestSellers,
  });
  const { data: newArrivals, isLoading: newArrivalsLoad } = useQuery({
    queryKey: ["newArrivals"],
    queryFn: analyticApi.getNewArrivals,
  });
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar />
      {/* Hero Banner */}
      <HeroBanner />
      {/* #RaasKurties Section */}
      <RaasKurtiesSection />
      {/* Browse Categories */}
      <BrowseCategorySection />
      {/* Best Sellers */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <h2 className="text-xl font-medium text-center mb-8">
          Our Best Seller
        </h2>

        {!bestSellerLoad ? (
          <div className="grid md:grid-cols-3 gap-6">
            {bestSellers?.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        ) : (
          <LoadingProducts />
        )}
      </section>
      {/* New Arrivals */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <h2 className="text-xl font-medium text-center mb-8">New Arrivals</h2>

        {!newArrivalsLoad ? (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newArrivals?.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        ) : (
          <LoadingProducts />
        )}
      </section>

      {/* Features */}
      <section className="py-12  border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Package className="h-6 w-6 mb-2" />
              <h3 className="font-medium text-sm mb-1">Free Shipping</h3>
              <p className="text-xs text-gray-600">
                Free shipping for order above $100
              </p>
            </div>
            <div className="flex flex-col items-center">
              <RefreshCw className="h-6 w-6 mb-2" />
              <h3 className="font-medium text-sm mb-1">Money Guarantee</h3>
              <p className="text-xs text-gray-600">
                Within 30 days for exchange
              </p>
            </div>
            <div className="flex flex-col items-center">
              <HeadphonesIcon className="h-6 w-6 mb-2" />
              <h3 className="font-medium text-sm mb-1">Online Support</h3>
              <p className="text-xs text-gray-600">
                24 hours a day, 7 days a week
              </p>
            </div>
            <div className="flex flex-col items-center">
              <CreditCard className="h-6 w-6 mb-2" />
              <h3 className="font-medium text-sm mb-1">Flexible Payment</h3>
              <p className="text-xs text-gray-600">
                Pay with multiple credit cards
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <SiteFooter />
    </main>
  );
}

// Product Card Component
function ProductCard({ product }) {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.discountPrice || product.price,
      originalPrice: product.price,
      quantity: 1,
      color: product.colors.length > 0 ? product.colors[0].color : "",
      size:
        product.colors[0]?.sizes?.length > 0
          ? product.colors[0].sizes[0].size
          : "SIZE_DEFAULT",
      image: product.img,
    };
    addToCart(cartItem);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  return (
    <div className="group relative">
      <div className="aspect-[3/4] relative overflow-hidden rounded-xl bg-gray-100">
        {/* Image */}
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.img || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        {/* Wishlist Heart Button */}
        <button
          className="absolute top-3 right-3 aspect-square w-8 lg:w-10 bg-[#a08452] hover:bg-[#8c703d] rounded-full flex items-center justify-center
          opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 
          transform translate-x-0 lg:translate-x-[100%] lg:group-hover:translate-x-0"
        >
          <Heart className="aspect-square w-4 lg:w-6 text-white" />
        </button>
        {/* Add to Cart Button */}
        <div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 w-full
          transform translate-y-0 lg:translate-y-full lg:group-hover:translate-y-0
          transition-transform duration-300 ease-in-out"
        >
          <Button
            onClick={handleAddToCart}
            className="w-full bg-[#a08452] hover:bg-[#8c703d] text-white flex items-center justify-center gap-2 text-lg lg:text-xl font-normal opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300"
          >
            <ShoppingBag />
            Add to Cart
          </Button>
        </div>
      </div>
      {/* Product Details */}
      <Link href={`/product/${product.slug}`}>
        <div className="mt-3">
          <h3 className="text-xs font-medium">{product.name}</h3>
          <p className="text-[#7d6e8b] text-xs font-medium mt-1">
            ₹{product.price}
          </p>
        </div>
      </Link>
    </div>
  );
}
