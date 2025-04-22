"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { orderApi } from "@/lib/api/orders";

export default function OrdersPage() {
  const [currentPage, setCurrentPage] = useState("1");
  const [itemsPerPage, setItemsPerPage] = useState("10");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  // Fetch orders with React Query
  const { data, isLoading } = useQuery({
    queryKey: ["Orders"],
    queryFn: () =>
      orderApi.getOrders(currentPage, itemsPerPage, debouncedSearchTerm),
  });

  console.log(data);
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage("1"); // Reset to first page on new search
  };

  // Pagination controls
  const handlePreviousPage = () => {
    if (data?.pagination.currentPage > 1) {
      setCurrentPage(String(data.pagination.currentPage - 1));
    }
  };

  const handleNextPage = () => {
    if (data?.pagination.currentPage < data?.pagination.totalPages) {
      setCurrentPage(String(data.pagination.currentPage + 1));
    }
  };

  // Function to determine status style based on order status
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "in process":
      case "inprocess":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
      case "canceled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <>
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
              className={
                index !== data.orders.length - 1
                  ? "border-b pb-6 mb-6"
                  : "pb-6 mb-6"
              }
            >
              <div className="flex items-center space-x-4">
                <div className="w-20 h-24 relative">
                  <Image
                    src={
                      order.productImage ||
                      "/placeholder.svg?height=96&width=80"
                    }
                    alt={order.productName || "Product Image"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{order.productName}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Size: {order.size}
                      </p>
                      <p className="text-sm text-gray-600">
                        Qty: {order.quantity}
                      </p>
                      <div className="mt-2">
                        <span
                          className={`inline-block px-3 py-1 ${getStatusStyle(
                            order.status
                          )} text-xs rounded-full`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">
                        {order.statusMessage ||
                          `Your product has been ${order.status}`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{order.price}</p>
                      <div className="mt-4 space-y-2">
                        <Button
                          variant="outline"
                          className="w-full border-gray-300 hover:bg-gray-50"
                        >
                          View Order
                        </Button>

                        {/* Conditional button based on order status */}
                        {order.status?.toLowerCase() === "delivered" ? (
                          <Button className="w-full bg-[#a08452] hover:bg-[#8c703d] text-white">
                            Write A Review
                          </Button>
                        ) : order.status?.toLowerCase() === "in process" ||
                          order.status?.toLowerCase() === "inprocess" ? (
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
                Page {data.pagination.currentPage} of{" "}
                {data.pagination.totalPages}
              </div>
              <Button
                onClick={handleNextPage}
                disabled={
                  data.pagination.currentPage >= data.pagination.totalPages
                }
                variant="outline"
                className="border-gray-300"
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
}
