import React from 'react';
import { ExternalLink, Globe, FileText } from 'lucide-react';

const LinksSection: React.FC = () => {
  const webApplications = [
    { name: 'ஆன்லைன் விண்ணப்பம்', url: '#', icon: <FileText className="h-5 w-5" /> },
    { name: 'சம்பள கணக்கீடு', url: '#', icon: <Globe className="h-5 w-5" /> },
    { name: 'பணி விபரங்கள்', url: '#', icon: <FileText className="h-5 w-5" /> },
  ];

  const usefulLinks = [
    { name: 'cra.tn.gov.com', url: 'https://cra.tn.gov.in', external: true },
    { name: 'tn.gov.in', url: 'https://tn.gov.in', external: true },
    { name: 'revenue.tn.gov.in', url: 'https://revenue.tn.gov.in', external: true },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Web Applications */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-[#002c6d] mb-6 flex items-center">
              <Globe className="h-6 w-6 mr-2" />
              இணைய பயன்பாடுகள்
            </h3>
            <div className="space-y-3">
              {webApplications.map((app, index) => (
                <a
                  key={index}
                  href={app.url}
                  className="flex items-center space-x-3 p-3 bg-white rounded-lg hover:bg-[#2a6db0] hover:text-white transition-all duration-200 group"
                >
                  <span className="text-[#2a6db0] group-hover:text-white">
                    {app.icon}
                  </span>
                  <span className="font-medium">{app.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Useful Links */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-[#002c6d] mb-6 flex items-center">
              <ExternalLink className="h-6 w-6 mr-2" />
              பயனுள்ள இணைப்புகள்
            </h3>
            <div className="space-y-3">
              {usefulLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target={link.external ? '_blank' : '_self'}
                  rel={link.external ? 'noopener noreferrer' : ''}
                  className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-[#2a6db0] hover:text-white transition-all duration-200 group"
                >
                  <span className="font-medium">{link.name}</span>
                  <ExternalLink className="h-4 w-4 text-[#2a6db0] group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LinksSection;