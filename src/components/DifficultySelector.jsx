import { DIFFICULTY } from '../utils/sudoku';

function DifficultySelector({ selectedDifficulty, onSelectDifficulty }) {
  const difficulties = [
    { level: DIFFICULTY.EASY, label: 'Easy' },
    { level: DIFFICULTY.MEDIUM, label: 'Medium' },
    { level: DIFFICULTY.HARD, label: 'Hard' },
    { level: DIFFICULTY.EXPERT, label: 'Expert' },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4 text-brown-800">Select Difficulty</h2>
      <div className="flex gap-3 flex-wrap">
        {difficulties.map(({ level, label }) => (
          <button
            key={level}
            onClick={() => onSelectDifficulty(level)}
            className={`px-6 py-3 rounded-lg font-medium transition-all shadow-soft ${
              selectedDifficulty === level
                ? 'bg-brown-600 text-white shadow-medium transform scale-105'
                : 'bg-white text-brown-700 border-2 border-brown-300 hover:border-brown-500 hover:bg-brown-50 hover:shadow-medium'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DifficultySelector;
