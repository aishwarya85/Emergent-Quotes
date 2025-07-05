import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header, Footer, QuoteCard, useBrainyQuote, Loading, Pagination } from '../components';
import { 
  TagIcon, 
  BookOpenIcon,
  ArrowLeftIcon,
  ShareIcon,
  HeartIcon,
  BookmarkIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

const TopicDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { topics, getQuotesByCategory, isLoading } = useBrainyQuote();
  const [topic, setTopic] = useState(null);
  const [topicQuotes, setTopicQuotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('popular');
  const quotesPerPage = 12;

  useEffect(() => {
    const foundTopic = topics.find(t => t.id === parseInt(id));
    if (foundTopic) {
      setTopic(foundTopic);
      let quotes = getQuotesByCategory(foundTopic.id);
      
      // Sort quotes
      quotes.sort((a, b) => {
        switch (sortBy) {
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
      
      setTopicQuotes(quotes);
    }
  }, [id, topics, getQuotesByCategory, sortBy]);

  const totalPages = Math.ceil(topicQuotes.length / quotesPerPage);
  const startIndex = (currentPage - 1) * quotesPerPage;
  const currentQuotes = topicQuotes.slice(startIndex, startIndex + quotesPerPage);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${topic.name} Quotes - BrainyQuote`,
        text: `Check out inspiring ${topic.name.toLowerCase()} quotes`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (isLoading) return <Loading />;

  if (!topic) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Topic Not Found</h1>
          <p className="text-gray-600 mb-8">The topic you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/topics')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All Topics
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="topics" />
      
      {/* Topic Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate('/topics')}
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mr-6"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Topics
            </button>
          </div>
          
          <div className="text-center">
            <motion.div
              className={`w-24 h-24 ${topic.color} rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl shadow-lg`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {topic.icon}
            </motion.div>
            
            <motion.h1
              className="text-4xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {topic.name} Quotes
            </motion.h1>
            
            <motion.p
              className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {topic.description}
            </motion.p>
            
            <motion.div
              className="flex flex-wrap items-center justify-center gap-6 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center text-gray-600">
                <BookOpenIcon className="w-5 h-5 mr-2" />
                <span>{topicQuotes.length} quotes</span>
              </div>
              {topic.featured && (
                <div className="flex items-center text-yellow-600">
                  <SparklesIcon className="w-5 h-5 mr-2" />
                  <span>Featured Topic</span>
                </div>
              )}
            </motion.div>
            
            <motion.div
              className="flex justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button
                onClick={handleShare}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ShareIcon className="w-5 h-5 mr-2" />
                Share Topic
              </button>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Top Quotes Preview */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Most Popular {topic.name} Quotes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topicQuotes.slice(0, 3).map((quote, index) => (
              <motion.div
                key={quote.id}
                className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <blockquote className="text-gray-700 mb-4 font-medium">
                  "{quote.text}"
                </blockquote>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-blue-600 font-medium">— {quote.author}</p>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <HeartIcon className="w-4 h-4" />
                    <span className="text-sm">{quote.likes}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* All Quotes Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
            All {topic.name} Quotes
          </h2>
          
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="popular">Most Popular</option>
              <option value="recent">Most Recent</option>
              <option value="alphabetical">Alphabetical</option>
            </select>
            
            <span className="text-sm text-gray-600">
              {topicQuotes.length} quotes
            </span>
          </div>
        </div>
        
        {/* Quotes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentQuotes.map((quote, index) => (
            <QuoteCard key={quote.id} quote={quote} index={index} />
          ))}
        </div>
        
        {/* No Quotes */}
        {topicQuotes.length === 0 && (
          <div className="text-center py-12">
            <BookOpenIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No quotes available</h3>
            <p className="text-gray-600">We're working on adding more quotes for this topic.</p>
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
      
      {/* Related Topics */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Related Topics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {topics.filter(t => t.id !== topic.id).slice(0, 6).map((relatedTopic, index) => (
              <motion.a
                key={relatedTopic.id}
                href={`/topics/${relatedTopic.id}`}
                className="text-center p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-3xl mb-2 group-hover:scale-125 transition-transform">
                  {relatedTopic.icon}
                </div>
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                  {relatedTopic.name}
                </h3>
                <p className="text-xs text-gray-500">{relatedTopic.totalQuotes} quotes</p>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TopicDetailPage;