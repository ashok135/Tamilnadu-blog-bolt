import React from 'react';
import { Phone, Mail, MapPin, User } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#002c6d] text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Organization Info */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <div className="w-12 h-12 bg-[#2a6db0] rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">தமிழ்நாடு அரசு</h3>
                <p className="text-sm text-gray-300">கிராம உதவியாளர்கள் மாநில சங்கம்</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center">
            <h4 className="font-bold text-lg mb-4">தொடர்பு விபரங்கள்</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+91 85******1973</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>tng.ava.revenue@gmail.com</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>சென்னை, தமிழ்நாடு</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-right">
            <h4 className="font-bold text-lg mb-4">விரைவு இணைப்புகள்</h4>
            <div className="space-y-2">
              <a href="#" className="block hover:text-[#2a6db0] transition-colors">முகப்பு</a>
              <a href="#" className="block hover:text-[#2a6db0] transition-colors">அறிமுகம்</a>
              <a href="#" className="block hover:text-[#2a6db0] transition-colors">அறிவிப்புகள்</a>
              <a href="#" className="block hover:text-[#2a6db0] transition-colors">தொடர்பு</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-300">
            தமிழ்நாடு அரசு கிராம உதவியாளர்கள் மாநில சங்கம் © 2025. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டுள்ளன.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;