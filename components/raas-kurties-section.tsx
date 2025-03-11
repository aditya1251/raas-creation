export default function RaasKurtiesSection() {
  return (
    <section className="py-12 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-sm text-white mb-1">Buy Your Next Wedding Dress From</h2>
          <h3 className="text-2xl font-medium text-[#c8a152] mb-8">#RaasKurties</h3>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-12 gap-3">
          {/* Left column */}
          <div className="col-span-12 md:col-span-3">
            <div className="aspect-[3/4] relative mb-3">
              <div className="w-full h-full bg-gray-200"></div>
            </div>
            <div className="aspect-[3/4] relative">
              <div className="w-full h-full bg-gray-200"></div>
            </div>
          </div>

          {/* Middle-left column */}
          <div className="col-span-12 md:col-span-4">
            <div className="aspect-[4/5] relative mb-3">
              <div className="w-full h-full bg-gray-200"></div>
            </div>
            <div className="aspect-[4/3] relative">
              <div className="w-full h-full bg-gray-200"></div>
            </div>
          </div>

          {/* Middle-right column */}
          <div className="col-span-12 md:col-span-2">
            <div className="aspect-[2/3] relative">
              <div className="w-full h-full bg-gray-200"></div>
            </div>
          </div>

          {/* Right column */}
          <div className="col-span-12 md:col-span-3">
            <div className="aspect-[3/4] relative mb-3">
              <div className="w-full h-full bg-gray-200"></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-square relative">
                <div className="w-full h-full bg-gray-200"></div>
              </div>
              <div className="aspect-square relative">
                <div className="w-full h-full bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

