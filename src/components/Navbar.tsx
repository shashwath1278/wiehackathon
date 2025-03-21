import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './Button';
import { Sun, Moon, Menu } from 'lucide-react';

const Navbar: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/life-stage', label: 'Life Stage' },
    { path: '/cycle-sync', label: 'Cycle Sync' },
    { path: '/smart-plate', label: 'Smart Plate' },
    { path: '/bmi-calculator', label: 'BMI Calculator' }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-gray-900/95">
      <div className="container px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold gradient-text">NutriHer</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-6 w-6 dark:text-gray-200" />
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-gray-700 hover:text-pink-500 dark:text-gray-200 dark:hover:text-pink-400"
            >
              {item.label}
            </Link>
          ))}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="dark:text-gray-200"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background dark:bg-gray-900 border-b md:hidden">
            <div className="container px-4 py-4 flex flex-col gap-4">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-gray-700 hover:text-pink-500 dark:text-gray-200 dark:hover:text-pink-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  toggleTheme();
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2 dark:text-gray-200"
              >
                {isDarkMode ? (
                  <>
                    <Sun className="h-5 w-5" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="h-5 w-5" />
                    Dark Mode
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 