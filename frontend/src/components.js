import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MagnifyingGlassIcon, 
  Bars3Icon, 
  XMarkIcon,
  HomeIcon,
  UserGroupIcon,
  TagIcon,
  SunIcon,
  ShareIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  BookmarkIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  CalendarDaysIcon,
  SparklesIcon,
  FireIcon,
  TrophyIcon,
  StarIcon
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid, BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid";

// Context for global state management
const BrainyQuoteContext = createContext();

// Mock comprehensive data
const mockAuthors = [
  {
    id: 1,
    name: "Maya Angelou",
    profession: "Poet, Civil Rights Activist",
    bio: "Maya Angelou was an American poet, memoirist, and civil rights activist. She published seven autobiographies, three books of essays, several books of poetry, and is credited with a list of plays, movies, and television shows spanning over 50 years.",
    birth: "April 4, 1928",
    death: "May 28, 2014",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
    totalQuotes: 156,
    popularQuotes: [
      "If you don't like something, change it. If you can't change it, change your attitude.",
      "There is no greater agony than bearing an untold story inside you.",
      "We delight in the beauty of the butterfly, but rarely admit the changes it has gone through to achieve that beauty."
    ]
  },
  {
    id: 2,
    name: "Albert Einstein",
    profession: "Theoretical Physicist",
    bio: "Albert Einstein was a German-born theoretical physicist, widely acknowledged to be one of the greatest physicists of all time. Einstein is known for developing the theory of relativity, but he also made important contributions to the development of the theory of quantum mechanics.",
    birth: "March 14, 1879",
    death: "April 18, 1955",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    totalQuotes: 234,
    popularQuotes: [
      "Imagination is more important than knowledge.",
      "Try not to become a person of success, but rather try to become a person of value.",
      "The important thing is not to stop questioning."
    ]
  },
  {
    id: 3,
    name: "Winston Churchill",
    profession: "British Prime Minister",
    bio: "Sir Winston Leonard Spencer Churchill was a British statesman, soldier, and writer who served as Prime Minister of the United Kingdom twice, from 1940 to 1945 during the Second World War, and again from 1951 to 1955.",
    birth: "November 30, 1874",
    death: "January 24, 1965",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
    totalQuotes: 189,
    popularQuotes: [
      "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.",
      "We make a living by what we get, but we make a life by what we give."
    ]
  },
  {
    id: 4,
    name: "Steve Jobs",
    profession: "Entrepreneur, Apple Co-founder",
    bio: "Steven Paul Jobs was an American entrepreneur, industrial designer, business magnate, media proprietor, and investor. He was the co-founder, chairman, and CEO of Apple; the chairman and majority shareholder of Pixar.",
    birth: "February 24, 1955",
    death: "October 5, 2011",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    totalQuotes: 98,
    popularQuotes: [
      "Innovation distinguishes between a leader and a follower.",
      "Stay hungry, stay foolish.",
      "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work."
    ]
  }
];

const mockTopics = [
  {
    id: 1,
    name: "Motivational",
    description: "Quotes that inspire and motivate you to achieve your goals",
    color: "bg-red-500",
    icon: "🚀",
    totalQuotes: 1247,
    featured: true
  },
  {
    id: 2,
    name: "Success",
    description: "Wisdom about achieving success and reaching your potential",
    color: "bg-yellow-500",
    icon: "🏆",
    totalQuotes: 892,
    featured: true
  },
  {
    id: 3,
    name: "Life",
    description: "Profound thoughts about life, existence, and meaning",
    color: "bg-green-500",
    icon: "🌱",
    totalQuotes: 1534,
    featured: true
  },
  {
    id: 4,
    name: "Love",
    description: "Beautiful quotes about love, relationships, and connection",
    color: "bg-pink-500",
    icon: "💕",
    totalQuotes: 678,
    featured: true
  },
  {
    id: 5,
    name: "Inspirational",
    description: "Uplifting quotes to inspire and encourage",
    color: "bg-purple-500",
    icon: "✨",
    totalQuotes: 1123,
    featured: false
  },
  {
    id: 6,
    name: "Wisdom",
    description: "Timeless wisdom and profound insights",
    color: "bg-indigo-500",
    icon: "🧠",
    totalQuotes: 945,
    featured: false
  }
];

const mockQuotes = [
  {
    id: 1,
    text: "If you don't like something, change it. If you can't change it, change your attitude.",
    author: "Maya Angelou",
    authorId: 1,
    category: "Motivational",
    categoryId: 1,
    backgroundImage: "https://images.unsplash.com/photo-1650513737590-4a00deeddc7a",
    likes: 1247,
    shares: 89,
    bookmarks: 156,
    tags: ["change", "attitude", "motivation"],
    featured: true,
    dateAdded: "2024-01-15"
  },
  {
    id: 2,
    text: "Imagination is more important than knowledge.",
    author: "Albert Einstein",
    authorId: 2,
    category: "Wisdom",
    categoryId: 6,
    backgroundImage: "https://images.unsplash.com/photo-1535515384173-d74166f26820",
    likes: 2134,
    shares: 234,
    bookmarks: 345,
    tags: ["imagination", "knowledge", "creativity"],
    featured: true,
    dateAdded: "2024-01-10"
  },
  {
    id: 3,
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    authorId: 3,
    category: "Success",
    categoryId: 2,
    backgroundImage: "https://images.unsplash.com/photo-1617361194384-1852022fe186",
    likes: 1876,
    shares: 167,
    bookmarks: 298,
    tags: ["success", "failure", "courage"],
    featured: true,
    dateAdded: "2024-01-08"
  },
  {
    id: 4,
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
    authorId: 4,
    category: "Success",
    categoryId: 2,
    backgroundImage: "https://images.unsplash.com/photo-1529094270367-c8f8a8a6ed21",
    likes: 1456,
    shares: 123,
    bookmarks: 234,
    tags: ["innovation", "leadership", "success"],
    featured: true,
    dateAdded: "2024-01-05"
  },
  {
    id: 5,
    text: "There is no greater agony than bearing an untold story inside you.",
    author: "Maya Angelou",
    authorId: 1,
    category: "Life",
    categoryId: 3,
    backgroundImage: "https://images.pexels.com/photos/9017590/pexels-photo-9017590.jpeg",
    likes: 987,
    shares: 89,
    bookmarks: 167,
    tags: ["story", "expression", "truth"],
    featured: false,
    dateAdded: "2024-01-03"
  },
  {
    id: 6,
    text: "Try not to become a person of success, but rather try to become a person of value.",
    author: "Albert Einstein",
    authorId: 2,
    category: "Success",
    categoryId: 2,
    backgroundImage: "https://images.pexels.com/photos/5716037/pexels-photo-5716037.jpeg",
    likes: 1654,
    shares: 145,
    bookmarks: 278,
    tags: ["success", "value", "character"],
    featured: false,
    dateAdded: "2024-01-01"
  }
];

// Context Provider
export const BrainyQuoteProvider = ({ children }) => {
  const [authors, setAuthors] = useState(mockAuthors);
  const [topics, setTopics] = useState(mockTopics);
  const [quotes, setQuotes] = useState(mockQuotes);
  const [favorites, setFavorites] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Search functionality
  const searchQuotes = (query, filters = {}) => {
    setIsLoading(true);
    setTimeout(() => {
      let results = quotes.filter(quote => {
        const matchesQuery = query === '' || 
          quote.text.toLowerCase().includes(query.toLowerCase()) ||
          quote.author.toLowerCase().includes(query.toLowerCase()) ||
          quote.category.toLowerCase().includes(query.toLowerCase()) ||
          quote.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
        
        const matchesAuthor = !filters.author || quote.authorId === filters.author;
        const matchesCategory = !filters.category || quote.categoryId === filters.category;
        
        return matchesQuery && matchesAuthor && matchesCategory;
      });
      
      setSearchResults(results);
      setIsLoading(false);
    }, 500);
  };

  // Toggle favorite
  const toggleFavorite = (quoteId) => {
    setFavorites(prev => 
      prev.includes(quoteId) 
        ? prev.filter(id => id !== quoteId)
        : [...prev, quoteId]
    );
    
    // Update quote likes
    setQuotes(prev => prev.map(quote => 
      quote.id === quoteId 
        ? { ...quote, likes: favorites.includes(quoteId) ? quote.likes - 1 : quote.likes + 1 }
        : quote
    ));
  };

  // Toggle bookmark
  const toggleBookmark = (quoteId) => {
    setBookmarks(prev => 
      prev.includes(quoteId) 
        ? prev.filter(id => id !== quoteId)
        : [...prev, quoteId]
    );
    
    // Update quote bookmarks
    setQuotes(prev => prev.map(quote => 
      quote.id === quoteId 
        ? { ...quote, bookmarks: bookmarks.includes(quoteId) ? quote.bookmarks - 1 : quote.bookmarks + 1 }
        : quote
    ));
  };

  // Share quote
  const shareQuote = (quoteId) => {
    const quote = quotes.find(q => q.id === quoteId);
    if (quote && navigator.share) {
      navigator.share({
        title: 'BrainyQuote',
        text: `"${quote.text}" - ${quote.author}`,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      const quote = quotes.find(q => q.id === quoteId);
      navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`);
    }
    
    // Update share count
    setQuotes(prev => prev.map(quote => 
      quote.id === quoteId 
        ? { ...quote, shares: quote.shares + 1 }
        : quote
    ));
  };

  // Get random quote
  const getRandomQuote = () => {
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  // Get quotes by author
  const getQuotesByAuthor = (authorId) => {
    return quotes.filter(quote => quote.authorId === authorId);
  };

  // Get quotes by category
  const getQuotesByCategory = (categoryId) => {
    return quotes.filter(quote => quote.categoryId === categoryId);
  };

  const value = {
    authors,
    topics,
    quotes,
    favorites,
    bookmarks,
    searchResults,
    isLoading,
    searchQuotes,
    toggleFavorite,
    toggleBookmark,
    shareQuote,
    getRandomQuote,
    getQuotesByAuthor,
    getQuotesByCategory
  };

  return (
    <BrainyQuoteContext.Provider value={value}>
      {children}
    </BrainyQuoteContext.Provider>
  );
};

// Custom hook to use context
export const useBrainyQuote = () => {
  const context = useContext(BrainyQuoteContext);
  if (!context) {
    throw new Error('useBrainyQuote must be used within a BrainyQuoteProvider');
  }
  return context;
};

// Quote Card Component
export const QuoteCard = ({ quote, index = 0, showAuthor = true, size = 'normal' }) => {
  const { favorites, bookmarks, toggleFavorite, toggleBookmark, shareQuote } = useBrainyQuote();
  const [isLiked, setIsLiked] = useState(favorites.includes(quote.id));
  const [isBookmarked, setIsBookmarked] = useState(bookmarks.includes(quote.id));

  const handleLike = () => {
    setIsLiked(!isLiked);
    toggleFavorite(quote.id);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toggleBookmark(quote.id);
  };

  const handleShare = () => {
    shareQuote(quote.id);
  };

  const cardSize = size === 'large' ? 'min-h-[300px]' : size === 'small' ? 'min-h-[150px]' : 'min-h-[200px]';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`relative bg-white rounded-lg shadow-lg overflow-hidden quote-card cursor-pointer ${cardSize}`}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${quote.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="p-6 text-white h-full flex flex-col justify-between">
        <div>
          <blockquote className={`font-medium mb-4 leading-relaxed ${size === 'large' ? 'text-xl' : size === 'small' ? 'text-sm' : 'text-lg'}`}>
            "{quote.text}"
          </blockquote>
          {showAuthor && (
            <p className={`opacity-90 ${size === 'large' ? 'text-base' : 'text-sm'}`}>
              — {quote.author}
            </p>
          )}
          <div className="mt-2">
            <span className={`inline-block bg-white/20 px-2 py-1 rounded-full ${size === 'large' ? 'text-sm' : 'text-xs'}`}>
              {quote.category}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 transition-colors ${
                isLiked ? 'text-red-400' : 'text-white/80 hover:text-white'
              }`}
            >
              {isLiked ? (
                <HeartIconSolid className="w-5 h-5" />
              ) : (
                <HeartIcon className="w-5 h-5" />
              )}
              <span className="text-sm">{quote.likes}</span>
            </button>
            
            <button 
              onClick={handleShare}
              className="flex items-center space-x-1 text-white/80 hover:text-white transition-colors"
            >
              <ShareIcon className="w-5 h-5" />
              <span className="text-sm">{quote.shares}</span>
            </button>
          </div>
          
          <button
            onClick={handleBookmark}
            className={`transition-colors ${
              isBookmarked ? 'text-blue-400' : 'text-white/80 hover:text-white'
            }`}
          >
            {isBookmarked ? (
              <BookmarkIconSolid className="w-5 h-5" />
            ) : (
              <BookmarkIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Header Component
export const Header = ({ currentPage = 'home' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { searchQuotes } = useBrainyQuote();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchQuotes(searchQuery);
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const navigationItems = [
    { name: 'Home', href: '/', icon: HomeIcon, active: currentPage === 'home' },
    { name: 'Authors', href: '/authors', icon: UserGroupIcon, active: currentPage === 'authors' },
    { name: 'Topics', href: '/topics', icon: TagIcon, active: currentPage === 'topics' },
    { name: 'Quote Of The Day', href: '/quote-of-the-day', icon: SunIcon, active: currentPage === 'quote-of-the-day' },
  ];

  return (
    <header className="bg-[#3A5998] text-white relative">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(58, 89, 152, 0.8), rgba(58, 89, 152, 0.8)), url(https://images.unsplash.com/photo-1604223190546-a43e4c7f29d7)`,
        }}
      />
      
      {/* Navigation */}
      <nav className="relative z-10 px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold hover:text-blue-200 transition-colors">
              BrainyQuote
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`hover:text-blue-200 transition-colors flex items-center ${
                  item.active ? 'text-blue-200 font-semibold' : ''
                }`}
              >
                <item.icon className="w-5 h-5 mr-2" />
                {item.name}
              </a>
            ))}
          </div>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-white/20 overflow-hidden"
            >
              <div className="flex flex-col space-y-2 pt-4">
                {navigationItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`hover:text-blue-200 transition-colors py-2 flex items-center ${
                      item.active ? 'text-blue-200 font-semibold' : ''
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-2" />
                    {item.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      
      {/* Hero Content - only show on homepage */}
      {currentPage === 'home' && (
        <div className="relative z-10 text-center py-12 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="container mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">Find Your Daily Inspiration</h2>
            <p className="text-xl mb-8 opacity-90">Discover quotes that inspire, motivate, and enlighten</p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search quotes, authors, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </header>
  );
};

// Author Card Component
export const AuthorCard = ({ author, index = 0 }) => {
  const { getQuotesByAuthor } = useBrainyQuote();
  const authorQuotes = getQuotesByAuthor(author.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
      onClick={() => window.location.href = `/authors/${author.id}`}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img
            src={author.image}
            alt={author.name}
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{author.name}</h3>
            <p className="text-gray-600 text-sm">{author.profession}</p>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4 line-clamp-3">{author.bio}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">
              {authorQuotes.length} quotes
            </span>
            <span className="text-sm text-gray-500">
              {author.birth} - {author.death || 'Present'}
            </span>
          </div>
          
          <ArrowRightIcon className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </motion.div>
  );
};

// Topic Card Component
export const TopicCard = ({ topic, index = 0 }) => {
  const { getQuotesByCategory } = useBrainyQuote();
  const topicQuotes = getQuotesByCategory(topic.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
      onClick={() => window.location.href = `/topics/${topic.id}`}
    >
      <div className={`${topic.color} p-6 text-white`}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-4xl">{topic.icon}</span>
          {topic.featured && (
            <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
              Featured
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-semibold mb-2">{topic.name}</h3>
        <p className="text-white/90 text-sm mb-4">{topic.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/80">
            {topicQuotes.length} quotes
          </span>
          <ArrowRightIcon className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
        </div>
      </div>
    </motion.div>
  );
};

// Loading Component
export const Loading = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
};

// Empty State Component
export const EmptyState = ({ title, description, actionText, onAction }) => {
  return (
    <div className="text-center py-12">
      <SparklesIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

// Pagination Component
export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg bg-white border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        <ArrowLeftIcon className="w-5 h-5" />
      </button>
      
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            currentPage === page
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg bg-white border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        <ArrowRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

// Footer Component
export const Footer = () => {
  return (
    <footer className="bg-[#3A5998] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">BrainyQuote</h3>
            <p className="text-sm opacity-90">
              BrainyQuote has been providing inspirational quotes since 2001 to our worldwide community.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Site</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-blue-200 transition-colors">Home</a></li>
              <li><a href="/authors" className="hover:text-blue-200 transition-colors">Authors</a></li>
              <li><a href="/topics" className="hover:text-blue-200 transition-colors">Topics</a></li>
              <li><a href="/quote-of-the-day" className="hover:text-blue-200 transition-colors">Quote of the Day</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="hover:text-blue-200 transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-blue-200 transition-colors">Contact Us</a></li>
              <li><a href="/privacy" className="hover:text-blue-200 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-blue-200 transition-colors">Terms</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Apps</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-200 transition-colors">iOS App</a></li>
              <li><a href="#" className="hover:text-blue-200 transition-colors">Android App</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <p className="text-sm opacity-90">
            Copyright © 2001 - 2025 BrainyQuote
          </p>
          <div className="mt-2">
            <a 
              href="/admin/login" 
              className="text-xs text-white/60 hover:text-white/80 transition-colors"
            >
              Admin Panel
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};