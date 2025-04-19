"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Filter, User, Package, Heart, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import SiteFooter from "@/components/site-footer"
import { useQuery } from "@tanstack/react-query"
import { orderApi } from "@/lib/api/orders"

export default function OrdersPage() {
  const [currentPage, setCurrentPage] = useState("1")
  const [itemsPerPage, setItemsPerPage] = useState("10")
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [searchTerm])

  // Fetch orders with React Query
  const { data, isLoading } = useQuery({
    queryKey: ["Orders", currentPage, itemsPerPage, debouncedSearchTerm],
    queryFn: () => orderApi.getOrders(currentPage, itemsPerPage, debouncedSearchTerm)
  })

  console.log(data)
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage("1") // Reset to first page on new search
  }

  // Pagination controls
  const handlePreviousPage = () => {
    if (data?.pagination.currentPage > 1) {
      setCurrentPage(String(data.pagination.currentPage - 1))
    }
  }

  const handleNextPage = () => {
    if (data?.pagination.currentPage < data?.pagination.totalPages) {
      setCurrentPage(String(data.pagination.currentPage + 1))
    }
  }

  // Function to determine status style based on order status
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "in process":
      case "inprocess":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
      case "canceled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

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
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-2 border rounded-md focus:outline-none w-64"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <Button 
              className="bg-[#a08452] hover:bg-[#8c703d] text-white px-4 py-2 flex items-center space-x-2"
            >
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
              <h2 className="font-medium">{data?.user?.name || "Abhishek Chaudhary"}</h2>
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
            {isLoading ? (
              // Loading state
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a08452]"></div>
              </div>
            ) : data?.orders?.length === 0 ? (
              // No orders state
              <div className="text-center py-16">
                <p className="text-gray-500">No orders found</p>
              </div>
            ) : (
              // Orders list
              <>
                {data?.orders?.map((order, index) => (
                  <div 
                    key={order.id || index} 
                    className={index !== data.orders.length - 1 ? "border-b pb-6 mb-6" : "pb-6 mb-6"}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-24 relative">
                        <Image 
                          src={order.productImage || "/placeholder.svg?height=96&width=80"} 
                          alt={order.productName || "Product Image"} 
                          fill 
                          className="object-cover" 
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{order.productName}</h3>
                            <p className="text-sm text-gray-600 mt-1">Size: {order.size}</p>
                            <p className="text-sm text-gray-600">Qty: {order.quantity}</p>
                            <div className="mt-2">
                              <span className={`inline-block px-3 py-1 ${getStatusStyle(order.status)} text-xs rounded-full`}>
                                {order.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">
                              {order.statusMessage || `Your product has been ${order.status}`}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">₹{order.price}</p>
                            <div className="mt-4 space-y-2">
                              <Button variant="outline" className="w-full border-gray-300 hover:bg-gray-50">
                                View Order
                              </Button>
                              
                              {/* Conditional button based on order status */}
                              {order.status?.toLowerCase() === "delivered" ? (
                                <Button className="w-full bg-[#a08452] hover:bg-[#8c703d] text-white">
                                  Write A Review
                                </Button>
                              ) : order.status?.toLowerCase() === "in process" || order.status?.toLowerCase() === "inprocess" ? (
                                <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                                  Cancel Order
                                </Button>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Pagination controls */}
                {data?.pagination && data.pagination.totalPages > 1 && (
                  <div className="flex justify-between items-center mt-8">
                    <Button 
                      onClick={handlePreviousPage}
                      disabled={data.pagination.currentPage <= 1}
                      variant="outline"
                      className="border-gray-300"
                    >
                      Previous
                    </Button>
                    <div className="text-sm text-gray-600">
                      Page {data.pagination.currentPage} of {data.pagination.totalPages}
                    </div>
                    <Button 
                      onClick={handleNextPage}
                      disabled={data.pagination.currentPage >= data.pagination.totalPages}
                      variant="outline"
                      className="border-gray-300"
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}