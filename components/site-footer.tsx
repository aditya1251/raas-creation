import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Twitter, Instagram, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SiteFooter() {
  return (
    <footer className="bg-[#fff3e3] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Logo and About */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <Image
                src="https://res.cloudinary.com/dklqhgo8r/image/upload/v1741713365/omez9tvbpnwgmsnj3q3w.png"
                alt="RAAS The Creation Logo"
                width={180}
                height={70}
                className="h-auto"
              />
            </Link>
            <p className="text-sm text-gray-700 mb-6">
              Lorem Ipsum Dolor Sit Amet. Lorem Ipsum Dolor Sit Amet. Lorem Ipsum Dolor Sit Amet. Lorem Ipsum Dolor Sit
              Amet.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="w-10 h-10 rounded-full border border-[#795d2a] flex items-center justify-center text-[#795d2a] hover:bg-[#795d2a] hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full border border-[#795d2a] flex items-center justify-center text-[#795d2a] hover:bg-[#795d2a] hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full border border-[#795d2a] flex items-center justify-center text-[#795d2a] hover:bg-[#795d2a] hover:text-white transition-colors"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-medium mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="text-gray-700 hover:text-[#795d2a] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-700 hover:text-[#795d2a] transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-700 hover:text-[#795d2a] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-700 hover:text-[#795d2a] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-medium mb-6">Support</h3>
            <ul className="space-y-4">
              <li className="text-gray-700">Email: Raasthecreation@gmail.com</li>
              <li className="text-gray-700">Phone: +91 97116 20050</li>
              <li className="text-gray-700">Store: 204/2-c & d , basement , jeewan nagar , ashram, New Delhi-110014</li>
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h3 className="text-xl font-medium mb-6">Get In Touch</h3>
            <p className="text-gray-700 mb-6">
              Sign up for our newsletter and get the latest updates, news and product offers via email.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 px-4 py-3 border border-gray-300 focus:outline-none"
              />
              <Button className="bg-[#795d2a] hover:bg-[#705526] rounded-none px-4">
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-[#e5d9c3]">
          <p className="text-sm text-gray-700">© RAAS CREATION | 2025 | ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </footer>
  )
}

