"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  fullPage?: boolean;
  text?: string;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = "md",
  fullPage = false,
  text,
  className,
}) => {
  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-2",
    lg: "w-12 h-12 border-3",
  };

  const spinner = (
    <div
      className={cn(
        "inline-block rounded-full border-solid border-t-transparent animate-spin border-[#a08452]",
        sizeClasses[size],
        className
      )}
    />
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 z-50">
        {spinner}
        {text && <p className="mt-4 text-[#a08452] font-medium">{text}</p>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-6">
      {spinner}
      {text && <p className="mt-2 text-[#a08452] text-sm">{text}</p>}
    </div>
  );
};

export const LoadingProducts: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-[3/4] bg-gray-200 rounded-md mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      ))}
    </div>
  );
};

export const LoadingProductDetails: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
      <div>
        <div className="mb-4 aspect-[1] bg-gray-200 rounded-md"></div>
        <div className="grid grid-cols-4 gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-md"></div>
          ))}
        </div>
      </div>
      <div>
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-6"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
        <div className="h-20 bg-gray-200 rounded w-full mb-6"></div>
        <div className="flex gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-8 h-8 rounded-sm bg-gray-200"></div>
          ))}
        </div>
        <div className="flex gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-10 h-10 rounded-md bg-gray-200"></div>
          ))}
        </div>
        <div className="flex gap-4">
          <div className="w-24 h-10 bg-gray-200 rounded-md"></div>
          <div className="flex-1 h-10 bg-gray-200 rounded-md"></div>
          <div className="w-10 h-10 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;