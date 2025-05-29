import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (query: string) => void;
  fetchSuggestions: (query: string) => Promise<string[]>; // Function to fetch suggestions
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  fetchSuggestions,
  className = "",
}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setQuery(input);

    if (input.trim()) {
      const fetchedSuggestions = await fetchSuggestions(input.trim());
      setSuggestions(fetchedSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
    setSuggestions([]); // Clear suggestions after search
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setSuggestions([]); // Clear suggestions after selection
  };

  const clearSearch = () => {
    setQuery("");
    onSearch("");
    setSuggestions([]);
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSearch} className="relative flex items-center">
        <Input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search books, authors..."
          className="w-full border border-purple-300 rounded-lg px-4 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-12 text-purple-500 hover:text-purple-700"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <Button
          type="submit"
          className="absolute right-2 bg-blue-600 text-white px-2 py-2 rounded-lg hover:bg-blue-700"
        >
          <Search className="h-4 w-4" />
        </Button>
      </form>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 mt-2 w-full bg-white border border-purple-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-4 py-2 hover:bg-purple-100 cursor-pointer"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
