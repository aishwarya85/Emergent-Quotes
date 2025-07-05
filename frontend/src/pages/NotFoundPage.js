import React from 'react';
import { motion } from 'framer-motion';
import { Header, Footer } from '../components';
import { 
  ExclamationTriangleIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  BookOpenIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

const NotFoundPage = () => {
  const popularLinks = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Browse Authors', href: '/authors', icon: BookOpenIcon },
    { name: 'Explore Topics', href: '/topics', icon: MagnifyingGlassIcon },
    { name: 'Quote of the Day', href: '/quote-of-the-day', icon: ArrowRightIcon }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ExclamationTriangleIcon className="mx-auto h-24 w-24 text-yellow-500 mb-8" />
            
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Page Not Found
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
            
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Here's where you can go instead:
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {popularLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <link.icon className="w-6 h-6 text-blue-600 mr-3 group-hover:text-blue-700" />
                    <span className="text-gray-900 font-medium group-hover:text-blue-700">
                      {link.name}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center space-x-4">
              <a
                href="/"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Go Home
              </a>
              <button
                onClick={() => window.history.back()}
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Go Back
              </button>
            </div>
          </motion.div>
        </div>
        
        {/* Inspirational Quote */}
        <motion.div
          className="max-w-4xl mx-auto mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-white rounded-lg shadow-md p-8">
            <blockquote className="text-xl text-gray-700 mb-4 italic">
              "The only way to do great work is to love what you do."
            </blockquote>
            <p className="text-gray-600">— Steve Jobs</p>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFoundPage;