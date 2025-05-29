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
    _id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    price: 7500,
    description: 'A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream. Set in the summer of 1922, the story follows Nick Carraway, a young bond salesman who moves to West Egg, Long Island, and becomes neighbors with the mysterious millionaire Jay Gatsby. Through lavish parties and tragic love affairs, Fitzgerald paints a vivid picture of the Roaring Twenties and the corruption of the American Dream.',
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    price: 8500,
    description: 'A gripping tale of racial injustice and childhood innocence in the American South.',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: '3',
    title: '1984',
    author: 'George Orwell',
    price: 8000,
    description: 'A dystopian social science fiction novel about totalitarian control and surveillance.',
    image: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    price: 7000,
    description: 'A romantic novel that critiques the British landed gentry at the end of the 18th century.',
    image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: '5',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    price: 7800,
    description: 'A coming-of-age story that explores themes of alienation and rebellion.',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: '6',
    title: 'Lord of the Flies',
    author: 'William Golding',
    price: 7200,
    description: 'A novel about a group of British boys stranded on an uninhabited island.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'
  }
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Book Image */}
        <div className="flex justify-center">
          <Card className="overflow-hidden bg-white/70 backdrop-blur-sm border-amber-200">
            <img
              src={book.image}
              alt={book.title}
              className="w-full max-w-md h-auto object-cover"
            />
          </Card>
        </div>

        {/* Book Information */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-amber-900 mb-3">{book.title}</h1>
            <p className="text-xl text-amber-700 font-medium mb-4">by {book.author}</p>
            
            <div className="flex items-center mb-6">
              <div className="flex items-center mr-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-gray-600">(4.5 out of 5)</span>
              </div>
              <Badge className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-4 py-2">
                {book.price.toLocaleString()} CFA
              </Badge>
            </div>
          </div>

          <Card className="bg-white/70 backdrop-blur-sm border-amber-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-amber-900 mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">{book.description}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-amber-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-amber-900 mb-3">Book Details</h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Format:</span>
                  <span>Hardcover</span>
                </div>
                <div className="flex justify-between">
                  <span>Pages:</span>
                  <span>180</span>
                </div>
                <div className="flex justify-between">
                  <span>Language:</span>
                  <span>English</span>
                </div>
                <div className="flex justify-between">
                  <span>Publisher:</span>
                  <span>Classic Books Inc.</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button 
              onClick={handleAddToCart}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-lg py-3"
              size="lg"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-amber-300 text-amber-900 hover:bg-amber-50"
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
