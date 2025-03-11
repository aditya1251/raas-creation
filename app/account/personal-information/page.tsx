import Image from "next/image"
import Link from "next/link"
import { User, Package, Heart, MapPin, PenSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import SiteFooter from "@/components/site-footer"

export default function PersonalInformationPage() {
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
                className="flex items-center space-x-3 px-4 py-3 bg-[#a08452] text-white"
              >
                <User className="h-5 w-5" />
                <span>Personal Information</span>
              </Link>
              <Link href="/account/orders" className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 border-b">
                <Package className="h-5 w-5 text-gray-500" />
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
            <div className="flex justify-between items-start mb-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=96&width=96"
                    alt="Profile Picture"
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-0 right-0 bg-[#a08452] text-white p-1 rounded-full">
                  <PenSquare className="h-4 w-4" />
                </div>
              </div>

              <Button className="bg-[#a08452] hover:bg-[#8c703d] text-white">Edit Profile</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  value="Abhishek"
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a08452]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  value="Chaudhary"
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a08452]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value="+91 8630083188"
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a08452]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value="abhishekchaudhary@gmail.com"
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a08452]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address Number</label>
                <input
                  type="text"
                  value="Store: 204/2-c & d , basement , jeewan nagar , ashram, New Delhi-110014"
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a08452]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}

