import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header, Footer, QuoteCard, AuthorCard, TopicCard, useBrainyQuote, Loading, Pagination } from '../components';
import { 
  MagnifyingGlassIcon, 
  AdjustmentsHorizontalIcon,
  XMarkIcon,
  FunnelIcon,
  StarIcon,
  ClockIcon,
  TagIcon,
  UserIcon
} from "@heroicons/react/24/outline";

const SearchPage = () => {
  const location = useLocation();
  const { searchQuotes, searchResults, authors, topics, isLoading } = useBrainyQuote();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('relevance');
  const [filterBy, setFilterBy] = useState('all');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [searchType, setSearchType] = useState('quotes');
  const resultsPerPage = 12;

  useEffect(() => {
    // Get search query from URL params
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    setSearchQuery(query);
    
    if (query) {
      searchQuotes(query, {
        author: selectedAuthor ? parseInt(selectedAuthor) : null,
        category: selectedTopic ? parseInt(selectedTopic) : null
      });
    }
  }, [location.search, searchQuotes, selectedAuthor, selectedTopic]);

  useEffect(() => {
    let filtered = [...searchResults];
    
    // Apply additional filters
    if (filterBy === 'recent') {
      filtered = filtered.filter(quote => {
        const date = new Date(quote.dateAdded);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return date >= thirtyDaysAgo;
      });
    } else if (filterBy === 'popular') {
      filtered = filtered.filter(quote => quote.likes > 1000);
    } else if (filterBy === 'featured') {
      filtered = filtered.filter(quote => quote.featured);
    }
    
    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'relevance':
          // Simple relevance scoring based on query match
          const aScore = calculateRelevanceScore(a, searchQuery);
          const bScore = calculateRelevanceScore(b, searchQuery);
          return bScore - aScore;
        case 'popular':
          return b.likes - a.likes;
        case 'recent':
          return new Date(b.dateAdded) - new Date(a.dateAdded);
        case 'alphabetical':
          return a.text.localeCompare(b.text);
        default:
          return 0;
      }
    });
    
    setFilteredResults(filtered);
    setCurrentPage(1);
  }, [searchResults, sortBy, filterBy, searchQuery]);

  const calculateRelevanceScore = (quote, query) => {
    let score = 0;
    const queryLower = query.toLowerCase();
    
    // Check text match
    if (quote.text.toLowerCase().includes(queryLower)) score += 3;
    
    // Check author match
    if (quote.author.toLowerCase().includes(queryLower)) score += 2;
    
    // Check category match
    if (quote.category.toLowerCase().includes(queryLower)) score += 1;
    
    // Check tags match
    quote.tags.forEach(tag => {
      if (tag.toLowerCase().includes(queryLower)) score += 1;
    });
    
    return score;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchQuotes(searchQuery, {
        author: selectedAuthor ? parseInt(selectedAuthor) : null,
        category: selectedTopic ? parseInt(selectedTopic) : null
      });
      
      // Update URL
      const params = new URLSearchParams();
      params.set('q', searchQuery);
      if (selectedAuthor) params.set('author', selectedAuthor);
      if (selectedTopic) params.set('topic', selectedTopic);
      window.history.replaceState({}, '', `${location.pathname}?${params}`);
    }
  };

  const clearFilters = () => {
    setSelectedAuthor('');
    setSelectedTopic('');
    setFilterBy('all');
    setSortBy('relevance');
  };

  const totalPages = Math.ceil(filteredResults.length / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const currentResults = filteredResults.slice(startIndex, startIndex + resultsPerPage);

  // Search suggestions
  const getSearchSuggestions = () => {
    if (!searchQuery) return [];
    
    const suggestions = [];
    
    // Add matching authors
    authors.forEach(author => {
      if (author.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        suggestions.push({
          type: 'author',
          name: author.name,
          id: author.id
        });
      }
    });
    
    // Add matching topics
    topics.forEach(topic => {
      if (topic.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        suggestions.push({
          type: 'topic',
          name: topic.name,
          id: topic.id
        });
      }
    });
    
    return suggestions.slice(0, 5);
  };

  const suggestions = getSearchSuggestions();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Search Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <MagnifyingGlassIcon className="w-8 h-8 mr-3 text-blue-600" />
              Search Results
            </h1>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search quotes, authors, or topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Search
                </button>
              </div>
            </form>
            
            {/* Search Suggestions */}
            {suggestions.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">You might also like:</h3>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (suggestion.type === 'author') {
                          window.location.href = `/authors/${suggestion.id}`;
                        } else {
                          window.location.href = `/topics/${suggestion.id}`;
                        }
                      }}
                      className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
                    >
                      {suggestion.type === 'author' ? (
                        <UserIcon className="w-4 h-4 mr-1" />
                      ) : (
                        <TagIcon className="w-4 h-4 mr-1" />
                      )}
                      {suggestion.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Search Stats */}
            {searchQuery && (
              <div className="text-sm text-gray-600">
                {filteredResults.length} results found for "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Filters and Results */}
      <div className="container mx-auto px-4 py-8">
        {/* Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex items-center gap-4 flex-1">
              {/* Search Type Tabs */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setSearchType('quotes')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    searchType === 'quotes'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Quotes
                </button>
                <button
                  onClick={() => setSearchType('authors')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    searchType === 'authors'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Authors
                </button>
                <button
                  onClick={() => setSearchType('topics')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    searchType === 'topics'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Topics
                </button>
              </div>
              
              {/* Quick Filters */}
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterBy(filterBy === 'popular' ? 'all' : 'popular')}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterBy === 'popular'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <StarIcon className="w-4 h-4 mr-1" />
                  Popular
                </button>
                <button
                  onClick={() => setFilterBy(filterBy === 'recent' ? 'all' : 'recent')}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterBy === 'recent'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <ClockIcon className="w-4 h-4 mr-1" />
                  Recent
                </button>
              </div>
            </div>
            
            {/* Sort and Advanced Filters */}
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="relevance">Most Relevant</option>
                <option value="popular">Most Popular</option>
                <option value="recent">Most Recent</option>
                <option value="alphabetical">Alphabetical</option>
              </select>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <AdjustmentsHorizontalIcon className="w-5 h-5 mr-2" />
                Filters
              </button>
              
              {(selectedAuthor || selectedTopic || filterBy !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <XMarkIcon className="w-5 h-5 mr-2" />
                  Clear
                </button>
              )}
            </div>
          </div>
          
          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filter by Author
                  </label>
                  <select
                    value={selectedAuthor}
                    onChange={(e) => setSelectedAuthor(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Authors</option>
                    {authors.map(author => (
                      <option key={author.id} value={author.id}>
                        {author.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filter by Topic
                  </label>
                  <select
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Topics</option>
                    {topics.map(topic => (
                      <option key={topic.id} value={topic.id}>
                        {topic.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* Results */}
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentResults.map((quote, index) => (
                <QuoteCard key={quote.id} quote={quote} index={index} />
              ))}
            </div>
            
            {/* No Results */}
            {filteredResults.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No results found for "{searchQuery}"
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search terms or filters
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setSearchQuery('')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Clear Search
                  </button>
                  <a
                    href="/topics"
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Browse Topics
                  </a>
                </div>
              </div>
            )}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default SearchPage;