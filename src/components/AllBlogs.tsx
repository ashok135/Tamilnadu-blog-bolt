import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Search } from 'lucide-react';
import { getBlogs } from '../utils/storage';

const AllBlogs: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const blogs = getBlogs();

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#002c6d] text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>முகப்புக்கு திரும்பு</span>
          </button>
          <h1 className="text-2xl md:text-3xl font-bold">
            அனைத்து அறிவிப்புகள்
          </h1>
        </div>
      </header>

      {/* Search and Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="அறிவிப்புகளை தேடவும்..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a6db0] focus:border-transparent"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredBlogs.length} அறிவிப்புகள் கிடைத்தன
            {searchTerm && ` "${searchTerm}" க்கான தேடல் முடிவுகள்`}
          </p>
        </div>

        {/* Blogs Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchTerm ? 'தேடல் முடிவுகள் கிடைக்கவில்லை' : 'அறிவிப்புகள் எதுவும் கிடைக்கவில்லை'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <article
                key={blog.id}
                onClick={() => navigate(`/blog/${blog.id}`)}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                {blog.imageUrl && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#002c6d] mb-3 line-clamp-2">
                    {blog.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.content}
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>
                      {new Date(blog.createdAt).toLocaleDateString('ta-IN')}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Load More Button (if needed for pagination) */}
        {filteredBlogs.length > 12 && (
          <div className="text-center mt-8">
            <button className="bg-[#2a6db0] text-white px-8 py-3 rounded-lg hover:bg-[#002c6d] transition-colors">
              மேலும் பதிவுகள் ஏற்றவும்
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default AllBlogs;