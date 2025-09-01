import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import TabContent from './components/TabContent';
import BlogPost from './components/BlogPost';
import AllBlogs from './components/AllBlogs';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import Footer from './components/Footer';
import { isAuthenticated, initializeSampleBlogs } from './utils/storage';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    // Initialize sample blogs on first load
    initializeSampleBlogs();
    
    // Add custom CSS for animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes scroll {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
      }
      
      .animate-scroll {
        animation: scroll 30s linear infinite;
      }
      
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      
      .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      
      html {
        scroll-behavior: smooth;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin" 
          element={
            isAuthenticated() ? <AdminDashboard /> : <Navigate to="/admin/login" />
          } 
        />
        
        {/* Blog Routes */}
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/blogs" element={<AllBlogs />} />
        
        {/* Main Website */}
        <Route 
          path="/*" 
          element={
            <div className="min-h-screen bg-gray-50">
              <Header activeTab={activeTab} onTabChange={setActiveTab} />
              {activeTab === 'home' ? <HomePage /> : <TabContent activeTab={activeTab} />}
              <Footer />
            </div>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;