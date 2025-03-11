import Navbar from "@/components/navbar"
import SiteFooter from "@/components/site-footer"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-medium mb-8 text-center">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-medium mb-4">Get In Touch</h2>
            <p className="text-gray-600 mb-6">
              Have questions about our products or your order? We're here to help. Fill out the form and we'll get back
              to you as soon as possible.
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Email</h3>
                <p className="text-gray-600">Raasthecreation@gmail.com</p>
              </div>

              <div>
                <h3 className="font-medium mb-1">Phone</h3>
                <p className="text-gray-600">+91 97116 20050</p>
              </div>

              <div>
                <h3 className="font-medium mb-1">Store Address</h3>
                <p className="text-gray-600">
                  204/2-c & d, basement, jeewan nagar,
                  <br />
                  ashram, New Delhi-110014
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-1">Working Hours</h3>
                <p className="text-gray-600">
                  Monday to Saturday: 10:00 AM - 7:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>

          <div>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#795d2a]"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#795d2a]"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#795d2a]"
                  placeholder="Enter subject"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#795d2a]"
                  placeholder="Enter your message"
                ></textarea>
              </div>

              <Button className="bg-[#795d2a] hover:bg-[#705526] text-white px-6 py-2 w-full">Send Message</Button>
            </form>
          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}

