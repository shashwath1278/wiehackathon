import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/Card';
import { Button } from '../components/Button';
import { Moon, Sun, Star, Heart, Calendar } from 'lucide-react';

const CycleSync: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState('menstrual');

  const phases = [
    {
      id: 'menstrual',
      name: 'Menstrual Phase',
      icon: <Moon className="h-6 w-6" />,
      duration: 'Days 1-5',
      nutrients: ['Iron', 'Vitamin B12', 'Magnesium'],
      foods: [
        'Dark leafy greens',
        'Red meat',
        'Lentils',
        'Dark chocolate',
        'Nuts and seeds'
      ],
      tips: [
        'Focus on iron-rich foods',
        'Stay hydrated',
        'Include anti-inflammatory foods',
        'Opt for warm, nourishing meals'
      ]
    },
    {
      id: 'follicular',
      name: 'Follicular Phase',
      icon: <Sun className="h-6 w-6" />,
      duration: 'Days 6-14',
      nutrients: ['Vitamin B', 'Zinc', 'Selenium'],
      foods: [
        'Fermented foods',
        'Fresh fruits',
        'Sprouted grains',
        'Fish',
        'Eggs'
      ],
      tips: [
        'Eat light, energizing foods',
        'Include fermented foods',
        'Focus on raw fruits and vegetables',
        'Stay active with nutrient-rich snacks'
      ]
    },
    {
      id: 'ovulatory',
      name: 'Ovulatory Phase',
      icon: <Star className="h-6 w-6" />,
      duration: 'Days 15-17',
      nutrients: ['Glutamine', 'Vitamin E', 'Vitamin C'],
      foods: [
        'Raw vegetables',
        'Berries',
        'Citrus fruits',
        'Quinoa',
        'Avocados'
      ],
      tips: [
        'Choose light, fresh foods',
        'Include antioxidant-rich foods',
        'Stay hydrated with water and coconut water',
        'Eat smaller, frequent meals'
      ]
    },
    {
      id: 'luteal',
      name: 'Luteal Phase',
      icon: <Heart className="h-6 w-6" />,
      duration: 'Days 18-28',
      nutrients: ['Magnesium', 'Calcium', 'Vitamin B6'],
      foods: [
        'Sweet potatoes',
        'Bananas',
        'Leafy greens',
        'Yogurt',
        'Whole grains'
      ],
      tips: [
        'Focus on complex carbohydrates',
        'Include magnesium-rich foods',
        'Avoid caffeine and sugar',
        'Choose calming, grounding foods'
      ]
    }
  ];

  const currentPhase = phases.find(phase => phase.id === selectedPhase)!;

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 py-12">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text">
            Cycle Sync Nutrition
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Optimize your nutrition based on your menstrual cycle phase
          </p>
        </div>

        {/* Phase Selection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {phases.map((phase) => (
            <Button
              key={phase.id}
              variant={selectedPhase === phase.id ? 'default' : 'outline'}
              className={`flex items-center gap-2 ${
                selectedPhase === phase.id
                  ? 'gradient-pink text-white'
                  : 'dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}
              onClick={() => setSelectedPhase(phase.id)}
            >
              {phase.icon}
              <span className="hidden md:inline">{phase.name}</span>
            </Button>
          ))}
        </div>

        {/* Current Phase Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Phase Overview */}
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <div className="flex items-center gap-3">
                {currentPhase.icon}
                <div>
                  <CardTitle className="dark:text-gray-100">{currentPhase.name}</CardTitle>
                  <CardDescription className="dark:text-gray-400">{currentPhase.duration}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 dark:text-gray-200">Key Nutrients</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentPhase.nutrients.map((nutrient, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-300 rounded-full text-sm"
                      >
                        {nutrient}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Foods */}
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="dark:text-gray-100">Recommended Foods</CardTitle>
              <CardDescription className="dark:text-gray-400">Foods to support your body during this phase</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-2 gap-2">
                {currentPhase.foods.map((food, index) => (
                  <li key={index} className="flex items-center gap-2 dark:text-gray-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-pink-500"></span>
                    {food}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Nutrition Tips */}
          <Card className="lg:col-span-2 dark:bg-gray-800">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-pink-500" />
                <CardTitle className="dark:text-gray-100">Phase-Specific Tips</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentPhase.tips.map((tip, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg flex items-start gap-3"
                  >
                    <span className="h-2 w-2 rounded-full bg-pink-500 mt-2"></span>
                    <p className="dark:text-gray-300">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Connect Calendar CTA */}
        <Card className="mt-12 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-gray-800 dark:to-gray-900">
          <CardContent className="flex flex-col md:flex-row items-center justify-between p-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 dark:text-gray-100">
                Connect Your Cycle Tracking App
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get automated recommendations based on your cycle
              </p>
            </div>
            <Button
              className="mt-4 md:mt-0 gradient-pink text-white"
            >
              Connect App
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CycleSync; 