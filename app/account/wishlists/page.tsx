"use client"
import Image from "next/image"
import Link from "next/link"
import { User, Package, Heart, MapPin, ShoppingBag, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import SiteFooter from "@/components/site-footer"
import { useEffect, useState } from "react"
import { wishlistApi } from "@/lib/api/wishlist"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

interface PaginatedWishlistResponse {
  wishlists: any[];
  pagination: {
    totalPages: number;
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export default function WishlistsPage() {
  const [wishlistProducts, setWishlistProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, isLoading, error } = useQuery<PaginatedWishlistResponse>({
    queryKey: ["wishlistProducts", currentPage, itemsPerPage],
    queryFn: async () => {
      const response = await wishlistApi.getAll(currentPage, itemsPerPage);
      return response;
    },
  });

  const removeFromWishlist = useMutation({
    mutationFn: (productId: string) => wishlistApi.removeFromWishlist(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlistProducts"] });
      toast.success("Item removed from wishlist");
    },
    onError: () => {
      toast.error("Failed to remove item from wishlist");
    },
  });

  useEffect(() => {
    if (data) {
      setWishlistProducts(data.wishlists);
      setTotalPages(data.pagination.totalPages);
    }
  }, [data]);
  
  const handleRemoveItem = (productId: string, productName: string) => {
    removeFromWishlist.mutate(productId);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

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
            {isLoading && (
              <div className="flex justify-center items-center h-40">
                <p>Loading...</p>
              </div>
            )}

            {!isLoading && wishlistProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center h-40 border rounded-md p-6">
                <Heart className="h-12 w-12 text-gray-300 mb-4" />
                <p className="text-gray-500 mb-4">Your wishlist is empty</p>
                <Button 
                  onClick={() => router.push('/')} 
                  className="bg-[#a08452] hover:bg-[#8c703d] text-white"
                >
                  Continue Shopping
                </Button>
              </div>
            )}

            {!isLoading && wishlistProducts.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistProducts.map((item) => (
                    <div key={item.id} className="border rounded-md overflow-hidden group">
                      <div className="relative">
                        <div className="aspect-[3/4] relative">
                          <Image
                            src={item.product.assets[0].asset_url}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <button 
                          className="absolute top-2 right-2 h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-100"
                          onClick={() => handleRemoveItem(item.product.id, item.product.name)}
                        >
                          <X className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-sm mb-1">{item.product.name}</h3>
                        <p className="text-[#a08452] font-medium mb-3">₹{item.product.discountPrice}</p>
                        <Button 
                          onClick={() => router.push(`/product/${item.product.slug}`)} 
                          className="w-full bg-[#a08452] hover:bg-[#8c703d] text-white flex items-center justify-center gap-2"
                        >
                          <ShoppingBag className="h-4 w-4" />
                          View Product
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          className={currentPage === page ? "bg-[#a08452] hover:bg-[#8c703d]" : ""}
                        >
                          {page}
                        </Button>
                      ))}
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
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
