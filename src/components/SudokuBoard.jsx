import { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { generatePuzzle, isValid, isBoardComplete, calculateScore, difficultyToEnum } from '../utils/sudoku';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contract';
import CompletionModal from './CompletionModal';

function SudokuBoard({ difficulty, onNewGame }) {
  const { address, isConnected } = useAccount();
  const [puzzle, setPuzzle] = useState(null);
  const [solution, setSolution] = useState(null);
  const [board, setBoard] = useState(null);
  const [initialBoard, setInitialBoard] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);
  const [errors, setErrors] = useState(new Set());
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const maxHints = 3;

  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Initialize puzzle
  useEffect(() => {
    const { puzzle: newPuzzle, solution: newSolution } = generatePuzzle(difficulty);
    setPuzzle(newPuzzle);
    setSolution(newSolution);
    setBoard(newPuzzle.map(row => [...row]));
    setInitialBoard(newPuzzle.map(row => [...row]));
    setStartTime(Date.now());
    setElapsedTime(0);
    setIsComplete(false);
    setErrors(new Set());
    setHintsUsed(0);
  }, [difficulty]);

  // Timer
  useEffect(() => {
    if (!startTime || isComplete) return;

    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, isComplete]);

  // Check completion
  useEffect(() => {
    if (board && isBoardComplete(board)) {
      const timeInSeconds = Math.floor((Date.now() - startTime) / 1000);
      const baseScore = calculateScore(difficulty, timeInSeconds);
      const hintPenalty = hintsUsed * 50;
      const finalScore = Math.max(0, baseScore - hintPenalty);
      setFinalScore(finalScore);
      setIsComplete(true);
      setShowModal(true);
    }
  }, [board, difficulty, startTime, hintsUsed]);

  // Reset after successful transaction
  useEffect(() => {
    if (isConfirmed) {
      setShowModal(false);
      // Optionally reset the game or show success message
    }
  }, [isConfirmed]);

  const handleCellClick = (row, col) => {
    if (initialBoard[row][col] !== 0) return; // Can't modify initial cells
    setSelectedCell([row, col]);
  };

  const handleNumberInput = (num) => {
    if (!selectedCell) return;
    const [row, col] = selectedCell;
    if (initialBoard[row][col] !== 0) return;

    // If clearing the cell (num = 0), just clear it and remove error
    if (num === 0) {
      const newBoard = board.map(r => [...r]);
      newBoard[row][col] = 0;
      const errorKey = `${row}-${col}`;
      setErrors(prev => {
        const newErrors = new Set(prev);
        newErrors.delete(errorKey);
        return newErrors;
      });
      setBoard(newBoard);
      return;
    }

    // Create a temporary board to validate BEFORE placing
    const tempBoard = board.map(r => [...r]);
    tempBoard[row][col] = 0; // Temporarily clear the cell for validation

    // Validate the move on the temporary board
    if (!isValid(tempBoard, row, col, num)) {
      // Invalid move - don't place the number, just show error
      const errorKey = `${row}-${col}`;
      setErrors(prev => new Set([...prev, errorKey]));
      return; // Don't update the board
    }

    // Valid move - place the number and clear any errors
    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = num;
    const errorKey = `${row}-${col}`;
    setErrors(prev => {
      const newErrors = new Set(prev);
      newErrors.delete(errorKey);
      return newErrors;
    });
    setBoard(newBoard);
  };

  const handleKeyDown = (e) => {
    if (!selectedCell) return;

    if (e.key >= '1' && e.key <= '9') {
      handleNumberInput(parseInt(e.key));
    } else if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
      handleNumberInput(0);
    }
  };

  const handleHint = () => {
    if (!selectedCell || !solution || hintsUsed >= maxHints) return;
    const [row, col] = selectedCell;
    if (initialBoard[row][col] !== 0) return;

    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = solution[row][col];
    setBoard(newBoard);
    setHintsUsed(prev => prev + 1);
  };

  const handleReset = () => {
    setBoard(initialBoard.map(row => [...row]));
    setErrors(new Set());
    setStartTime(Date.now());
    setElapsedTime(0);
    setHintsUsed(0);
  };

  const handleSubmitScore = async () => {
    if (!isConnected) {
      alert('Please connect your wallet first!');
      return;
    }

    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'submitScore',
        args: [BigInt(finalScore), difficultyToEnum(difficulty)],
      });
    } catch (error) {
      console.error('Error submitting score:', error);
      alert('Failed to submit score. Please try again.');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!board) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center w-full" onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Stats */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 mb-4 sm:mb-6 text-sm sm:text-base font-medium w-full justify-center">
        <div className="bg-white px-3 sm:px-4 py-2 rounded-lg shadow-soft border border-brown-200 text-center">
          <span className="text-brown-600">Time: </span>
          <span className="text-brown-800 font-semibold">{formatTime(elapsedTime)}</span>
        </div>
        <div className="bg-white px-3 sm:px-4 py-2 rounded-lg shadow-soft border border-brown-200 text-center">
          <span className="text-brown-600">Difficulty: </span>
          <span className="text-brown-800 font-semibold">{difficulty}</span>
        </div>
        <div className="bg-white px-3 sm:px-4 py-2 rounded-lg shadow-soft border border-brown-200 text-center">
          <span className="text-brown-600">Hints: </span>
          <span className={`font-semibold ${hintsUsed >= maxHints ? 'text-red-600' : 'text-brown-800'}`}>
            {hintsUsed}/{maxHints}
          </span>
        </div>
      </div>

      {/* Sudoku Grid */}
      <div className="inline-block border-3 border-brown-700 mb-4 sm:mb-6 rounded-lg overflow-hidden shadow-medium bg-white max-w-full">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell, colIndex) => {
              const isInitial = initialBoard[rowIndex][colIndex] !== 0;
              const isSelected = selectedCell?.[0] === rowIndex && selectedCell?.[1] === colIndex;
              const hasError = errors.has(`${rowIndex}-${colIndex}`);
              const isBottomBorder = (rowIndex + 1) % 3 === 0 && rowIndex !== 8;
              const isRightBorder = (colIndex + 1) % 3 === 0 && colIndex !== 8;

              return (
                <div
                  key={colIndex}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  className={`
                    w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center text-base sm:text-lg md:text-xl font-medium cursor-pointer
                    border border-brown-300
                    ${isBottomBorder ? 'border-b-2 border-b-brown-700' : ''}
                    ${isRightBorder ? 'border-r-2 border-r-brown-700' : ''}
                    ${isInitial ? 'bg-brown-100 text-brown-900 font-semibold' : 'bg-white text-brown-700'}
                    ${isSelected ? 'bg-brown-200 ring-2 ring-brown-500 ring-inset shadow-soft' : ''}
                    ${hasError ? 'bg-red-100 text-red-700 ring-2 ring-red-400' : ''}
                    ${!isInitial && !isSelected && !hasError ? 'hover:bg-brown-50' : ''}
                    transition-all
                  `}
                >
                  {cell !== 0 ? cell : ''}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Number Pad */}
      <div className="flex gap-1.5 sm:gap-2 mb-4 sm:mb-6 flex-wrap justify-center max-w-full px-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
          <button
            key={num}
            onClick={() => handleNumberInput(num)}
            className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-brown-600 text-white rounded-lg font-semibold text-base sm:text-lg hover:bg-brown-700 hover:shadow-medium active:scale-95 transition-all shadow-soft"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => handleNumberInput(0)}
          className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-brown-400 text-white rounded-lg font-semibold text-base sm:text-lg hover:bg-brown-500 hover:shadow-medium active:scale-95 transition-all shadow-soft"
        >
          ✕
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <button
          onClick={handleHint}
          disabled={!selectedCell || isComplete || hintsUsed >= maxHints}
          className="px-6 py-3 bg-brown-500 text-white rounded-lg font-medium hover:bg-brown-600 hover:shadow-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-soft"
        >
          Hint {hintsUsed < maxHints && `(-50pts)`}
        </button>
        <button
          onClick={handleReset}
          disabled={isComplete}
          className="px-6 py-3 bg-brown-500 text-white rounded-lg font-medium hover:bg-brown-600 hover:shadow-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-soft"
        >
          Reset
        </button>
        <button
          onClick={onNewGame}
          className="px-6 py-3 bg-brown-700 text-white rounded-lg font-medium hover:bg-brown-800 hover:shadow-medium transition-all shadow-soft"
        >
          Next Puzzle
        </button>
        {isComplete && (
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 hover:shadow-medium transition-all shadow-soft"
          >
            📊 Submit Score
          </button>
        )}
      </div>

      {/* Completion Modal */}
      {showModal && (
        <CompletionModal
          score={finalScore}
          difficulty={difficulty}
          time={elapsedTime}
          onSubmit={handleSubmitScore}
          onClose={() => setShowModal(false)}
          isPending={isPending}
          isConfirming={isConfirming}
          isConfirmed={isConfirmed}
        />
      )}
    </div>
  );
}

export default SudokuBoard;
