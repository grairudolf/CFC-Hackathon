import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import SearchBar from './SearchBar';

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const { getCartItemCount } = useCart();
  const cartItemCount = getCartItemCount();

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-blue-600 backdrop-blur-sm border-b border-purple-300 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-white hover:text-purple-200 transition-all duration-200 hover:scale-105"
          >
            <BookOpen className="h-8 w-8" />
            <span className="text-xl font-bold">BookStore</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <SearchBar onSearch={onSearch} />
            
            <Link to="/">
              <Button 
                variant="ghost" 
                className="text-white hover:text-purple-200 hover:bg-white/10 transition-all duration-200 hover:scale-105"
              >
                Home
              </Button>
            </Link>
            
            <Link to="/cart" className="relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:text-purple-200 hover:bg-white/10 transition-all duration-200 hover:scale-110"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-orange-500 hover:bg-orange-600 text-white text-xs animate-pulse">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
