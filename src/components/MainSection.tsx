import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getBlogs } from '../utils/storage';
import { BlogPost } from '../types/blog';

const MainSection: React.FC = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [blogs, setBlogs] = React.useState<BlogPost[]>([]);

  React.useEffect(() => {
    const loadBlogs = async () => {
      const blogData = await getBlogs();
      setBlogs(blogData);
    };
    loadBlogs();
  }, []);

  // Get latest blogs with images for the carousel
  const blogsWithImages = blogs.filter(blog => blog.imageUrl).slice(0, 5);
  
  // Fallback images if no blogs with images exist
  const fallbackImages = [
    { url: 'https://images.pexels.com/photos/8815016/pexels-photo-8815016.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'அரசு கூட்டம்', id: null },
    { url: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'பயிற்சி நிகழ்ச்சி', id: null },
    { url: 'https://images.pexels.com/photos/6177607/pexels-photo-6177607.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'மாநாடு', id: null },
  ];

  const images = blogsWithImages.length > 0 
    ? blogsWithImages.map(blog => ({ url: blog.imageUrl!, title: blog.title, id: blog.id }))
    : fallbackImages;

  const sidebarButtons = [
    'வரலாறு',
    'கிராம நிர்வாகம்',
    'கிராம உதவியாளர்',
    'நமது சங்கம்',
    'பயிற்சிகள்',
    'அறிவிக்கைகள்',
    'திட்டங்கள்',
    'கோரிக்கைகள்',
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleImageClick = () => {
    const currentImage = images[currentImageIndex];
    if (currentImage.id) {
      navigate(`/blog/${currentImage.id}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Images */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-[#002c6d] text-white px-6 py-3">
              <h2 className="text-xl font-bold">புகைப்படங்கள்</h2>
            </div>
            <div className="relative group">
              <div className="aspect-video overflow-hidden">
                <img
                  src={images[currentImageIndex].url}
                  alt={images[currentImageIndex].title}
                  onClick={handleImageClick}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 cursor-pointer"
                />
                
                {/* Image Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-medium text-lg">
                    {images[currentImageIndex].title}
                  </h3>
                  {images[currentImageIndex].id && (
                    <p className="text-gray-200 text-sm mt-1">
                      முழு பதிவு படிக்க படத்தை கிளிக் செய்யவும்
                    </p>
                  )}
                </div>
              </div>
              
              {/* Carousel Controls */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}

              {/* Dots Indicator */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {sidebarButtons.map((button, index) => (
            <button
              key={index}
              className="w-full bg-[#2a6db0] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#002c6d] transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 space-y-4"
            >
              {button}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainSection;