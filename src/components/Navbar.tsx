import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import SearchBar from "./SearchBar";

const Navbar: React.FC = () => {
  const { getCartItemCount } = useCart();
  const cartItemCount = getCartItemCount();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (query: string) => {
    console.log("Search query:", query); // Debugging: Ensure the query is logged
    // Add logic to handle the search query (e.g., update state or navigate)
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-600 backdrop-blur-sm border-b border-purple-300 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="text-white text-lg font-bold">
          BookStore
        </Link>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex items-center space-x-4">
          <SearchBar onSearch={handleSearch} className="w-64" />
          <Link to="/cart" className="relative text-white">
            <ShoppingCart className="h-6 w-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-purple-700 text-white p-4 space-y-4">
          <SearchBar onSearch={handleSearch} className="w-full" />
          <Link to="/cart" className="flex items-center">
            <ShoppingCart className="h-6 w-6 mr-2" />
            Cart ({cartItemCount})
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
