import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
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
  BookmarkIcon
} from "@heroicons/react/24/outline";

// Mock data for quotes
const mockQuotes = [
  {
    id: 1,
    text: "Either you run the day or the day runs you.",
    author: "Jim Rohn",
    category: "Motivational",
    backgroundImage: "https://images.unsplash.com/photo-1650513737590-4a00deeddc7a",
    likes: 1247,
    shares: 89
  },
  {
    id: 2,
    text: "Progress was all right. Only it went on too long.",
    author: "James Thurber",
    category: "Progress",
    backgroundImage: "https://images.unsplash.com/photo-1535515384173-d74166f26820",
    likes: 892,
    shares: 67
  },
  {
    id: 3,
    text: "It is never too late to be what you might have been.",
    author: "George Eliot",
    category: "Life",
    backgroundImage: "https://images.unsplash.com/photo-1617361194384-1852022fe186",
    likes: 2134,
    shares: 156
  },
  {
    id: 4,
    text: "To affect the quality of the day, that is the highest of arts.",
    author: "Henry David Thoreau",
    category: "Success",
    backgroundImage: "https://images.unsplash.com/photo-1529094270367-c8f8a8a6ed21",
    likes: 1678,
    shares: 112
  }
];

// Mock data for popular topics
const popularTopics = [
  "Motivational", "Funny", "Life", "Inspirational", "Success", "Love", "Friendship", "Happiness", "Change", "Family", "Hope", "Positive", "Attitude", "Music", "Art", "Nature", "Time", "Education", "Leadership", "Dreams"
];

// Mock data for popular authors
const popularAuthors = [
  "Maya Angelou", "Albert Einstein", "Winston Churchill", "Mark Twain", "Oscar Wilde", "Benjamin Franklin", "Abraham Lincoln", "George Washington", "John F. Kennedy", "Martin Luther King Jr.", "Nelson Mandela", "Mahatma Gandhi", "Theodore Roosevelt", "Franklin D. Roosevelt", "Thomas Jefferson", "Walt Disney", "Steve Jobs", "Oprah Winfrey", "Mother Teresa", "Walt Whitman"
];

// Mock data for today's birthdays
const todaysBirthdays = [
  { name: "Calvin Coolidge", year: "1872", profession: "30th President" },
  { name: "Lionel Messi", year: "1987", profession: "Soccer Player" },
  { name: "Pauline Phillips", year: "1918", profession: "Columnist" },
  { name: "Ann Landers", year: "1918", profession: "Columnist" }
];

// Quote Card Component
const QuoteCard = ({ quote, index }) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative bg-white rounded-lg shadow-lg overflow-hidden quote-card"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${quote.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '200px'
      }}
    >
      <div className="p-6 text-white h-full flex flex-col justify-between">
        <div>
          <blockquote className="text-lg font-medium mb-4 leading-relaxed">
            "{quote.text}"
          </blockquote>
          <p className="text-sm opacity-90">— {quote.author}</p>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center space-x-1 transition-colors ${
                liked ? 'text-red-400' : 'text-white/80 hover:text-white'
              }`}
            >
              <HeartIcon className="w-5 h-5" />
              <span className="text-sm">{quote.likes + (liked ? 1 : 0)}</span>
            </button>
            
            <button className="flex items-center space-x-1 text-white/80 hover:text-white transition-colors">
              <ShareIcon className="w-5 h-5" />
              <span className="text-sm">{quote.shares}</span>
            </button>
          </div>
          
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`transition-colors ${
              bookmarked ? 'text-blue-400' : 'text-white/80 hover:text-white'
            }`}
          >
            <BookmarkIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <h1 className="text-2xl font-bold">BrainyQuote</h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="hover:text-blue-200 transition-colors flex items-center">
              <HomeIcon className="w-5 h-5 mr-2" />
              Home
            </a>
            <a href="#" className="hover:text-blue-200 transition-colors flex items-center">
              <UserGroupIcon className="w-5 h-5 mr-2" />
              Authors
            </a>
            <a href="#" className="hover:text-blue-200 transition-colors flex items-center">
              <TagIcon className="w-5 h-5 mr-2" />
              Topics
            </a>
            <a href="#" className="hover:text-blue-200 transition-colors flex items-center">
              <SunIcon className="w-5 h-5 mr-2" />
              Quote Of The Day
            </a>
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
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 pb-4 border-t border-white/20"
          >
            <div className="flex flex-col space-y-2 pt-4">
              <a href="#" className="hover:text-blue-200 transition-colors py-2">Home</a>
              <a href="#" className="hover:text-blue-200 transition-colors py-2">Authors</a>
              <a href="#" className="hover:text-blue-200 transition-colors py-2">Topics</a>
              <a href="#" className="hover:text-blue-200 transition-colors py-2">Quote Of The Day</a>
            </div>
          </motion.div>
        )}
      </nav>
      
      {/* Hero Content */}
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
          <div className="max-w-2xl mx-auto relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search quotes, authors, or topics..."
              className="w-full pl-12 pr-4 py-4 rounded-full text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </motion.div>
      </div>
    </header>
  );
};

// Main Content Component
const MainContent = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Social Media */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Inspirational Quotes at BrainyQuote</h3>
              <div className="space-y-3">
                <button className="w-full bg-[#3b5998] text-white py-3 px-4 rounded-lg hover:bg-[#2d4373] transition-colors">
                  👍 Like us on Facebook
                </button>
                <button className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors">
                  📱 Follow us on X
                </button>
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors">
                  📷 Follow us on Instagram
                </button>
              </div>
              <a href="#" className="text-blue-600 hover:underline text-sm mt-4 inline-block">
                More topics →
              </a>
            </div>
          </div>
          
          {/* Middle Column - Popular Topics */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Popular Topics</h3>
              <div className="grid grid-cols-2 gap-2">
                {popularTopics.slice(0, 16).map((topic, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-blue-600 hover:underline text-sm py-1"
                  >
                    {topic}
                  </a>
                ))}
              </div>
              <a href="#" className="text-blue-600 hover:underline text-sm mt-4 inline-block">
                More topics →
              </a>
            </div>
          </div>
          
          {/* Right Column - Popular Authors & Today's Birthdays */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Popular Authors</h3>
              <div className="grid grid-cols-1 gap-1">
                {popularAuthors.slice(0, 16).map((author, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-blue-600 hover:underline text-sm py-1"
                  >
                    {author}
                  </a>
                ))}
              </div>
              <a href="#" className="text-blue-600 hover:underline text-sm mt-4 inline-block">
                More authors →
              </a>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">In the News</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm">Today's Birthdays</h4>
                  {todaysBirthdays.map((person, index) => (
                    <div key={index} className="text-sm text-gray-600 mt-1">
                      {person.year} - {person.name}
                    </div>
                  ))}
                </div>
              </div>
              <a href="#" className="text-blue-600 hover:underline text-sm mt-4 inline-block">
                All birthdays →
              </a>
            </div>
          </div>
        </div>
        
        {/* Picture Quotes Section */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Picture Quotes</h2>
            <p className="text-gray-600">View our beautiful quote pictures on Facebook, X, and Pinterest</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockQuotes.map((quote, index) => (
              <QuoteCard key={quote.id} quote={quote} index={index} />
            ))}
          </div>
        </div>
        
        {/* Famous Authors Section */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore Inspirational Quotes by Famous Authors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {popularAuthors.map((author, index) => (
              <motion.a
                key={index}
                href="#"
                className="text-blue-600 hover:underline text-sm py-2 hover:bg-blue-50 px-2 rounded transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                {author}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
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
              <li><a href="#" className="hover:text-blue-200 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-blue-200 transition-colors">Authors</a></li>
              <li><a href="#" className="hover:text-blue-200 transition-colors">Topics</a></li>
              <li><a href="#" className="hover:text-blue-200 transition-colors">Quote of the Day</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-200 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-200 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-blue-200 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-200 transition-colors">Terms</a></li>
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
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <div>
              <Header />
              <MainContent />
              <Footer />
            </div>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;