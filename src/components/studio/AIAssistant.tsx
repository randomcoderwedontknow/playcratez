import React, { useState } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Lightbulb, 
  Wand2,
  Play,
  Plus
} from 'lucide-react';

interface AIAssistantProps {
  gameType: 'mini' | 'full';
  platform: 'web' | 'mobile' | 'desktop';
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export default function AIAssistant({ gameType, platform }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: `Hi! I'm your AI Game Assistant. I see you want to create a ${gameType} game for ${platform}. What kind of game are you thinking about? I can help you with ideas, mechanics, and even generate game elements for you!`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestions = [
    "Create a platformer game with a jumping character",
    "Make a puzzle game with moving blocks",
    "Build a space shooter with enemies",
    "Design a racing game with obstacles"
  ];

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(message),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      "Great idea! I can help you create that. Let me generate some game elements and mechanics for you. Would you like me to start with the main character or the game environment?",
      "That sounds exciting! I'll create a basic game structure for you. I'm thinking we could add some interactive elements and smooth animations. Should I also suggest some sound effects?",
      "Perfect! I can see this working really well. Let me set up the core gameplay loop and add some engaging mechanics. Would you like me to make it more challenging or keep it simple?",
      "Excellent choice! I'll help you build this step by step. I can generate the sprites, set up the physics, and create the game logic. What should be the main goal for the player?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <div className="flex flex-1">
      {/* AI Chat Interface */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">AI Game Assistant</h3>
              <p className="text-sm text-gray-600">Powered by advanced AI - Premium Feature</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-3 max-w-3xl ${
                message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user' 
                    ? 'bg-blue-500' 
                    : 'bg-gradient-to-br from-purple-500 to-pink-500'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className={`p-4 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3 max-w-3xl">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-gray-100 p-4 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Suggestions */}
        {messages.length === 1 && (
          <div className="border-t border-gray-200 p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Ideas:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-sm text-purple-700 transition-colors"
                >
                  <Lightbulb className="w-4 h-4 inline mr-2" />
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
              placeholder="Describe your game idea or ask for help..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              onClick={() => handleSendMessage(inputMessage)}
              disabled={!inputMessage.trim() || isTyping}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* AI Generated Content Panel */}
      <div className="w-80 bg-gray-50 border-l border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">AI Generated</h3>
          <p className="text-sm text-gray-600">Elements created by AI</p>
        </div>

        <div className="flex-1 p-4 space-y-4">
          {/* Generated Game Elements */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center space-x-2 mb-3">
              <Wand2 className="w-5 h-5 text-purple-500" />
              <h4 className="font-medium text-gray-900">Game Elements</h4>
            </div>
            <div className="space-y-2">
              <div className="p-2 bg-purple-50 rounded text-sm text-purple-700">
                Main Character: Jumping Hero
              </div>
              <div className="p-2 bg-blue-50 rounded text-sm text-blue-700">
                Environment: Platform World
              </div>
              <div className="p-2 bg-green-50 rounded text-sm text-green-700">
                Collectible: Golden Coins
              </div>
            </div>
          </div>

          {/* AI Suggestions */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center space-x-2 mb-3">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <h4 className="font-medium text-gray-900">AI Suggestions</h4>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Add power-ups for extra abilities</p>
              <p>• Include moving platforms</p>
              <p>• Create checkpoint system</p>
              <p>• Add background music</p>
            </div>
          </div>

          {/* Game Preview */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3">Live Preview</h4>
            <div className="aspect-square bg-gray-900 rounded-lg flex items-center justify-center">
              <div className="text-center text-white">
                <Play className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-xs opacity-75">AI will generate preview</p>
              </div>
            </div>
          </div>
        </div>

        {/* Apply AI Changes */}
        <div className="border-t border-gray-200 p-4">
          <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105">
            Apply AI Changes
          </button>
        </div>
      </div>
    </div>
  );
}