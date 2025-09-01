import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { getBlogs } from '../utils/storage';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const blogs = getBlogs();
  const blog = blogs.find(b => b.id === id);

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">பதிவு கிடைக்கவில்லை</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-[#2a6db0] text-white px-6 py-2 rounded-lg hover:bg-[#002c6d] transition-colors"
          >
            முகப்புக்கு திரும்பு
          </button>
        </div>
      </div>
    );
  }

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
            தமிழ்நாடு அரசு கிராம உதவியாளர்கள் மாநில சங்கம்
          </h1>
        </div>
      </header>

      {/* Blog Content */}
      <main className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Featured Image */}
          {blog.imageUrl && (
            <div className="aspect-video overflow-hidden">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-8">
            <header className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-[#002c6d] mb-4 leading-tight">
                {blog.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-[#2a6db0]" />
                  <span>
                    {new Date(blog.createdAt).toLocaleDateString('ta-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                
                {blog.updatedAt !== blog.createdAt && (
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-[#2a6db0]" />
                    <span>
                      புதுப்பிக்கப்பட்டது: {new Date(blog.updatedAt).toLocaleDateString('ta-IN')}
                    </span>
                  </div>
                )}
              </div>
            </header>

            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {blog.content}
              </div>
            </div>

            {/* Share Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-bold text-[#002c6d] mb-4">இந்த பதிவை பகிரவும்</h3>
              <div className="flex space-x-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Facebook
                </button>
                <button className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors">
                  Twitter
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-[#002c6d] mb-6">தொடர்புடைய பதிவுகள்</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs
              .filter(b => b.id !== blog.id)
              .slice(0, 3)
              .map((relatedBlog) => (
                <article
                  key={relatedBlog.id}
                  onClick={() => navigate(`/blog/${relatedBlog.id}`)}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  {relatedBlog.imageUrl && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={relatedBlog.imageUrl}
                        alt={relatedBlog.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <div className="p-4">
                    <h3 className="font-bold text-[#002c6d] mb-2 line-clamp-2">
                      {relatedBlog.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {relatedBlog.content}
                    </p>
                  </div>
                </article>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default BlogPost;