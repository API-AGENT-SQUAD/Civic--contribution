import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, onFilterToggle, activeFilters = 0 }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  const mockSuggestions = [
    { type: 'technology', value: 'React', icon: 'Code' },
    { type: 'technology', value: 'Python', icon: 'Code' },
    { type: 'technology', value: 'JavaScript', icon: 'Code' },
    { type: 'cause', value: 'Climate Change', icon: 'Leaf' },
    { type: 'cause', value: 'Education', icon: 'GraduationCap' },
    { type: 'cause', value: 'Healthcare', icon: 'Heart' },
    { type: 'cause', value: 'Open Government', icon: 'Building' },
    { type: 'technology', value: 'Machine Learning', icon: 'Brain' },
    { type: 'technology', value: 'Blockchain', icon: 'Link' },
    { type: 'cause', value: 'Social Justice', icon: 'Scale' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const query = e?.target?.value;
    setSearchQuery(query);

    if (query?.length > 1) {
      const filtered = mockSuggestions?.filter(suggestion =>
        suggestion?.value?.toLowerCase()?.includes(query?.toLowerCase())
      );
      setSuggestions(filtered?.slice(0, 6));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      onSearch(searchQuery?.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion?.value);
    onSearch(suggestion?.value);
    setShowSuggestions(false);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    onSearch('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <form onSubmit={handleSearchSubmit} className="flex items-center space-x-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="relative">
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <input
              type="text"
              placeholder="Search repositories by technology or cause..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => searchQuery?.length > 1 && setShowSuggestions(true)}
              className="w-full pl-10 pr-10 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
            />
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleClearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
              >
                <Icon name="X" size={14} />
              </Button>
            )}
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions?.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-elevated z-50 max-h-64 overflow-y-auto">
              {suggestions?.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-muted transition-smooth first:rounded-t-lg last:rounded-b-lg"
                >
                  <Icon name={suggestion?.icon} size={16} className="text-muted-foreground" />
                  <div>
                    <div className="text-sm font-medium text-foreground">{suggestion?.value}</div>
                    <div className="text-xs text-muted-foreground capitalize">{suggestion?.type}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Button */}
        <Button
          type="submit"
          variant="default"
          iconName="Search"
          iconSize={18}
          disabled={!searchQuery?.trim()}
        >
          Search
        </Button>

        {/* Filter Toggle */}
        <Button
          type="button"
          variant="outline"
          onClick={onFilterToggle}
          iconName="Filter"
          iconSize={18}
          className="relative"
        >
          Filters
          {activeFilters > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {activeFilters}
            </span>
          )}
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;