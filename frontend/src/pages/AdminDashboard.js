import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AdminLayout } from '../components/AdminComponents';
import { useBrainyQuote } from '../components';
import {
  ChartBarIcon,
  UserGroupIcon,
  TagIcon,
  BookOpenIcon,
  EyeIcon,
  HeartIcon,
  ShareIcon,
  CalendarDaysIcon,
  ClockIcon,
  ArrowTrendingUpIcon
} from "@heroicons/react/24/outline";

const AdminDashboard = () => {
  const { quotes, authors, topics } = useBrainyQuote();
  const [stats, setStats] = useState({
    totalQuotes: 0,
    totalAuthors: 0,
    totalTopics: 0,
    totalLikes: 0,
    totalShares: 0,
    totalBookmarks: 0,
    recentActivity: []
  });

  useEffect(() => {
    // Calculate statistics
    const totalLikes = quotes.reduce((sum, quote) => sum + quote.likes, 0);
    const totalShares = quotes.reduce((sum, quote) => sum + quote.shares, 0);
    const totalBookmarks = quotes.reduce((sum, quote) => sum + quote.bookmarks, 0);
    
    // Generate recent activity
    const recentActivity = [
      { type: 'quote_added', content: 'New quote added by Maya Angelou', time: '2 hours ago' },
      { type: 'author_updated', content: 'Albert Einstein profile updated', time: '5 hours ago' },
      { type: 'topic_created', content: 'New topic "Innovation" created', time: '1 day ago' },
      { type: 'quote_featured', content: 'Quote by Steve Jobs marked as featured', time: '2 days ago' },
      { type: 'data_import', content: 'Bulk import completed: 50 quotes', time: '3 days ago' }
    ];

    setStats({
      totalQuotes: quotes.length,
      totalAuthors: authors.length,
      totalTopics: topics.length,
      totalLikes,
      totalShares,
      totalBookmarks,
      recentActivity
    });
  }, [quotes, authors, topics]);

  const dashboardCards = [
    {
      title: 'Total Quotes',
      value: stats.totalQuotes,
      icon: BookOpenIcon,
      color: 'bg-blue-500',
      change: '+12 this week'
    },
    {
      title: 'Authors',
      value: stats.totalAuthors,
      icon: UserGroupIcon,
      color: 'bg-green-500',
      change: '+3 this month'
    },
    {
      title: 'Topics',
      value: stats.totalTopics,
      icon: TagIcon,
      color: 'bg-purple-500',
      change: '+1 this month'
    },
    {
      title: 'Total Likes',
      value: stats.totalLikes.toLocaleString(),
      icon: HeartIcon,
      color: 'bg-red-500',
      change: '+1.2k this week'
    }
  ];

  const popularQuotes = quotes
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 5);

  const popularAuthors = authors
    .sort((a, b) => b.totalQuotes - a.totalQuotes)
    .slice(0, 5);

  return (
    <AdminLayout currentPage="dashboard">
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Admin!</h1>
          <p className="text-blue-100">Here's what's happening with your BrainyQuote website today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardCards.map((card, index) => (
            <motion.div
              key={card.title}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 ${card.color} rounded-lg`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <ArrowTrendingUpIcon className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{card.value}</h3>
              <p className="text-gray-600 text-sm mb-2">{card.title}</p>
              <p className="text-green-600 text-sm font-medium">{card.change}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Popular Quotes */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <ChartBarIcon className="w-6 h-6 mr-2 text-blue-600" />
              Most Popular Quotes
            </h2>
            <div className="space-y-4">
              {popularQuotes.map((quote, index) => (
                <div key={quote.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 line-clamp-2">"{quote.text}"</p>
                    <p className="text-xs text-gray-600 mt-1">— {quote.author}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="flex items-center text-xs text-gray-500">
                        <HeartIcon className="w-3 h-3 mr-1" />
                        {quote.likes}
                      </span>
                      <span className="flex items-center text-xs text-gray-500">
                        <ShareIcon className="w-3 h-3 mr-1" />
                        {quote.shares}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Authors */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <UserGroupIcon className="w-6 h-6 mr-2 text-green-600" />
              Top Authors
            </h2>
            <div className="space-y-4">
              {popularAuthors.map((author, index) => (
                <div key={author.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold text-sm">{index + 1}</span>
                  </div>
                  <img
                    src={author.image}
                    alt={author.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{author.name}</p>
                    <p className="text-xs text-gray-600">{author.profession}</p>
                    <p className="text-xs text-gray-500">{author.totalQuotes} quotes</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <ClockIcon className="w-6 h-6 mr-2 text-purple-600" />
              Recent Activity
            </h2>
            <div className="space-y-4">
              {stats.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.content}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <a
                href="/admin/quotes/new"
                className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-center"
              >
                <BookOpenIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-blue-900">Add Quote</p>
              </a>
              <a
                href="/admin/authors/new"
                className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-center"
              >
                <UserGroupIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-green-900">Add Author</p>
              </a>
              <a
                href="/admin/topics/new"
                className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-center"
              >
                <TagIcon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-purple-900">Add Topic</p>
              </a>
              <a
                href="/admin/import"
                className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors text-center"
              >
                <CalendarDaysIcon className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-orange-900">Import Data</p>
              </a>
            </div>
          </div>
        </div>

        {/* Traffic Overview */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <EyeIcon className="w-6 h-6 mr-2 text-indigo-600" />
            Engagement Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500 mb-2">{stats.totalLikes.toLocaleString()}</div>
              <p className="text-gray-600">Total Likes</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">{stats.totalShares.toLocaleString()}</div>
              <p className="text-gray-600">Total Shares</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">{stats.totalBookmarks.toLocaleString()}</div>
              <p className="text-gray-600">Total Bookmarks</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;