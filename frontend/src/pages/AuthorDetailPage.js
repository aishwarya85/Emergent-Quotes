import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header, Footer, QuoteCard, useBrainyQuote, Loading, Pagination } from '../components';
import { 
  UserIcon, 
  CalendarDaysIcon, 
  BookOpenIcon,
  ArrowLeftIcon,
  ShareIcon,
  HeartIcon,
  BookmarkIcon
} from "@heroicons/react/24/outline";

const AuthorDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authors, getQuotesByAuthor, isLoading } = useBrainyQuote();
  const [author, setAuthor] = useState(null);
  const [authorQuotes, setAuthorQuotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('popular');
  const quotesPerPage = 12;

  useEffect(() => {
    const foundAuthor = authors.find(a => a.id === parseInt(id));
    if (foundAuthor) {
      setAuthor(foundAuthor);
      let quotes = getQuotesByAuthor(foundAuthor.id);
      
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
      
      setAuthorQuotes(quotes);
    }
  }, [id, authors, getQuotesByAuthor, sortBy]);

  const totalPages = Math.ceil(authorQuotes.length / quotesPerPage);
  const startIndex = (currentPage - 1) * quotesPerPage;
  const currentQuotes = authorQuotes.slice(startIndex, startIndex + quotesPerPage);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${author.name} - BrainyQuote`,
        text: `Check out inspiring quotes from ${author.name}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (isLoading) return <Loading />;

  if (!author) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Author Not Found</h1>
          <p className="text-gray-600 mb-8">The author you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/authors')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All Authors
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="authors" />
      
      {/* Author Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate('/authors')}
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mr-6"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Authors
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <motion.img
              src={author.image}
              alt={author.name}
              className="w-32 h-32 rounded-full object-cover shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            
            <div className="flex-1 text-center md:text-left">
              <motion.h1
                className="text-4xl font-bold text-gray-900 mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {author.name}
              </motion.h1>
              
              <motion.p
                className="text-xl text-blue-600 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {author.profession}
              </motion.p>
              
              <motion.p
                className="text-gray-600 mb-6 max-w-2xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {author.bio}
              </motion.p>
              
              <motion.div
                className="flex flex-wrap items-center gap-6 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center text-gray-600">
                  <CalendarDaysIcon className="w-5 h-5 mr-2" />
                  <span>{author.birth} - {author.death || 'Present'}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <BookOpenIcon className="w-5 h-5 mr-2" />
                  <span>{authorQuotes.length} quotes</span>
                </div>
              </motion.div>
              
              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <button
                  onClick={handleShare}
                  className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ShareIcon className="w-5 h-5 mr-2" />
                  Share Author
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Popular Quotes Preview */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Most Popular Quotes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {author.popularQuotes.map((quote, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-4 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <blockquote className="text-gray-700 text-sm italic mb-2">
                  "{quote}"
                </blockquote>
                <p className="text-xs text-gray-500">— {author.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* All Quotes Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">All Quotes by {author.name}</h2>
          
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
              {authorQuotes.length} quotes
            </span>
          </div>
        </div>
        
        {/* Quotes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentQuotes.map((quote, index) => (
            <QuoteCard key={quote.id} quote={quote} index={index} showAuthor={false} />
          ))}
        </div>
        
        {/* No Quotes */}
        {authorQuotes.length === 0 && (
          <div className="text-center py-12">
            <BookOpenIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No quotes available</h3>
            <p className="text-gray-600">We're working on adding more quotes from this author.</p>
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
      
      {/* Related Authors */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Related Authors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {authors.filter(a => a.id !== author.id).slice(0, 6).map((relatedAuthor, index) => (
              <motion.a
                key={relatedAuthor.id}
                href={`/authors/${relatedAuthor.id}`}
                className="text-center p-4 rounded-lg hover:bg-gray-50 transition-colors group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <img
                  src={relatedAuthor.image}
                  alt={relatedAuthor.name}
                  className="w-16 h-16 rounded-full mx-auto mb-2 object-cover group-hover:scale-110 transition-transform"
                />
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {relatedAuthor.name}
                </h3>
                <p className="text-xs text-gray-500">{relatedAuthor.profession}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AuthorDetailPage;