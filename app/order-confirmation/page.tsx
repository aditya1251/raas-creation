"use client"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle, Package, Truck, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import SiteFooter from "@/components/site-footer"
import { Order, orderApi } from "@/lib/api/orders"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

export default function OrderConfirmationPage() {

  const lastOrderId = localStorage.getItem("lastOrderId");
  const router = useRouter();

  const [order, setOrder] = useState<Order | null>(null);
  if (!lastOrderId) {
    router.push("/shop");
  }
  const {data , isLoading, isError} = useQuery({
    queryKey: ["order", lastOrderId],
    queryFn: () => {
      return orderApi.getOrderById(lastOrderId ?? "abc");
    }
  });

  useEffect(()=> {
    if(data) {
      console.log(data);
      setOrder(data);
    }
  },[data])

  if (isError) {
    return <div>Error loading order</div>;
  }

  if (isLoading && !order) {
    return <div>Loading...</div>;
  }
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-medium mb-2">Order Confirmed!</h1>
            <p className="text-gray-600">
              Thank you for your purchase. Your order has been confirmed and will be shipped soon.
            </p>
          </div>

          <div className="bg-[#ffefd4] p-6 rounded-md mb-8">
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <div>
                <h2 className="font-medium">Order ID</h2>
                <p className="text-[#795d2a]">{order?.id}</p>
              </div>
              {/* <div className="mt-4 md:mt-0">
                <h2 className="font-medium">Estimated Delivery</h2>
                <p className="text-[#795d2a]">
                  {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div> */}
            </div>

            <div className="flex items-center justify-between relative pt-6">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-[#795d2a] rounded-full flex items-center justify-center text-white z-10">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <span className="text-xs mt-1">Confirmed</span>
              </div>

              <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] h-1 bg-gray-200 top-10 z-0">
                <div className="h-full w-1/3 bg-[#795d2a]"></div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 z-10">
                  <Package className="h-4 w-4" />
                </div>
                <span className="text-xs mt-1">Processing</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 z-10">
                  <Truck className="h-4 w-4" />
                </div>
                <span className="text-xs mt-1">Shipped</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 z-10">
                  <ShoppingBag className="h-4 w-4" />
                </div>
                <span className="text-xs mt-1">Delivered</span>
              </div>
            </div>
          </div>

          <div className="border rounded-md overflow-hidden mb-8">
            <div className="bg-gray-50 p-4 border-b">
              <h2 className="font-medium">Order Details</h2>
            </div>

            <div className="p-4 space-y-4">
              {/* Order Item 1 */}
              {order?.items.map((item, index) => (
                <div className="flex gap-4 pt-4 border-t">
                  <div className="w-16 h-20 relative flex-shrink-0 rounded-md overflow-hidden">
                    <Image src={item.productImage} alt="Product Image" fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{item.productName}</h3>
                    <p className="text-xs text-gray-500 mt-1">Size: {item.size.split("SIZE_")[1]} | Color: {item.color}</p>
                    <div className="flex justify-between mt-2">
                      <span className="text-sm">Qty: {item.quantity}</span>
                      <span className="text-sm font-medium">₹{item.priceAtOrder.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t">
              <div className="space-y-2">
                {/* <div className="flex justify-between">
                  <span className="text-sm">Subtotal</span>
                  <span className="text-sm">₹10,470</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Delivery Charge</span>
                  <span className="text-sm">₹70</span>
                </div> */}
                <div className="flex justify-between pt-2 border-t font-medium">
                  <span>Total</span>
                  <span>₹{order?.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-md overflow-hidden mb-8">
            <div className="bg-gray-50 p-4 border-b">
              <h2 className="font-medium">Shipping Address</h2>
            </div>

            <div className="p-4">
              <p className="font-medium">{order?.address?.firstName} {order?.address?.lastName}</p>
              <p className="text-sm text-gray-600 mt-1">
                {order?.address?.aptNumber} {order?.address?.street}
                <br />
                {order?.address?.city}, {order?.address?.state}, {order?.address?.zipCode}
                <br />
                Phone: +91 {order?.address?.phoneNumber}
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link href="/shop">
              <Button className="bg-[#a08452] hover:bg-[#8c703d] text-white px-8">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

