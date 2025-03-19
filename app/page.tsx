import Image from "next/image"
import { Heart, Package, RefreshCw, HeadphonesIcon, CreditCard } from "lucide-react"
import Navbar from "@/components/navbar"
import HeroBanner from "@/components/hero-banner"
import RaasKurtiesSection from "@/components/raas-kurties-section"
import BrowseCategorySection from "@/components/browse-category-section"
import SiteFooter from "@/components/site-footer"

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
        <h2 className="text-xl font-medium text-center mb-8">Our Best Seller</h2>

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
              <p className="text-xs text-gray-600">Free shipping for order above $100</p>
            </div>
            <div className="flex flex-col items-center">
              <RefreshCw className="h-6 w-6 mb-2" />
              <h3 className="font-medium text-sm mb-1">Money Guarantee</h3>
              <p className="text-xs text-gray-600">Within 30 days for exchange</p>
            </div>
            <div className="flex flex-col items-center">
              <HeadphonesIcon className="h-6 w-6 mb-2" />
              <h3 className="font-medium text-sm mb-1">Online Support</h3>
              <p className="text-xs text-gray-600">24 hours a day, 7 days a week</p>
            </div>
            <div className="flex flex-col items-center">
              <CreditCard className="h-6 w-6 mb-2" />
              <h3 className="font-medium text-sm mb-1">Flexible Payment</h3>
              <p className="text-xs text-gray-600">Pay with multiple credit cards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </main>
  )
}

// Product Card Component
function ProductCard({ product }) {
  return (
    <div className="group relative">
      <div className="aspect-[3/4] relative overflow-hidden bg-gray-100">
        <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        <button className="absolute top-2 right-2 h-6 w-6 bg-white rounded-full flex items-center justify-center">
          <Heart className="h-3 w-3" />
        </button>
      </div>
      <div className="mt-3">
        <h3 className="text-xs font-medium">{product.name}</h3>
        <p className="text-[#7d6e8b] text-xs font-medium mt-1">₹{product.price}</p>
      </div>
    </div>
  )
}

// Sample Data
const bestSellers = [
  {
    name: "Mirror Work Tangy Cotton Print Suit Set",
    price: "2999",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    name: "Magenta Embroidered Suit Set",
    price: "1950",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    name: "Violet Crepe Digital Print Coord Set",
    price: "2999",
    image: "/placeholder.svg?height=400&width=300",
  },
]

const newArrivals = [
  {
    name: "Mirror Work Tangy Cotton Print Suit Set",
    price: "2999",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    name: "Magenta Embroidered Suit Set",
    price: "1950",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    name: "Violet Crepe Digital Print Coord Set",
    price: "2999",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    name: "Mirror Work Tangy Cotton Print Suit Set",
    price: "2999",
    image: "/placeholder.svg?height=400&width=300",
  },
]

