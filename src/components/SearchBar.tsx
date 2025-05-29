
import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface SearchBarProps {
  onSearch: (query: string) => void;
  className?: string;
}

const SearchBar = ({ onSearch, className = '' }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
    setIsExpanded(false);
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSearch} className="relative">
        <div className={`transition-all duration-300 ${isExpanded ? 'w-80' : 'w-12'} flex items-center`}>
          {isExpanded ? (
            <Card className="flex items-center w-full p-2 bg-white/90 backdrop-blur-sm border-purple-200 shadow-lg">
              <Search className="h-4 w-4 text-purple-600 mx-2" />
              <Input
                type="text"
                placeholder="Search books, authors..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border-0 focus:ring-0 bg-transparent text-purple-900 placeholder:text-purple-500"
                autoFocus
              />
              {query && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearSearch}
                  className="h-6 w-6 p-0 hover:bg-purple-100"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </Card>
          ) : (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(true)}
              className="h-10 w-10 text-purple-900 hover:text-purple-700 hover:bg-purple-100 transition-all duration-200 hover:scale-110"
            >
              <Search className="h-5 w-5" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
