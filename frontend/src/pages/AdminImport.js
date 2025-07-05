import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AdminLayout } from '../components/AdminComponents';
import {
  DocumentArrowDownIcon,
  DocumentArrowUpIcon,
  CloudArrowUpIcon,
  DocumentTextIcon,
  TableCellsIcon,
  CodeBracketIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline";

const AdminImport = () => {
  const [activeTab, setActiveTab] = useState('import');
  const [importType, setImportType] = useState('quotes');
  const [importFile, setImportFile] = useState(null);
  const [importProgress, setImportProgress] = useState(0);
  const [importStatus, setImportStatus] = useState('idle'); // idle, processing, success, error
  const [importResults, setImportResults] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setImportFile(file);
  };

  const handleImport = async () => {
    if (!importFile) return;

    setImportStatus('processing');
    setImportProgress(0);

    // Simulate import process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setImportProgress(i);
    }

    // Simulate results
    setImportResults({
      total: 150,
      success: 145,
      failed: 5,
      errors: [
        'Row 15: Missing author information',
        'Row 23: Invalid category',
        'Row 87: Duplicate quote detected',
        'Row 92: Text too long',
        'Row 134: Invalid format'
      ]
    });

    setImportStatus('success');
  };

  const handleExport = (format) => {
    // Sample data for export
    const sampleData = {
      quotes: [
        {
          id: 1,
          text: "The only way to do great work is to love what you do.",
          author: "Steve Jobs",
          category: "Success",
          featured: true,
          likes: 1456,
          shares: 123
        },
        {
          id: 2,
          text: "Life is what happens to you while you're busy making other plans.",
          author: "John Lennon",
          category: "Life",
          featured: false,
          likes: 987,
          shares: 89
        }
      ]
    };

    let content, filename, mimeType;

    if (format === 'csv') {
      content = "ID,Text,Author,Category,Featured,Likes,Shares\n" +
        sampleData.quotes.map(quote => 
          `${quote.id},"${quote.text.replace(/"/g, '""')}",${quote.author},${quote.category},${quote.featured},${quote.likes},${quote.shares}`
        ).join("\n");
      filename = 'brainyquote_data.csv';
      mimeType = 'text/csv';
    } else if (format === 'json') {
      content = JSON.stringify(sampleData, null, 2);
      filename = 'brainyquote_data.json';
      mimeType = 'application/json';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const csvTemplate = `ID,Text,Author,Category,Featured,Tags,Background_Image
1,"Your quote text here","Author Name","Category Name",true,"tag1,tag2,tag3","https://example.com/image.jpg"
2,"Another quote","Another Author","Another Category",false,"tag4,tag5","https://example.com/image2.jpg"`;

  const jsonTemplate = `{
  "quotes": [
    {
      "text": "Your quote text here",
      "author": "Author Name", 
      "category": "Category Name",
      "featured": true,
      "tags": ["tag1", "tag2", "tag3"],
      "backgroundImage": "https://example.com/image.jpg"
    }
  ],
  "authors": [
    {
      "name": "Author Name",
      "profession": "Profession",
      "bio": "Author biography...",
      "birth": "YYYY-MM-DD",
      "death": "YYYY-MM-DD",
      "image": "https://example.com/author.jpg"
    }
  ],
  "topics": [
    {
      "name": "Topic Name",
      "description": "Topic description...",
      "color": "bg-blue-500",
      "icon": "🎯"
    }
  ]
}`;

  return (
    <AdminLayout currentPage="import">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <DocumentArrowDownIcon className="w-8 h-8 mr-3 text-blue-600" />
            Data Import & Export
          </h1>
          <p className="text-gray-600 mt-1">Import and export quotes, authors, and topics data</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('import')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'import'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <DocumentArrowUpIcon className="w-5 h-5 inline mr-2" />
              Import Data
            </button>
            <button
              onClick={() => setActiveTab('export')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'export'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <DocumentArrowDownIcon className="w-5 h-5 inline mr-2" />
              Export Data
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'templates'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <DocumentTextIcon className="w-5 h-5 inline mr-2" />
              Templates
            </button>
          </nav>
        </div>

        {/* Import Tab */}
        {activeTab === 'import' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Import Data</h3>
              
              {/* Import Type Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What would you like to import?
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['quotes', 'authors', 'topics'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setImportType(type)}
                      className={`p-4 border-2 rounded-lg text-left transition-colors ${
                        importType === type
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium text-gray-900 capitalize">{type}</div>
                      <div className="text-sm text-gray-600">
                        Import {type} data from CSV or JSON
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* File Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload File
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <CloudArrowUpIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <input
                    type="file"
                    accept=".csv,.json"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Choose file
                  </label>
                  <span className="text-gray-600"> or drag and drop</span>
                  <p className="text-sm text-gray-500 mt-2">CSV or JSON files only</p>
                  {importFile && (
                    <div className="mt-4 text-sm text-gray-900">
                      Selected: {importFile.name}
                    </div>
                  )}
                </div>
              </div>

              {/* Import Options */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Import Options</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                    <span className="ml-2 text-sm text-gray-700">Skip duplicate entries</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-gray-700">Update existing entries</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-gray-700">Validate data before import</span>
                  </label>
                </div>
              </div>

              {/* Import Button */}
              <button
                onClick={handleImport}
                disabled={!importFile || importStatus === 'processing'}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {importStatus === 'processing' ? 'Importing...' : `Import ${importType}`}
              </button>

              {/* Import Progress */}
              {importStatus === 'processing' && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Importing data...</span>
                    <span>{importProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${importProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Import Results */}
              {importStatus === 'success' && importResults && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center mb-2">
                    <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
                    <span className="font-medium text-green-900">Import Completed</span>
                  </div>
                  <div className="text-sm text-green-800">
                    <p>Successfully imported {importResults.success} out of {importResults.total} records</p>
                    {importResults.failed > 0 && (
                      <div className="mt-2">
                        <p className="font-medium text-red-800">{importResults.failed} records failed:</p>
                        <ul className="list-disc list-inside mt-1 text-red-700">
                          {importResults.errors.map((error, index) => (
                            <li key={index}>{error}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Export Tab */}
        {activeTab === 'export' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* CSV Export */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <TableCellsIcon className="w-8 h-8 text-green-600 mr-3" />
                  <h3 className="text-lg font-medium text-gray-900">CSV Export</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Export data in CSV format for use with spreadsheet applications
                </p>
                <div className="space-y-3">
                  <button
                    onClick={() => handleExport('csv')}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Export All Data as CSV
                  </button>
                  <div className="text-sm text-gray-500">
                    Includes: Quotes, Authors, Topics, Engagement metrics
                  </div>
                </div>
              </div>

              {/* JSON Export */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <CodeBracketIcon className="w-8 h-8 text-blue-600 mr-3" />
                  <h3 className="text-lg font-medium text-gray-900">JSON Export</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Export data in JSON format for programmatic use and API integration
                </p>
                <div className="space-y-3">
                  <button
                    onClick={() => handleExport('json')}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Export All Data as JSON
                  </button>
                  <div className="text-sm text-gray-500">
                    Structured data with full metadata and relationships
                  </div>
                </div>
              </div>
            </div>

            {/* Export Options */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Export Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Data Types</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Quotes</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Authors</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Topics</span>
                    </label>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Include Metadata</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Engagement metrics</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">Creation dates</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">User activity</span>
                    </label>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Filters</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">Featured only</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">Recent (30 days)</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">High engagement</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Import Templates</h3>
              <p className="text-gray-600 mb-6">
                Download these templates to format your data correctly for import
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* CSV Template */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <TableCellsIcon className="w-5 h-5 text-green-600 mr-2" />
                    CSV Template
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Use this format for importing quotes via CSV
                  </p>
                  <pre className="bg-gray-50 p-3 rounded text-xs overflow-x-auto">
                    {csvTemplate}
                  </pre>
                  <button
                    onClick={() => {
                      const blob = new Blob([csvTemplate], { type: 'text/csv' });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = 'brainyquote_template.csv';
                      link.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Download CSV Template
                  </button>
                </div>

                {/* JSON Template */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <CodeBracketIcon className="w-5 h-5 text-blue-600 mr-2" />
                    JSON Template
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Use this format for importing data via JSON
                  </p>
                  <pre className="bg-gray-50 p-3 rounded text-xs overflow-x-auto">
                    {jsonTemplate}
                  </pre>
                  <button
                    onClick={() => {
                      const blob = new Blob([jsonTemplate], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = 'brainyquote_template.json';
                      link.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Download JSON Template
                  </button>
                </div>
              </div>
            </div>

            {/* Guidelines */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <InformationCircleIcon className="w-6 h-6 text-blue-600 mr-2" />
                Import Guidelines
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">File Requirements</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li>Maximum file size: 10MB</li>
                    <li>Supported formats: CSV, JSON</li>
                    <li>Maximum 1000 records per import</li>
                    <li>UTF-8 encoding required</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Data Validation</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li>Quote text: Required, maximum 500 characters</li>
                    <li>Author: Required, must exist in authors database</li>
                    <li>Category: Required, must exist in topics database</li>
                    <li>Images: Must be valid URLs</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminImport;