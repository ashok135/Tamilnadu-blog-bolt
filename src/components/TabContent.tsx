import React from 'react';
import { FileText, Users, Building, Info } from 'lucide-react';

interface TabContentProps {
  activeTab: string;
}

const TabContent: React.FC<TabContentProps> = ({ activeTab }) => {
  const getContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <Info className="h-8 w-8 text-[#2a6db0] mr-3" />
                <h2 className="text-3xl font-bold text-[#002c6d]">அறிமுகம்</h2>
              </div>
              
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p className="mb-4">
                  தமிழ்நாடு அரசு கிராம உதவியாளர்கள் மாநில சங்கம் என்பது தமிழ்நாடு முழுவதும் உள்ள 
                  கிராம உதவியாளர்களின் உரிமைகளையும் நலன்களையும் பாதுகாக்கும் ஒரு பதிவு செய்யப்பட்ட அமைப்பாகும்.
                </p>
                
                <p className="mb-4">
                  எங்கள் நோக்கம் கிராம உதவியாளர்களின் தொழில்முறை வளர்ச்சி, சம்பள உயர்வு, 
                  பணி நிலைமைகளில் முன்னேற்றம் மற்றும் சமூக நலனுக்காக பணியாற்றுவதாகும்.
                </p>
                
                <div className="bg-blue-50 p-6 rounded-lg mt-6">
                  <h3 className="text-xl font-bold text-[#002c6d] mb-3">எங்கள் குறிக்கோள்கள்</h3>
                  <ul className="space-y-2">
                    <li>• கிராம உதவியாளர்களின் உரிமைகள் பாதுகாப்பு</li>
                    <li>• தொழில்முறை பயிற்சி வழங்குதல்</li>
                    <li>• சம்பள மற்றும் ஊதிய உயர்வுக்கான முயற்சிகள்</li>
                    <li>• அரசுடன் கலந்தாலோசனை</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <FileText className="h-8 w-8 text-[#2a6db0] mr-3" />
                <h2 className="text-3xl font-bold text-[#002c6d]">அரசாணைகள்</h2>
              </div>
              
              <div className="space-y-4">
                <div className="border-l-4 border-[#2a6db0] pl-4 py-2">
                  <h3 className="font-bold text-lg">G.O. Ms. No. 123</h3>
                  <p className="text-gray-600">கிராம உதவியாளர்கள் சம்பள உயர்வு - 2025</p>
                  <span className="text-sm text-gray-500">தேதி: 15.01.2025</span>
                </div>
                
                <div className="border-l-4 border-[#2a6db0] pl-4 py-2">
                  <h3 className="font-bold text-lg">G.O. Ms. No. 098</h3>
                  <p className="text-gray-600">பணி விதிமுறைகள் மற்றும் நியமன விதிகள்</p>
                  <span className="text-sm text-gray-500">தேதி: 10.12.2024</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'executives':
        return (
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <Users className="h-8 w-8 text-[#2a6db0] mr-3" />
                <h2 className="text-3xl font-bold text-[#002c6d]">நிர்வாகிகள்</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow">
                  <div className="w-20 h-20 bg-[#2a6db0] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-[#002c6d]">தலைவர்</h3>
                  <p className="text-gray-600">திரு. குமார் ராஜ்</p>
                  <p className="text-sm text-gray-500">சென்னை மாவட்டம்</p>
                </div>
                
                <div className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow">
                  <div className="w-20 h-20 bg-[#2a6db0] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-[#002c6d]">பொதுச் செயலாளர்</h3>
                  <p className="text-gray-600">திரு. முருகன் எஸ்</p>
                  <p className="text-sm text-gray-500">கோயம்புத்தூர் மாவட்டம்</p>
                </div>
                
                <div className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow">
                  <div className="w-20 h-20 bg-[#2a6db0] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-[#002c6d]">பொருளாளர்</h3>
                  <p className="text-gray-600">திரு. கிருஷ்ணன் வி</p>
                  <p className="text-sm text-gray-500">மதுரை மாவட்டம்</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'members':
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <Building className="h-8 w-8 text-[#2a6db0] mr-3" />
                <h2 className="text-3xl font-bold text-[#002c6d]">உறுப்பினர்கள்</h2>
              </div>
              
              <div className="text-center py-8">
                <p className="text-lg text-gray-600 mb-4">
                  மொத்த உறுப்பினர்கள்: <span className="font-bold text-[#002c6d]">12,450</span>
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="font-bold text-[#002c6d] mb-2">புதிய உறுப்பினர் சேர்க்கை</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      உறுப்பினர் ஆக விரும்புபவர்கள் கீழே உள்ள விண்ணப்பத்தை பூர்த்தி செய்யவும்
                    </p>
                    <button className="bg-[#2a6db0] text-white px-4 py-2 rounded-lg hover:bg-[#002c6d] transition-colors">
                      விண்ணப்பிக்க
                    </button>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="font-bold text-[#002c6d] mb-2">உறுப்பினர் பட்டியல்</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      மாவட்ட வாரியான உறுப்பினர்கள் பட்டியலை பார்க்க
                    </p>
                    <button className="bg-[#2a6db0] text-white px-4 py-2 rounded-lg hover:bg-[#002c6d] transition-colors">
                      பட்டியல் பார்க்க
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (activeTab === 'home') {
    return null;
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {getContent()}
      </div>
    </div>
  );
};

export default TabContent;