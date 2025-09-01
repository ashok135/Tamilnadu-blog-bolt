import React from 'react';
import ScrollingBar from './ScrollingBar';
import MainSection from './MainSection';
import EventsSection from './EventsSection';
import BlogSection from './BlogSection';
import LinksSection from './LinksSection';

const HomePage: React.FC = () => {
  return (
    <div>
      <ScrollingBar />
      <MainSection />
      <BlogSection />
      <EventsSection />
      <LinksSection />
    </div>
  );
};

export default HomePage;