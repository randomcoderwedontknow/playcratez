import React, { useState } from 'react';
import { 
  Gamepad2, 
  Sparkles, 
  Code, 
  Globe, 
  Smartphone, 
  Monitor, 
  ArrowRight, 
  ArrowLeft,
  Zap,
  Blocks,
  Bot
} from 'lucide-react';
import { useUserProfile } from '../hooks/useUserProfile';

interface OnboardingWizardProps {
  isOpen: boolean;
  onComplete: (selections: OnboardingSelections) => void;
}

export interface OnboardingSelections {
  gameType: 'mini' | 'full';
  creationStyle: 'blocks' | 'ai' | 'code';
  platform: 'web' | 'mobile' | 'desktop';
}

export default function OnboardingWizard({ isOpen, onComplete }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selections, setSelections] = useState<Partial<OnboardingSelections>>({});
  const { completeOnboarding } = useUserProfile();

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    // Mark onboarding as completed in the database
    await completeOnboarding();
    
    // Pass selections to parent
    onComplete(selections as OnboardingSelections);
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateSelection = (key: keyof OnboardingSelections, value: any) => {
    setSelections(prev => ({ ...prev, [key]: value }));
  };

  const isStepComplete = () => {
    switch (currentStep) {
      case 1: return selections.gameType;
      case 2: return selections.creationStyle;
      case 3: return selections.platform;
      default: return false;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900/90 to-pink-900/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Let's Build Your First Game!
            </h2>
            <p className="text-gray-600">
              Tell us about your vision and we'll set up the perfect workspace
            </p>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step <= currentStep 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step < currentStep ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step Content */}
          <div className="min-h-[300px]">
            {currentStep === 1 && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                  What type of game do you want to create?
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    onClick={() => updateSelection('gameType', 'mini')}
                    className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                      selections.gameType === 'mini'
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold text-gray-900">Mini Game</h4>
                        <p className="text-sm text-gray-600">Quick & Fun</p>
                      </div>
                    </div>
                    <p className="text-gray-600">
                      Perfect for beginners! Create simple, engaging games like puzzles, 
                      arcade-style games, or quick challenges.
                    </p>
                  </button>

                  <button
                    onClick={() => updateSelection('gameType', 'full')}
                    className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                      selections.gameType === 'full'
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <Gamepad2 className="w-6 h-6 text-white" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg font-semibold text-gray-900">Full Game</h4>
                        <p className="text-sm text-gray-600">Rich & Immersive</p>
                      </div>
                    </div>
                    <p className="text-gray-600">
                      Build complex adventures with multiple levels, characters, 
                      storylines, and advanced game mechanics.
                    </p>
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                  How would you like to create your game?
                </h3>
                <div className="space-y-4">
                  <button
                    onClick={() => updateSelection('creationStyle', 'blocks')}
                    className={`w-full p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                      selections.creationStyle === 'blocks'
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                        <Blocks className="w-6 h-6 text-white" />
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="text-lg font-semibold text-gray-900">Block Builder (Drag & Drop)</h4>
                        <p className="text-gray-600">Perfect for beginners - visual, intuitive, no coding required</p>
                      </div>
                      <div className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                        Recommended
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => updateSelection('creationStyle', 'ai')}
                    className={`w-full p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                      selections.creationStyle === 'ai'
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Bot className="w-6 h-6 text-white" />
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="text-lg font-semibold text-gray-900">AI-Assisted Creation</h4>
                        <p className="text-gray-600">Let AI help guide your creation process with smart suggestions</p>
                      </div>
                      <div className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                        Premium
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => updateSelection('creationStyle', 'code')}
                    className={`w-full p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                      selections.creationStyle === 'code'
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                        <Code className="w-6 h-6 text-white" />
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="text-lg font-semibold text-gray-900">Code It Yourself</h4>
                        <p className="text-gray-600">Full control with scripting - for advanced users</p>
                      </div>
                      <div className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                        Advanced
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                  Which platform are you targeting?
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <button
                    onClick={() => updateSelection('platform', 'web')}
                    className={`p-6 rounded-xl border-2 transition-all duration-200 text-center ${
                      selections.platform === 'web'
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Web / Browser</h4>
                    <p className="text-gray-600 text-sm">
                      Play anywhere with just a web browser. Easy to share!
                    </p>
                  </button>

                  <button
                    onClick={() => updateSelection('platform', 'mobile')}
                    className={`p-6 rounded-xl border-2 transition-all duration-200 text-center ${
                      selections.platform === 'mobile'
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Mobile</h4>
                    <p className="text-gray-600 text-sm">
                      iOS & Android apps with touch controls
                    </p>
                  </button>

                  <button
                    onClick={() => updateSelection('platform', 'desktop')}
                    className={`p-6 rounded-xl border-2 transition-all duration-200 text-center ${
                      selections.platform === 'desktop'
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Monitor className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Desktop</h4>
                    <p className="text-gray-600 text-sm">
                      Windows & Mac applications with full features
                    </p>
                  </button>
                </div>
                <p className="text-center text-sm text-gray-500 mt-4">
                  Don't worry - you can change this later or export to multiple platforms!
                </p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>

            <div className="text-sm text-gray-500">
              Step {currentStep} of 3
            </div>

            <button
              onClick={handleNext}
              disabled={!isStepComplete()}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
            >
              {currentStep === 3 ? 'Start Creating!' : 'Next'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}