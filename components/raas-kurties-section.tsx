export default function RaasKurtiesSection() {
  return (
    <section className="py-12 ">
      <div className="w-full min-h-screen px-4">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-xl text-[#a08452] mb-1">
            Buy Your Next Wedding Dress From
          </h2>
          <h3 className="text-4xl font-bold text-[#795d2a] mb-8">
            #RaasKurties
          </h3>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-5 gap-4">
          {/* 1 */}
          <div className="col-span-1">
            <div className="aspect-[3/4] relative mb-3">
              <div className="w-full h-full bg-gray-200"></div>
            </div>
            <div className="aspect-[3/2] relative mb-3">
              <div className="w-full h-full bg-gray-200"></div>
            </div>
          </div>

          {/* 2 */}
          <div className="col-span-1 mt-16">
            <div className="aspect-[3/4] relative mb-3">
              <div className="w-full h-full bg-gray-200"></div>
            </div>
            <div className="aspect-[3/2] relative mb-3">
              <div className="w-full h-full bg-gray-200"></div>
            </div>
          </div>

          {/* 3 */}
          <div className="col-span-1 mt-32">
            <div className="aspect-[3/4] relative mb-3">
              <div className="w-full h-full bg-gray-200"></div>
            </div>
          </div>

          {/* 4 */}
          <div className="col-span-1 mt-16">
            <div className="aspect-[3/4] relative mb-3">
              <div className="w-full h-full bg-gray-200"></div>
            </div>
            <div className="aspect-[3/2] relative mb-3">
              <div className="w-full h-full bg-gray-200"></div>
            </div>
          </div>

          {/* 5 */}
          <div className="col-span-1">
            <div className="aspect-[3/4] relative mb-3">
              <div className="w-full h-full bg-gray-200"></div>
            </div>
            <div className="aspect-[3/2] relative mb-3">
              <div className="w-full h-full bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}