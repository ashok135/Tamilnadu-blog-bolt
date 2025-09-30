import React, { useState } from 'react';
import ScrollingBar from './ScrollingBar';
import MainSection from './MainSection';
import EventsSection from './EventsSection';
import BlogSection from './BlogSection';
import LinksSection from './LinksSection';
import CategoryContent from './CategoryContent';

const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleBackToHome = () => {
    setSelectedCategory(null);
  };

  if (selectedCategory) {
    return <CategoryContent category={selectedCategory} onBack={handleBackToHome} />;
  }

  return (
    <div>
      <ScrollingBar />
      <MainSection onCategoryClick={handleCategoryClick} />
      <BlogSection />
      <EventsSection />
      <LinksSection />
    </div>
  );
};

export default HomePage;