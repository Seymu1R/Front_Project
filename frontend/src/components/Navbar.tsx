import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import AITokenModal from './AITokenModal';
import { useState } from 'react';

const Navbar = () => {
  const { state } = useApp();
  const location = useLocation();
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">📚</span>
              </div>
              <span className="text-xl font-semibold text-gray-800">
                Language Learning
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === '/'
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Home
              </Link>
              <Link
                to="/dictionary"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === '/dictionary'
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                My Dictionary
              </Link>

              {/* AI Status & Token Button */}
              <div className="flex items-center space-x-3">
                {state.isAiReady ? (
                  <div className="flex items-center space-x-2 text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">AI Ready</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-gray-500">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span className="text-sm">AI Not Connected</span>
                  </div>
                )}
                
                <button
                  onClick={() => setIsTokenModalOpen(true)}
                  className="btn-primary text-sm"
                >
                  Add AI Token
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* AI Token Modal */}
      <AITokenModal
        isOpen={isTokenModalOpen}
        onClose={() => setIsTokenModalOpen(false)}
      />
    </>
  );
};

export default Navbar;