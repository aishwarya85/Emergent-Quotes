import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AdminLayout, AdminTable, AdminForm, AdminModal } from '../components/AdminComponents';
import { useBrainyQuote } from '../components';
import {
  BookOpenIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  HeartIcon,
  ShareIcon,
  BookmarkIcon
} from "@heroicons/react/24/outline";

const AdminQuotes = () => {
  const { quotes, authors, topics, addQuote, updateQuote, deleteQuote } = useBrainyQuote();
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add', 'edit', 'view'
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let filtered = [...quotes];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(quote =>
        quote.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quote.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quote.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply author filter
    if (selectedAuthor) {
      filtered = filtered.filter(quote => quote.authorId === parseInt(selectedAuthor));
    }

    // Apply topic filter
    if (selectedTopic) {
      filtered = filtered.filter(quote => quote.categoryId === parseInt(selectedTopic));
    }

    setFilteredQuotes(filtered);
  }, [quotes, searchQuery, selectedAuthor, selectedTopic]);

  const handleAddQuote = () => {
    setModalMode('add');
    setSelectedQuote(null);
    setShowModal(true);
  };

  const handleEditQuote = (quote) => {
    setModalMode('edit');
    setSelectedQuote(quote);
    setShowModal(true);
  };

  const handleViewQuote = (quote) => {
    setModalMode('view');
    setSelectedQuote(quote);
    setShowModal(true);
  };

  const handleDeleteQuote = (quote) => {
    if (window.confirm(`Are you sure you want to delete this quote?\n\n"${quote.text}" - ${quote.author}`)) {
      deleteQuote(quote.id);
      alert('Quote deleted successfully!');
    }
  };

  const handleSubmitQuote = async (formData) => {
    setIsLoading(true);
    
    try {
      // Process form data
      const processedData = {
        ...formData,
        id: modalMode === 'add' ? Date.now() : selectedQuote?.id,
        authorId: parseInt(formData.authorId),
        categoryId: parseInt(formData.categoryId),
        tags: typeof formData.tags === 'string' ? formData.tags.split(',').map(tag => tag.trim()) : [],
        featured: formData.featured || false,
        likes: modalMode === 'add' ? 0 : selectedQuote?.likes || 0,
        shares: modalMode === 'add' ? 0 : selectedQuote?.shares || 0,
        bookmarks: modalMode === 'add' ? 0 : selectedQuote?.bookmarks || 0,
        dateAdded: modalMode === 'add' ? new Date().toISOString().split('T')[0] : selectedQuote?.dateAdded,
        backgroundImage: formData.backgroundImage || 'https://images.unsplash.com/photo-1650513737590-4a00deeddc7a'
      };

      // Find author and category names
      const author = authors.find(a => a.id === processedData.authorId);
      const category = topics.find(t => t.id === processedData.categoryId);
      
      if (author) processedData.author = author.name;
      if (category) processedData.category = category.name;

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message with details
      if (modalMode === 'add') {
        alert(`Quote added successfully!\n\nQuote: "${processedData.text}"\nAuthor: ${processedData.author}\nCategory: ${processedData.category}`);
      } else {
        alert(`Quote updated successfully!\n\nQuote: "${processedData.text}"\nAuthor: ${processedData.author}\nCategory: ${processedData.category}`);
      }
      
      // In a real app, you would update the quotes state here
      console.log('Quote data to save:', processedData);
      
    } catch (error) {
      alert('Error saving quote: ' + error.message);
    }
    
    setIsLoading(false);
    setShowModal(false);
  };

  const exportQuotes = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "ID,Text,Author,Category,Likes,Shares,Bookmarks,Featured\n"
      + filteredQuotes.map(quote => 
          `${quote.id},"${quote.text.replace(/"/g, '""')}",${quote.author},${quote.category},${quote.likes},${quote.shares},${quote.bookmarks},${quote.featured}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "brainyquote_quotes.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns = [
    {
      key: 'id',
      label: 'ID',
      render: (value) => <span className="font-mono text-sm">{value}</span>
    },
    {
      key: 'text',
      label: 'Quote',
      render: (value) => (
        <div className="max-w-xs">
          <p className="text-sm text-gray-900 line-clamp-2">"{value}"</p>
        </div>
      )
    },
    {
      key: 'author',
      label: 'Author',
      render: (value) => <span className="font-medium text-blue-600">{value}</span>
    },
    {
      key: 'category',
      label: 'Category',
      render: (value) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {value}
        </span>
      )
    },
    {
      key: 'likes',
      label: 'Engagement',
      render: (value, row) => (
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="flex items-center">
            <HeartIcon className="w-4 h-4 mr-1 text-red-500" />
            {row.likes}
          </span>
          <span className="flex items-center">
            <ShareIcon className="w-4 h-4 mr-1 text-blue-500" />
            {row.shares}
          </span>
          <span className="flex items-center">
            <BookmarkIcon className="w-4 h-4 mr-1 text-green-500" />
            {row.bookmarks}
          </span>
        </div>
      )
    },
    {
      key: 'featured',
      label: 'Status',
      render: (value) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {value ? 'Featured' : 'Regular'}
        </span>
      )
    }
  ];

  const formFields = [
    {
      name: 'text',
      label: 'Quote Text',
      type: 'textarea',
      placeholder: 'Enter the inspirational quote text here...',
      required: true,
      rows: 4,
      help: 'The main text of the quote (required)'
    },
    {
      name: 'authorId',
      label: 'Author',
      type: 'select',
      required: true,
      options: authors.map(author => ({ value: author.id, label: author.name })),
      help: 'Select the author who said this quote'
    },
    {
      name: 'categoryId',
      label: 'Category/Topic',
      type: 'select',
      required: true,
      options: topics.map(topic => ({ value: topic.id, label: topic.name })),
      help: 'Choose the most appropriate category for this quote'
    },
    {
      name: 'backgroundImage',
      label: 'Background Image URL',
      type: 'url',
      placeholder: 'https://images.unsplash.com/photo-example.jpg',
      help: 'Optional: URL for the quote card background image'
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'text',
      placeholder: 'motivation, success, inspiration, life',
      help: 'Comma-separated tags for better searchability (e.g., motivation, success, life)'
    },
    {
      name: 'featured',
      label: 'Mark as Featured Quote',
      type: 'checkbox',
      help: 'Featured quotes appear prominently on the homepage'
    }
  ];

  return (
    <AdminLayout currentPage="quotes">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <BookOpenIcon className="w-8 h-8 mr-3 text-blue-600" />
              Quotes Management
            </h1>
            <p className="text-gray-600 mt-1">Manage all quotes, authors, and categories</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={exportQuotes}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
              Export CSV
            </button>
            <button
              onClick={handleAddQuote}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Add Quote
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Quotes</p>
                <p className="text-3xl font-bold text-gray-900">{quotes.length}</p>
              </div>
              <BookOpenIcon className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Featured</p>
                <p className="text-3xl font-bold text-gray-900">{quotes.filter(q => q.featured).length}</p>
              </div>
              <HeartIcon className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Likes</p>
                <p className="text-3xl font-bold text-gray-900">{quotes.reduce((sum, q) => sum + q.likes, 0).toLocaleString()}</p>
              </div>
              <ShareIcon className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Engagement</p>
                <p className="text-3xl font-bold text-gray-900">{Math.round(quotes.reduce((sum, q) => sum + q.likes + q.shares, 0) / quotes.length)}</p>
              </div>
              <BookmarkIcon className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search quotes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <select
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Authors</option>
              {authors.map(author => (
                <option key={author.id} value={author.id}>{author.name}</option>
              ))}
            </select>
            
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {topics.map(topic => (
                <option key={topic.id} value={topic.id}>{topic.name}</option>
              ))}
            </select>
            
            <div className="text-sm text-gray-600 flex items-center">
              <FunnelIcon className="w-4 h-4 mr-2" />
              {filteredQuotes.length} of {quotes.length} quotes
            </div>
          </div>
        </div>

        {/* Quotes Table */}
        <AdminTable
          columns={columns}
          data={filteredQuotes}
          onEdit={handleEditQuote}
          onDelete={handleDeleteQuote}
          onView={handleViewQuote}
        />

        {/* Quote Modal */}
        <AdminModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={modalMode === 'add' ? 'Add New Quote' : modalMode === 'edit' ? 'Edit Quote' : 'View Quote'}
          size="lg"
        >
          {modalMode === 'view' && selectedQuote ? (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Quote Details</h4>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <blockquote className="text-xl text-gray-900 mb-4 italic">
                    "{selectedQuote.text}"
                  </blockquote>
                  <p className="text-lg text-blue-600 mb-4">— {selectedQuote.author}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Category:</span>
                      <span className="ml-2">{selectedQuote.category}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Status:</span>
                      <span className={`ml-2 ${selectedQuote.featured ? 'text-green-600' : 'text-gray-600'}`}>
                        {selectedQuote.featured ? 'Featured' : 'Regular'}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Likes:</span>
                      <span className="ml-2">{selectedQuote.likes}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Shares:</span>
                      <span className="ml-2">{selectedQuote.shares}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <AdminForm
              title=""
              fields={formFields}
              initialData={selectedQuote || {}}
              onSubmit={handleSubmitQuote}
              onCancel={() => setShowModal(false)}
              isLoading={isLoading}
            />
          )}
        </AdminModal>
      </div>
    </AdminLayout>
  );
};

export default AdminQuotes;