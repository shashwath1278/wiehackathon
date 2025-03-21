import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/Card';
import { Brain, Calendar, Apple, Scan } from 'lucide-react';
import backgroundVideo from '../assets/5866263-sd_640_360_25fps.mp4';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      title: 'AI-Powered Meal Plans',
      description: 'Get personalized nutrition recommendations based on your life stage',
      icon: <Brain className="h-8 w-8 text-pink-500" />,
    },
    {
      title: 'Menstrual Cycle Sync',
      description: 'Align your nutrition with your cycle phases for optimal well-being',
      icon: <Calendar className="h-8 w-8 text-pink-500" />,
    },
    {
      title: 'Regional & Cultural Diets',
      description: 'Nutrition plans adapted to your cultural preferences',
      icon: <Apple className="h-8 w-8 text-pink-500" />,
    },
    {
      title: 'Smart Plate Scanner',
      description: 'Analyze your meals and get real-time nutrition insights',
      icon: <Scan className="h-8 w-8 text-pink-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900">
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-40"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
          {/* Gradient Overlay */}
          <div className="absolute inset-0  dark:from-gray-800/90 dark:via-gray-900/90 dark:to-gray-800/90" />
        </div>
        
        <div className="container relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            NutriHer
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-gray-300">
            Personalized nutrition for every stage of a woman's life
          </p>
          <Button
            onClick={() => navigate('/life-stage')}
            size="lg"
            className="gradient-pink text-white"
          >
            Get Your Personalized Nutrition Plan
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container px-4">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">
            Why Choose NutriHer?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow dark:bg-gray-800 dark:shadow-gray-900">
                <CardHeader>
                  <div className="flex items-center justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-center dark:text-gray-100">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center dark:text-gray-400">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 gradient-text">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
            Get your personalized nutrition plan tailored to your life stage
          </p>
          <Button
            onClick={() => navigate('/life-stage')}
            size="lg"
            className="gradient-pink text-white"
          >
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home; 