import React from 'react';
import { Calendar, Clock } from 'lucide-react';

const EventsSection: React.FC = () => {
  const events = [
    {
      title: 'மாவட்ட சங்க தேர்தல்',
      date: '30.08.2025',
      time: '10:00 AM',
      location: 'மாவட்ட ஆட்சியர் அலுவலகம்'
    },
    {
      title: 'மண்டல சங்க தேர்தல்',
      date: '30.08.2025',
      time: '2:00 PM',
      location: 'மண்டல கல்வி அலுவலர் அலுவலகம்'
    },
    {
      title: 'மண்டல பொதுக்குழு கூட்டம்',
      date: '28.09.2025',
      time: '11:00 AM',
      location: 'மண்டல ஆட்சியர் அலுவலகம்'
    }
  ];

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
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="bg-gradient-to-r from-[#002c6d] to-[#2a6db0] p-4">
                <h3 className="text-white font-bold text-lg">{event.title}</h3>
              </div>
              
              <div className="p-6 space-y-3">
                <div className="flex items-center space-x-2 text-gray-700">
                  <Calendar className="h-5 w-5 text-[#2a6db0]" />
                  <span className="font-medium">தேதி: {event.date}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-700">
                  <Clock className="h-5 w-5 text-[#2a6db0]" />
                  <span>நேரம்: {event.time}</span>
                </div>
                
                <div className="text-gray-600 text-sm">
                  <strong>இடம்:</strong> {event.location}
                </div>
                
                <button className="w-full mt-4 bg-[#2a6db0] text-white py-2 rounded-lg hover:bg-[#002c6d] transition-colors">
                  மேலும் அறிக
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;