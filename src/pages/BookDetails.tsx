import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ShoppingCart, Star, Heart } from 'lucide-react';
import { useCart, Book } from '@/contexts/CartContext';
import { toast } from 'sonner';

// Mock data - replace with actual API call
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
];

const fetchBook = async (id: string): Promise<Book> => {
  // In a real app: const response = await fetch(`/api/books/${id}`);
  const book = mockBooks.find(book => book._id === id);
  if (!book) throw new Error('Book not found');
  return book;
};

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const { data: book, isLoading, error } = useQuery({
    queryKey: ['book', id],
    queryFn: () => fetchBook(id!),
    enabled: !!id,
  });

  const handleAddToCart = () => {
    if (book) {
      addToCart(book);
      toast.success(`"${book.title}" added to cart!`);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="h-96 bg-gray-300 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-20 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-600">Book not found. Please try again.</p>
        <Button onClick={() => navigate('/')} className="mt-4">
          Return to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        onClick={() => navigate(-1)} 
        variant="ghost" 
        className="mb-8 text-amber-900 hover:text-amber-700 hover:bg-amber-100"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Book Image */}
        <div className="flex justify-center">
          <img src={book.image} alt={book.title} className="w-full max-w-md rounded-lg shadow-lg" />
        </div>

        {/* Book Details */}
        <div>
          <h1 className="text-2xl font-bold">{book.title}</h1>
          <p className="text-lg text-gray-600">{book.author}</p>
          <p className="text-purple-600 text-xl font-semibold">{book.price} CFA</p>
          <Button 
            onClick={handleAddToCart}
            className="mt-4 w-full sm:w-auto"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
