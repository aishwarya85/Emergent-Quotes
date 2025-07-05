import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header, Footer, AuthorCard, useBrainyQuote, Loading, Pagination } from '../components';
import { 
  UserGroupIcon, 
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon 
} from "@heroicons/react/24/outline";

const AuthorsPage = () => {
  const { authors, isLoading } = useBrainyQuote();
  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const authorsPerPage = 12;

  useEffect(() => {
    let filtered = [...authors];
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(author =>
        author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        author.profession.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Sort authors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'profession':
          return a.profession.localeCompare(b.profession);
        case 'quotes':
          return b.totalQuotes - a.totalQuotes;
        default:
          return 0;
      }
    });
    
    setFilteredAuthors(filtered);
    setCurrentPage(1);
  }, [authors, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredAuthors.length / authorsPerPage);
  const startIndex = (currentPage - 1) * authorsPerPage;
  const currentAuthors = filteredAuthors.slice(startIndex, startIndex + authorsPerPage);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="authors" />
      
      {/* Page Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <UserGroupIcon className="w-10 h-10 mr-3 text-blue-600" />
              Authors
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover inspiring quotes from history's greatest minds, thought leaders, and visionaries
            </p>
          </div>
        </div>
      </div>
      
      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </form>
            
            {/* Sort Dropdown */}
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">Sort by Name</option>
                <option value="profession">Sort by Profession</option>
                <option value="quotes">Sort by Quote Count</option>
              </select>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <AdjustmentsHorizontalIcon className="w-5 h-5 mr-2" />
                Filters
              </button>
            </div>
          </div>
          
          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {currentAuthors.length} of {filteredAuthors.length} authors
          </div>
        </div>
        
        {/* Authors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentAuthors.map((author, index) => (
            <AuthorCard key={author.id} author={author} index={index} />
          ))}
        </div>
        
        {/* No Results */}
        {filteredAuthors.length === 0 && (
          <div className="text-center py-12">
            <UserGroupIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No authors found</h3>
            <p className="text-gray-600">Try adjusting your search criteria</p>
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
      </div>
      
      {/* Featured Authors Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Most Popular Authors</h2>
            <p className="text-gray-600">The most quoted authors on BrainyQuote</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {authors.slice(0, 12).map((author, index) => (
              <motion.a
                key={author.id}
                href={`/authors/${author.id}`}
                className="text-center p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <img
                  src={author.image}
                  alt={author.name}
                  className="w-16 h-16 rounded-full mx-auto mb-2 object-cover group-hover:scale-110 transition-transform"
                />
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {author.name}
                </h3>
                <p className="text-xs text-gray-500">{author.totalQuotes} quotes</p>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AuthorsPage;