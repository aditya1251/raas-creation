"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Package,
  Heart,
  MapPin,
  Plus,
  PenSquare,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/navbar";
import SiteFooter from "@/components/site-footer";
import { useQuery } from "@tanstack/react-query";
import { AddressApi } from "@/lib/api/address";

export default function ManageAddressesPage() {
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);
  const { data: addresses, isLoading } = useQuery({
    queryKey: ["addresses"],
    queryFn: AddressApi.getAddress,
  });

  const openAddressModal = () => setShowAddressModal(true);
  const closeAddressModal = () => setShowAddressModal(false);
  // Add new address
  const handleAddAddress = (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const mobile = formData.get("mobile");
    const building = formData.get("building");
    const area = formData.get("area");
    const city = formData.get("city");
    const pincode = formData.get("pincode");
    const state = formData.get("state");

    // Create new address object
    // const newAddress = {
    //   id: addresses?.length + 1,
    //   name: name.toString(),
    //   address: `${building}, ${area}, ${city}, ${state}-${pincode}`,
    //   phone: mobile.toString(),
    // };

    // Add to addresses array
    // setAddresses([...addresses, newAddress]);

    // Close modal
    closeAddressModal();
  };

  // delete address
  const handleDeleteAddress = (id) => {
    // setAddresses(addresses?.filter((address) => address.id !== id))
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
              <Link
                href="/account/orders"
                className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 border-b"
              >
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
              <Link
                href="/account/addresses"
                className="flex items-center space-x-3 px-4 py-3 bg-[#a08452] text-white"
              >
                <MapPin className="h-5 w-5" />
                <span>Manage Addresses</span>
              </Link>
            </nav>
          </div>
          {/* Main Content */}
          <div className="flex-1">
            <Button
              className="bg-[#a08452] hover:bg-[#8c703d] text-white mb-8 flex items-center gap-2"
              onClick={openAddressModal}
            >
              <Plus className="h-5 w-5" />
              Add New Address
            </Button>

            {addresses?.map((address) => (
              <div key={address.id} className="border-b pb-6 mb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg mb-2">{address.name}</h3>
                    <p className="text-gray-700 mb-1">{address.street}</p>
                    <p className="text-gray-700">{address.name}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button className="bg-[#a08452] hover:bg-[#8c703d] text-white h-9 px-3 flex items-center gap-1">
                      <PenSquare className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      className="border-gray-300 text-gray-700 hover:bg-gray-50 h-9 px-3 flex items-center gap-1"
                      onClick={() => handleDeleteAddress(address.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {addresses?.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  No addresses found. Please add a new address.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-md max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-medium mb-6">Enter a New Address</h2>

            <form onSubmit={handleAddAddress}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a08452]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Enter Your Mobile Number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a08452]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Flat, House No, Building, Company, Apartment
                  </label>
                  <input
                    type="text"
                    name="building"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a08452]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Area, Colony, Street, Sector, Village
                  </label>
                  <input
                    type="text"
                    name="area"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a08452]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <select
                    name="city"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a08452] appearance-none"
                    required
                  >
                    <option value="">Select City</option>
                    <option value="delhi">Delhi</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="bangalore">Bangalore</option>
                    <option value="chennai">Chennai</option>
                    <option value="kolkata">Kolkata</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Pin Code
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Enter Pin Code"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a08452]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    State
                  </label>
                  <select
                    name="state"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a08452] appearance-none"
                    required
                  >
                    <option value="">Select State</option>
                    <option value="delhi">Delhi</option>
                    <option value="maharashtra">Maharashtra</option>
                    <option value="karnataka">Karnataka</option>
                    <option value="tamil-nadu">Tamil Nadu</option>
                    <option value="west-bengal">West Bengal</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="default-address"
                    checked={isDefaultAddress}
                    onCheckedChange={setIsDefaultAddress}
                  />
                  <label
                    htmlFor="default-address"
                    className="text-sm cursor-pointer"
                  >
                    Use as My Default Address
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-[#a08452] hover:bg-[#8c703d] text-white py-3"
                  >
                    Add New Address
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-gray-300 hover:bg-gray-50 py-3"
                    onClick={closeAddressModal}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      <SiteFooter />
    </main>
  );
}
