"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function OrderSummary({
  subtotal,
  deliveryCharges = 40,
  discountCode = "Colors60",
  onApplyDiscount,
  checkoutLink = "/shipping-address",
  buttonText = "Proceed to Checkout",
  showDiscountInput = true,
}) {
  const [discount, setDiscount] = useState(0);
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [discountCodeValue, setDiscountCodeValue] = useState(discountCode);
  
  const grandTotal = subtotal + deliveryCharges - discount;

  const handleApplyDiscount = () => {
    if (typeof onApplyDiscount === "function") {
      const appliedDiscount = onApplyDiscount(discountCodeValue);
      if (appliedDiscount !== undefined) {
        setDiscount(appliedDiscount);
      }
    }
    setIsDiscountApplied(true);
  };

  return (
    <div className="border rounded-md p-6">
      <h2 className="text-lg font-medium mb-4">Order Summary</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-medium">₹{subtotal?.toFixed(2)}</span>
        </div>
        
        {showDiscountInput && (
          <div>
            <p className="mb-2 text-sm">Enter Discount Code</p>
            <div className="flex">
              <input
                type="text"
                value={discountCodeValue}
                onChange={(e) => setDiscountCodeValue(e.target.value)}
                className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none text-sm"
              />
              <Button
                className="rounded-l-none bg-[#a08452] hover:bg-[#8c703d] py-2 px-4 h-auto"
                onClick={handleApplyDiscount}
              >
                Apply
              </Button>
            </div>
          </div>
        )}
        
        <div className="flex justify-between">
          <span>Delivery Charges</span>
          <span className="font-medium">₹{deliveryCharges.toFixed(2)}</span>
        </div>
        
        {isDiscountApplied && discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span className="font-medium">-₹{discount.toFixed(2)}</span>
          </div>
        )}
        
        <div className="pt-4 border-t">
          <div className="flex justify-between text-lg font-medium">
            <span>Grand Total</span>
            <span>₹{grandTotal.toFixed(2)}</span>
          </div>
        </div>
        
        {buttonText.length>0&&<Link href={checkoutLink}>
          <Button className="w-full bg-[#a08452] hover:bg-[#8c703d] py-2 h-auto mt-4">
            {buttonText}
          </Button>
        </Link>}
      </div>
    </div>
  );
}