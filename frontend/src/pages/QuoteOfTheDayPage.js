import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header, Footer, QuoteCard, useBrainyQuote, Loading } from '../components';
import { 
  SunIcon, 
  CalendarDaysIcon,
  ClockIcon,
  ShareIcon,
  ArrowRightIcon,
  SparklesIcon,
  TrophyIcon
} from "@heroicons/react/24/outline";

const QuoteOfTheDayPage = () => {
  const { getRandomQuote, quotes, isLoading } = useBrainyQuote();
  const [todaysQuote, setTodaysQuote] = useState(null);
  const [previousQuotes, setPreviousQuotes] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // Get today's quote (simulate persistence with localStorage)
    const today = new Date().toDateString();
    const savedQuote = localStorage.getItem(`quote-${today}`);
    
    if (savedQuote) {
      setTodaysQuote(JSON.parse(savedQuote));
    } else {
      const randomQuote = getRandomQuote();
      if (randomQuote) {
        setTodaysQuote(randomQuote);
        localStorage.setItem(`quote-${today}`, JSON.stringify(randomQuote));
      }
    }
    
    // Get previous quotes (last 7 days)
    const prevQuotes = [];
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toDateString();
      const savedPrevQuote = localStorage.getItem(`quote-${dateString}`);
      
      if (savedPrevQuote) {
        prevQuotes.push({
          ...JSON.parse(savedPrevQuote),
          date: date
        });
      } else {
        // Generate random quote for previous days
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        if (randomQuote) {
          const quoteWithDate = { ...randomQuote, date: date };
          prevQuotes.push(quoteWithDate);
          localStorage.setItem(`quote-${dateString}`, JSON.stringify(randomQuote));
        }
      }
    }
    
    setPreviousQuotes(prevQuotes);
  }, [getRandomQuote, quotes]);

  const handleShare = () => {
    if (todaysQuote) {
      if (navigator.share) {
        navigator.share({
          title: 'Quote of the Day - BrainyQuote',
          text: `"${todaysQuote.text}" - ${todaysQuote.author}`,
          url: window.location.href
        });
      } else {
        navigator.clipboard.writeText(`"${todaysQuote.text}" - ${todaysQuote.author}`);
      }
    }
  };

  const handleNewQuote = () => {
    const randomQuote = getRandomQuote();
    if (randomQuote) {
      setTodaysQuote(randomQuote);
      const today = new Date().toDateString();
      localStorage.setItem(`quote-${today}`, JSON.stringify(randomQuote));
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="quote-of-the-day" />
      
      {/* Page Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <SunIcon className="w-10 h-10 mr-3 text-yellow-500" />
              Quote of the Day
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start your day with inspiration. A new quote delivered fresh every day.
            </p>
          </div>
        </div>
      </div>
      
      {/* Today's Quote */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {todaysQuote && (
              <div
                className="relative min-h-[400px] flex items-center justify-center p-8"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${todaysQuote.backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="text-center text-white max-w-3xl">
                  <div className="flex items-center justify-center mb-6">
                    <CalendarDaysIcon className="w-6 h-6 mr-2" />
                    <span className="text-lg font-medium">
                      {formatDate(currentDate)}
                    </span>
                  </div>
                  
                  <blockquote className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
                    "{todaysQuote.text}"
                  </blockquote>
                  
                  <div className="flex items-center justify-center mb-8">
                    <p className="text-xl">— {todaysQuote.author}</p>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-6">
                    <button
                      onClick={handleShare}
                      className="flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
                    >
                      <ShareIcon className="w-5 h-5 mr-2" />
                      Share Quote
                    </button>
                    
                    <button
                      onClick={handleNewQuote}
                      className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <SparklesIcon className="w-5 h-5 mr-2" />
                      New Quote
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Quote Stats */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            className="bg-white rounded-lg shadow-md p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-center mb-4">
              <TrophyIcon className="w-8 h-8 text-yellow-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {quotes.length}
            </h3>
            <p className="text-gray-600">Total Quotes</p>
          </motion.div>
          
          <motion.div
            className="bg-white rounded-lg shadow-md p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-center mb-4">
              <ClockIcon className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Daily
            </h3>
            <p className="text-gray-600">Fresh Inspiration</p>
          </motion.div>
          
          <motion.div
            className="bg-white rounded-lg shadow-md p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-center mb-4">
              <SparklesIcon className="w-8 h-8 text-purple-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              24/7
            </h3>
            <p className="text-gray-600">Always Available</p>
          </motion.div>
        </div>
      </div>
      
      {/* Previous Quotes */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Previous Quotes</h2>
          <p className="text-gray-600">Catch up on the inspiring quotes from the past week</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {previousQuotes.map((quote, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className="h-48 bg-cover bg-center relative"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${quote.backgroundImage})`,
                }}
              >
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                  <span className="text-white text-sm">
                    {quote.date.toLocaleDateString()}
                  </span>
                </div>
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <blockquote className="text-sm font-medium mb-2 line-clamp-3">
                    "{quote.text}"
                  </blockquote>
                  <p className="text-xs opacity-90">— {quote.author}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Never Miss Daily Inspiration</h2>
            <p className="text-xl mb-8 opacity-90">
              Bookmark this page and start each day with wisdom from the world's greatest minds
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Bookmark Page
              </button>
              <a
                href="/topics"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors flex items-center"
              >
                Explore Topics
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default QuoteOfTheDayPage;