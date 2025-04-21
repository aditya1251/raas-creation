"use client";
import Image from "next/image";
import { PenSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { customerApi } from "@/lib/api/customer";

export default function PersonalInformationPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await customerApi.getCustomer();
      return res;
    },
  });
  return (
    <>
      <div className="flex justify-between items-start mb-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <Image
              src="/placeholder.svg?height=96&width=96"
              alt="Profile Picture"
              width={96}
              height={96}
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 bg-[#a08452] text-white p-1 rounded-full">
            <PenSquare className="h-4 w-4" />
          </div>
        </div>

        <Button className="bg-[#a08452] hover:bg-[#8c703d] text-white">
          Edit Profile
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            value={data?.name.split(" ")[0]}
            readOnly
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a08452]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            value={data?.name.split(" ")[1]}
            readOnly
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a08452]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            value={`+91 ${data?.mobile_no}`}
            readOnly
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a08452]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={data?.email}
            readOnly
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a08452]"
          />
        </div>
      </div>
    </>
  );
}
