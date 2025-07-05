import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header, Footer, QuoteCard, AuthorCard, TopicCard, useBrainyQuote } from '../components';
import { 
  FireIcon, 
  TrophyIcon, 
  SparklesIcon, 
  CalendarDaysIcon 
} from "@heroicons/react/24/outline";

const HomePage = () => {
  const { quotes, authors, topics, getRandomQuote } = useBrainyQuote();
  const [featuredQuotes, setFeaturedQuotes] = useState([]);
  const [popularTopics, setPopularTopics] = useState([]);
  const [popularAuthors, setPopularAuthors] = useState([]);
  const [todaysBirthdays] = useState([
    { name: "Calvin Coolidge", year: "1872", profession: "30th President" },
    { name: "Lionel Messi", year: "1987", profession: "Soccer Player" },
    { name: "Pauline Phillips", year: "1918", profession: "Columnist" },
    { name: "Ann Landers", year: "1918", profession: "Columnist" }
  ]);

  useEffect(() => {
    // Get featured quotes
    const featured = quotes.filter(q => q.featured).slice(0, 4);
    setFeaturedQuotes(featured);
    
    // Get popular topics
    const popularTopicsList = topics.filter(t => t.featured).slice(0, 4);
    setPopularTopics(popularTopicsList);
    
    // Get popular authors
    const popularAuthorsList = authors.slice(0, 4);
    setPopularAuthors(popularAuthorsList);
  }, [quotes, topics, authors]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="home" />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Social Media */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <SparklesIcon className="w-5 h-5 mr-2 text-blue-600" />
                Inspirational Quotes at BrainyQuote
              </h3>
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
              <a href="/topics" className="text-blue-600 hover:underline text-sm mt-4 inline-block">
                More topics →
              </a>
            </div>
          </div>
          
          {/* Middle Column - Popular Topics */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FireIcon className="w-5 h-5 mr-2 text-red-600" />
                Popular Topics
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {topics.slice(0, 16).map((topic, index) => (
                  <a
                    key={index}
                    href={`/topics/${topic.id}`}
                    className="text-blue-600 hover:underline text-sm py-1 hover:bg-blue-50 px-2 rounded transition-colors"
                  >
                    {topic.name}
                  </a>
                ))}
              </div>
              <a href="/topics" className="text-blue-600 hover:underline text-sm mt-4 inline-block">
                More topics →
              </a>
            </div>
          </div>
          
          {/* Right Column - Popular Authors & Today's Birthdays */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <TrophyIcon className="w-5 h-5 mr-2 text-yellow-600" />
                Popular Authors
              </h3>
              <div className="grid grid-cols-1 gap-1">
                {authors.slice(0, 16).map((author, index) => (
                  <a
                    key={index}
                    href={`/authors/${author.id}`}
                    className="text-blue-600 hover:underline text-sm py-1 hover:bg-blue-50 px-2 rounded transition-colors"
                  >
                    {author.name}
                  </a>
                ))}
              </div>
              <a href="/authors" className="text-blue-600 hover:underline text-sm mt-4 inline-block">
                More authors →
              </a>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <CalendarDaysIcon className="w-5 h-5 mr-2 text-green-600" />
                In the News
              </h3>
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
              <a href="/quote-of-the-day" className="text-blue-600 hover:underline text-sm mt-4 inline-block">
                All birthdays →
              </a>
            </div>
          </div>
        </div>
        
        {/* Picture Quotes Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Picture Quotes</h2>
            <p className="text-gray-600">View our beautiful quote pictures on Facebook, X, and Pinterest</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredQuotes.map((quote, index) => (
              <QuoteCard key={quote.id} quote={quote} index={index} />
            ))}
          </div>
        </div>
        
        {/* Featured Topics Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Topics</h2>
            <p className="text-gray-600">Explore our most popular quote categories</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularTopics.map((topic, index) => (
              <TopicCard key={topic.id} topic={topic} index={index} />
            ))}
          </div>
        </div>
        
        {/* Famous Authors Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Authors</h2>
            <p className="text-gray-600">Discover wisdom from history's greatest minds</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularAuthors.map((author, index) => (
              <AuthorCard key={author.id} author={author} index={index} />
            ))}
          </div>
        </div>
        
        {/* All Authors Grid */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore Inspirational Quotes by Famous Authors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {authors.map((author, index) => (
              <motion.a
                key={index}
                href={`/authors/${author.id}`}
                className="text-blue-600 hover:underline text-sm py-2 hover:bg-blue-50 px-2 rounded transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                {author.name}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default HomePage;