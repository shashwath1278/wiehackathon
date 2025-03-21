import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/Card';
import { Button } from '../components/Button';
import { Apple, Salad, Coffee, Moon } from 'lucide-react';

const NutritionPlan: React.FC = () => {
  const { stage } = useParams<{ stage: string }>();

  const mealPlan = {
    breakfast: {
      title: 'Energizing Breakfast',
      time: '7:00 AM - 8:30 AM',
      items: [
        'Oatmeal with berries and nuts',
        'Greek yogurt',
        'Green tea or herbal tea'
      ],
      nutrients: ['Protein', 'Fiber', 'Antioxidants']
    },
    lunch: {
      title: 'Power Lunch',
      time: '12:30 PM - 1:30 PM',
      items: [
        'Quinoa bowl with grilled vegetables',
        'Lean protein (chicken/tofu)',
        'Avocado'
      ],
      nutrients: ['Complex Carbs', 'Lean Protein', 'Healthy Fats']
    },
    dinner: {
      title: 'Balanced Dinner',
      time: '6:30 PM - 7:30 PM',
      items: [
        'Grilled fish or legumes',
        'Steamed vegetables',
        'Brown rice'
      ],
      nutrients: ['Omega-3', 'Fiber', 'Minerals']
    },
    snacks: {
      title: 'Healthy Snacks',
      time: 'Between meals',
      items: [
        'Mixed nuts and seeds',
        'Fresh fruit',
        'Vegetable sticks with hummus'
      ],
      nutrients: ['Healthy Fats', 'Vitamins', 'Protein']
    }
  };

  const mealIcons = {
    breakfast: <Coffee className="h-6 w-6" />,
    lunch: <Salad className="h-6 w-6" />,
    dinner: <Moon className="h-6 w-6" />,
    snacks: <Apple className="h-6 w-6" />
  };

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 py-12">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text">
            Your Personalized Nutrition Plan
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Tailored nutrition recommendations for {stage?.replace('-', ' ')}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {Object.entries(mealPlan).map(([meal, details]) => (
            <Card key={meal} className="dark:bg-gray-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="text-pink-500">
                    {mealIcons[meal as keyof typeof mealIcons]}
                  </div>
                  <div>
                    <CardTitle className="dark:text-gray-100">{details.title}</CardTitle>
                    <CardDescription className="dark:text-gray-400">{details.time}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-2 dark:text-gray-200">Recommended Foods</h4>
                    <ul className="space-y-2">
                      {details.items.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 dark:text-gray-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-pink-500"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-2 dark:text-gray-200">Key Nutrients</h4>
                    <div className="flex flex-wrap gap-2">
                      {details.nutrients.map((nutrient, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-300 rounded-full text-xs"
                        >
                          {nutrient}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 dark:text-gray-100">
                  Want a more detailed plan?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Get a personalized nutrition consultation with our experts
                </p>
              </div>
              <Button className="gradient-pink text-white">
                Schedule Consultation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NutritionPlan; 