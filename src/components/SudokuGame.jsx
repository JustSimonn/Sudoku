import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useChainId, useSwitchChain } from 'wagmi';
import { base } from 'wagmi/chains';
import SudokuBoard from './SudokuBoard';
import Leaderboard from './Leaderboard';
import DifficultySelector from './DifficultySelector';
import { DIFFICULTY } from '../utils/sudoku';

function SudokuGame() {
  const [currentView, setCurrentView] = useState('game'); // 'game' or 'leaderboard'
  const [selectedDifficulty, setSelectedDifficulty] = useState(DIFFICULTY.MEDIUM);
  const [gameKey, setGameKey] = useState(0);
  
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  
  const isWrongNetwork = isConnected && chainId !== base.id;

  const handleNewGame = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setGameKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen">
      {/* Header Bar */}
      <div className="bg-brown-700 shadow-soft">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-semibold text-white">
              Sudoku
            </h1>
            <ConnectButton />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {/* Wrong Network Warning */}
        {isWrongNetwork && (
          <div className="mb-6 bg-red-100 border-2 border-red-400 rounded-lg p-4 shadow-soft">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-red-800 font-semibold text-lg mb-1">
                  ⚠️ Wrong Network
                </h3>
                <p className="text-red-700">
                  Please switch to Base Mainnet to play Sudoku and submit scores.
                </p>
              </div>
              <button
                onClick={() => switchChain({ chainId: base.id })}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors shadow-soft whitespace-nowrap"
              >
                Switch to Base Mainnet
              </button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setCurrentView('game')}
            className={`px-6 py-3 rounded-lg font-medium transition-all shadow-soft ${
              currentView === 'game'
                ? 'bg-brown-600 text-white shadow-medium'
                : 'bg-white text-brown-700 border-2 border-brown-200 hover:border-brown-400 hover:bg-brown-50'
            }`}
          >
            Play Game
          </button>
          <button
            onClick={() => setCurrentView('leaderboard')}
            className={`px-6 py-3 rounded-lg font-medium transition-all shadow-soft ${
              currentView === 'leaderboard'
                ? 'bg-brown-600 text-white shadow-medium'
                : 'bg-white text-brown-700 border-2 border-brown-200 hover:border-brown-400 hover:bg-brown-50'
            }`}
          >
            Leaderboard
          </button>
        </div>

        {/* Content Card */}
        <div className="bg-brown-200 rounded-xl shadow-medium p-6 sm:p-8">
          {currentView === 'game' ? (
            <div>
              <DifficultySelector
                selectedDifficulty={selectedDifficulty}
                onSelectDifficulty={handleNewGame}
              />
              <SudokuBoard
                key={gameKey}
                difficulty={selectedDifficulty}
                onNewGame={() => setGameKey(prev => prev + 1)}
              />
            </div>
          ) : (
            <Leaderboard />
          )}
        </div>
      </div>
    </div>
  );
}

export default SudokuGame;
