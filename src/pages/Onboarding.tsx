import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';
import { Button } from '../components/Button';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface UserData {
  age: string;
  height: string;
  weight: string;
  activityLevel: string;
  allergies: string[];
  dietaryPreferences: string[];
  healthConditions: string[];
  region: string;
}

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState<UserData>({
    age: '',
    height: '',
    weight: '',
    activityLevel: '',
    allergies: [],
    dietaryPreferences: [],
    healthConditions: [],
    region: ''
  });

  const activityLevels = [
    { id: 'sedentary', label: 'Sedentary (little or no exercise)' },
    { id: 'light', label: 'Lightly active (light exercise 1-3 days/week)' },
    { id: 'moderate', label: 'Moderately active (moderate exercise 3-5 days/week)' },
    { id: 'very', label: 'Very active (hard exercise 6-7 days/week)' },
    { id: 'super', label: 'Super active (very hard exercise & physical job)' }
  ];

  const commonAllergies = [
    'Dairy', 'Eggs', 'Peanuts', 'Tree Nuts', 'Soy',
    'Wheat', 'Fish', 'Shellfish', 'None'
  ];

  const dietaryPreferencesList = [
    'Vegetarian', 'Vegan', 'Pescatarian', 'Keto',
    'Paleo', 'Gluten-Free', 'Low-Carb', 'Mediterranean',
    'No Specific Diet'
  ];

  const commonHealthConditions = [
    'Diabetes', 'Hypertension', 'Heart Disease',
    'Celiac Disease', 'IBS', 'PCOS',
    'Thyroid Issues', 'None'
  ];

  const regions = [
    'North America', 'South America', 'Europe',
    'Asia', 'Africa', 'Australia', 'Middle East'
  ];

  const handleInputChange = (field: keyof UserData, value: any) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayToggle = (field: keyof Pick<UserData, 'allergies' | 'dietaryPreferences' | 'healthConditions'>, value: string) => {
    setUserData(prev => ({
      ...prev,
      [field]: Array.isArray(prev[field]) 
        ? prev[field].includes(value)
          ? (prev[field] as string[]).filter((item: string) => item !== value)
          : [...(prev[field] as string[]), value]
        : [value]
    }));
  };

  const handleSubmit = () => {
    // Save data to localStorage
    localStorage.setItem('onboardingData', JSON.stringify(userData));
    // Here you would typically save to your backend
    console.log('Submitting user data:', userData);
    navigate('/profile');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Age</label>
              <input
                type="number"
                value={userData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                placeholder="Enter your age"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Height (cm)</label>
              <input
                type="number"
                value={userData.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                placeholder="Enter your height in centimeters"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Weight (kg)</label>
              <input
                type="number"
                value={userData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                placeholder="Enter your weight in kilograms"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">Activity Level</label>
            <div className="space-y-2">
              {activityLevels.map((level) => (
                <div
                  key={level.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    userData.activityLevel === level.id
                      ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20'
                      : 'border-gray-200 hover:border-pink-500 dark:border-gray-700 dark:hover:border-pink-500'
                  }`}
                  onClick={() => handleInputChange('activityLevel', level.id)}
                >
                  <p className="dark:text-gray-300">{level.label}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300">Food Allergies</label>
              <div className="flex flex-wrap gap-2">
                {commonAllergies.map((allergy) => (
                  <button
                    key={allergy}
                    onClick={() => handleArrayToggle('allergies', allergy)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      userData.allergies.includes(allergy)
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {allergy}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300">Dietary Preferences</label>
              <div className="flex flex-wrap gap-2">
                {dietaryPreferencesList.map((diet) => (
                  <button
                    key={diet}
                    onClick={() => handleArrayToggle('dietaryPreferences', diet)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      userData.dietaryPreferences.includes(diet)
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {diet}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300">Health Conditions</label>
              <div className="flex flex-wrap gap-2">
                {commonHealthConditions.map((condition) => (
                  <button
                    key={condition}
                    onClick={() => handleArrayToggle('healthConditions', condition)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      userData.healthConditions.includes(condition)
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {condition}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300">Geographic Region</label>
              <div className="grid grid-cols-2 gap-2">
                {regions.map((region) => (
                  <button
                    key={region}
                    onClick={() => handleInputChange('region', region)}
                    className={`p-2 rounded text-sm ${
                      userData.region === region
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 py-12">
      <div className="container px-4 mx-auto max-w-2xl">
        <Card className="dark:bg-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl text-center dark:text-gray-100">
                {step === 1 && "Let's Get Started"}
                {step === 2 && 'Your Activity Level'}
                {step === 3 && 'Dietary Information'}
                {step === 4 && 'Health & Location'}
              </CardTitle>
              <Button
                variant="ghost"
                onClick={() => navigate('/profile')}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Skip
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-8">
              <div className="flex justify-center mb-4">
                {[1, 2, 3, 4].map((stepNumber) => (
                  <div
                    key={stepNumber}
                    className={`w-3 h-3 rounded-full mx-1 ${
                      stepNumber === step
                        ? 'bg-pink-500'
                        : stepNumber < step
                        ? 'bg-pink-300'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              {renderStep()}
            </div>
            <div className="flex justify-between">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="dark:bg-gray-700 dark:text-gray-300"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              <div className="ml-auto">
                {step < 4 ? (
                  <Button
                    onClick={() => setStep(step + 1)}
                    className="gradient-pink text-white"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="gradient-pink text-white"
                  >
                    Complete Profile
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding; 