import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getBlogs } from '../utils/storage';
import { Calendar } from 'lucide-react';

interface BlogSectionProps {
  onBlogClick?: (blogId: string) => void;
}

const BlogSection: React.FC<BlogSectionProps> = ({ onBlogClick }) => {
  const navigate = useNavigate();
  const blogs = getBlogs();

  const handleBlogClick = (blogId: string) => {
    if (onBlogClick) {
      onBlogClick(blogId);
    } else {
      navigate(`/blog/${blogId}`);
    }
  };

  if (blogs.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#002c6d] text-center mb-8">
          அறிவிப்புகள்
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.slice(0, 6).map((blog) => (
            <article
              key={blog.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => handleBlogClick(blog.id)}
            >
              {blog.imageUrl && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
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
                
                <button 
                  className="mt-4 w-full bg-[#2a6db0] text-white py-2 rounded-lg hover:bg-[#002c6d] transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBlogClick(blog.id);
                  }}
                >
                  மேலும் படிக்க
                </button>
              </div>
            </article>
          ))}
        </div>

        {blogs.length > 6 && (
          <div className="text-center mt-8">
            <button 
              onClick={() => navigate('/blogs')}
              className="bg-[#002c6d] text-white px-8 py-3 rounded-lg hover:bg-[#2a6db0] transition-colors"
            >
              அனைத்து அறிவிப்புகளும்
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;