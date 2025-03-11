"use client"
import { useState } from "react"
import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log({ email, password, rememberMe })
  }

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
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Raas_Creation_Web_Design.png-PV5mpa6zcw0FG7ukipYJTnUgW7UFVv.jpeg"
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

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="robertfox@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a08452]"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a08452]"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <label htmlFor="remember-me" className="text-sm cursor-pointer">
                    Remember Me
                  </label>
                </div>
                <Link href="/forgot-password" className="text-sm text-gray-600 hover:text-[#a08452]">
                  Forgot Password?
                </Link>
              </div>

              <Button type="submit" className="w-full bg-[#a08452] hover:bg-[#8c703d] text-white py-3">
                Login
              </Button>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Don&apos;t have an account?{" "}
                  <Link href="/register" className="text-[#a08452] hover:underline">
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

