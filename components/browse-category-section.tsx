"use client"
import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from 'next/image';

export default function BrowseCategorySection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Category data with images and names
  const categories = [
    {
      name: "Anarkali",
      image: "lot_0009__PUN0747.png"
    },
    {
      name: "Kurta Set",
      image: "image 100.png"
    },
    {
      name: "Suit Set",
      image: "image 101.png"
    },
    {
      name: "Lounge Wear",
      image: "lot_0005__PUN0762.png"
    },
    {
      name: "Kurtis & Dresses",
      image: "image.png"
    },
    {
      name: "Luxe Collection",
      image: "image 19.png"
    }
  ];

  // Handle scrolling left
  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -650, // Adjust scroll distance as needed
        behavior: 'smooth'
      });
    }
  };

  // Handle scrolling right
  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 650, // Adjust scroll distance as needed
        behavior: 'smooth'
      });
    }
  };

  // Check scroll position and update scroll button states
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  // Add scroll event listener
  useEffect(() => {
    const currentRef = scrollContainerRef.current;
    if (currentRef) {
      currentRef.addEventListener('scroll', checkScrollPosition);
      return () => {
        currentRef.removeEventListener('scroll', checkScrollPosition);
      };
    }
  }, []);

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Browse The Category
            </h2>
            <p className="text-gray-600">
              Explore our diverse range of ethnic wear categories
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleScrollLeft}
              disabled={!canScrollLeft}
              className={`rounded-md border border-amber-700 bg-amber-50 h-12 w-12 flex items-center justify-center hover:bg-amber-100 
                ${!canScrollLeft ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <ArrowLeft className="h-5 w-5 text-amber-700" />
            </button>
            <button
              onClick={handleScrollRight}
              disabled={!canScrollRight}
              className={`rounded-md bg-amber-700 hover:bg-amber-800 border-none h-12 w-12 flex items-center justify-center 
                ${!canScrollRight ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <ArrowRight className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
        
        {/* Horizontally scrollable container */}
        <div 
          ref={scrollContainerRef}
          className="grid grid-flow-col auto-cols-[calc(33.333%-1.5rem)] gap-6 overflow-x-hidden scroll-smooth pb-4"
        >
          {categories.map((category) => (
            <div
              key={category.name}
              className="w-full"
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="aspect-[3/4] relative rounded-xl overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-5 w-4/6 left-1/2 transform -translate-x-1/2">
                    <button
                      className="rounded-lg bg-white text-gray-800 border-none px-8 py-3 text-xl font-bold w-full shadow-md hover:bg-gray-100"
                    >
                      {category.name}
                    </button>
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