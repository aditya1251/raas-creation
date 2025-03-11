import Image from "next/image"
import Link from "next/link"
import { Search, Filter, User, Package, Heart, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import SiteFooter from "@/components/site-footer"

export default function OrdersPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-medium">MY PROFILE</h1>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border rounded-md focus:outline-none w-64"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <Button className="bg-[#a08452] hover:bg-[#8c703d] text-white px-4 py-2 flex items-center space-x-2">
              <span>Filter</span>
              <Filter className="h-4 w-4" />
            </Button>
          </div>
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
              <Link href="/account/orders" className="flex items-center space-x-3 px-4 py-3 bg-[#a08452] text-white">
                <Package className="h-5 w-5" />
                <span>My Orders</span>
              </Link>
              <Link
                href="/account/wishlists"
                className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 border-b"
              >
                <Heart className="h-5 w-5 text-gray-500" />
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
            {/* Order 1 */}
            <div className="border-b pb-6 mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-24 relative">
                  <Image src="/placeholder.svg?height=96&width=80" alt="Product Image" fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Voilet Crape Digital Print Co-ord Set</h3>
                      <p className="text-sm text-gray-600 mt-1">Size: 38</p>
                      <p className="text-sm text-gray-600">Qty: 1</p>
                      <div className="mt-2">
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Delivered
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">Your product has been delivered</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹2599</p>
                      <div className="mt-4 space-y-2">
                        <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-50">
                          View Order
                        </Button>
                        <Button className="w-full bg-[#a08452] hover:bg-[#8c703d] text-white">Write A Review</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order 2 */}
            <div className="border-b pb-6 mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-24 relative">
                  <Image src="/placeholder.svg?height=96&width=80" alt="Product Image" fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Majenta embroidered suit set</h3>
                      <p className="text-sm text-gray-600 mt-1">Size: 46</p>
                      <p className="text-sm text-gray-600">Qty: 1</p>
                      <div className="mt-2">
                        <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                          In Process
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">Your product has been Inprocess</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹1950</p>
                      <div className="mt-4 space-y-2">
                        <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-50">
                          View Order
                        </Button>
                        <Button className="w-full bg-red-500 hover:bg-red-600 text-white">Cancel Order</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order 3 */}
            <div className="border-b pb-6 mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-24 relative">
                  <Image src="/placeholder.svg?height=96&width=80" alt="Product Image" fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Tailored Cotton Casual Shirt</h3>
                      <p className="text-sm text-gray-600 mt-1">Size: M</p>
                      <p className="text-sm text-gray-600">Qty: 1</p>
                      <div className="mt-2">
                        <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                          In Process
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">Your product has been Inprocess</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$40.00</p>
                      <div className="mt-4 space-y-2">
                        <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-50">
                          View Order
                        </Button>
                        <Button className="w-full bg-red-500 hover:bg-red-600 text-white">Cancel Order</Button>
                      </div>
                    </div>
                  </div>
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

