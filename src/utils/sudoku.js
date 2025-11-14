// Sudoku puzzle generator and validator

export const DIFFICULTY = {
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard',
  EXPERT: 'Expert'
};

// Number of cells to remove based on difficulty
const DIFFICULTY_LEVELS = {
  [DIFFICULTY.EASY]: 30,
  [DIFFICULTY.MEDIUM]: 40,
  [DIFFICULTY.HARD]: 50,
  [DIFFICULTY.EXPERT]: 60
};

// Generate a complete valid Sudoku board
function generateCompleteSudoku() {
  const board = Array(9).fill(null).map(() => Array(9).fill(0));
  fillBoard(board);
  return board;
}

// Fill the board using backtracking
function fillBoard(board) {
  const empty = findEmpty(board);
  if (!empty) return true;

  const [row, col] = empty;
  const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  for (const num of numbers) {
    if (isValid(board, row, col, num)) {
      board[row][col] = num;
      if (fillBoard(board)) return true;
      board[row][col] = 0;
    }
  }
  return false;
}

// Find an empty cell
function findEmpty(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) return [i, j];
    }
  }
  return null;
}

// Check if placing num at [row][col] is valid
export function isValid(board, row, col, num) {
  // Check row
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) return false;
  }

  // Check column
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === num) return false;
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = boxRow; i < boxRow + 3; i++) {
    for (let j = boxCol; j < boxCol + 3; j++) {
      if (board[i][j] === num) return false;
    }
  }

  return true;
}

// Shuffle array
function shuffle(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Generate a puzzle by removing cells from a complete board
export function generatePuzzle(difficulty = DIFFICULTY.MEDIUM) {
  const complete = generateCompleteSudoku();
  const puzzle = complete.map(row => [...row]);
  const cellsToRemove = DIFFICULTY_LEVELS[difficulty];
  
  let removed = 0;
  while (removed < cellsToRemove) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    
    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0;
      removed++;
    }
  }

  return {
    puzzle,
    solution: complete
  };
}

// Check if the board is complete and valid
export function isBoardComplete(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) return false;
    }
  }
  return true;
}

// Calculate score based on difficulty and time
export function calculateScore(difficulty, timeInSeconds) {
  const baseScore = {
    [DIFFICULTY.EASY]: 100,
    [DIFFICULTY.MEDIUM]: 250,
    [DIFFICULTY.HARD]: 500,
    [DIFFICULTY.EXPERT]: 1000
  };

  const base = baseScore[difficulty];
  const timeBonus = Math.max(0, 1000 - timeInSeconds);
  
  return Math.floor(base + (timeBonus * 0.5));
}

// Convert difficulty string to contract enum value
export function difficultyToEnum(difficulty) {
  const mapping = {
    [DIFFICULTY.EASY]: 0,
    [DIFFICULTY.MEDIUM]: 1,
    [DIFFICULTY.HARD]: 2,
    [DIFFICULTY.EXPERT]: 3
  };
  return mapping[difficulty];
}

// Convert contract enum value to difficulty string
export function enumToDifficulty(enumValue) {
  const mapping = {
    0: DIFFICULTY.EASY,
    1: DIFFICULTY.MEDIUM,
    2: DIFFICULTY.HARD,
    3: DIFFICULTY.EXPERT
  };
  return mapping[enumValue] || DIFFICULTY.EASY;
}
