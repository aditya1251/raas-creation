"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import SiteFooter from "@/components/site-footer";
import { useCart } from "@/context/cart-context";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const checkoutItems =
    cartItems.length > 0
      ? cartItems
      : [
          {
            id: "1",
            name: "Mirror Work Tangy Cotton Print Suit Set",
            price: 3490,
            originalPrice: 4899,
            quantity: 1,
            color: "Orange",
            size: "38",
            image:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Raas_Creation_Web_Design.png-22zL20iPWx4nVh3qQdh5EwkvzWf4H0.jpeg",
          },
          {
            id: "2",
            name: "Mirror Work Tangy Cotton Print Suit Set",
            price: 3490,
            originalPrice: 4899,
            quantity: 1,
            color: "Orange",
            size: "38",
            image:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Raas_Creation_Web_Design.png-22zL20iPWx4nVh3qQdh5EwkvzWf4H0.jpeg",
          },
          {
            id: "3",
            name: "Mirror Work Tangy Cotton Print Suit Set",
            price: 3490,
            originalPrice: 4899,
            quantity: 1,
            color: "Orange",
            size: "38",
            image:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Raas_Creation_Web_Design.png-22zL20iPWx4nVh3qQdh5EwkvzWf4H0.jpeg",
          },
          {
            id: "4",
            name: "Mirror Work Tangy Cotton Print Suit Set",
            price: 3490,
            originalPrice: 4899,
            quantity: 1,
            color: "Orange",
            size: "38",
            image:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Raas_Creation_Web_Design.png-22zL20iPWx4nVh3qQdh5EwkvzWf4H0.jpeg",
          },
        ];

  const subtotal = calculateSubtotal();
  const deliveryCharges = cartItems.length > 0 ? 40 : 0;
  const discount = isDiscountApplied ? 0 : 0; // You can implement discount logic here
  const grandTotal = subtotal + deliveryCharges - discount;

  const handleApplyDiscount = () => {
    if (discountCode.trim()) {
      // Example discount logic - you can customize this
      // if (discountCode.toLowerCase() === "raas10") {
      //   const discountAmount = subtotal * 0.1; // 10% discount
      //   setDiscount(discountAmount);
      //   setIsDiscountApplied(true);
      // } else {
      //   // You might want to show an error message here
      //   setIsDiscountApplied(false);
      //   setDiscount(0);
      // }
    }
  };

  return (
    <main className="min-h-screen bg-white ">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <h1 className="text-3xl font-medium mb-8">Shopping Cart</h1>

        {checkoutItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link href="/shop">
              <Button className="bg-[#a08452] hover:bg-[#8c703d] py-2 h-auto">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1 overflow-x-auto">
              {/* Table Header - Desktop */}
              <div className="hidden md:grid md:grid-cols-[2fr,1fr,1fr,1fr,.5fr] border-b pb-4 mb-4">
                <div className="font-medium">Product</div>
                <div className="font-medium">Price</div>
                <div className="font-medium">Quantity</div>
                <div className="font-medium text-left">Subtotal</div>
                <div className="font-medium"></div>{" "}
                {/* Empty header for delete icon */}
              </div>

              {/* Cart Items */}
              <div className="space-y-6">
                {checkoutItems.map((item) => (
                  <div key={item.id} className="border-b pb-6">
                    {/* Mobile View */}
                    <div className="md:hidden grid grid-cols-[80px,1fr] gap-4">
                      <div className="aspect-square relative rounded overflow-hidden">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-medium mb-1 truncate">
                          {item.name}
                        </h3>
                        <div className="text-sm text-gray-600 mb-2">
                          <p>Size: {item.size}</p>
                          <p>Color: {item.color}</p>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <div className="font-medium">
                              ₹{item.price.toFixed(2)}
                            </div>
                            {item.originalPrice && (
                              <div className="text-xs text-gray-500 line-through">
                                ₹{item.originalPrice.toFixed(2)}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center border border-gray-300 rounded">
                            <button
                              className="w-7 h-7 flex items-center justify-center"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.color,
                                  item.size,
                                  Math.max(1, item.quantity - 1)                                )
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-7 text-center text-xs">
                              {item.quantity}
                            </span>
                            <button
                              className="w-7 h-7 flex items-center justify-center"
                              onClick={() =>
                                updateQuantity(item.id, item.color, item.size, item.quantity + 1)
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="font-medium">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </div>
                          <button
                            className="text-red-500"
                            onClick={() => removeFromCart(item.id, item.color, item.size)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Desktop View */}
                    <div className="hidden md:grid md:grid-cols-[2fr,1fr,1fr,1fr,.5fr] items-center">
                      <div className="flex items-center gap-4 pr-4 overflow-hidden">
                        <div className="w-16 h-20 flex-shrink-0 relative rounded overflow-hidden">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 overflow-hidden">
                          <div
                            className="font-medium truncate max-w-full"
                            title={item.name}
                          >
                            {item.name.length > 15
                              ? item.name.slice(0, 15) + "..."
                              : item.name}
                          </div>
                          <div className="text-sm text-gray-600 mt-1 truncate">
                            <span>Size: {item.size}</span>
                            <span className="ml-4">Color: {item.color}</span>
                          </div>
                        </div>
                      </div>
                      <div className="whitespace-nowrap">
                        <div className="font-medium">
                          ₹{item.price.toFixed(2)}
                        </div>
                        {item.originalPrice && (
                          <div className="text-xs text-gray-500 line-through">
                            ₹{item.originalPrice.toFixed(2)}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center border border-gray-300 rounded w-fit">
                          <button
                            className="w-7 h-7 flex items-center justify-center"
                            onClick={() =>
                              updateQuantity(
                                item.id, item.color, item.size,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-7 text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            className="w-7 h-7 flex items-center justify-center"
                            onClick={() =>
                              updateQuantity(item.id, item.color, item.size, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      <div className="font-medium whitespace-nowrap">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </div>
                      <div className="text-right">
                        <button
                          className="text-red-500"
                          onClick={() => removeFromCart(item.id, item.color, item.size)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="w-full lg:w-80 shrink-0">
              <div className="border rounded-md p-6">
                <h2 className="text-lg font-medium mb-4">Cart Summary</h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                  </div>

                  <div>
                    <p className="mb-2 text-sm">Enter Discount Code</p>
                    <div className="flex">
                      <input
                        type="text"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none text-sm"
                        placeholder="Enter code"
                      />
                      <Button
                        className="rounded-l-none bg-[#a08452] hover:bg-[#8c703d] py-2 px-4 h-auto"
                        onClick={handleApplyDiscount}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    <span className="font-medium">
                      ₹{deliveryCharges.toFixed(2)}
                    </span>
                  </div>

                  {isDiscountApplied && discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span className="font-medium">
                        -₹{discount.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="pt-4 border-t">
                    <div className="flex justify-between text-lg font-medium">
                      <span>Grand Total</span>
                      <span>₹{grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <Link href="/checkout">
                    <Button className="w-full bg-[#a08452] hover:bg-[#8c703d] py-2 h-auto mt-4">
                      Proceed to Checkout
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <SiteFooter />
    </main>
  );
}
