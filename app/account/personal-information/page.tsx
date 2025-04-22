"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { PenSquare, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customerApi } from "@/lib/api/customer";
import toast from "react-hot-toast";
import { ProfileSkeleton } from "@/components/ui/loader";

export default function PersonalInformationPage() {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    email: "",
    profileImage: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await customerApi.getCustomer();
      return res;
    },
  });
  useEffect(() => {
    setFormData({
      firstName: data?.name?.split(" ")[0] || "",
      lastName: data?.name?.split(" ")[1] || "",
      mobileNo: data?.mobile_no || "",
      email: data?.email || "",
      profileImage: null,
    });
  }, [isLoading]);

  const updateCustomerMutation = useMutation({
    mutationFn: async (updatedData) => {
      return await customerApi.updateCustomer(data.id,updatedData);
    },
    onSuccess: () => {
      // Invalidate and refetch the user data
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries(["user"]);
      setIsEditing(false);
    },
  });

  const handleEditProfile = () => {
    if (isEditing) {
      // Save the changes
      const updatedData = {
        name: `${formData.firstName} ${formData.lastName}`,
        mobile_no: formData.mobileNo,
        email: formData.email,
        // If you have an API endpoint to upload profile image, handle it here
        // profile_image: formData.profileImage
      };

      updateCustomerMutation.mutate(updatedData);
    } else {
      // Enter edit mode
      setIsEditing(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({ ...prev, profileImage: file }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return <ProfileSkeleton/>
  }

  return (
    <>
      <div className="flex justify-between items-start mb-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <Image
              src={previewImage || "/placeholder.svg?height=96&width=96"}
              alt="Profile Picture"
              width={96}
              height={96}
              className="object-cover"
            />
          </div>
          {isEditing && (
            <label className="absolute bottom-0 right-0 bg-[#a08452] text-white p-1 rounded-full cursor-pointer">
              <Camera className="h-4 w-4" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          )}
          {!isEditing && (
            <div className="absolute bottom-0 right-0 bg-[#a08452] text-white p-1 rounded-full">
              <PenSquare className="h-4 w-4" />
            </div>
          )}
        </div>

        <Button
          className="bg-[#a08452] hover:bg-[#8c703d] text-white"
          onClick={handleEditProfile}
          disabled={updateCustomerMutation.isLoading}
        >
          {updateCustomerMutation.isLoading
            ? "Saving..."
            : isEditing
            ? "Save Profile"
            : "Edit Profile"}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a08452] ${
              isEditing ? "bg-white" : "bg-gray-50"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a08452] ${
              isEditing ? "bg-white" : "bg-gray-50"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a08452] ${
              isEditing ? "bg-white" : "bg-gray-50"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            readOnly={!isEditing}
            className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a08452] ${
              isEditing ? "bg-white" : "bg-gray-50"
            }`}
          />
        </div>
      </div>
    </>
  );
}
