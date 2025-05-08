"use client";
import React, { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { categoryApi } from "@/lib/api/categories";
import { LoadingProducts } from "./ui/loader";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function BrowseCategorySection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const router = useRouter();

  // Category data with images and names
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await categoryApi.getAllInDetail();
      return res;
    },
  });
  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -window.innerWidth,
        behavior: "smooth",
      });
    }
  };
  // Handle scrolling right
  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: window.innerWidth,
        behavior: "smooth",
      });
    }
  };
  // Check scroll position and update scroll button states
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1); // Added a small buffer
    }
  };

  // Add scroll event listener
  useEffect(() => {
    const currentRef = scrollContainerRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", checkScrollPosition);
      // Initial check
      checkScrollPosition();
      
      // Add window resize listener
      window.addEventListener('resize', checkScrollPosition);
      
      return () => {
        currentRef.removeEventListener("scroll", checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, []);
  
  // Check scroll position when categories data loads
  useEffect(() => {
    if (categories && categories.length > 0) {
      // Small delay to ensure images are loaded and layout is complete
      const timer = setTimeout(() => {
        checkScrollPosition();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [categories]);

  if (isLoading) {
    return (
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-3 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                Browse The Category
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                Explore our diverse range of ethnic wear categories
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                className={`rounded-md border border-amber-700 bg-amber-50 w-8 lg:w-12 aspect-square flex items-center justify-center hover:bg-amber-100`}
              >
                <ArrowLeft className="h-4 w-4 lg:h-5 lg:w-5 text-amber-700" />
              </button>
              <button
                className={`rounded-md bg-amber-700 hover:bg-amber-800 border-none w-8 lg:w-12 aspect-square flex items-center justify-center`}
              >
                <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
              </button>
            </div>
          </div>
          <LoadingProducts length={3} />
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-3 md:px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Browse The Category
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Explore our diverse range of ethnic wear categories
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleScrollLeft}
              disabled={!canScrollLeft}
              className={`rounded-md border border-amber-700 bg-amber-50 w-8 lg:w-12 aspect-square flex items-center justify-center hover:bg-amber-100 
                ${!canScrollLeft ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <ArrowLeft className="h-4 w-4 lg:h-5 lg:w-5 text-amber-700" />
            </button>
            <button
              onClick={handleScrollRight}
              disabled={!canScrollRight}
              className={`rounded-md bg-amber-700 hover:bg-amber-800 border-none w-8 lg:w-12 aspect-square flex items-center justify-center 
                ${!canScrollRight ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <ArrowRight className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
            </button>
          </div>
        </div>

        {/* Horizontally scrollable container */}
        <div
          ref={scrollContainerRef}
          className="grid grid-flow-col auto-cols-[calc(100%-0rem)] md:auto-cols-[calc(33.333%-1.5rem)] gap-6 overflow-x-auto lg:overflow-x-hidden scroll-smooth pb-4"
          onLoad={checkScrollPosition}
        >
          {categories?.map((category) => (
            <div key={category.name} className="w-full">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="aspect-[3/4] relative rounded-xl overflow-hidden">
                  <Image
                    // @ts-ignore
                    src={category?.Product[0]?.assets[0].asset_url}
                    alt={category.name}
                    fill
                    className="object-cover"
                    onLoad={checkScrollPosition}
                  />
                  <div className="absolute bottom-5 w-11/12 lg:w-4/6 left-1/2 transform -translate-x-1/2">
                    <Link href={`/shop?c=${category.id}`}>
                      <button className="rounded-lg bg-white text-gray-800 border-none px-6 md:px-8 py-2 md:py-3 text-base lg:text-xl font-medium lg:font-bold w-full shadow-md hover:bg-gray-100">
                        {category.name}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}