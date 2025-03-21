import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/Card';
import { Button } from '../components/Button';
import { User, Edit2, Save, LineChart, Target, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface HealthData {
  bmi: number;
  weight: string | number;
  height: string | number;
  allergies: string[];
  preferences: string[];
  cycleLength: number;
  lastPeriodDate: string;
  activityLevel: string;
  age: string | number;
}

interface Goals {
  daily: string[];
  weekly: string[];
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  const [healthData, setHealthData] = useState<HealthData>({
    bmi: 0,
    weight: '',
    height: '',
    age: '',
    allergies: [],
    preferences: [],
    cycleLength: 28,
    lastPeriodDate: '2024-03-01',
    activityLevel: ''
  });

  const [goals, setGoals] = useState<Goals>({
    daily: [
      'Drink 8 glasses of water',
      'Exercise for 30 minutes',
      'Eat 5 servings of vegetables'
    ],
    weekly: [
      'Meal prep for the week',
      'Try one new healthy recipe',
      'Complete 3 workout sessions'
    ]
  });

  const [weightHistory] = useState([
    { date: '2024-03-01', weight: 66 },
    { date: '2024-03-08', weight: 65.5 },
    { date: '2024-03-15', weight: 65 },
    { date: '2024-03-22', weight: 65 }
  ]);

  useEffect(() => {
    // Load onboarding data from localStorage
    const onboardingData = localStorage.getItem('onboardingData');
    if (onboardingData) {
      const parsedData = JSON.parse(onboardingData);
      const bmiValue = calculateBMI(parsedData.height, parsedData.weight);
      setHealthData(prev => ({
        ...prev,
        weight: parsedData.weight,
        height: parsedData.height,
        age: parsedData.age,
        allergies: parsedData.allergies || [],
        preferences: parsedData.dietaryPreferences || [],
        activityLevel: parsedData.activityLevel || '',
        bmi: bmiValue
      }));
    }
  }, []);

  const calculateBMI = (height: string | number, weight: string | number): number => {
    const h = Number(height) / 100; // convert cm to m
    const w = Number(weight);
    if (h > 0 && w > 0) {
      return Number((w / (h * h)).toFixed(1));
    }
    return 0;
  };

  const handleHealthDataChange = (field: keyof HealthData, value: any) => {
    setHealthData(prev => ({ ...prev, [field]: value }));
  };

  const handleGoalChange = (type: 'daily' | 'weekly', index: number, value: string) => {
    setGoals(prev => ({
      ...prev,
      [type]: prev[type].map((goal, i) => i === index ? value : goal)
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log('Saving updated data:', { healthData, goals });
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#9CA3AF',
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#9CA3AF',
        },
      },
    },
  };

  const chartData = {
    labels: weightHistory.map(entry => entry.date),
    datasets: [
      {
        label: 'Weight (kg)',
        data: weightHistory.map(entry => entry.weight),
        borderColor: '#EC4899',
        backgroundColor: '#EC4899',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 py-12">
      <div className="container px-4 mx-auto">
        {/* Profile Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="h-16 w-16 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold dark:text-gray-100">{user?.name}</h1>
              <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
            </div>
          </div>
          <Button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="gradient-pink text-white"
          >
            {isEditing ? (
              <><Save className="w-4 h-4 mr-2" /> Save Changes</>
            ) : (
              <><Edit2 className="w-4 h-4 mr-2" /> Edit Profile</>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Activity Level Card */}
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-pink-500" />
                <CardTitle className="dark:text-gray-100">Activity Level</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="dark:text-gray-300">Current Activity Level</span>
                  {isEditing ? (
                    <select
                      value={healthData.activityLevel}
                      onChange={(e) => handleHealthDataChange('activityLevel', e.target.value)}
                      className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    >
                      <option value="sedentary">Sedentary</option>
                      <option value="light">Lightly Active</option>
                      <option value="moderate">Moderately Active</option>
                      <option value="very">Very Active</option>
                      <option value="super">Super Active</option>
                    </select>
                  ) : (
                    <span className="dark:text-gray-300 capitalize">{healthData.activityLevel.replace('_', ' ')}</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weight Tracker */}
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <LineChart className="w-5 h-5 text-pink-500" />
                  <CardTitle className="dark:text-gray-100">Weight Tracker</CardTitle>
                </div>
                <span className="text-2xl font-bold text-pink-500">{healthData.weight} kg</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isEditing ? (
                  <div className="flex items-center space-x-2">
                    <label className="text-sm dark:text-gray-300">Current Weight (kg):</label>
                    <input
                      type="number"
                      value={healthData.weight}
                      onChange={(e) => handleHealthDataChange('weight', e.target.value)}
                      className="w-20 p-1 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                    />
                  </div>
                ) : (
                  <>
                    <div className="h-64 w-full">
                      <Line options={chartOptions} data={chartData} />
                    </div>
                    <div className="space-y-2">
                      {weightHistory.map((entry, index) => (
                        <div key={index} className="flex justify-between text-sm dark:text-gray-300">
                          <span>{entry.date}</span>
                          <span>{entry.weight} kg</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Goals */}
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-pink-500" />
                <CardTitle className="dark:text-gray-100">Goals</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 dark:text-gray-200">Daily Goals</h3>
                  <ul className="space-y-2">
                    {goals.daily.map((goal, index) => (
                      <li key={index}>
                        {isEditing ? (
                          <input
                            type="text"
                            value={goal}
                            onChange={(e) => handleGoalChange('daily', index, e.target.value)}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                          />
                        ) : (
                          <div className="flex items-center space-x-2 dark:text-gray-300">
                            <span className="h-2 w-2 rounded-full bg-pink-500"></span>
                            <span>{goal}</span>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 dark:text-gray-200">Weekly Goals</h3>
                  <ul className="space-y-2">
                    {goals.weekly.map((goal, index) => (
                      <li key={index}>
                        {isEditing ? (
                          <input
                            type="text"
                            value={goal}
                            onChange={(e) => handleGoalChange('weekly', index, e.target.value)}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                          />
                        ) : (
                          <div className="flex items-center space-x-2 dark:text-gray-300">
                            <span className="h-2 w-2 rounded-full bg-pink-500"></span>
                            <span>{goal}</span>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Health Data */}
          <Card className="md:col-span-2 dark:bg-gray-800">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-pink-500" />
                <CardTitle className="dark:text-gray-100">Health Data</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2 dark:text-gray-200">Body Metrics</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="dark:text-gray-300">Age</span>
                        {isEditing ? (
                          <input
                            type="number"
                            value={healthData.age}
                            onChange={(e) => handleHealthDataChange('age', e.target.value)}
                            className="w-20 p-1 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                          />
                        ) : (
                          <span className="dark:text-gray-300">{healthData.age}</span>
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="dark:text-gray-300">BMI</span>
                        {isEditing ? (
                          <input
                            type="number"
                            value={healthData.bmi}
                            onChange={(e) => handleHealthDataChange('bmi', parseFloat(e.target.value))}
                            className="w-20 p-1 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                          />
                        ) : (
                          <span className="dark:text-gray-300">{healthData.bmi}</span>
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="dark:text-gray-300">Height (cm)</span>
                        {isEditing ? (
                          <input
                            type="number"
                            value={healthData.height}
                            onChange={(e) => handleHealthDataChange('height', e.target.value)}
                            className="w-20 p-1 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                          />
                        ) : (
                          <span className="dark:text-gray-300">{healthData.height}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 dark:text-gray-200">Cycle Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="dark:text-gray-300">Cycle Length (days)</span>
                        {isEditing ? (
                          <input
                            type="number"
                            value={healthData.cycleLength}
                            onChange={(e) => handleHealthDataChange('cycleLength', parseInt(e.target.value))}
                            className="w-20 p-1 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                          />
                        ) : (
                          <span className="dark:text-gray-300">{healthData.cycleLength}</span>
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="dark:text-gray-300">Last Period Date</span>
                        {isEditing ? (
                          <input
                            type="date"
                            value={healthData.lastPeriodDate}
                            onChange={(e) => handleHealthDataChange('lastPeriodDate', e.target.value)}
                            className="p-1 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                          />
                        ) : (
                          <span className="dark:text-gray-300">{healthData.lastPeriodDate}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2 dark:text-gray-200">Allergies</h3>
                    {isEditing ? (
                      <div className="space-y-2">
                        {healthData.allergies.map((allergy, index) => (
                          <input
                            key={index}
                            type="text"
                            value={allergy}
                            onChange={(e) => {
                              const newAllergies = [...healthData.allergies];
                              newAllergies[index] = e.target.value;
                              handleHealthDataChange('allergies', newAllergies);
                            }}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {healthData.allergies.map((allergy, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-300 rounded-full text-sm"
                          >
                            {allergy}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 dark:text-gray-200">Dietary Preferences</h3>
                    {isEditing ? (
                      <div className="space-y-2">
                        {healthData.preferences.map((preference, index) => (
                          <input
                            key={index}
                            type="text"
                            value={preference}
                            onChange={(e) => {
                              const newPreferences = [...healthData.preferences];
                              newPreferences[index] = e.target.value;
                              handleHealthDataChange('preferences', newPreferences);
                            }}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {healthData.preferences.map((preference, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-300 rounded-full text-sm"
                          >
                            {preference}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile; 