import Image from "next/image"
import Link from "next/link"
import { User, Package, Heart, MapPin, ShoppingBag, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import SiteFooter from "@/components/site-footer"

export default function WishlistsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-medium">MY PROFILE</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="border rounded-md p-4 mb-4 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full overflow-hidden mb-3">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="Profile Picture"
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>
              <p className="text-sm text-gray-600 mb-1">Hello 👋</p>
              <h2 className="font-medium">Abhishek Chaudhary</h2>
            </div>

            <nav className="border rounded-md overflow-hidden">
              <Link
                href="/account/personal-information"
                className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 border-b"
              >
                <User className="h-5 w-5 text-gray-500" />
                <span>Personal Information</span>
              </Link>
              <Link href="/account/orders" className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 border-b">
                <Package className="h-5 w-5 text-gray-500" />
                <span>My Orders</span>
              </Link>
              <Link href="/account/wishlists" className="flex items-center space-x-3 px-4 py-3 bg-[#a08452] text-white">
                <Heart className="h-5 w-5" />
                <span>My Wishlists</span>
              </Link>
              <Link href="/account/addresses" className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50">
                <MapPin className="h-5 w-5 text-gray-500" />
                <span>Manage Addresses</span>
              </Link>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Wishlist Item 1 */}
              <div className="border rounded-md overflow-hidden group">
                <div className="relative">
                  <div className="aspect-[3/4] relative">
                    <Image
                      src="/placeholder.svg?height=400&width=300"
                      alt="Product Image"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button className="absolute top-2 right-2 h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <X className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-sm mb-1">Mirror Work Tangy Cotton Print Suit Set</h3>
                  <p className="text-[#a08452] font-medium mb-3">₹2999</p>
                  <Button className="w-full bg-[#a08452] hover:bg-[#8c703d] text-white flex items-center justify-center gap-2">
                    <ShoppingBag className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>

              {/* Wishlist Item 2 */}
              <div className="border rounded-md overflow-hidden group">
                <div className="relative">
                  <div className="aspect-[3/4] relative">
                    <Image
                      src="/placeholder.svg?height=400&width=300"
                      alt="Product Image"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button className="absolute top-2 right-2 h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <X className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-sm mb-1">Magenta Embroidered Suit Set</h3>
                  <p className="text-[#a08452] font-medium mb-3">₹1950</p>
                  <Button className="w-full bg-[#a08452] hover:bg-[#8c703d] text-white flex items-center justify-center gap-2">
                    <ShoppingBag className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>

              {/* Wishlist Item 3 */}
              <div className="border rounded-md overflow-hidden group">
                <div className="relative">
                  <div className="aspect-[3/4] relative">
                    <Image
                      src="/placeholder.svg?height=400&width=300"
                      alt="Product Image"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button className="absolute top-2 right-2 h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <X className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-sm mb-1">Violet Crepe Digital Print Coord Set</h3>
                  <p className="text-[#a08452] font-medium mb-3">₹2999</p>
                  <Button className="w-full bg-[#a08452] hover:bg-[#8c703d] text-white flex items-center justify-center gap-2">
                    <ShoppingBag className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}

