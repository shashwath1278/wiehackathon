import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    const { isDarkMode } = useTheme();

    return (
        <footer className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-200 pt-12 pb-8 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* About Us Section */}
                <div className="col-span-1 md:col-span-2 lg:col-span-1">
                    <h3 className="text-xl font-bold mb-4 gradient-text">About NutriHer</h3>
                    <p className="text-sm leading-relaxed dark:text-gray-300">
                        Empowering women through personalized nutrition guidance at every life stage. We combine science-backed advice with your unique needs to help you achieve optimal health and wellness.
                    </p>
                </div>

                {/* Quick Links Section */}
                <div>
                    <h3 className="text-xl font-bold mb-4 gradient-text">Quick Links</h3>
                    <ul className="space-y-2">
                        <li>🏠 <Link to="/" className="hover:text-pink-600 dark:hover:text-pink-400">Home</Link></li>
                        <li>📱 <Link to="/life-stage" className="hover:text-pink-600 dark:hover:text-pink-400">Life Stage</Link></li>
                        <li>🌙 <Link to="/cycle-sync" className="hover:text-pink-600 dark:hover:text-pink-400">Cycle Sync</Link></li>
                        <li>📸 <Link to="/smart-plate" className="hover:text-pink-600 dark:hover:text-pink-400">Smart Plate</Link></li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div>
                    <h3 className="text-xl font-bold mb-4 gradient-text">Contact Us</h3>
                    <ul className="space-y-2 dark:text-gray-300">
                        <li>📍 Location: Your City, Country</li>
                        <li>📧 Email: contact@nutriher.com</li>
                        <li>📞 Phone: +123 456 7890</li>
                    </ul>

                    <h3 className="text-xl font-bold mt-6 mb-4 gradient-text">Newsletter</h3>
                    <div className="flex">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 p-2 border rounded-l bg-white/80 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                        />
                        <button className="gradient-pink text-white px-4 py-2 rounded-r hover:opacity-90">
                            Subscribe
                        </button>
                    </div>
                </div>

                {/* Social Media Section */}
                <div>
                    <h3 className="text-xl font-bold mb-4 gradient-text">Follow Us</h3>
                    <ul className="space-y-2">
                        <li>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 dark:hover:text-pink-400 flex items-center gap-2">
                                🔵 Facebook
                            </a>
                        </li>
                        <li>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 dark:hover:text-pink-400 flex items-center gap-2">
                                📸 Instagram
                            </a>
                        </li>
                        <li>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 dark:hover:text-pink-400 flex items-center gap-2">
                                🐦 Twitter
                            </a>
                        </li>
                        <li>
                            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 dark:hover:text-pink-400 flex items-center gap-2">
                                📌 Pinterest
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="mt-12 pt-8 border-t border-pink-100 dark:border-gray-700 text-center">
                <p className="text-sm dark:text-gray-400">
                    💗 Your Health, Your Power! | © {currentYear} NutriHer. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer; 