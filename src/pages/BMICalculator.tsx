import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card';

interface BMITips {
    category: string;
    nutritionalTips: string[];
    menstrualHealth: string[];
    ageConsiderations: string[];
}

const BMICalculator: React.FC = () => {
    const [weight, setWeight] = useState<string>('');
    const [height, setHeight] = useState<string>('');
    const [bmi, setBMI] = useState<number | null>(null);
    const [error, setError] = useState<string>('');

    const bmiData: { [key: string]: BMITips } = {
        underweight: {
            category: 'Underweight (BMI < 18.5)',
            nutritionalTips: [
                'Increase Caloric Intake: Prioritize nutrient-dense foods like nuts, avocados, whole grains, and lean proteins.',
                'Protein & Healthy Fats: Essential for muscle growth and hormone production. Include salmon, eggs, olive oil, and seeds.',
                'Frequent Meals: Eat every 3-4 hours to avoid energy dips and maintain metabolic balance.',
                'Iron & B12: Prevent anemia-related fatigue by consuming leafy greens, lean meats, and fortified cereals.'
            ],
            menstrualHealth: [
                'Irregular or Missed Periods: Low body fat can disrupt ovulation; include omega-3s (flaxseeds, fatty fish) and complex carbs.',
                'Estrogen Balance: Increase healthy fats to support estrogen production.'
            ],
            ageConsiderations: [
                'Teens: Ensure adequate calcium (dairy, almonds) for bone growth.',
                '30s-40s: Focus on iron and folate for reproductive health.',
                '50s+: Risk of osteoporosis—boost vitamin D and calcium intake.'
            ]
        },
        normal: {
            category: 'Normal Weight (BMI 18.5 – 24.9)',
            nutritionalTips: [
                'Balanced Macronutrients: A mix of proteins, fats, and carbs to sustain metabolism and muscle tone.',
                'Fiber-Rich Diet: Whole grains, legumes, and vegetables for gut health and hormone regulation.',
                'Hydration: Supports skin health, digestion, and menstrual regularity.'
            ],
            menstrualHealth: [
                'Stable Hormones: Maintain steady blood sugar with complex carbs to prevent PMS symptoms.',
                'Magnesium & B6: Help reduce cramps and mood swings—found in bananas, nuts, and dark chocolate.'
            ],
            ageConsiderations: [
                'Teens & 20s: Maintain iron levels due to heavy periods.',
                '30s-40s: Prepare for perimenopause by including phytoestrogens.',
                '50s+: Focus on heart health with omega-3s and fiber.'
            ]
        },
        overweight: {
            category: 'Overweight (BMI 25 – 29.9)',
            nutritionalTips: [
                'Reduce Processed Foods: Minimize refined sugars and trans fats to balance hormones.',
                'Protein-Rich Diet: Lean meats, tofu, beans to support muscle maintenance.',
                'Portion Control: Avoid overeating by using smaller plates and mindful eating techniques.',
                'Increase Fiber: Helps digestion and blood sugar balance.'
            ],
            menstrualHealth: [
                'Heavy or Irregular Periods: Weight gain can lead to estrogen dominance; focus on anti-inflammatory foods.',
                'PCOS Risk: Reduce refined carbs and increase protein to stabilize insulin levels.'
            ],
            ageConsiderations: [
                'Teens & 20s: Prevent insulin resistance with balanced meals.',
                '30s-40s: Manage perimenopausal symptoms with healthy fats and fiber.',
                '50s+: Prioritize cardiovascular health with plant-based proteins and omega-3s.'
            ]
        },
        obese: {
            category: 'Obese (BMI 30 and above)',
            nutritionalTips: [
                'Reduce Sugar Intake: Avoid sugary drinks, white bread, and processed snacks.',
                'Lean Proteins & Veggies: Increase satiety with lean meats, lentils, and fiber-rich vegetables.',
                'Healthy Fats: Avocados, nuts, and olive oil instead of trans fats.',
                'Meal Timing: Avoid late-night eating to regulate metabolism.'
            ],
            menstrualHealth: [
                'Irregular & Heavy Periods: Excess fat can increase estrogen, causing prolonged cycles.',
                'Fertility Concerns: Weight loss of just 5-10% can improve ovulation and cycle regularity.'
            ],
            ageConsiderations: [
                'Teens & 20s: Encourage physical activity to maintain hormonal balance.',
                '30s-40s: Manage inflammation with an anti-inflammatory diet.',
                '50s+: Focus on heart health and joint-friendly foods.'
            ]
        }
    };

    const calculateBMI = (e: React.FormEvent) => {
        e.preventDefault();
        
        const weightNum = parseFloat(weight);
        const heightNum = parseFloat(height);

        if (isNaN(weightNum) || isNaN(heightNum) || weightNum <= 0 || heightNum <= 0) {
            setError('Please enter valid weight and height values');
            setBMI(null);
            return;
        }

        // BMI = weight(kg) / height(m)²
        const bmiValue = weightNum / (heightNum * heightNum);
        setBMI(parseFloat(bmiValue.toFixed(1)));
        setError('');
    };

    const getBMICategory = (bmiValue: number): string => {
        if (bmiValue < 18.5) return 'underweight';
        if (bmiValue < 25) return 'normal';
        if (bmiValue < 30) return 'overweight';
        return 'obese';
    };

    return (
        <div className=" bg-background dark:bg-gray-900 py-12">
            <div className="container px-4 max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 gradient-text">
                        BMI Calculator for Women's Health
                    </h1>
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                        Calculate your BMI and get personalized health insights
                    </p>
                </div>
                
                <Card className="mb-8 dark:bg-gray-800">
                    <CardContent className="p-6">
                        <form onSubmit={calculateBMI} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block mb-2 text-sm font-medium dark:text-gray-200">Weight (kg)</label>
                                    <input
                                        type="number"
                                        value={weight}
                                        onChange={(e) => setWeight(e.target.value)}
                                        className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                                        placeholder="Enter weight in kg"
                                        step="0.1"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium dark:text-gray-200">Height (m)</label>
                                    <input
                                        type="number"
                                        value={height}
                                        onChange={(e) => setHeight(e.target.value)}
                                        className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                                        placeholder="Enter height in meters"
                                        step="0.01"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full md:w-auto gradient-pink text-white px-6 py-3 rounded-lg font-medium"
                            >
                                Calculate BMI
                            </button>
                        </form>

                        {error && <p className="text-red-500 mt-4">{error}</p>}
                    </CardContent>
                </Card>

                {bmi !== null && (
                    <Card className="dark:bg-gray-800">
                        <CardHeader>
                            <CardTitle className="dark:text-gray-100">Your BMI: {bmi}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {(() => {
                                const category = getBMICategory(bmi);
                                const tips = bmiData[category];
                                return (
                                    <div className="space-y-6">
                                        <h3 className="text-xl font-semibold mb-4 dark:text-gray-100">{tips.category}</h3>
                                        
                                        <div className="space-y-6">
                                            <div>
                                                <h4 className="text-lg font-semibold mb-3 dark:text-gray-200">Nutritional Tips:</h4>
                                                <ul className="space-y-2">
                                                    {tips.nutritionalTips.map((tip, index) => (
                                                        <li key={index} className="flex items-start gap-2 dark:text-gray-300">
                                                            <span className="h-1.5 w-1.5 rounded-full bg-pink-500 mt-2"></span>
                                                            <span>{tip}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div>
                                                <h4 className="text-lg font-semibold mb-3 dark:text-gray-200">Menstrual Health:</h4>
                                                <ul className="space-y-2">
                                                    {tips.menstrualHealth.map((tip, index) => (
                                                        <li key={index} className="flex items-start gap-2 dark:text-gray-300">
                                                            <span className="h-1.5 w-1.5 rounded-full bg-pink-500 mt-2"></span>
                                                            <span>{tip}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div>
                                                <h4 className="text-lg font-semibold mb-3 dark:text-gray-200">Age Considerations:</h4>
                                                <ul className="space-y-2">
                                                    {tips.ageConsiderations.map((tip, index) => (
                                                        <li key={index} className="flex items-start gap-2 dark:text-gray-300">
                                                            <span className="h-1.5 w-1.5 rounded-full bg-pink-500 mt-2"></span>
                                                            <span>{tip}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })()}
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default BMICalculator; 