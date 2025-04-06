"use client"

import { useState, useEffect } from "react"
import { Eye, Search, X } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { orderApi, Order } from "@/lib/api/orders"
import { useDebounce } from "@/hooks/useDebounce"

interface OrderWithCustomer extends Order {
  customer?: {
    name: string;
  };
  date?: string;
}

interface PaginatedOrdersResponse {
  orders: OrderWithCustomer[];
  pagination: {
    totalPages: number;
    currentPage: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export function OrdersTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState<OrderWithCustomer | null>(null);
  
  // Debounce search term to avoid excessive API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  const { data, isLoading, error } = useQuery<PaginatedOrdersResponse>({
    queryKey: ["orders", currentPage, itemsPerPage, debouncedSearchTerm],
    queryFn: () => orderApi.getOrders(
      currentPage.toString(), 
      itemsPerPage.toString(), 
      debouncedSearchTerm
    ),
  });

  const orders = data?.orders || [];
  const totalPages = data?.pagination?.totalPages || 1;

  const getStatusColor = (paid: boolean | undefined) => {
    if (paid === undefined) return "bg-gray-100 text-gray-800";
    return paid 
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";
  }

  const getStatus = (paid: boolean | undefined) => {
    if (paid === undefined) return "Processing";
    return paid ? "Paid" : "Pending";
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search orders..."
          className="w-full bg-white p-2 pl-10 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
      </div>

      {isLoading && <div className="flex justify-center p-4">Loading...</div>}
      {!isLoading && !orders.length && (
        <div className="p-4">No orders found</div>
      )}
      {error && <div className="text-red-500 p-4">Error loading orders</div>}
      
      {/* Desktop Table View - Hidden on small screens */}
      <div className="hidden lg:block bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
              <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
              <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order: OrderWithCustomer) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm text-gray-500">{order.userId}</td>
                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm text-gray-500">₹{order.total.toFixed(2)}</td>
                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.paid)}`}
                  >
                    {getStatus(order.paid)}
                  </span>
                </td>
                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm text-gray-500">{order.items.length}</td>
                <td className="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => setSelectedOrder(order)} 
                    className="text-indigo-600 hover:text-indigo-900 p-1.5 rounded-full hover:bg-indigo-50">
                    <Eye size={16} className="md:size-18" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View - Only visible on small screens */}
      <div className="lg:hidden space-y-3">
        {orders.map((order: OrderWithCustomer) => (
          <div key={order.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">Order #{order.id}</p>
                <p className="text-xs text-gray-500">User ID: {order.userId}</p>
              </div>
              <div>
                <span
                  className={`px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full ${getStatusColor(order.paid)}`}
                >
                  {getStatus(order.paid)}
                </span>
              </div>
            </div>
            <div className="mt-3 border-t border-gray-100 pt-3">
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">Items: {order.items.length}</p>
                <p className="text-sm font-medium">₹{order.total.toFixed(2)}</p>
              </div>
            </div>
            <div className="mt-3 flex justify-end">
              <button 
                onClick={() => setSelectedOrder(order)}
                className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
              >
                <Eye size={14} />
                <span>View Details</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Responsive Pagination */}
      <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          {/* Items per page - Full width on mobile */}
          <div className="w-full sm:w-auto">
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-gray-700 text-sm">
              <option value="5">5 per page</option>
              <option value="10">10 per page</option>
              <option value="25">25 per page</option>
              <option value="50">50 per page</option>
            </select>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-center w-full sm:w-auto">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-2 sm:px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="hidden sm:inline ml-1">Previous</span>
            </button>

            {/* Page numbers - Hidden on mobile */}
            <div className="hidden sm:flex items-center mx-2 space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg transition-colors duration-200 ${
                      currentPage === pageNum
                        ? "bg-indigo-600 text-white font-medium shadow-md"
                        : "border border-gray-300 hover:bg-gray-50 text-gray-700"
                    }`}>
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            {/* Mobile page indicator */}
            <span className="mx-2 text-sm sm:hidden">
              Page {currentPage} of {totalPages}
            </span>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-2 sm:px-4 py-2 bg-white border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 flex items-center">
              <span className="hidden sm:inline mr-1">Next</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="relative mx-auto p-4 sm:p-5 w-full max-w-sm sm:max-w-md shadow-lg rounded-md bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-base sm:text-lg font-medium text-gray-900">Order Details</h3>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            <div className="mt-2 py-2">
              <div className="space-y-2">
                <p className="text-xs sm:text-sm text-gray-500">
                  <span className="font-medium text-gray-700">Order ID:</span> {selectedOrder.id}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  <span className="font-medium text-gray-700">User ID:</span> {selectedOrder.userId}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  <span className="font-medium text-gray-700">Address ID:</span> {selectedOrder.addressId}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  <span className="font-medium text-gray-700">Total:</span> ₹{selectedOrder.total.toFixed(2)}
                </p>
                <p className="text-xs sm:text-sm">
                  <span className="font-medium text-gray-700">Status:</span>{" "}
                  <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(selectedOrder.paid)}`}>
                    {getStatus(selectedOrder.paid)}
                  </span>
                </p>
              </div>
              <div className="mt-4">
                <h4 className="text-sm sm:text-md font-medium text-gray-900 mb-2">Items:</h4>
                <div className="max-h-[200px] overflow-y-auto pr-1">
                  <ul className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <li key={index} className="text-xs sm:text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{item.productName}</p>
                            <p className="text-gray-500">Quantity: {item.quantity}</p>
                          </div>
                          <p className="font-medium">₹{item.priceAtOrder.toFixed(2)}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
              <button 
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 text-xs sm:text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}