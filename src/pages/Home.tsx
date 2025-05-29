import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star } from "lucide-react";
import { useCart, Book } from "@/contexts/CartContext";
import { toast } from "sonner";

// Mock data with prices in CFA francs (1 USD = 600 CFA)
const mockBooks: Book[] = [
  {
    _id: "1",
    title: "Atomic Habits",
    author: "James Clear",
    description: "An easy & proven way to build good habits & break bad ones.",
    price: Math.round(18.99 * 600), // Converted to CFA
    image:
      "https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    _id: "2",
    title: "The Alchemist",
    author: "Paulo Coelho",
    description:
      "A philosophical story about a shepherd's journey to find his personal legend.",
    price: Math.round(14.99 * 600), // Converted to CFA
    image:
      "https://m.media-amazon.com/images/I/71aFt4+OTOL._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    _id: "3",
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    description:
      "What the rich teach their kids about money that the poor and middle class do not.",
    price: Math.round(11.99 * 600), // Converted to CFA
    image:
      "https://m.media-amazon.com/images/I/81bsw6fnUiL._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    _id: "4",
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    description: "Powerful lessons in personal change.",
    price: Math.round(16.5 * 600), // Converted to CFA
    image:
      "https://m.media-amazon.com/images/I/71UwSHSZRnS._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    _id: "5",
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    description: "A counterintuitive approach to living a good life.",
    price: Math.round(17.0 * 600), // Converted to CFA
    image:
      "https://m.media-amazon.com/images/I/71QKQ9mwV7L._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    _id: "6",
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    description:
      "The most famous book on personal wealth and success ever published.",
    price: Math.round(10.99 * 600), // Converted to CFA
    image:
      "https://m.media-amazon.com/images/I/71UypkUjStL._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    _id: "7",
    title: "The Power of Now",
    author: "Eckhart Tolle",
    description: "A guide to spiritual enlightenment and living in the present.",
    price: Math.round(15.99 * 600), // Converted to CFA
    image:
      "https://m.media-amazon.com/images/I/71aG+xDKSYL._AC_UY327_FMwebp_QL65_.jpg",
  },
  {
    _id: "8",
    title: "Man's Search for Meaning",
    author: "Viktor E. Frankl",
    description:
      "A profound exploration of finding purpose in life, even in the face of suffering.",
    price: Math.round(12.99 * 600), // Converted to CFA
    image:
      "https://m.media-amazon.com/images/I/81s6DUyQCZL._AC_UY327_FMwebp_QL65_.jpg",
  },
];

const fetchBooks = async (): Promise<Book[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockBooks), 100);
  });
};

interface HomeProps {
  searchQuery: string;
}

const Home: React.FC<HomeProps> = ({ searchQuery }) => {
  const { addToCart } = useCart();
  const [visibleBooks, setVisibleBooks] = useState(8); // Number of books to display initially

  const {
    data: books,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  const handleAddToCart = (book: Book) => {
    addToCart(book);
    toast.success(`"${book.title}" added to cart!`, {
      className:
        "bg-gradient-to-r from-green-500 to-green-600 text-white border-0",
    });
  };

  const handleViewMore = () => {
    setVisibleBooks((prev) => prev + 8); // Load 8 more books
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card
              key={i}
              className="animate-pulse bg-white/70 backdrop-blur-sm"
            >
              <div className="h-64 bg-gradient-to-r from-purple-300 to-blue-300 rounded-t-lg"></div>
              <CardHeader>
                <div className="h-4 bg-purple-300 rounded w-3/4"></div>
                <div className="h-3 bg-purple-200 rounded w-1/2"></div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center animate-fade-in">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8">
          <p className="text-red-600 text-lg">
            Error loading books. Please try again.
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center mb-12 animate-scale-in">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-900 to-blue-900 bg-clip-text text-transparent mb-4">
          Discover Your Next
          <span className="block text-purple-600"> Great Read</span>
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Explore our curated collection of timeless classics and contemporary
          favorites. Find the perfect book to transport you to new worlds.
        </p>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books?.slice(0, visibleBooks).map((book) => (
          <Card
            key={book._id}
            className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white/80 backdrop-blur-sm border-purple-200 hover:border-purple-400 animate-fade-in hover-scale"
          >
            <CardHeader className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg animate-pulse">
                    {book.price.toLocaleString()} CFA
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <CardTitle className="text-xl font-bold text-purple-900 mb-2 line-clamp-2 group-hover:text-purple-700 transition-colors">
                {book.title}
              </CardTitle>
              <p className="text-purple-700 font-medium mb-3">
                by {book.author}
              </p>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {book.description}
              </p>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">(4.5)</span>
              </div>
            </CardContent>

            <CardFooter className="p-6 pt-0 flex gap-3">
              <Link to={`/book/${book._id}`} className="flex-1">
                <Button
                  variant="outline"
                  className="w-full border-purple-300 text-purple-900 hover:bg-purple-50 hover:border-purple-500 transition-all duration-200 hover:scale-105"
                >
                  View Details
                </Button>
              </Link>
              <Button
                onClick={() => handleAddToCart(book)}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all duration-200 hover:scale-105"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* View More Button */}
      <div className="text-center mt-8">
        <Button
          onClick={handleViewMore}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transition-none"
        >
          View More
        </Button>
      </div>
    </div>
  );
};

export default Home;
