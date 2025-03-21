import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Brain, Calendar, Apple, Scan, Calculator, User, LogOut } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './Button';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const menuItems = [
    {
      name: 'Life Stage',
      path: '/life-stage',
      icon: <Brain className="h-5 w-5" />
    },
    {
      name: 'Cycle Sync',
      path: '/cycle-sync',
      icon: <Calendar className="h-5 w-5" />
    },
    {
      name: 'Smart Plate',
      path: '/smart-plate',
      icon: <Scan className="h-5 w-5" />
    },
    {
      name: 'BMI Calculator',
      path: '/bmi-calculator',
      icon: <Calculator className="h-5 w-5" />
    }
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Apple className="h-8 w-8 text-pink-500" />
            <span className="ml-2 text-xl font-bold gradient-text">NutriHer</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === item.path
                    ? 'text-pink-500 bg-pink-50 dark:bg-pink-900/20'
                    : 'text-gray-700 hover:text-pink-500 dark:text-gray-300 dark:hover:text-pink-400'
                }`}
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </Link>
            ))}

            <div className="ml-4 flex items-center space-x-4">
              <ThemeToggle />
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400">
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="h-8 w-8 rounded-full"
                    />
                    <span>{user?.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/login">
                    <Button variant="ghost" className="text-gray-700 dark:text-gray-300">
                      Sign in
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="gradient-pink text-white">Sign up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.path
                    ? 'text-pink-500 bg-pink-50 dark:bg-pink-900/20'
                    : 'text-gray-700 hover:text-pink-500 dark:text-gray-300 dark:hover:text-pink-400'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-500 dark:text-gray-300 dark:hover:text-pink-400"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="h-5 w-5" />
                  <span className="ml-2">Profile</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-pink-500 dark:text-gray-300 dark:hover:text-pink-400"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="ml-2">Sign out</span>
                </button>
              </>
            ) : (
              <div className="px-3 py-2 space-y-2">
                <Link
                  to="/login"
                  className="block w-full text-center px-4 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400"
                  onClick={() => setIsOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="block w-full text-center px-4 py-2 text-base font-medium gradient-pink text-white rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}; 