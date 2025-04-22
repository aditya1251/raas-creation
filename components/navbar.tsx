"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { useCart } from "@/context/cart-context";
import MiniCart from "@/components/mini-cart";
import { useQuery } from "@tanstack/react-query";
import { customerApi } from "@/lib/api/customer";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: customerApi.getCustomer,
  });
  const cartContext = useCart();
  const cartItems = cartContext?.cartItems || [];
  const cartCount = cartContext?.cartCount || 0;
  const removeFromCart = cartContext?.removeFromCart || ((id: string) => {});
  const updateQuantity =
    cartContext?.updateQuantity || ((id: string, quantity: number) => {});

  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside of search dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMiniCart = () => {
    setIsMiniCartOpen(!isMiniCartOpen);
    if (!isMiniCartOpen) {
      setIsMobileMenuOpen(false); // Close mobile menu if opening cart
      setIsSearchOpen(false); // Close search if opening cart
    }
  };
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      setIsMiniCartOpen(false); // Close cart if opening mobile menu
      setIsSearchOpen(false); // Close search if opening mobile menu
    }
  };
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setIsMobileMenuOpen(false); // Close mobile menu if opening search
      setIsMiniCartOpen(false); // Close cart if opening search
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      localStorage.setItem("lastSearch", searchQuery.trim());

      // Save to search history (optional)
      const searchHistory = JSON.parse(
        localStorage.getItem("searchHistory") || "[]"
      );
      if (!searchHistory.includes(searchQuery.trim())) {
        searchHistory.unshift(searchQuery.trim());
        // Keep only the last 5 searches
        if (searchHistory.length > 5) {
          searchHistory.pop();
        }
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
      }

      // Redirect to search results page (optional, depends on your app structure)
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);

      // Close the search dropdown
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 bg-white transition-shadow duration-300 ${
        isScrolled ? "shadow-md" : "border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="block">
              <Image
                src="https://res.cloudinary.com/dklqhgo8r/image/upload/v1741713365/omez9tvbpnwgmsnj3q3w.png"
                alt="RAAS The Creation Logo"
                width={120}
                height={50}
                className="h-auto"
              />
            </Link>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center flex-1">
            <ul className="flex space-x-8 lg:space-x-12">
              <li>
                <Link
                  href="/"
                  className="text-sm font-medium tracking-wide hover:text-[#a08452] transition-colors"
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="text-sm font-medium tracking-wide hover:text-[#a08452] transition-colors"
                >
                  SHOP
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm font-medium tracking-wide hover:text-[#a08452] transition-colors"
                >
                  ABOUT
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm font-medium tracking-wide hover:text-[#a08452] transition-colors"
                >
                  CONTACT
                </Link>
              </li>
            </ul>
          </nav>
          {/* Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Search Icon & Dropdown */}
            <div className="relative" ref={searchRef}>
              <button
                aria-label="Search"
                className="focus:outline-none p-1 rounded-full hover:bg-gray-100 transition-colors"
                onClick={toggleSearch}
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Search Dropdown */}
              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-white border border-gray-200 rounded-md shadow-lg p-3 z-50">
                  <form
                    onSubmit={handleSearchSubmit}
                    className="flex items-center"
                  >
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#a08452] focus:border-[#a08452]"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="bg-[#a08452] text-white px-4 py-3 rounded-r-md text-sm hover:bg-[#8a7245] transition-colors"
                    >
                      <Search className="h-4 w-4" />
                    </button>
                  </form>

                  {/* Search History (Optional) */}
                  {(() => {
                    // Only execute in client-side
                    if (typeof window !== "undefined") {
                      const searchHistory = JSON.parse(
                        localStorage.getItem("searchHistory") || "[]"
                      );
                      if (searchHistory.length > 0) {
                        return (
                          <div className="mt-3 pt-2 border-t border-gray-100">
                            <p className="text-gray-500 mb-1">
                              Recent searches
                            </p>
                            <ul className="space-y-1">
                              {searchHistory.map(
                                (search: string, index: number) => (
                                  <li key={index}>
                                    <button
                                      className="text text-gray-700 hover:text-[#a08452] flex items-center w-full text-left"
                                      onClick={() => {
                                        setSearchQuery(search);
                                        localStorage.setItem(
                                          "lastSearch",
                                          search
                                        );
                                        router.push(
                                          `/search?q=${encodeURIComponent(
                                            search
                                          )}`
                                        );
                                        setIsSearchOpen(false);
                                      }}
                                    >
                                      <Search className="h-3 w-3 mr-2 text-gray-400" />
                                      {search}
                                    </button>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        );
                      }
                    }
                    return null;
                  })()}
                </div>
              )}
            </div>

            <Link
              href={user ? "/account/wishlists" : "/signin"}
              aria-label="Wishlist"
              className="focus:outline-none p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Heart className="h-5 w-5" />
            </Link>
            <button
              aria-label="Cart"
              className="focus:outline-none relative p-1 rounded-full hover:bg-gray-100 transition-colors"
              onClick={toggleMiniCart}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#a08452] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <Link
              href={user ? "/account/orders" : "/signin"}
              aria-label="Account"
              className="focus:outline-none p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <User className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <nav className="px-4 py-3">
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="block py-2 text-sm font-medium hover:text-[#a08452] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="block py-2 text-sm font-medium hover:text-[#a08452] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  SHOP
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block py-2 text-sm font-medium hover:text-[#a08452] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  ABOUT
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="block py-2 text-sm font-medium hover:text-[#a08452] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  CONTACT
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Mini Cart */}
      <MiniCart
        isOpen={isMiniCartOpen}
        onClose={() => setIsMiniCartOpen(false)}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
    </header>
  );
}
