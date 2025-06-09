import React, { useState, useEffect } from 'react';
import { OnboardingSelections } from './OnboardingWizard';
import BlockBuilder from './studio/BlockBuilder';
import AIAssistant from './studio/AIAssistant';
import CodeEditor from './studio/CodeEditor';
import { useGames } from '../hooks/useGames';
import { useUserProfile } from '../hooks/useUserProfile';
import { 
  Save, 
  Play, 
  Settings, 
  Home, 
  Crown, 
  AlertCircle,
  Blocks,
  Bot,
  Code,
  Clock,
  Loader2
} from 'lucide-react';

interface GameStudioProps {
  selections: OnboardingSelections;
  onExit: () => void;
}

export default function GameStudio({ selections, onExit }: GameStudioProps) {
  const [currentMode, setCurrentMode] = useState(selections.creationStyle);
  const [gameTitle, setGameTitle] = useState('My Awesome Game');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [currentGame, setCurrentGame] = useState<any>(null);
  
  const { createGame, updateGame } = useGames();
  const { profile, isTrialActive, getTrialDaysRemaining } = useUserProfile();

  useEffect(() => {
    // Create initial game when studio loads
    initializeGame();
  }, []);

  const initializeGame = async () => {
    const { data } = await createGame({
      title: gameTitle,
      game_type: selections.gameType,
      creation_style: selections.creationStyle,
      target_platform: selections.platform,
      game_data: {
        blocks: [],
        assets: [],
        settings: {}
      }
    });
    
    if (data) {
      setCurrentGame(data);
    }
  };

  const handleSave = async () => {
    if (!currentGame) return;
    
    setIsSaving(true);
    try {
      await updateGame(currentGame.id, {
        title: gameTitle,
        updated_at: new Date().toISOString()
      });
    } catch (error) {
      console.error('Failed to save game:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const renderStudioContent = () => {
    switch (currentMode) {
      case 'blocks':
        return <BlockBuilder gameType={selections.gameType} platform={selections.platform} />;
      case 'ai':
        return <AIAssistant gameType={selections.gameType} platform={selections.platform} />;
      case 'code':
        return <CodeEditor gameType={selections.gameType} platform={selections.platform} />;
      default:
        return <BlockBuilder gameType={selections.gameType} platform={selections.platform} />;
    }
  };

  const trialDaysRemaining = getTrialDaysRemaining();
  const isTrialActiveNow = isTrialActive();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onExit}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              Exit Studio
            </button>
            
            <div className="h-6 w-px bg-gray-300" />
            
            <input
              type="text"
              value={gameTitle}
              onChange={(e) => setGameTitle(e.target.value)}
              className="text-lg font-semibold text-gray-900 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-2 py-1"
            />

            {/* Trial Status */}
            {isTrialActiveNow && (
              <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">
                  {trialDaysRemaining} days left in trial
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {/* Mode Switcher */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setCurrentMode('blocks')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentMode === 'blocks'
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Blocks className="w-4 h-4 mr-2" />
                Blocks
              </button>
              <button
                onClick={() => setCurrentMode('ai')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentMode === 'ai'
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Bot className="w-4 h-4 mr-2" />
                AI
                <Crown className="w-3 h-3 ml-1 text-yellow-500" />
              </button>
              <button
                onClick={() => setCurrentMode('code')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentMode === 'code'
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Code className="w-4 h-4 mr-2" />
                Code
              </button>
            </div>

            <div className="h-6 w-px bg-gray-300" />

            {/* Action Buttons */}
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Save className="w-5 h-5 mr-2" />
              )}
              {isSaving ? 'Saving...' : 'Save'}
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isPlaying
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              <Play className="w-5 h-5 mr-2" />
              {isPlaying ? 'Stop' : 'Play'}
            </button>

            <button className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Trial Restriction Banner */}
        {isTrialActiveNow && (
          <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-yellow-800">
                  Free Trial: You can create and play your games, but publishing is disabled until you subscribe.
                </p>
              </div>
            </div>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200">
              Upgrade to Publish
            </button>
          </div>
        )}
      </nav>

      {/* Studio Content */}
      <div className="flex-1 flex">
        {renderStudioContent()}
      </div>
    </div>
  );
}