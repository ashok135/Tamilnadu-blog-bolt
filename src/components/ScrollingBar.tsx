import React from 'react';

const ScrollingBar: React.FC = () => {
  return (
    <div className="bg-[#2a6db0] text-white py-3 overflow-hidden">
      <div className="animate-scroll whitespace-nowrap">
        <span className="text-sm md:text-base font-medium">
          🔔 தமிழ்நாடு அரசு கிராம உதவியாளர்கள் மாநில சங்கத்தின் மாநில மாநாடு 15.12.2025 அன்று சென்னையில் நடைபெறும் • 
          மாவட்ட சங்க தேர்தல் 30.08.2025 அன்று நடைபெறும் • 
          புதிய உறுப்பினர் சேர்க்கைக்கு விண்ணப்பிக்கவும் • 
          மாநில நிர்வாகிகள் கூட்டம் அக்டோபர் மாதம் நடைபெறும் •
        </span>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ScrollingBar;