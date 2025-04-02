"use client";
import { useState } from "react";
import type React from "react";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SignUpSchema } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Input } from "@/components/ui/input";
import { handleSignup } from "./actions/sign-up-action";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [agreeTerms, setAgreeTerms] = useState(false);

   // Initialize react-hook-form with Zod resolver
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      mobileNumber: "",
      password: "",
      confirmPassword: "",
      email : ""
    },
  });

  const onSubmit = async (values: z.infer<typeof SignUpSchema>) => {
    try {
      if (!agreeTerms) {
        toast.error("Agree to out terms & condition first.");
        return;
      }
      const promise = handleSignup(values);

      toast.promise(promise, {
        loading: "Signing up...", // Show while waiting
        success: (response) => {
          if (response?.error) {
            throw new Error(response.error); // Throw error to trigger rejection
          }
          return "Verify Mobile Number"; // Success message
        },
        error: (error) => error.message || "Something went wrong", // Show on error
      });
      const response = await promise;
      console.log("RES ===> ", response.response);

      // if (response.jwt) {
      //   router.push(`/otp/${response.jwt}`); // Redirect if signup is successful
      // }
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section - Image */}
      <div className="relative w-full md:w-1/2 bg-[#f8f3e9] hidden md:block">
        <div className="absolute top-6 left-6 z-10">
          <Image
            src="https://res.cloudinary.com/dklqhgo8r/image/upload/v1741713365/omez9tvbpnwgmsnj3q3w.png"
            alt="RAAS The Creation Logo"
            width={120}
            height={50}
            className="h-auto"
          />
        </div>
        <div className="h-full">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Raas_Creation_Web_Design.png-EnKXsCtriLdoNHbNFmoqbDz6G92pVj.jpeg"
            alt="Model in orange traditional outfit"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </div>

      {/* Right Section - Registration Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-md">
          <div className="flex justify-between items-center mb-8">
            {/* Logo for mobile view */}
            <div className="md:hidden">
              <Image
                src="https://res.cloudinary.com/dklqhgo8r/image/upload/v1741713365/omez9tvbpnwgmsnj3q3w.png"
                alt="RAAS The Creation Logo"
                width={100}
                height={40}
                className="h-auto"
              />
            </div>
            <Link
              href="/"
              className="ml-auto bg-[#a08452] hover:bg-[#8c703d] text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <span>BACK</span>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-medium mb-2">CREATE NEW ACCOUNT</h1>
            <p className="text-gray-500">Please enter details</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <div>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="FullName" aria-label="nameLabel">
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Full Name"
                            className="w-full px-4 py-3 border  border-gray-300 rounded-md  focus-visible:ring-transparent focus:outline-none focus:ring-1 focus:ring-[#a08452] "
                            required
                            aria-required
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-sm ml-2" />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="email"
                          className="block text-sm font-medium mb-1"
                        >
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="example@gmail.com"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md  focus-visible:ring-transparent focus:outline-none focus:ring-1 focus:ring-[#a08452]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-sm ml-2" />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="mobileNumber"
                    render={({ field: { onChange, ...field } }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="lastName"
                          className="block text-sm font-medium mb-1"
                        >
                          Mobile Number
                        </FormLabel>
                        <FormControl>
                          <PhoneInput
                            country={"in"}
                            value={field.value}
                            onChange={(phone) => onChange(phone)}
                            // disabled={isLoading}
                            inputClass="!w-full !px-10 !py-3 !border !border-gray-300 !rounded-md !focus:outline-none !focus:ring-1 !focus:ring-[#a08452]"
                            buttonClass="!bg-[#a08452] !rounded-md !border-0"
                            dropdownClass="!bg-white  !text-black"
                            searchClass="!bg-[#1a1a1a] !text-white"
                            inputProps={{
                              required: true,
                              placeholder: "Mobile Number",
                            }}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-sm ml-2" />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="Passowrd"
                          className="block text-sm font-medium mb-1"
                        >
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Password"
                            // disabled={isLoading}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md  focus-visible:ring-transparent focus:outline-none focus:ring-1 focus:ring-[#a08452]"
                            required
                            aria-required
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-sm ml-2" />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          htmlFor="ConfirmPassowrd"
                          className="block text-sm font-medium mb-1"
                        >
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus-visible:ring-transparent focus:outline-none focus:ring-1 focus:ring-[#a08452]"
                            required
                            aria-required
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-sm ml-2" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreeTerms}
                    onCheckedChange={(checked) =>
                      setAgreeTerms(checked as boolean)
                    }
                    required
                  />
                  <label htmlFor="terms" className="text-sm cursor-pointer">
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-[#a08452] hover:underline"
                    >
                      Terms & Conditions
                    </Link>
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#a08452] hover:bg-[#8c703d] text-white py-3"
                >
                  Signup
                </Button>

                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-[#a08452] hover:underline"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
