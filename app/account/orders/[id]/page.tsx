"use client";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  FileText,
  Download,
  HelpCircle,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { orderApi } from "@/lib/api/orders";

export default function OrderDetailsPage() {
  // In a real app, you would fetch order details based on the ID

  const orderId = useParams().id;
  // const orderDetails = {
  //   id: "ORD-2023-1234",
  //   date: "March 15, 2024",
  //   status: "Delivered",
  //   items: [
  //     {
  //       id: 1,
  //       name: "Voilet Crape Digital Print Co-ord Set",
  //       size: "38",
  //       color: "Purple",
  //       quantity: 1,
  //       price: 2599,
  //       image: "/placeholder.svg?height=96&width=80",
  //     },
  //   ],
  //   shipping: {
  //     address: "204/2-c & d, basement, jeewan nagar, ashram, New Delhi-110014",
  //     method: "Standard Delivery",
  //     tracking: "IND123456789",
  //   },
  //   payment: {
  //     method: "Credit Card",
  //     subtotal: 2599,
  //     shipping: 70,
  //     tax: 130,
  //     total: 2799,
  //   },
  // };
  const {data:orderDetails}=useQuery({
    queryKey: ["orderDetails", orderId],
    queryFn: async () => {
      const res = await orderApi.getOrderById(orderId as string);
      return res;
    },
  })
  console.log(orderDetails);

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/account/orders"
          className="inline-flex items-center text-gray-600 hover:text-[#a08452] transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span>Back to Orders</span>
        </Link>
      </div>

      {/* Order Header */}
      <div className="bg-[#faf5eb] rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-medium mb-1">
              Order #{orderDetails?.orderId}
            </h1>
            <p className="text-gray-600">Placed on {orderDetails?.createdAt}</p>
          </div>
          <div
            className={`px-4 py-2 rounded-full ${getStatusColor(
              orderDetails?.fulfillment as string
            )} font-medium text-sm`}
          >
            {orderDetails?.fulfillment}
          </div>
        </div>
      </div>

      {/* Order Progress */}
      <div className="bg-white rounded-lg border shadow-sm p-6 mb-8">
        <h2 className="text-lg font-medium mb-8 flex items-center">
          <Clock className="h-5 w-5 mr-2 text-[#a08452]" />
          Order Progress
        </h2>

        <div className="relative">
          {/* Progress Bar */}
          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
            <div className="h-full w-full bg-[#a08452]"></div>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between relative">
            <div className="flex flex-col items-center z-10">
              <div className="w-10 h-10 rounded-full bg-[#a08452] text-white flex items-center justify-center mb-2 shadow-md">
                <Package className="h-5 w-5" />
              </div>
              <p className="font-medium text-sm">Order Placed</p>
              <p className="text-xs text-gray-500">{orderDetails?.createdAt}</p>
            </div>

            <div className="flex flex-col items-center z-10">
              <div className="w-10 h-10 rounded-full bg-[#a08452] text-white flex items-center justify-center mb-2 shadow-md">
                <Package className="h-5 w-5" />
              </div>
              <p className="font-medium text-sm">Processing</p>
              <p className="text-xs text-gray-500">March 16, 2024</p>
            </div>

            <div className="flex flex-col items-center z-10">
              <div className="w-10 h-10 rounded-full bg-[#a08452] text-white flex items-center justify-center mb-2 shadow-md">
                <Truck className="h-5 w-5" />
              </div>
              <p className="font-medium text-sm">Shipped</p>
              <p className="text-xs text-gray-500">March 17, 2024</p>
            </div>

            <div className="flex flex-col items-center z-10">
              <div className="w-10 h-10 rounded-full bg-[#a08452] text-white flex items-center justify-center mb-2 shadow-md">
                <CheckCircle className="h-5 w-5" />
              </div>
              <p className="font-medium text-sm">Delivered</p>
              <p className="text-xs text-gray-500">March 20, 2024</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Order Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border shadow-sm overflow-hidden mb-8">
            <div className="p-6 border-b">
              <h2 className="text-lg font-medium flex items-center">
                <FileText className="h-5 w-5 mr-2 text-[#a08452]" />
                Order Items
              </h2>
            </div>

            <div className="hidden md:grid md:grid-cols-[3fr,1fr,1fr,1fr] bg-gray-50 p-4 border-b">
              <div className="font-medium text-gray-600">Product</div>
              <div className="font-medium text-gray-600">Price</div>
              <div className="font-medium text-gray-600">Quantity</div>
              <div className="font-medium text-gray-600 text-right">Total</div>
            </div>

            {orderDetails?.items.map((item) => (
              <div
                key={item.id}
                className="p-6 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                {/* Mobile View */}
                <div className="md:hidden grid grid-cols-[80px,1fr] gap-4">
                  <div className="aspect-square relative rounded-md overflow-hidden border">
                    <Image
                      src={item.productImage || "/placeholder.svg"}
                      alt={item.productName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium mb-1 truncate">{item.productName}</h3>
                    <div className="text-sm text-gray-600 mb-3">
                      <p>Size: {item.size}</p>
                      <p>Color: {item.color}</p>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">
                        ₹{item.priceAtOrder.toFixed(2)}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-gray-600">Qty: {item.quantity}</div>
                      <div className="font-medium text-[#a08452]">
                        ₹{(item.priceAtOrder * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop View */}
                <div className="hidden md:grid md:grid-cols-[3fr,1fr,1fr,1fr] items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-20 relative rounded-md overflow-hidden border">
                      <Image
                        src={item.productImage || "/placeholder.svg"}
                        alt={item.productName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium truncate">{item.productName}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        <span>Size: {item.size}</span>
                        <span className="ml-3">Color: {item.color}</span>
                      </div>
                    </div>
                  </div>
                  <div className="font-medium">₹{item.priceAtOrder.toFixed(2)}</div>
                  <div className="text-gray-600">{item.quantity}</div>
                  <div className="text-right font-medium text-[#a08452]">
                    ₹{(item.priceAtOrder * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          {/* Order Summary */}
          <div className="bg-white rounded-lg border shadow-sm overflow-hidden mb-8">
            <div className="p-6 border-b">
              <h2 className="text-lg font-medium">Order Summary</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  {/* <span>₹{orderDetails?.payment.subtotal.toFixed(2)}</span> */}
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  {/* <span>₹{orderDetails?.payment.shipping.toFixed(2)}</span> */}
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  {/* <span>₹{orderDetails?.payment.tax.toFixed(2)}</span> */}
                </div>
                <div className="flex justify-between pt-4 border-t font-medium">
                  <span>Total</span>
                  <span className="text-lg text-[#a08452]">
                    {/* ₹{orderDetails?.payment.total.toFixed(2)} */}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-white rounded-lg border shadow-sm overflow-hidden mb-8">
            <div className="p-6 border-b">
              <h2 className="text-lg font-medium">Shipping Information</h2>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-600 mb-1">
                  Shipping Address
                </h3>
                <p className="text-gray-800">{orderDetails?.address?.addressName}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-600 mb-1">
                  Shipping Method
                </h3>
                {/* <p className="text-gray-800">{orderDetails?.address?.}</p> */}
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">
                  Tracking Number
                </h3>
                <p className="text-[#a08452] font-medium">
                  {/* {orderDetails?.shipping.tracking} */}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-lg font-medium">Payment Information</h2>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-600 mb-1">
                  Payment Method
                </h3>
                {/* <p className="text-gray-800">{orderDetails?.payment.method}</p> */}
              </div>
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-600 mb-1">
                  Billing Address
                </h3>
                <p className="text-gray-800">{orderDetails?.address?.addressName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4">
        <Button className="bg-[#a08452] hover:bg-[#8c703d] text-white flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Invoice
        </Button>
        <Button
          variant="outline"
          className="border-gray-300 hover:bg-gray-50 flex items-center gap-2"
        >
          <HelpCircle className="h-4 w-4" />
          Need Help?
        </Button>
      </div>
    </div>
  );
}
