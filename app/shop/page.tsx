"use client";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  Heart,
  LayoutGrid,
  List,
  Package,
  RefreshCw,
  HeadphonesIcon,
  CreditCard,
  ChevronRight,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/context/cart-context";
import Navbar from "@/components/navbar";
import SiteFooter from "@/components/site-footer";
import { useToast } from "@/hooks/use-toast";

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center text-sm">
          <Link href="/shop" className="text-gray-600 hover:text-[#795d2a]">
            Shop
          </Link>
          <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
          <span className="text-gray-900">All Products</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full md:w-64 shrink-0">
            {/* Product Categories */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Product Categories</h3>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="kurta-set" defaultChecked />
                  <label htmlFor="kurta-set" className="text-sm cursor-pointer">
                    Kurta Set
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="suit-set" />
                  <label htmlFor="suit-set" className="text-sm cursor-pointer">
                    Suit Set
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="anarkali" />
                  <label htmlFor="anarkali" className="text-sm cursor-pointer">
                    Anarkali
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="lounge-wear" />
                  <label
                    htmlFor="lounge-wear"
                    className="text-sm cursor-pointer"
                  >
                    Lounge Wear
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="kurtis-dresses" />
                  <label
                    htmlFor="kurtis-dresses"
                    className="text-sm cursor-pointer"
                  >
                    Kurtis & Dresses
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="luxe-collection" />
                  <label
                    htmlFor="luxe-collection"
                    className="text-sm cursor-pointer"
                  >
                    Luxe Collection
                  </label>
                </div>
              </div>
            </div>

            {/* Filter By Price */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Filter By Price</h3>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm mb-2">Price: ₹0 - ₹6000</p>
                <input
                  type="range"
                  min="0"
                  max="6000"
                  defaultValue="6000"
                  className="w-full h-1 bg-[#A08452] rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Filter By Color */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Filter By Color</h3>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-600 rounded-sm"></div>
                  <span className="text-sm">Red</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-600 rounded-sm"></div>
                  <span className="text-sm">Blue</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-600 rounded-sm"></div>
                  <span className="text-sm">Green</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-cyan-500 rounded-sm"></div>
                  <span className="text-sm">Cyan</span>
                </div>
              </div>
            </div>

            {/* Size */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Size</h3>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="size-36" defaultChecked />
                  <label htmlFor="size-36" className="text-sm cursor-pointer">
                    36
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="size-38" />
                  <label htmlFor="size-38" className="text-sm cursor-pointer">
                    38
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="size-40" />
                  <label htmlFor="size-40" className="text-sm cursor-pointer">
                    40
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="size-42" />
                  <label htmlFor="size-42" className="text-sm cursor-pointer">
                    42
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="size-44" />
                  <label htmlFor="size-44" className="text-sm cursor-pointer">
                    44
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="size-46" />
                  <label htmlFor="size-46" className="text-sm cursor-pointer">
                    46
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-2">
                <button className="p-2 border rounded bg-gray-100">
                  <LayoutGrid className="h-5 w-5" />
                </button>
                <button className="p-2 border rounded text-gray-400">
                  <List className="h-5 w-5" />
                </button>
              </div>
              <div>
                <div className="relative inline-block">
                  <select className="appearance-none border rounded-md px-4 py-2 pr-8 focus:outline-none text-sm">
                    <option>Sort by latest</option>
                    <option>Sort by popularity</option>
                    <option>Sort by price: low to high</option>
                    <option>Sort by price: high to low</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>

            {/* Load More Button */}
            <div className="mt-10 text-center">
              <Button
                variant="outline"
                className="border-[#795d2a] text-[#795d2a] hover:bg-[#795d2a] hover:text-white px-8 py-2 rounded-none"
              >
                Load More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="py-10 border-t">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Package className="h-10 w-10 mb-3 text-[#795d2a]" />
              <h3 className="font-medium text-base mb-1">Free Shipping</h3>
              <p className="text-sm text-gray-600">
                Free shipping for order above $150
              </p>
            </div>
            <div className="flex flex-col items-center">
              <RefreshCw className="h-10 w-10 mb-3 text-[#795d2a]" />
              <h3 className="font-medium text-base mb-1">Money Guarantee</h3>
              <p className="text-sm text-gray-600">
                Within 30 days for an exchange
              </p>
            </div>
            <div className="flex flex-col items-center">
              <HeadphonesIcon className="h-10 w-10 mb-3 text-[#795d2a]" />
              <h3 className="font-medium text-base mb-1">Online Support</h3>
              <p className="text-sm text-gray-600">
                24 hours a day, 7 days a week
              </p>
            </div>
            <div className="flex flex-col items-center">
              <CreditCard className="h-10 w-10 mb-3 text-[#795d2a]" />
              <h3 className="font-medium text-base mb-1">Flexible Payment</h3>
              <p className="text-sm text-gray-600">
                Pay with multiple credit cards
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

// Product Card Component
function ProductCard({ product }) {
  // const { toast } = useToast();
  // const { addToCart } = useCart();
  // const handleAddToCart = () => {
  //   // Add item to cart
  //   addToCart({
  //     id: demoProduct.id as string,
  //     name: demoProduct.name,
  //     price: demoProduct.price,
  //     originalPrice: demoProduct.originalPrice,
  //     quantity: 1,
  //     color: "orange",
  //     size: "40",
  //     image: demoProduct.images[0],
  //   });

  //   // Show success toast
  //   toast({
  //     title: "Added to cart",
  //     description: `${product.name} has been added to your cart.`,
  //   });
  // };
  // // Mock product data - in a real app, this would come from an API
  // const demoProduct = {
  //   id: product.id,
  //   name: "Raas - Velvet Embroidered Suit Set",
  //   description:
  //     "Discover our mid cotton anarkali set with pillan work yok paired with pant and back print dupatta. This outfit exudes a charming and delicate appeal, making it perfect for festive event, pooja, light gathering, day to day life.",
  //   price: 3490.0,
  //   originalPrice: 4899.0,
  //   rating: 4.9,
  //   reviews: 2890,
  //   inStock: true,
  //   colors: ["orange", "blue", "black"],
  //   sizes: ["38", "40", "44", "46", "48"],
  //   images: [
  //     "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Raas_Creation_Web_Design.png-22zL20iPWx4nVh3qQdh5EwkvzWf4H0.jpeg",
  //     "/placeholder.svg?height=100&width=100",
  //     "/placeholder.svg?height=100&width=100",
  //     "/placeholder.svg?height=100&width=100",
  //   ],
  // };
  return (
    <div className="group relative">
      <div className="aspect-[3/4] relative overflow-hidden rounded-xl bg-gray-100">
        <Link href={`/shop/product/${product.id}`}>
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <button
          className="absolute top-3 right-3 aspect-square w-8 bg-[#795D2A] rounded-full flex items-center justify-center 
          opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[100%] group-hover:translate-x-0"
        >
          <Heart className="aspect-square w-4 text-white hover:text-[#A08452]" />
        </button>

        {/* Add to Cart Button */}
        <div
          // onClick={handleAddToCart}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 w-full
          transform translate-y-full group-hover:translate-y-0 
          transition-transform duration-300 ease-in-out"
        >
          <button
            className="w-full flex justify-center gap-4 items-center rounded-lg bg-[#795D2A] text-white text-lg font-normal py-2 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            Add to Cart
            <Briefcase />
          </button>
        </div>
      </div>
      <div className="mt-3">
        <Link href={`/shop/product/${product.id}`} className="block">
          <h3 className="text-sm font-medium">{product.name}</h3>
        </Link>
        <div className="flex items-center mt-1">
          <span className="text-sm font-medium">₹{product.salePrice}</span>
          <span className="text-xs text-gray-500 line-through ml-2">
            ₹{product.regularPrice}
          </span>
        </div>
      </div>
    </div>
  );
}

// Sample Product Data
const products = [
  {
    id: 1,
    name: "Mirror Work Tangy Cotton Print Suit Set",
    salePrice: "1990",
    regularPrice: "2999",
    image:
      "https://res.cloudinary.com/dklqhgo8r/image/upload/v1741713850/t2p30xzk3gixgprfvwbn.png",
    color: "orange",
  },
  {
    id: 2,
    name: "Mirror Work Tangy Cotton Print Suit Set",
    salePrice: "2500",
    regularPrice: "3499",
    image:
      "https://res.cloudinary.com/dklqhgo8r/image/upload/v1741713850/t2p30xzk3gixgprfvwbn.png",
    color: "red",
  },
  {
    id: 3,
    name: "Mirror Work Tangy Cotton Print Suit Set",
    salePrice: "2950",
    regularPrice: "3800",
    image:
      "https://res.cloudinary.com/dklqhgo8r/image/upload/v1741713850/t2p30xzk3gixgprfvwbn.png",
    color: "purple",
  },
  {
    id: 4,
    name: "Mirror Work Tangy Cotton Print Suit Set",
    salePrice: "2500",
    regularPrice: "3499",
    image:
      "https://res.cloudinary.com/dklqhgo8r/image/upload/v1741713850/t2p30xzk3gixgprfvwbn.png",
    color: "red",
  },
  {
    id: 5,
    name: "Mirror Work Tangy Cotton Print Suit Set",
    salePrice: "1990",
    regularPrice: "2999",
    image:
      "https://res.cloudinary.com/dklqhgo8r/image/upload/v1741713850/t2p30xzk3gixgprfvwbn.png",
    color: "orange",
  },
  {
    id: 6,
    name: "Mirror Work Tangy Cotton Print Suit Set",
    salePrice: "2950",
    regularPrice: "3800",
    image:
      "https://res.cloudinary.com/dklqhgo8r/image/upload/v1741713850/t2p30xzk3gixgprfvwbn.png",
    color: "purple",
  },
  {
    id: 7,
    name: "Mirror Work Tangy Cotton Print Suit Set",
    salePrice: "1990",
    regularPrice: "2999",
    image:
      "https://res.cloudinary.com/dklqhgo8r/image/upload/v1741713850/t2p30xzk3gixgprfvwbn.png",
    color: "orange",
  },
  {
    id: 8,
    name: "Mirror Work Tangy Cotton Print Suit Set",
    salePrice: "2500",
    regularPrice: "3499",
    image:
      "https://res.cloudinary.com/dklqhgo8r/image/upload/v1741713850/t2p30xzk3gixgprfvwbn.png",
    color: "red",
  },
  {
    id: 9,
    name: "Mirror Work Tangy Cotton Print Suit Set",
    salePrice: "2950",
    regularPrice: "3800",
    image:
      "https://res.cloudinary.com/dklqhgo8r/image/upload/v1741713850/t2p30xzk3gixgprfvwbn.png",
    color: "purple",
  },
];
