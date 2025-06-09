import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useUserProfile } from '../hooks/useUserProfile';
import { useGames } from '../hooks/useGames';
import { 
  Plus, 
  Play, 
  Edit3, 
  Trash2, 
  Clock, 
  Globe, 
  Smartphone, 
  Monitor,
  Crown,
  Calendar,
  Trophy,
  Users
} from 'lucide-react';

interface DashboardProps {
  onCreateGame: () => void;
  onEditGame: (gameId: string) => void;
}

export default function Dashboard({ onCreateGame, onEditGame }: DashboardProps) {
  const { user, signOut } = useAuth();
  const { profile, isTrialActive, getTrialDaysRemaining } = useUserProfile();
  const { games, loading, deleteGame } = useGames();

  const trialDaysRemaining = getTrialDaysRemaining();
  const isTrialActiveNow = isTrialActive();

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'web': return <Globe className="w-4 h-4" />;
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      case 'desktop': return <Monitor className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {profile?.username || user?.email?.split('@')[0]}!
              </h1>
              <p className="text-gray-600">Ready to create something amazing?</p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Trial Status */}
              {isTrialActiveNow && (
                <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">
                    {trialDaysRemaining} days left in trial
                  </span>
                </div>
              )}
              
              <button
                onClick={() => signOut()}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Games Created</p>
                <p className="text-2xl font-bold text-gray-900">{games.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Play className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-gray-900">
                  {games.filter(game => game.is_published).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Member Since</p>
                <p className="text-lg font-bold text-gray-900">
                  {profile?.created_at ? formatDate(profile.created_at) : 'Today'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Community Rank</p>
                <p className="text-lg font-bold text-gray-900">Beginner</p>
              </div>
            </div>
          </div>
        </div>

        {/* Create New Game */}
        <div className="mb-8">
          <button
            onClick={onCreateGame}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex items-center justify-center">
              <Plus className="w-8 h-8 mr-4" />
              <div className="text-left">
                <h3 className="text-xl font-bold">Create New Game</h3>
                <p className="text-purple-100">Start building your next masterpiece</p>
              </div>
            </div>
          </button>
        </div>

        {/* Recent Games */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Your Games</h2>
            {games.length > 0 && (
              <button className="text-purple-600 hover:text-purple-700 font-medium">
                View All
              </button>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          ) : games.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No games yet</h3>
              <p className="text-gray-600 mb-6">Create your first game to get started!</p>
              <button
                onClick={onCreateGame}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
              >
                Create Your First Game
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map((game) => (
                <div key={game.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{game.title}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        {getPlatformIcon(game.target_platform)}
                        <span className="capitalize">{game.target_platform}</span>
                        <span>•</span>
                        <span className="capitalize">{game.game_type}</span>
                      </div>
                    </div>
                    
                    {game.creation_style === 'ai' && (
                      <Crown className="w-5 h-5 text-yellow-500" />
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    Last updated {formatDate(game.updated_at)}
                  </p>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onEditGame(game.id)}
                      className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit
                    </button>
                    
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Play className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => deleteGame(game.id)}
                      className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}