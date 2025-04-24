"use client";
import Image from "next/image";
import {
  Heart,
  Package,
  RefreshCw,
  HeadphonesIcon,
  CreditCard,
  HeartOff,
  Briefcase,
} from "lucide-react";
import Navbar from "@/components/navbar";
import HeroBanner from "@/components/hero-banner";
import RaasKurtiesSection from "@/components/raas-kurties-section";
import BrowseCategorySection from "@/components/browse-category-section";
import SiteFooter from "@/components/site-footer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { analyticApi } from "@/lib/api/analyticApi";
import { LoadingProducts } from "@/components/ui/loader";
import toast from "react-hot-toast";
import Link from "next/link";
import { wishlistApi } from "@/lib/api/wishlist";
import { JSX, useEffect, useState } from "react";
import { customerApi } from "@/lib/api/customer";
import { productApi } from "@/lib/api/productdetails";
import { useCart } from "@/context/cart-context";

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
    if (wishlistProducts) {
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
        <h2 className="text-xl font-medium text-center mb-8">
          Our Best Seller
        </h2>
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
            <Feature
              icon={<Package />}
              title="Free Shipping"
              text="Free shipping for order above $100"
            />
            <Feature
              icon={<RefreshCw />}
              title="Money Guarantee"
              text="Within 30 days for exchange"
            />
            <Feature
              icon={<HeadphonesIcon />}
              title="Online Support"
              text="24 hours a day, 7 days a week"
            />
            <Feature
              icon={<CreditCard />}
              title="Flexible Payment"
              text="Pay with multiple credit cards"
            />
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: JSX.Element;
  title: string;
  text: string;
}) {
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

  console.log("Product",product)
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: customerApi.getCustomer,
  });

  const queryClient = useQueryClient();
  const { addToCart } = useCart();

  const [isProductInWishlist, setIsProductInWishlist] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

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
  const handleAddToCart = async () => {
    if (!product?.id) return;

    try {
      setIsAddingToCart(true);
      const productData = await productApi.getById(product.id);

      const defaultColor = productData.colors?.[0]?.color || "";
      const defaultSizeData = productData.colors?.[0]?.sizes?.find(
        (size) => size.stock > 0
      );
      if (!defaultSizeData) {
        toast.error("This product is out of stock.");
        return;
      }
      const defaultSize = defaultSizeData?.size || "SIZE_DEFAULT";
      const defaultVariantId = defaultSizeData?.id || "ID_NOT_FOUND";
      const defaultImage = productData.assets?.[0]?.asset_url || "/placeholder.svg";

      const cartItem = {
        id: productData.id,
        name: productData.name,
        price: productData.discountPrice || productData.price,
        originalPrice: productData.price,
        quantity: 1,
        color: defaultColor,
        size: defaultSize,
        productVariantId: defaultVariantId,
        image: defaultImage,
      };

      addToCart(cartItem);
      toast.success(`${product.name} has been added to your cart.`);
    } catch (error) {
      toast.error("Failed to fetch product details. Please try again.");
      console.error("Add to cart error:", error);
    } finally {
      setIsAddingToCart(false);
    }
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
            transform translate-x-0 lg:translate-x-[100%] lg:group-hover:translate-x-0">
          {isProductInWishlist ? (
            <HeartOff className="aspect-square w-4 lg:w-6 text-white" />
          ) : (
            <Heart className="aspect-square w-4 lg:w-6 text-white" />
          )}
        </button>
        <div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 w-full
                transform translate-y-full group-hover:translate-y-0 
                transition-transform duration-300 ease-in-out">
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="w-full flex justify-center gap-4 items-center rounded-lg bg-[#795D2A] text-white text-lg font-normal py-2 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {isAddingToCart ? (
              <>
                Adding...
                <span className="animate-spin">
                  <RefreshCw className="h-5 w-5" />
                </span>
              </>
            ) : (
              <>
                Add to Cart
                <Briefcase />
              </>
            )}
          </button>
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
