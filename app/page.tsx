"use client";
import Image from "next/image";
import {
  Heart,
  Package,
  RefreshCw,
  HeadphonesIcon,
  CreditCard,
  ShoppingBag,
  HeartOff,
} from "lucide-react";
import Navbar from "@/components/navbar";
import HeroBanner from "@/components/hero-banner";
import RaasKurtiesSection from "@/components/raas-kurties-section";
import BrowseCategorySection from "@/components/browse-category-section";
import SiteFooter from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { analyticApi } from "@/lib/api/analyticApi";
import { LoadingProducts } from "@/components/ui/loader";
import toast from "react-hot-toast";
import { useCart } from "@/context/cart-context";
import Link from "next/link";
import { wishlistApi } from "@/lib/api/wishlist";
import { JSX, useEffect, useState } from "react";
import { customerApi } from "@/lib/api/customer";

export default function Home() {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: customerApi.getCustomer,
  });

  const [wishlist, setWishlist] = useState<string[]>([]);

  const { data: bestSellers, isLoading: bestSellerLoad } = useQuery({
    queryKey: ["bestSellers"],
    queryFn: analyticApi.getBestSellers,
  });

  const { data: newArrivals, isLoading: newArrivalsLoad } = useQuery({
    queryKey: ["newArrivals"],
    queryFn: analyticApi.getNewArrivals,
  });

  const { data: wishlistProducts } = useQuery({
    queryKey: ["wishlistProducts"],
    queryFn: wishlistApi.getProductList,
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (wishlistProducts){
      setWishlist(wishlistProducts);
    }
  }, [wishlistProducts]);

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <HeroBanner />
      <RaasKurtiesSection />
      <BrowseCategorySection />

      {/* Best Sellers */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <h2 className="text-xl font-medium text-center mb-8">Our Best Seller</h2>
        {!bestSellerLoad ? (
          <div className="grid md:grid-cols-3 gap-6">
            {bestSellers?.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                wishlistProducts={wishlist || []}
              />
            ))}
          </div>
        ) : (
          <LoadingProducts length={4} />
        )}
      </section>

      {/* New Arrivals */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <h2 className="text-xl font-medium text-center mb-8">New Arrivals</h2>
        {!newArrivalsLoad ? (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newArrivals?.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                wishlistProducts={wishlist || []}
              />
            ))}
          </div>
        ) : (
          <LoadingProducts length={4} />
        )}
      </section>

      {/* Features */}
      <section className="py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <Feature icon={<Package />} title="Free Shipping" text="Free shipping for order above $100" />
            <Feature icon={<RefreshCw />} title="Money Guarantee" text="Within 30 days for exchange" />
            <Feature icon={<HeadphonesIcon />} title="Online Support" text="24 hours a day, 7 days a week" />
            <Feature icon={<CreditCard />} title="Flexible Payment" text="Pay with multiple credit cards" />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function Feature({ icon, title, text }: { icon: JSX.Element; title: string; text: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="h-6 w-6 mb-2">{icon}</div>
      <h3 className="font-medium text-sm mb-1">{title}</h3>
      <p className="text-xs text-gray-600">{text}</p>
    </div>
  );
}

// Product Card Component
function ProductCard({
  product,
  wishlistProducts,
}: {
  product: any;
  wishlistProducts: any[];
}) {
  const { addToCart } = useCart();
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: customerApi.getCustomer,
  });

  const queryClient = useQueryClient();

  const [isProductInWishlist, setIsProductInWishlist] = useState(false);

  useEffect(() => {
    console.log("wishlistProducts", wishlistProducts);
    if (wishlistProducts) {
      setIsProductInWishlist(wishlistProducts.includes(product.id));
    }
  }, [wishlistProducts]);

  const addToWishlist = useMutation({
    mutationFn: () => wishlistApi.addtoWishlist(product.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlistProducts"] });
      toast.success(`${product.name} has been added to your wishlist.`);
    },
    onError: () => {
      toast.error("Failed to add product to wishlist.");
    },
  });

  const removeFromWishlist = useMutation({
    mutationFn: () => wishlistApi.removeFromWishlist(product.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlistProducts"] });
      toast.success(`${product.name} has been removed from your wishlist.`);
    },
    onError: () => {
      toast.error("Failed to remove product from wishlist.");
    },
  });

  const handleWishlistToggle = () => {
    if (!user) {
      toast.error("You need to login to manage your wishlist.");
      return;
    }

    if (isProductInWishlist) {
      removeFromWishlist.mutate();
    } else {
      addToWishlist.mutate();
    }
  };

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
    toast.success(`${product.name} has been added to your cart.`);
  };

  return (
    <div className="group relative">
      <div className="aspect-[3/4] relative overflow-hidden rounded-xl bg-gray-100">
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
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 aspect-square w-8 lg:w-10 bg-[#a08452] hover:bg-[#8c703d] rounded-full flex items-center justify-center
            opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 
            transform translate-x-0 lg:translate-x-[100%] lg:group-hover:translate-x-0"
        >
          {isProductInWishlist ? (
            <HeartOff className="aspect-square w-4 lg:w-6 text-white" />
          ) : (
            <Heart className="aspect-square w-4 lg:w-6 text-white" />
          )}
        </button>
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
