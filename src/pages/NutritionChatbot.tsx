import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot } from 'lucide-react';

// Define types
type LifeStage = 'teen' | 'adult' | 'menopause' | '';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

interface NutritionData {
  [key: string]: string[];
}

const NutritionChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "Hi there! I'm your nutrition assistant. I can provide tips specific to your life stage (teen, adult, or menopause). How can I help you today?", 
      sender: "bot" 
    }
  ]);
  const [input, setInput] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [lifeStage, setLifeStage] = useState<LifeStage>('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const nutritionData: NutritionData = {
    teen: [
      "Calcium is crucial during adolescence for bone development. Aim for 1,300mg daily from dairy, fortified plant milks, or leafy greens.",
      "Iron needs increase during teen years, especially once menstruation begins. Include lean meats, beans, and leafy greens in your diet.",
      "Vitamin D supports calcium absorption. Consider getting 15 minutes of sun exposure or consuming fortified foods.",
      "Limit processed foods and focus on whole foods for stable energy and mood throughout the day.",
      "Regular meals and snacks help support growth spurts and prevent energy crashes during this high-growth phase."
    ],
    adult: [
      "During your period, iron-rich foods like lean meats, beans, and dark leafy greens can help replace lost iron.",
      "Magnesium-rich foods (dark chocolate, nuts, seeds) may help reduce menstrual cramps and PMS symptoms.",
      "B vitamins from whole grains and proteins support energy production during times of fatigue.",
      "Omega-3 fatty acids from fatty fish, flaxseeds, and walnuts may help reduce inflammation and period pain.",
      "A balanced diet with adequate protein (0.8g per kg body weight) supports muscle maintenance and hormone production."
    ],
    menopause: [
      "Phytoestrogens from soy foods, flaxseeds, and sesame seeds may help manage hormonal fluctuations.",
      "Calcium and vitamin D become increasingly important as bone density risks increase. Aim for 1200mg calcium daily.",
      "Heart-healthy foods like fatty fish, olive oil, nuts, and plenty of fruits and vegetables should be dietary priorities.",
      "Protein needs increase to help preserve muscle mass. Aim for 1.0-1.2g per kg of body weight daily.",
      "Staying well-hydrated supports skin elasticity and overall health as natural estrogen declines."
    ],
    general: [
      "Stay hydrated! Aim for at least 8 glasses of water daily.",
      "Include protein with every meal to support hormone production and stable energy.",
      "Eat a rainbow of fruits and vegetables to ensure a wide range of nutrients.",
      "Limit processed foods and added sugars which can contribute to inflammation.",
      "Healthy fats from avocados, nuts, seeds, and olive oil support hormone production."
    ]
  };

  const detectLifeStage = (text: string): LifeStage => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes('teen') || lowerText.includes('adolesc') || lowerText.includes('young')) {
      return 'teen';
    } else if (lowerText.includes('menopause') || lowerText.includes('climacteric') || lowerText.includes('50s') || lowerText.includes('hot flash')) {
      return 'menopause';
    } else if (lowerText.includes('period') || lowerText.includes('cycle') || lowerText.includes('pms') || lowerText.includes('20s') || lowerText.includes('30s') || lowerText.includes('adult')) {
      return 'adult';
    }
    return '';
  };

  const getResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    let detectedStage = detectLifeStage(lowerInput);
    
    if (detectedStage) {
      setLifeStage(detectedStage);
    }
    
    const activeStage = detectedStage || lifeStage || 'general';
    
    // Specific nutrition questions
    if (lowerInput.includes('iron') || lowerInput.includes('anemia')) {
      return "Iron is essential for women, especially during menstruation. Good sources include lean red meat, beans, lentils, tofu, and fortified cereals. Pairing with vitamin C foods improves absorption. Consider supplements if your levels are low, but consult with a healthcare provider first.";
    } else if (lowerInput.includes('calcium') || lowerInput.includes('bone')) {
      return "Calcium is crucial for bone health throughout a woman's life. Aim for 1000-1200mg daily from dairy, fortified plant milks, tofu, sardines, and leafy greens. Vitamin D helps with absorption, so consider some sun exposure or supplements, especially during winter.";
    } else if (lowerInput.includes('energy') || lowerInput.includes('fatigue') || lowerInput.includes('tired')) {
      return "Low energy can be common during different life stages. Focus on iron-rich foods, B-vitamins from whole grains, adequate protein, and staying hydrated. Regular meal timing helps maintain stable blood sugar. If fatigue persists, consider checking for iron, B12, or thyroid issues with your healthcare provider.";
    } else if (lowerInput.includes('pms') || lowerInput.includes('cramps') || lowerInput.includes('pain')) {
      return "For PMS and menstrual discomfort, increase magnesium from dark chocolate, nuts, and seeds. Reduce salt, caffeine, and alcohol. Anti-inflammatory foods like fatty fish, turmeric, and berries may help. Some women find relief from evening primrose oil or chasteberry supplements, but research is mixed.";
    }
    
    // General conversation responses
    if (lowerInput.includes('hello') || lowerInput.includes('hi ') || lowerInput === 'hi') {
      return "Hello! I'm your nutrition assistant. Would you like tips specific to a certain life stage? (teen, adult, or menopause)";
    } else if (lowerInput.includes('thank')) {
      return "You're welcome! Is there anything else you'd like to know about nutrition?";
    } else if (lowerInput.includes('bye') || lowerInput.includes('goodbye')) {
      return "Take care! Remember that nutrition is a journey, not a destination. Small, consistent changes make the biggest difference.";
    }
    
    // Return random tip from appropriate life stage
    const tips = nutritionData[activeStage];
    return tips[Math.floor(Math.random() * tips.length)];
  };

  const handleSend = (): void => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = { id: Date.now(), text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    
    // Wait briefly for "typing" effect
    setTimeout(() => {
      const botResponse: Message = { id: Date.now() + 1, text: getResponse(input), sender: "bot" };
      setMessages(prev => [...prev, botResponse]);
    }, 500);
    
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleLifeStageSelect = (stage: LifeStage): void => {
    setLifeStage(stage);
    setMessages([
      ...messages, 
      { id: Date.now(), text: `I'm interested in nutrition for ${stage}s`, sender: "user" },
      { id: Date.now() + 1, text: `Great! Here's a nutrition tip for ${stage}s: ${nutritionData[stage][0]}`, sender: "bot" }
    ]);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700"
        >
          <Bot size={24} />
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-lg w-80 md:w-96 flex flex-col" style={{ height: '500px' }}>
          {/* Header */}
          <div className="bg-purple-600 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-medium">Nutrition Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="text-white">
              ✕
            </button>
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 p-3 overflow-y-auto">
            {messages.map(message => (
              <div 
                key={message.id}
                className={`mb-3 ${message.sender === 'user' ? 'text-right' : ''}`}
              >
                <div 
                  className={`inline-block p-3 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-purple-600 text-white rounded-tr-none' 
                      : 'bg-gray-200 text-gray-800 rounded-tl-none'
                  }`}
                >
                  <div className="flex items-start">
                    {message.sender === 'bot' && <Bot size={16} className="mr-1 mt-1" />}
                    <span>{message.text}</span>
                    {message.sender === 'user' && <User size={16} className="ml-1 mt-1" />}
                  </div>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          
          {/* Quick selection buttons */}
          {lifeStage === '' && (
            <div className="px-3 pb-2">
              <p className="text-xs text-gray-500 mb-1">Select your life stage:</p>
              <div className="flex gap-1">
                {['teen', 'adult', 'menopause'].map((stage) => (
                  <button
                    key={stage}
                    onClick={() => handleLifeStageSelect(stage as LifeStage)}
                    className="text-xs bg-purple-100 text-purple-800 px-3 py-1 rounded-full"
                  >
                    {stage.charAt(0).toUpperCase() + stage.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Input area */}
          <div className="border-t p-3 flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about nutrition..."
              className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:border-purple-400"
            />
            <button 
              onClick={handleSend}
              className="bg-purple-600 text-white p-2 rounded-r-lg"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionChatbot; 