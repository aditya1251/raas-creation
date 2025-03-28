"use client";
import { apiClient } from "@/lib/axiosClient";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link"
import { useEffect, useState } from "react";


export function RecentOrders() {
  const oldorders = [
    { id: "1234", customer: "John Doe", total: 99.99, status: "Pending" }
  ]

  const [orders, setOrders] = useState(oldorders);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: () => apiClient.get("/api/orders?limit=5"),
    refetchInterval: 5000,
  })

  useEffect(() => {
    if (data) {
      setOrders(data.data.orders);
    }
  }, [data]);

  

  if (isError) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm min-h-[400px] flex items-center justify-center text-red-500">
        Error fetching data. Please try again later.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-[#4f507f]">Recent Orders</h2>
        <Link href="/admin/orders" className="text-[#4f507f] hover:text-[#6365a3] transition-colors duration-200 text-sm font-medium">
          View all orders →
        </Link>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading || orders.length === 0 && (
              <tr className="hover:bg-gray-50 transition-colors duration-200">
                <td colSpan={4} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}

            {!isLoading && orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-[#4f507f]">#{order.id}</td>
                <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-700">₹{order.total.toFixed(2)}</td>
                <td className="px-6 py-2 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === "Delivered" ? "bg-green-100 text-green-800" :
                    order.status === "Shipped" ? "bg-blue-100 text-blue-800" :
                    "bg-yellow-100 text-yellow-800"
                  }`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
