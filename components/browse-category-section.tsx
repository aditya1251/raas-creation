import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BrowseCategorySection() {
  return (
    <section className="py-12 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-medium text-white mb-2">Browse The Category</h2>
            <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" size="icon" className="rounded-md bg-[#f8f3e9] border-none h-12 w-12">
              <ArrowLeft className="h-5 w-5 text-[#795d2a]" />
            </Button>
            <Button size="icon" className="rounded-md bg-[#795d2a] hover:bg-[#705526] border-none h-12 w-12">
              <ArrowRight className="h-5 w-5 text-white" />
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-transparent rounded-xl overflow-hidden">
            <div className="aspect-[3/4] relative rounded-xl overflow-hidden">
              <div className="w-full h-full bg-[#f4f4f4]"></div>
            </div>
            <div className="mt-4">
              <Button
                variant="outline"
                className="rounded-full bg-white text-black border-none px-10 py-6 text-lg font-medium w-full"
              >
                Anarkali
              </Button>
            </div>
          </div>

          <div className="bg-transparent rounded-xl overflow-hidden">
            <div className="aspect-[3/4] relative rounded-xl overflow-hidden">
              <div className="w-full h-full bg-[#f4f4f4]"></div>
            </div>
            <div className="mt-4">
              <Button
                variant="outline"
                className="rounded-full bg-white text-black border-none px-10 py-6 text-lg font-medium w-full"
              >
                Kurta Set
              </Button>
            </div>
          </div>

          <div className="bg-transparent rounded-xl overflow-hidden">
            <div className="aspect-[3/4] relative rounded-xl overflow-hidden">
              <div className="w-full h-full bg-[#f4f4f4]"></div>
            </div>
            <div className="mt-4">
              <Button
                variant="outline"
                className="rounded-full bg-white text-black border-none px-10 py-6 text-lg font-medium w-full"
              >
                Suit Set
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

