import React from 'react';
import { Brain } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-6 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="flex items-center space-x-3">
            <Brain className="w-8 h-8" />
            <h1 className="text-2xl font-bold">AI Agent ID System</h1>
          </Link>
          <nav className="flex space-x-6">
            <Link 
              to="/" 
              className={`hover:text-indigo-200 transition-colors ${location.pathname === '/' ? 'text-white' : 'text-indigo-200'}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/monitoring" 
              className={`hover:text-indigo-200 transition-colors ${location.pathname === '/monitoring' ? 'text-white' : 'text-indigo-200'}`}
            >
              Monitoring
            </Link>
            <Link 
              to="/reports" 
              className={`hover:text-indigo-200 transition-colors ${location.pathname === '/reports' ? 'text-white' : 'text-indigo-200'}`}
            >
              Reports
            </Link>
          </nav>
        </div>
        <div className="max-w-3xl">
          <p className="text-indigo-100 text-sm leading-relaxed">
            A comprehensive system for generating and managing unique identifiers for AI agents. 
            Track agent activities, monitor performance metrics, and generate detailed reports 
            with our advanced identification and oversight platform.
          </p>
        </div>
      </div>
    </header>
  );
};