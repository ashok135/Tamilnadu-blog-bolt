import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, LogOut, Save, X } from 'lucide-react';
import { getBlogs, addBlog, updateBlog, deleteBlog, isAuthenticated, logout } from '../utils/storage';
import { BlogPost, BLOG_CATEGORIES, CATEGORY_LABELS, BlogCategory } from '../types/blog';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'blog' as BlogCategory,
    imageUrl: '',
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    
    const loadBlogs = async () => {
      const blogData = await getBlogs();
      setBlogs(blogData);
    };
    loadBlogs();
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;

    if (isEditing) {
      const updated = await updateBlog(isEditing, formData);
      if (updated) {
        const blogData = await getBlogs();
        setBlogs(blogData);
        setIsEditing(null);
      }
    } else {
      await addBlog(formData);
      const blogData = await getBlogs();
      setBlogs(blogData);
      setShowAddForm(false);
    }

    setFormData({ title: '', content: '', category: 'general', imageUrl: '' });
  };

  const handleEdit = (blog: BlogPost) => {
    setFormData({
      title: blog.title,
      content: blog.content,
      category: blog.category as BlogCategory,
      imageUrl: blog.imageUrl || '',
    });
    setIsEditing(blog.id);
    setShowAddForm(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('இந்த பதிவை நீக்க வேண்டுமா?')) {
      await deleteBlog(id);
      const blogData = await getBlogs();
      setBlogs(blogData);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', content: '', category: 'blog', imageUrl: '' });
    setIsEditing(null);
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#002c6d] text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">நிர்வாக முகப்பு</h1>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>வெளியேறு</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Add/Edit Form */}
        {(showAddForm || isEditing) && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#002c6d]">
                {isEditing ? 'பதிவு திருத்து' : 'புதிய பதிவு சேர்க்க'}
              </h2>
              <button
                onClick={resetForm}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  தலைப்பு *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a6db0] focus:border-transparent"
                  placeholder="பதிவின் தலைப்பு"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  உள்ளடக்கம் *
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a6db0] focus:border-transparent"
                  placeholder="பதிவின் விரிவான உள்ளடக்கம்"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  வகை *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as BlogCategory })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a6db0] focus:border-transparent"
                >
                  {BLOG_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {CATEGORY_LABELS[category]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  படம் URL (விருப்பம்)
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a6db0] focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex items-center space-x-2 bg-[#2a6db0] text-white px-6 py-2 rounded-lg hover:bg-[#002c6d] transition-colors"
                >
                  <Save className="h-4 w-4" />
                  <span>{isEditing ? 'புதுப்பிக்க' : 'சேமிக்க'}</span>
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  ரத்து செய்
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Add New Button */}
        {!showAddForm && !isEditing && (
          <div className="mb-8">
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2 bg-[#2a6db0] text-white px-6 py-3 rounded-lg hover:bg-[#002c6d] transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>புதிய பதிவு சேர்க்க</span>
            </button>
          </div>
        )}

        {/* Blogs List */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-[#002c6d] text-white px-6 py-4">
            <h3 className="text-xl font-bold">பதிவுகள் பட்டியல்</h3>
          </div>

          <div className="divide-y divide-gray-200">
            {blogs.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                இதுவரை பதிவுகள் எதுவும் சேர்க்கப்படவில்லை
              </div>
            ) : (
              blogs.map((blog) => (
                <div key={blog.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-[#002c6d] mb-2">
                        {blog.title}
                      </h4>
                      <div className="mb-2">
                        <span className="inline-block bg-[#2a6db0] text-white text-xs px-2 py-1 rounded-full">
                          {CATEGORY_LABELS[blog.category as BlogCategory]}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {blog.content}
                      </p>
                      <div className="text-sm text-gray-500">
                        <span>உருவாக்கப்பட்டது: {new Date(blog.createdAt).toLocaleDateString('ta-IN')}</span>
                        {blog.updatedAt !== blog.createdAt && (
                          <span className="ml-4">
                            புதுப்பிக்கப்பட்டது: {new Date(blog.updatedAt).toLocaleDateString('ta-IN')}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="p-2 text-[#2a6db0] hover:bg-[#2a6db0] hover:text-white rounded-lg transition-all"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="p-2 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;