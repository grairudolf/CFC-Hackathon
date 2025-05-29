
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart, Book } from '@/contexts/CartContext';
import { toast } from 'sonner';

// Mock data with prices in CFA francs
const mockBooks: Book[] = [
  {
    _id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    price: 7500,
    description: 'A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.',
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=400&q=80'
  },
  {
    _id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    price: 8500,
    description: 'A gripping tale of racial injustice and childhood innocence in the American South.',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=400&q=80'
  },
  {
    _id: '3',
    title: '1984',
    author: 'George Orwell',
    price: 8000,
    description: 'A dystopian social science fiction novel about totalitarian control and surveillance.',
    image: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&w=400&q=80'
  },
  {
    _id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    price: 7000,
    description: 'A romantic novel that critiques the British landed gentry at the end of the 18th century.',
    image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80'
  },
  {
    _id: '5',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    price: 7800,
    description: 'A coming-of-age story that explores themes of alienation and rebellion.',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80'
  },
  {
    _id: '6',
    title: 'Lord of the Flies',
    author: 'William Golding',
    price: 7200,
    description: 'A novel about a group of British boys stranded on an uninhabited island.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  }
];

const fetchBooks = async (): Promise<Book[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockBooks), 100);
  });
};

interface HomeProps {
  searchQuery?: string;
}

const Home = ({ searchQuery = '' }: HomeProps) => {
  const { addToCart } = useCart();
  const [displayedBooks, setDisplayedBooks] = useState<Book[]>([]);
  
  const { data: books, isLoading, error } = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
    onSuccess: (data) => {
      setDisplayedBooks(data);
    }
  });

  // Filter books based on search query
  const filteredBooks = books?.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleAddToCart = (book: Book) => {
    addToCart(book);
    toast.success(`"${book.title}" added to cart!`, {
      className: 'bg-gradient-to-r from-green-500 to-green-600 text-white border-0'
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse bg-white/70 backdrop-blur-sm">
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
          <p className="text-red-600 text-lg">Error loading books. Please try again.</p>
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

  const booksToShow = searchQuery ? filteredBooks : books || [];

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      {/* Hero Section */}
      {!searchQuery && (
        <div className="text-center mb-12 animate-scale-in">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-900 to-blue-900 bg-clip-text text-transparent mb-4">
            Discover Your Next
            <span className="block text-purple-600"> Great Read</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Explore our curated collection of timeless classics and contemporary favorites. 
            Find the perfect book to transport you to new worlds.
          </p>
        </div>
      )}

      {/* Search Results Header */}
      {searchQuery && (
        <div className="mb-8 animate-fade-in">
          <h2 className="text-2xl font-bold text-purple-900 mb-2">
            Search Results for "{searchQuery}"
          </h2>
          <p className="text-gray-600">
            Found {booksToShow.length} book{booksToShow.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* No Results */}
      {searchQuery && booksToShow.length === 0 && (
        <div className="text-center py-16 animate-fade-in">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-purple-900 mb-2">No books found</h3>
            <p className="text-gray-600">Try adjusting your search terms or browse all books.</p>
          </div>
        </div>
      )}

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {booksToShow.map((book, index) => (
          <Card 
            key={book._id} 
            className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white/80 backdrop-blur-sm border-purple-200 hover:border-purple-400 animate-fade-in hover-scale"
            style={{ animationDelay: `${index * 100}ms` }}
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
              <p className="text-purple-700 font-medium mb-3">by {book.author}</p>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {book.description}
              </p>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
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
    </div>
  );
};

export default Home;
