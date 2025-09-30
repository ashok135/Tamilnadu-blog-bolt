import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { getBlogs } from '../utils/storage';
import { BlogPost } from '../types/blog';

const EventsSection: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = React.useState<BlogPost[]>([]);

  React.useEffect(() => {
    const loadEvents = async () => {
      const blogData = await getBlogs();
      // Filter to show only events
      setEvents(blogData.filter(blog => blog.category === 'event').slice(0, 6));
    };
    loadEvents();
  }, []);

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#002c6d] text-center mb-8">
          வரவிருக்கும் நிகழ்வுகள்
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => navigate(`/blog/${event.id}`)}
            >
              {event.imageUrl && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              
              <div className="bg-gradient-to-r from-[#002c6d] to-[#2a6db0] p-4">
                <h3 className="text-white font-bold text-lg">{event.title}</h3>
              </div>
              
              <div className="p-6 space-y-3">
                <div className="flex items-center space-x-2 text-gray-700">
                  <Calendar className="h-5 w-5 text-[#2a6db0]" />
                  <span className="font-medium">தேதி: {new Date(event.createdAt).toLocaleDateString('ta-IN')}</span>
                </div>
                
                <div className="text-gray-600 text-sm line-clamp-3">
                  {event.content}
                </div>
                
                <button 
                  className="w-full mt-4 bg-[#2a6db0] text-white py-2 rounded-lg hover:bg-[#002c6d] transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/blog/${event.id}`);
                  }}
                >
                  மேலும் அறிக
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {events.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">நிகழ்வுகள் எதுவும் கிடைக்கவில்லை</p>
          </div>
        )}
        
        {events.length > 0 && (
          <div className="text-center mt-8">
            <button 
              onClick={() => navigate('/blogs')}
              className="bg-[#002c6d] text-white px-8 py-3 rounded-lg hover:bg-[#2a6db0] transition-colors"
            >
              அனைத்து நிகழ்வுகளும்
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;