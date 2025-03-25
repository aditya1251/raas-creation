"use client";
import Image from "next/image";
import {
  Heart,
  Package,
  RefreshCw,
  HeadphonesIcon,
  CreditCard,
  Briefcase,
} from "lucide-react";
import Navbar from "@/components/navbar";
import HeroBanner from "@/components/hero-banner";
import RaasKurtiesSection from "@/components/raas-kurties-section";
import BrowseCategorySection from "@/components/browse-category-section";
import SiteFooter from "@/components/site-footer";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/cart-context";

export default function Home() {
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

        <div className="grid md:grid-cols-3 gap-6">
          {bestSellers.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <h2 className="text-xl font-medium text-center mb-8">New Arrivals</h2>

        <div className="grid md:grid-cols-4 gap-6">
          {newArrivals.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
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
    // Add item to cart
    addToCart({
      id: demoProduct.id as string,
      name: demoProduct.name,
      price: demoProduct.price,
      originalPrice: demoProduct.originalPrice,
      quantity: 1,
      color: "orange",
      size: "40",
      image: demoProduct.images[0],
    });

    // Show success toast
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  // Mock product data - in a real app, this would come from an API
  const demoProduct = {
    id: product.id,
    name: "Raas - Velvet Embroidered Suit Set",
    description:
      "Discover our mid cotton anarkali set with pillan work yok paired with pant and back print dupatta. This outfit exudes a charming and delicate appeal, making it perfect for festive event, pooja, light gathering, day to day life.",
    price: 3490.0,
    originalPrice: 4899.0,
    rating: 4.9,
    reviews: 2890,
    inStock: true,
    colors: ["orange", "blue", "black"],
    sizes: ["38", "40", "44", "46", "48"],
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Raas_Creation_Web_Design.png-22zL20iPWx4nVh3qQdh5EwkvzWf4H0.jpeg",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
  };
  return (
    <div className="group relative">
      <div className="aspect-[3/4] relative overflow-hidden rounded-xl bg-gray-100">
        {/* Image */}
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Wishlist Heart Button */}
        <button
          className="absolute top-3 right-3 aspect-square w-10 bg-[#795D2A] rounded-full flex items-center justify-center 
          opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[100%] group-hover:translate-x-0"
        >
          <Heart className="aspect-square w-6 text-white hover:text-[#A08452]" />
        </button>

        {/* Add to Cart Button */}
        <div
          onClick={handleAddToCart}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 w-full
          transform translate-y-full group-hover:translate-y-0 
          transition-transform duration-300 ease-in-out"
        >
          <button
            className="w-full flex justify-center gap-4 items-center rounded-lg bg-[#795D2A] text-white text-2xl font-normal py-2 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            Add to Cart
            <Briefcase />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-3">
        <h3 className="text-xs font-medium">{product.name}</h3>
        <p className="text-[#7d6e8b] text-xs font-medium mt-1">
          ₹{product.price}
        </p>
      </div>
    </div>
  );
}

// Sample Data
const bestSellers = [
  {
    name: "Mirror Work Tangy Cotton Print Suit Set",
    price: "2999",
    image: "/image 19.png?height=400&width=300",
  },
  {
    name: "Magenta Embroidered Suit Set",
    price: "1950",
    image: "/lot_0036__PUN0667.png?height=400&width=300",
  },
  {
    name: "Violet Crepe Digital Print Coord Set",
    price: "2999",
    image: "/lot_0004__PUN0764.png?height=400&width=300",
  },
];

const newArrivals = [
  {
    name: "Mirror Work Tangy Cotton Print Suit Set",
    price: "2999",
    image: "/lot_0004__PUN0764.png?height=400&width=300",
  },
  {
    name: "Magenta Embroidered Suit Set",
    price: "1950",
    image: "/image 19.png?height=400&width=300",
  },
  {
    name: "Violet Crepe Digital Print Coord Set",
    price: "2999",
    image: "/lot_0036__PUN0667.png?height=400&width=300",
  },
  {
    name: "Mirror Work Tangy Cotton Print Suit Set",
    price: "2999",
    image: "/image.png?height=400&width=300",
  },
];
