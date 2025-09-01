import React, { useState } from 'react';
import { Menu, X, User } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'முகப்பு' },
    { id: 'about', label: 'அறிமுகம்' },
    { id: 'orders', label: 'அரசாணைகள்' },
    { id: 'announcements', label: 'அறிவிப்புகள்' },
    { id: 'executives', label: 'நிர்வாகிகள்' },
    { id: 'members', label: 'உறுப்பினர்கள்' },
  ];

  return (
    <header className="bg-white shadow-lg">
      {/* Top Header */}
      <div className="bg-[#002c6d] text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div>Registration No: TN/CHE/2019/000123</div>
          <div className="hidden md:block">
            Office: Chennai, Tamil Nadu | Email: tng.ava.revenue@gmail.com
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-[#2a6db0] rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#002c6d] leading-tight">
                தமிழ்நாடு அரசு கிராம உதவியாளர்கள் மாநில சங்கம்
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Tamil Nadu Government Village Assistants State Association
              </p>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-[#002c6d]" />
            ) : (
              <Menu className="h-6 w-6 text-[#002c6d]" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className={`mt-4 ${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-[#002c6d] text-white shadow-md'
                    : 'text-[#002c6d] hover:bg-[#2a6db0] hover:text-white hover:shadow-md'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;