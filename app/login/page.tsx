"use client";
import { useEffect, useState } from "react";
import type React from "react";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/types/types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { loginFunction } from "./actions/sign-in-action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function LoginPage() {
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status]);

  if (session?.user) {
    router.push("/account");
  }

  // Initialize react-hook-form with Zod resolver
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      mobileNumber: "",
      password: "",
      email: "",
    },
  });

  if (status === "loading") {
    return (
      <div className="text-center text-white">Checking authentication...</div>
    );
  }

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    try {
      setIsLoading(true);
      const data: any = await loginFunction(values);

      if (data === "Login successful") {
        toast.success("Login successful");
        setTimeout(() => {
          router.refresh();
        }, 500);
        router.push("/");
      } else {
        toast.error(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
            src="lot_0005__PUN0762.png"
            alt="Model in purple traditional outfit"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </div>

      {/* Right Section - Login Form */}
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
            <h1 className="text-3xl font-medium mb-2">WELCOME 👋</h1>
            <p className="text-gray-500">Please login here</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-6">
                {/* Email */}
                {/* <div>
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
                            disabled={isLoading}
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
                </div> */}

                {/* Mobile  Number */}
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
                            disabled={isLoading}
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

                {/* Password */}
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
                            disabled={isLoading}
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

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember-me"
                      checked={rememberMe}
                      onCheckedChange={(checked) =>
                        setRememberMe(checked as boolean)
                      }
                    />
                    <label
                      htmlFor="remember-me"
                      className="text-sm cursor-pointer"
                    >
                      Remember Me
                    </label>
                  </div>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-gray-600 hover:text-[#a08452]"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  aria-disabled={isLoading}
                  className="w-full bg-[#a08452] hover:bg-[#8c703d] text-white py-3"
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>

                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/signup"
                      className="text-[#a08452] hover:underline"
                    >
                      Register
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
