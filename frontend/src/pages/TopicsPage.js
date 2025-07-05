import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header, Footer, TopicCard, useBrainyQuote, Loading, Pagination } from '../components';
import { 
  TagIcon, 
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  SparklesIcon,
  TrophyIcon,
  FireIcon
} from "@heroicons/react/24/outline";

const TopicsPage = () => {
  const { topics, isLoading } = useBrainyQuote();
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const topicsPerPage = 12;

  useEffect(() => {
    let filtered = [...topics];
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(topic =>
        topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedFilter === 'featured') {
      filtered = filtered.filter(topic => topic.featured);
    }
    
    // Sort topics
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.totalQuotes - a.totalQuotes;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'newest':
          return b.id - a.id;
        default:
          return 0;
      }
    });
    
    setFilteredTopics(filtered);
    setCurrentPage(1);
  }, [topics, searchQuery, sortBy, selectedFilter]);

  const totalPages = Math.ceil(filteredTopics.length / topicsPerPage);
  const startIndex = (currentPage - 1) * topicsPerPage;
  const currentTopics = filteredTopics.slice(startIndex, startIndex + topicsPerPage);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="topics" />
      
      {/* Page Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <TagIcon className="w-10 h-10 mr-3 text-blue-600" />
              Topics
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore quotes organized by themes and categories that inspire, motivate, and enlighten
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
                placeholder="Search topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </form>
            
            {/* Filter Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Topics
              </button>
              <button
                onClick={() => setSelectedFilter('featured')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedFilter === 'featured'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Featured
              </button>
            </div>
            
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="popular">Most Popular</option>
              <option value="name">Alphabetical</option>
              <option value="newest">Newest</option>
            </select>
          </div>
          
          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {currentTopics.length} of {filteredTopics.length} topics
          </div>
        </div>
        
        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentTopics.map((topic, index) => (
            <TopicCard key={topic.id} topic={topic} index={index} />
          ))}
        </div>
        
        {/* No Results */}
        {filteredTopics.length === 0 && (
          <div className="text-center py-12">
            <TagIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No topics found</h3>
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
      
      {/* Featured Topics Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <SparklesIcon className="w-8 h-8 mr-3 text-yellow-500" />
              Featured Topics
            </h2>
            <p className="text-gray-600">Our most popular quote categories</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topics.filter(t => t.featured).map((topic, index) => (
              <motion.div
                key={topic.id}
                className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => window.location.href = `/topics/${topic.id}`}
              >
                <div className={`w-16 h-16 ${topic.color} rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform`}>
                  {topic.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                  {topic.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{topic.description}</p>
                <p className="text-xs text-gray-500">{topic.totalQuotes} quotes</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Popular Categories */}
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <TrophyIcon className="w-8 h-8 mr-3 text-yellow-500" />
              Most Popular Categories
            </h2>
            <p className="text-gray-600">Browse quotes by the most searched topics</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {topics.sort((a, b) => b.totalQuotes - a.totalQuotes).slice(0, 12).map((topic, index) => (
              <motion.a
                key={topic.id}
                href={`/topics/${topic.id}`}
                className="text-center p-4 rounded-lg hover:bg-white hover:shadow-md transition-all group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-3xl mb-2 group-hover:scale-125 transition-transform">
                  {topic.icon}
                </div>
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                  {topic.name}
                </h3>
                <p className="text-xs text-gray-500">{topic.totalQuotes} quotes</p>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TopicsPage;