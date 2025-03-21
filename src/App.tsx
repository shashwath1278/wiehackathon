import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import Footer from './components/Footer';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import NutritionChatbot from './pages/NutritionChatbot';

// Pages
import Home from './pages/Home';
import LifeStage from './pages/LifeStage';
import NutritionPlan from './pages/NutritionPlan';
import CycleSync from './pages/CycleSync';
import SmartPlate from './pages/SmartPlate';
import BMICalculator from './pages/BMICalculator';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Onboarding from './pages/Onboarding';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/life-stage" element={<LifeStage />} />
                <Route path="/plan/:stage" element={<NutritionPlan />} />
                <Route path="/cycle-sync" element={<CycleSync />} />
                <Route path="/smart-plate" element={<SmartPlate />} />
                <Route path="/bmi-calculator" element={<BMICalculator />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/onboarding" 
                  element={
                    <ProtectedRoute>
                      <Onboarding />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
            <Footer />
            <NutritionChatbot />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App; 