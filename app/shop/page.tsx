"use client";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  Heart,
  Package,
  RefreshCw,
  HeadphonesIcon,
  CreditCard,
  ChevronRight,
  Briefcase,
  Filter,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/context/cart-context";
import Navbar from "@/components/navbar";
import SiteFooter from "@/components/site-footer";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { productApi } from "@/lib/api/productdetails";
import { Products } from "@/components/admin/products-table";

// Define sort options
const sortOptions = [
  { value: "latest", label: "Sort by latest" },
  // { value: "popularity", label: "Sort by popularity" },
  { value: "price-low-high", label: "Sort by price: low to high" },
  { value: "price-high-low", label: "Sort by price: high to low" },
];

export default function ShopPage() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<string>("latest");
  const [priceRange, setPriceRange] = useState<number>(6000);
  const [maxPriceValue, setMaxPriceValue] = useState<number>(6000);

  // New state for color and size filters
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [availableColors, setAvailableColors] = useState<
    { color: string; count: number }[]
  >([]);
  const [availableSizes, setAvailableSizes] = useState<
    { size: string; count: number }[]
  >([]);

  // Get products from API
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: productApi.getAll,
  });

  // State for sorted and filtered products
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);

  // Extract available colors and sizes from products
  useEffect(() => {
    if (products && products.length > 0) {
      const colorsMap = new Map<string, number>();
      const sizesMap = new Map<string, number>();
      products.forEach((product) => {
        product.colors.forEach((colorObj) => {
          const colorName = colorObj.color;
          colorsMap.set(colorName, (colorsMap.get(colorName) || 0) + 1);
          // Process sizes for each color
          if (colorObj.sizes && Array.isArray(colorObj.sizes)) {
            colorObj.sizes.forEach((sizeObj) => {
              if (sizeObj && sizeObj.size) {
                const sizeName = sizeObj.size;
                sizesMap.set(sizeName, (sizesMap.get(sizeName) || 0) + 1);
              }
            });
          }
        });
      });
      // Convert maps to arrays for state
      setAvailableColors(
        Array.from(colorsMap.entries()).map(([color, count]) => ({
          color,
          count,
        }))
      );
      setAvailableSizes(
        Array.from(sizesMap.entries()).map(([size, count]) => ({ size, count }))
      );
    }
  }, [products]);

  // Calculate max price when products load
  useEffect(() => {
    if (products && products.length > 0) {
      const highestPrice = Math.max(...products.map((p) => p.price));
      // Round up to nearest 1000 for better UI
      const roundedMax = Math.ceil(highestPrice / 1000) * 1000;
      setMaxPriceValue(roundedMax > 0 ? roundedMax : 6000);
      setPriceRange(roundedMax > 0 ? roundedMax : 6000);
    }
  }, [products]);

  // Handle color selection
  const handleColorSelect = (color: string) => {
    setSelectedColors((prev) => {
      if (prev.includes(color)) {
        return prev.filter((c) => c !== color);
      } else {
        return [...prev, color];
      }
    });
  };

  // Handle size selection
  const handleSizeSelect = (size: string) => {
    setSelectedSizes((prev) => {
      if (prev.includes(size)) {
        return prev.filter((s) => s !== size);
      } else {
        return [...prev, size];
      }
    });
  };

  // Sort and filter products when required states change
  useEffect(() => {
    if (!products) return;
    // First filter by price
    let filtered = products.filter(
      (product) => product.discountPrice <= priceRange
    );
    // Filter by selected colors if any are selected
    if (selectedColors.length > 0) {
      filtered = filtered.filter((product) =>
        product.colors.some((colorObj) =>
          selectedColors.includes(colorObj.color)
        )
      );
    }
    // Filter by selected sizes if any are selected
    if (selectedSizes.length > 0) {
      filtered = filtered.filter((product) => {
        // Check if any of the product's colors have any of the selected sizes
        return product.colors.some((colorObj) => {
          // Ensure sizes array exists and is not empty
          if (
            !colorObj.sizes ||
            !Array.isArray(colorObj.sizes) ||
            colorObj.sizes.length === 0
          ) {
            return false;
          }
          // Check if any of the sizes match selected sizes
          return colorObj.sizes.some(
            (sizeObj) =>
              sizeObj && sizeObj.size && selectedSizes.includes(sizeObj.size)
          );
        });
      });
    }
    // Then sort the filtered results
    switch (sortBy) {
      case "latest":
        filtered = filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "price-low-high":
        filtered = filtered.sort((a, b) => a.discountPrice - b.discountPrice);
        break;
      case "price-high-low":
        filtered = filtered.sort((a, b) => b.discountPrice - a.discountPrice);
        break;
      default:
        break;
    }
    setFilteredProducts(filtered);
  }, [products, sortBy, priceRange, selectedColors, selectedSizes]);
  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };
  // Handle price range change
  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceRange(Number(e.target.value));
  };
  // Clear all filters
  const clearAllFilters = () => {
    setSelectedColors([]);
    setSelectedSizes([]);
    setPriceRange(maxPriceValue);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center text-sm">
          <Link href="/shop" className="text-gray-600 hover:text-[#795d2a]">
            Shop
          </Link>
          <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
          <span className="text-gray-900">All Products</span>
        </div>
      </div>

      {/* Mobile Filter Toggle Button */}
      <div className="md:hidden px-6 mb-4">
        <Button
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className="w-full flex items-center justify-center gap-2 bg-[#795d2a] text-white"
        >
          {isMobileFilterOpen ? (
            <>
              <X className="h-5 w-5" /> Close Filters
            </>
          ) : (
            <>
              <Filter className="h-5 w-5" /> Open Filters
            </>
          )}
        </Button>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <div
            className={`
            w-full md:w-64 shrink-0 
            ${isMobileFilterOpen ? "block" : "hidden md:block"}
            absolute md:static z-20 bg-white md:bg-transparent 
            left-0 right-0 px-6 md:px-0
          `}
          >
            {/* Product Categories */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Product Categories</h3>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="kurta-set" defaultChecked />
                  <label htmlFor="kurta-set" className="text-sm cursor-pointer">
                    Kurta Set
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="suit-set" />
                  <label htmlFor="suit-set" className="text-sm cursor-pointer">
                    Suit Set
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="anarkali" />
                  <label htmlFor="anarkali" className="text-sm cursor-pointer">
                    Anarkali
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="lounge-wear" />
                  <label
                    htmlFor="lounge-wear"
                    className="text-sm cursor-pointer"
                  >
                    Lounge Wear
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="kurtis-dresses" />
                  <label
                    htmlFor="kurtis-dresses"
                    className="text-sm cursor-pointer"
                  >
                    Kurtis & Dresses
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="luxe-collection" />
                  <label
                    htmlFor="luxe-collection"
                    className="text-sm cursor-pointer"
                  >
                    Luxe Collection
                  </label>
                </div>
              </div>
            </div>

            {/* Filter By Price - Now Dynamic */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Filter By Price</h3>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm mb-2">Price: ₹0 - ₹{priceRange}</p>
                <input
                  type="range"
                  min="0"
                  max={maxPriceValue}
                  value={priceRange}
                  onChange={handlePriceRangeChange}
                  className="w-full h-1 bg-[#A08452] rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>₹0</span>
                  <span>₹{maxPriceValue}</span>
                </div>
              </div>
            </div>

            {/* Filter By Color - Now Dynamic */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Filter By Color</h3>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="space-y-2">
                {isLoading ? (
                  <p className="text-sm text-gray-500">Loading colors...</p>
                ) : availableColors.length > 0 ? (
                  availableColors.map((colorData, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox
                        id={`color-${colorData.color.toLowerCase()}`}
                        checked={selectedColors.includes(colorData.color)}
                        onCheckedChange={() =>
                          handleColorSelect(colorData.color)
                        }
                      />
                      <label
                        htmlFor={`color-${colorData.color.toLowerCase()}`}
                        className="text-sm cursor-pointer flex items-center"
                      >
                        <div
                          className="w-4 h-4 rounded-sm mr-2"
                          style={{
                            backgroundColor: colorData.color.toLowerCase(),
                            border: "1px solid #e2e8f0",
                          }}
                        ></div>
                        {colorData.color} ({colorData.count})
                      </label>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No colors available</p>
                )}
              </div>
            </div>

            {/* Size - Now Dynamic */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Size</h3>
                <ChevronDown className="h-4 w-4" />
              </div>
              <div className="space-y-2">
                {isLoading ? (
                  <p className="text-sm text-gray-500">Loading sizes...</p>
                ) : availableSizes.length > 0 ? (
                  availableSizes.map((sizeData, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Checkbox
                        id={`size-${sizeData.size}`}
                        checked={selectedSizes.includes(sizeData.size)}
                        onCheckedChange={() => handleSizeSelect(sizeData.size)}
                      />
                      <label
                        htmlFor={`size-${sizeData.size}`}
                        className="text-sm cursor-pointer"
                      >
                        {sizeData.size} ({sizeData.count})
                      </label>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No sizes available</p>
                )}
              </div>
            </div>

            {/* Clear All Filters Button */}
            <div className="mb-6">
              <Button
                onClick={clearAllFilters}
                variant="outline"
                className="w-full border-[#795d2a] text-[#795d2a] hover:bg-[#795d2a] hover:text-white"
              >
                Clear All Filters
              </Button>
            </div>

            {/* Mobile Apply Filters Button */}
            <div className="md:hidden my-4">
              <Button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-[#795d2a] text-white"
              >
                Apply Filters
              </Button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              {/* Product count */}
              <div className="text-sm text-gray-500">
                Showing {filteredProducts.length} of {products?.length || 0}{" "}
                products
              </div>

              {/* Sort by dropdown */}
              <div>
                <div className="relative inline-block">
                  <select
                    className="appearance-none border rounded-md px-4 py-2 pr-8 focus:outline-none text-sm"
                    value={sortBy}
                    onChange={handleSortChange}
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            {/* Products Grid - Only Column View */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {isLoading ? (
                <div className="col-span-3 text-center py-10">
                  Loading products...
                </div>
              ) : filteredProducts?.length ? (
                filteredProducts.map((product, index) => (
                  <ProductCard key={product.id || index} product={product} />
                ))
              ) : (
                <div className="col-span-3 text-center py-10">
                  No products found with the selected filters
                </div>
              )}
            </div>

            {/* Load More Button */}
            <div className="mt-10 text-center">
              <Button
                variant="outline"
                className="border-[#795d2a] text-[#795d2a] hover:bg-[#795d2a] hover:text-white px-8 py-2 rounded-none"
              >
                Load More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* (Rest of the component remains the same) */}
      <section className="py-10 border-t">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Package className="h-10 w-10 mb-3 text-[#795d2a]" />
              <h3 className="font-medium text-base mb-1">Free Shipping</h3>
              <p className="text-sm text-gray-600">
                Free shipping for order above $150
              </p>
            </div>
            <div className="flex flex-col items-center">
              <RefreshCw className="h-10 w-10 mb-3 text-[#795d2a]" />
              <h3 className="font-medium text-base mb-1">Money Guarantee</h3>
              <p className="text-sm text-gray-600">
                Within 30 days for an exchange
              </p>
            </div>
            <div className="flex flex-col items-center">
              <HeadphonesIcon className="h-10 w-10 mb-3 text-[#795d2a]" />
              <h3 className="font-medium text-base mb-1">Online Support</h3>
              <p className="text-sm text-gray-600">
                24 hours a day, 7 days a week
              </p>
            </div>
            <div className="flex flex-col items-center">
              <CreditCard className="h-10 w-10 mb-3 text-[#795d2a]" />
              <h3 className="font-medium text-base mb-1">Flexible Payment</h3>
              <p className="text-sm text-gray-600">
                Pay with multiple credit cards
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

// ProductCard component remains the same
function ProductCard({ product }: { product: Products }) {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.discountPrice || product.price,
      originalPrice: product.price,
      quantity: 1,
      color: product.colors.length > 0 ? product.colors[0].color : "",
      size:
        product.colors[0]?.sizes?.length > 0
          ? product.colors[0].sizes[0].size
          : "SIZE_DEFAULT",
      image:
        product.assets && product.assets.length > 0
          ? product.assets[0].asset_url
          : "/placeholder.svg",
    };

    addToCart(cartItem);

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="group relative">
      <div className="aspect-[3/4] relative overflow-hidden rounded-xl bg-gray-100">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.assets[0]?.asset_url || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <button
          className="absolute top-3 right-3 aspect-square w-8 bg-[#795D2A] rounded-full flex items-center justify-center 
          opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[100%] group-hover:translate-x-0"
        >
          <Heart className="aspect-square w-4 text-white hover:text-[#A08452]" />
        </button>

        <div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 w-full
          transform translate-y-full group-hover:translate-y-0 
          transition-transform duration-300 ease-in-out"
        >
          <button
            onClick={handleAddToCart}
            className="w-full flex justify-center gap-4 items-center rounded-lg bg-[#795D2A] text-white text-lg font-normal py-2 
            opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            Add to Cart
            <Briefcase />
          </button>
        </div>
      </div>
      <div className="mt-3">
        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="text-sm font-medium">{product.name}</h3>
        </Link>
        <div className="flex items-center mt-1">
          <span className="text-sm font-medium">
            ₹{product.discountPrice || product.price}
          </span>
          {product.discountPrice && product.discountPrice < product.price && (
            <span className="text-xs text-gray-500 line-through ml-2">
              ₹{product.price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
