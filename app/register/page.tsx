"use client"
import { useState } from "react"
import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle registration logic here
    console.log({ firstName, lastName, email, password, agreeTerms })
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

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Robert"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a08452]"
                  required
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Fox"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#a08452]"
                  required
                />
              </div>

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

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                  required
                />
                <label htmlFor="terms" className="text-sm cursor-pointer">
                  I agree to the{" "}
                  <Link href="/terms" className="text-[#a08452] hover:underline">
                    Terms & Conditions
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#a08452] hover:bg-[#8c703d] text-white py-3"
                disabled={!agreeTerms}
              >
                Signup
              </Button>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link href="/login" className="text-[#a08452] hover:underline">
                    Login
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

