import React, { useState } from 'react';
import { 
  Play, 
  Save, 
  Download, 
  FileText, 
  Terminal, 
  Book,
  Copy,
  RotateCcw
} from 'lucide-react';

interface CodeEditorProps {
  gameType: 'mini' | 'full';
  platform: 'web' | 'mobile' | 'desktop';
}

export default function CodeEditor({ gameType, platform }: CodeEditorProps) {
  const [code, setCode] = useState(`// Welcome to PlayCratez Code Editor!
// Create your ${gameType} game for ${platform}

class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.player = {
      x: 50,
      y: 200,
      width: 30,
      height: 30,
      velocityY: 0,
      jumping: false
    };
    this.gravity = 0.5;
    this.jumpPower = -12;
    
    this.init();
  }
  
  init() {
    this.canvas.width = 800;
    this.canvas.height = 400;
    this.gameLoop();
    this.setupControls();
  }
  
  setupControls() {
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && !this.player.jumping) {
        this.player.velocityY = this.jumpPower;
        this.player.jumping = true;
      }
    });
  }
  
  update() {
    // Apply gravity
    this.player.velocityY += this.gravity;
    this.player.y += this.player.velocityY;
    
    // Ground collision
    if (this.player.y > 200) {
      this.player.y = 200;
      this.player.velocityY = 0;
      this.player.jumping = false;
    }
  }
  
  draw() {
    // Clear canvas
    this.ctx.fillStyle = '#87CEEB';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw ground
    this.ctx.fillStyle = '#8B4513';
    this.ctx.fillRect(0, 230, this.canvas.width, 170);
    
    // Draw player
    this.ctx.fillStyle = '#FF6B6B';
    this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
  }
  
  gameLoop() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.gameLoop());
  }
}

// Start the game
const game = new Game();`);

  const [consoleOutput, setConsoleOutput] = useState([
    { type: 'info', message: 'Welcome to PlayCratez Code Editor!' },
    { type: 'info', message: 'Press Space to make the character jump' },
    { type: 'success', message: 'Game initialized successfully' }
  ]);

  const [selectedTab, setSelectedTab] = useState('editor');

  const codeSnippets = [
    {
      title: 'Player Movement',
      code: `// Basic player movement
player.x += player.speed;
if (keys.left) player.x -= player.speed;
if (keys.right) player.x += player.speed;`
    },
    {
      title: 'Collision Detection',
      code: `// Simple collision detection
function checkCollision(rect1, rect2) {
  return rect1.x < rect2.x + rect2.width &&
         rect1.x + rect1.width > rect2.x &&
         rect1.y < rect2.y + rect2.height &&
         rect1.y + rect1.height > rect2.y;
}`
    },
    {
      title: 'Sound Effects',
      code: `// Play sound effect
const jumpSound = new Audio('jump.wav');
jumpSound.play();`
    }
  ];

  const runCode = () => {
    setConsoleOutput(prev => [
      ...prev,
      { type: 'info', message: 'Running game...' },
      { type: 'success', message: 'Game started successfully!' }
    ]);
  };

  return (
    <div className="flex flex-1">
      {/* Code Editor */}
      <div className="flex-1 flex flex-col bg-gray-900">
        {/* Editor Header */}
        <div className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-semibold text-white">Code Editor</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedTab('editor')}
                  className={`px-3 py-1 rounded text-sm ${
                    selectedTab === 'editor'
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  main.js
                </button>
                <button
                  onClick={() => setSelectedTab('console')}
                  className={`px-3 py-1 rounded text-sm ${
                    selectedTab === 'console'
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Console
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={runCode}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Play className="w-4 h-4 mr-2" />
                Run
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Save className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Editor Content */}
        <div className="flex-1 flex">
          {selectedTab === 'editor' ? (
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 bg-gray-900 text-gray-100 p-4 font-mono text-sm resize-none focus:outline-none"
              style={{ lineHeight: '1.5' }}
              spellCheck={false}
            />
          ) : (
            <div className="flex-1 bg-gray-900 p-4 font-mono text-sm">
              {consoleOutput.map((output, index) => (
                <div
                  key={index}
                  className={`mb-1 ${
                    output.type === 'error' ? 'text-red-400' :
                    output.type === 'success' ? 'text-green-400' :
                    'text-gray-300'
                  }`}
                >
                  {output.message}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Game Preview */}
      <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Game Preview</h3>
          <p className="text-sm text-gray-600">Live preview of your game</p>
        </div>

        <div className="flex-1 p-4">
          <div className="aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
            <canvas
              id="gameCanvas"
              className="max-w-full max-h-full bg-sky-200 rounded"
              style={{ width: '320px', height: '160px' }}
            />
          </div>
        </div>

        {/* Code Documentation */}
        <div className="border-t border-gray-200 p-4 max-h-64 overflow-y-auto">
          <div className="flex items-center space-x-2 mb-3">
            <Book className="w-5 h-5 text-blue-500" />
            <h4 className="font-medium text-gray-900">Code Snippets</h4>
          </div>
          
          <div className="space-y-3">
            {codeSnippets.map((snippet, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-sm font-medium text-gray-900">{snippet.title}</h5>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <pre className="text-xs text-gray-600 overflow-x-auto">
                  <code>{snippet.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Documentation Sidebar */}
      <div className="w-80 bg-gray-50 border-l border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Documentation</h3>
          <p className="text-sm text-gray-600">Functions & tutorials</p>
        </div>

        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {/* API Reference */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3">Game API</h4>
            <div className="space-y-2 text-sm">
              <div className="p-2 bg-blue-50 rounded">
                <code className="text-blue-700">player.move(x, y)</code>
                <p className="text-gray-600 text-xs mt-1">Move player to position</p>
              </div>
              <div className="p-2 bg-green-50 rounded">
                <code className="text-green-700">game.addSprite(sprite)</code>
                <p className="text-gray-600 text-xs mt-1">Add sprite to game</p>
              </div>
              <div className="p-2 bg-purple-50 rounded">
                <code className="text-purple-700">sound.play(file)</code>
                <p className="text-gray-600 text-xs mt-1">Play sound effect</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
            <div className="space-y-2">
              <button className="w-full text-left p-2 hover:bg-gray-50 rounded text-sm">
                <FileText className="w-4 h-4 inline mr-2" />
                View Examples
              </button>
              <button className="w-full text-left p-2 hover:bg-gray-50 rounded text-sm">
                <Terminal className="w-4 h-4 inline mr-2" />
                Debug Console
              </button>
              <button className="w-full text-left p-2 hover:bg-gray-50 rounded text-sm">
                <RotateCcw className="w-4 h-4 inline mr-2" />
                Reset Code
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}