import React, { useState } from 'react';
import { 
  Play, 
  Square, 
  Circle, 
  Triangle, 
  Move, 
  RotateCw, 
  Volume2, 
  Zap,
  Plus,
  Trash2,
  Copy
} from 'lucide-react';

interface BlockBuilderProps {
  gameType: 'mini' | 'full';
  platform: 'web' | 'mobile' | 'desktop';
}

export default function BlockBuilder({ gameType, platform }: BlockBuilderProps) {
  const [selectedCategory, setSelectedCategory] = useState('motion');
  const [draggedBlock, setDraggedBlock] = useState<string | null>(null);

  const blockCategories = {
    motion: {
      name: 'Motion',
      color: 'bg-blue-500',
      blocks: [
        { id: 'move-right', name: 'Move Right', icon: <Move className="w-4 h-4" /> },
        { id: 'move-left', name: 'Move Left', icon: <Move className="w-4 h-4 rotate-180" /> },
        { id: 'jump', name: 'Jump', icon: <Triangle className="w-4 h-4" /> },
        { id: 'rotate', name: 'Rotate', icon: <RotateCw className="w-4 h-4" /> },
      ]
    },
    events: {
      name: 'Events',
      color: 'bg-yellow-500',
      blocks: [
        { id: 'on-start', name: 'When Game Starts', icon: <Play className="w-4 h-4" /> },
        { id: 'on-click', name: 'When Clicked', icon: <Circle className="w-4 h-4" /> },
        { id: 'on-collision', name: 'When Touching', icon: <Zap className="w-4 h-4" /> },
      ]
    },
    sound: {
      name: 'Sound',
      color: 'bg-purple-500',
      blocks: [
        { id: 'play-sound', name: 'Play Sound', icon: <Volume2 className="w-4 h-4" /> },
        { id: 'stop-sound', name: 'Stop Sound', icon: <Volume2 className="w-4 h-4" /> },
      ]
    },
    looks: {
      name: 'Looks',
      color: 'bg-green-500',
      blocks: [
        { id: 'show', name: 'Show', icon: <Circle className="w-4 h-4" /> },
        { id: 'hide', name: 'Hide', icon: <Circle className="w-4 h-4" /> },
        { id: 'change-size', name: 'Change Size', icon: <Square className="w-4 h-4" /> },
      ]
    }
  };

  const handleDragStart = (blockId: string) => {
    setDraggedBlock(blockId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    // Handle block drop logic here
    setDraggedBlock(null);
  };

  return (
    <div className="flex flex-1">
      {/* Block Palette */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Block Palette</h3>
          <p className="text-sm text-gray-600">Drag blocks to build your game</p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap border-b border-gray-200">
          {Object.entries(blockCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                selectedCategory === key
                  ? 'text-white ' + category.color
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Blocks */}
        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          {blockCategories[selectedCategory as keyof typeof blockCategories].blocks.map((block) => (
            <div
              key={block.id}
              draggable
              onDragStart={() => handleDragStart(block.id)}
              className={`p-3 rounded-lg cursor-move transition-all duration-200 hover:shadow-md ${
                blockCategories[selectedCategory as keyof typeof blockCategories].color
              } text-white flex items-center space-x-3`}
            >
              {block.icon}
              <span className="text-sm font-medium">{block.name}</span>
            </div>
          ))}
        </div>

        {/* Tutorial Hint */}
        <div className="p-4 bg-blue-50 border-t border-gray-200">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">?</span>
            </div>
            <div>
              <h4 className="text-sm font-medium text-blue-900">Getting Started</h4>
              <p className="text-xs text-blue-700 mt-1">
                Drag the "When Game Starts" block to begin, then add movement blocks to make your character move!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Workspace */}
      <div className="flex-1 flex flex-col">
        {/* Workspace Header */}
        <div className="bg-gray-50 border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Game Logic</h3>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
                <Copy className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Block Workspace */}
        <div 
          className="flex-1 bg-gray-100 p-8 overflow-auto"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="min-h-full bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
            <div className="text-center">
              <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-600 mb-2">Start Building!</h4>
              <p className="text-gray-500">
                Drag blocks from the palette to create your game logic
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Game Preview */}
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Game Preview</h3>
          <p className="text-sm text-gray-600">See your game in action</p>
        </div>

        <div className="flex-1 p-4">
          <div className="aspect-square bg-gray-900 rounded-lg flex items-center justify-center">
            <div className="text-center text-white">
              <Play className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm opacity-75">Add blocks to see your game</p>
            </div>
          </div>
        </div>

        {/* Game Assets */}
        <div className="border-t border-gray-200 p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Game Assets</h4>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-gray-100 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                <Plus className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}