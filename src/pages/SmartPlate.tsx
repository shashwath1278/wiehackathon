import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/Card';
import { Button } from '../components/Button';
import { Upload, X, Camera, Utensils, ChevronRight, Image, ChevronDown } from 'lucide-react';

const SmartPlate: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    setIsDropdownOpen(false);
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Here you would typically handle the camera stream
      // For now, we'll just close the dropdown
      setIsDropdownOpen(false);
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Unable to access camera. Please make sure you have granted camera permissions.');
    }
  };

  // Mock nutrition data
  const nutrition = {
    calories: 450,
    protein: 25,
    carbs: 45,
    fats: 20,
    vitamins: ['Vitamin A', 'Vitamin C', 'Iron'],
    suggestions: [
      'Add more leafy greens for iron',
      'Consider adding lean protein',
      'Include whole grains for fiber'
    ]
  };

  return (
    <div className=" bg-background dark:bg-gray-900 py-12">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text">
            Smart Plate Scanner
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Upload a photo of your meal for instant nutrition insights
          </p>
        </div>

        {/* Image Upload Section */}
        <Card className="mb-8 dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center">
              {selectedImage ? (
                <div className="relative">
                  <img
                    src={selectedImage}
                    alt="Uploaded meal"
                    className="max-w-full h-auto rounded-lg max-h-[400px]"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute top-2 right-2 dark:bg-gray-700 dark:text-gray-200"
                    onClick={() => setSelectedImage(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="mb-4">
                    <Camera className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500" />
                  </div>
                  <div className="relative" ref={dropdownRef}>
                    <Button
                      className="gradient-pink text-white"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Add Image
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                    
                    {isDropdownOpen && (
                      <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                        <div className="py-1" role="menu">
                          <button
                            className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            <Image className="h-4 w-4 mr-2" />
                            Choose from gallery
                          </button>
                          <button
                            className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                            onClick={handleCameraCapture}
                          >
                            <Camera className="h-4 w-4 mr-2" />
                            Take photo
                          </button>
                        </div>
                      </div>
                    )}
                    
                    <input
                      ref={fileInputRef}
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Supported formats: JPG, PNG
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Nutrition Analysis */}
        {selectedImage && (
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-gray-100">Nutritional Breakdown</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Estimated values based on image analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Calories</span>
                    <span className="font-semibold dark:text-gray-200">{nutrition.calories} kcal</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Protein</span>
                    <span className="font-semibold dark:text-gray-200">{nutrition.protein}g</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Carbs</span>
                    <span className="font-semibold dark:text-gray-200">{nutrition.carbs}g</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Fats</span>
                    <span className="font-semibold dark:text-gray-200">{nutrition.fats}g</span>
                  </div>
                  <div className="pt-4">
                    <h4 className="text-sm font-semibold mb-2 dark:text-gray-200">Vitamins & Minerals</h4>
                    <div className="flex flex-wrap gap-2">
                      {nutrition.vitamins.map((vitamin, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-300 rounded-full text-xs"
                        >
                          {vitamin}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-gray-100">Suggestions for Improvement</CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Tips to enhance your meal's nutritional value
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {nutrition.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <ChevronRight className="h-5 w-5 text-pink-500 shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-300">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}

      </div>
    </div>
  );
};

export default SmartPlate; 