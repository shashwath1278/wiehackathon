import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './Button';

export const ThemeToggle: React.FC = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full"
            aria-label="Toggle theme"
        >
            {isDarkMode ? (
                <Sun className="h-5 w-5 text-yellow-500 transition-all" />
            ) : (
                <Moon className="h-5 w-5 text-slate-700 transition-all" />
            )}
        </Button>
    );
}; 