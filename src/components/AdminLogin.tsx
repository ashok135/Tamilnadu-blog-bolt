import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, User, Lock } from 'lucide-react';
import { login } from '../utils/storage';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (login(credentials.username, credentials.password)) {
      navigate('/admin');
    } else {
      setError('தவறான பயனர் பெயர் அல்லது கடவுச்சொல்');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-[#002c6d] rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#002c6d]">நிர்வாக உள்நுழைவு</h1>
          <p className="text-gray-600 text-sm mt-2">அறிவிப்புகள் நிர்வாகம்</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              பயனர் பெயர்
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                required
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a6db0] focus:border-transparent"
                placeholder="admin"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              கடவுச்சொல்
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                required
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2a6db0] focus:border-transparent"
                placeholder="********"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 bg-[#2a6db0] text-white py-3 rounded-lg hover:bg-[#002c6d] transition-colors"
          >
            <LogIn className="h-5 w-5" />
            <span>உள்நுழைய</span>
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-[#2a6db0] hover:text-[#002c6d] transition-colors text-sm"
          >
            முகப்புக்கு திரும்பு
          </button>
        </div>

        <div className="mt-4 text-center text-xs text-gray-500">
          <p>டெமோ: username: admin, password: admin123</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;