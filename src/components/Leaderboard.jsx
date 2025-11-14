import { useState, useEffect } from 'react';
import { useReadContract, useAccount } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contract';
import { enumToDifficulty } from '../utils/sudoku';

function Leaderboard() {
  const { address } = useAccount();
  const [filter, setFilter] = useState('all'); // 'all' or difficulty level
  const [sortedScores, setSortedScores] = useState([]);

  // Read all scores from contract
  const { data: allScores, isLoading, refetch, error } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getAllScores',
  });

  // Process and sort scores
  useEffect(() => {    
    if (!allScores || allScores.length === 0) {
      setSortedScores([]);
      return;
    }

    let scores = allScores.map(score => ({
      player: score.player,
      score: Number(score.score),
      level: enumToDifficulty(score.level),
      timestamp: Number(score.timestamp),
    }));

    // Filter by difficulty if selected
    if (filter !== 'all') {
      scores = scores.filter(s => s.level === filter);
    }

    // Group by player and keep only best score per level
    const bestScores = new Map();
    scores.forEach(score => {
      const key = `${score.player}-${score.level}`;
      const existing = bestScores.get(key);
      if (!existing || score.score > existing.score) {
        bestScores.set(key, score);
      }
    });

    // Convert back to array and sort
    const uniqueScores = Array.from(bestScores.values());
    
    // Sort by level priority (Expert > Hard > Medium > Easy) and then by score
    const levelPriority = { 'Expert': 4, 'Hard': 3, 'Medium': 2, 'Easy': 1 };
    uniqueScores.sort((a, b) => {
      const levelDiff = levelPriority[b.level] - levelPriority[a.level];
      if (levelDiff !== 0) return levelDiff;
      return b.score - a.score;
    });

    setSortedScores(uniqueScores.slice(0, 50)); // Top 50
  }, [allScores, filter]);

  const shortenAddress = (addr) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  const getLevelColor = (level) => {
    const colors = {
      'Easy': 'bg-brown-200 text-brown-800 border border-brown-400',
      'Medium': 'bg-brown-300 text-brown-900 border border-brown-500',
      'Hard': 'bg-brown-500 text-white border border-brown-600',
      'Expert': 'bg-brown-700 text-white border border-brown-800',
    };
    return colors[level] || 'bg-brown-200 text-brown-800';
  };

  const getLevelEmoji = (level) => {
    return '';
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-brown-800">Global Leaderboard</h2>
        <button
          onClick={() => refetch()}
          className="px-5 py-2.5 bg-brown-700 text-white rounded-lg font-medium hover:bg-brown-800 hover:shadow-medium transition-all shadow-soft"
        >
          Refresh
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setFilter('all')}
          className={`px-5 py-2.5 rounded-lg font-medium transition-all shadow-soft ${
            filter === 'all'
              ? 'bg-brown-600 text-white shadow-medium'
              : 'bg-white text-brown-700 hover:bg-brown-50 border-2 border-brown-300 hover:border-brown-500'
          }`}
        >
          All Levels
        </button>
        {['Easy', 'Medium', 'Hard', 'Expert'].map(level => (
          <button
            key={level}
            onClick={() => setFilter(level)}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all shadow-soft ${
              filter === level
                ? 'bg-brown-600 text-white shadow-medium'
                : 'bg-white text-brown-700 hover:bg-brown-50 border-2 border-brown-300 hover:border-brown-500'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Leaderboard Table */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brown-700"></div>
          <p className="mt-4 text-brown-600 font-medium">Loading leaderboard...</p>
        </div>
      ) : sortedScores.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-brown-600 text-lg font-medium">No scores yet. Be the first to play!</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-soft border-2 border-brown-300">
          <table className="w-full">
            <thead>
              <tr className="bg-brown-100 border-b-2 border-brown-300">
                <th className="text-left py-3 px-4 font-semibold text-brown-800">Rank</th>
                <th className="text-left py-3 px-4 font-semibold text-brown-800">Player</th>
                <th className="text-left py-3 px-4 font-semibold text-brown-800">Score</th>
                <th className="text-left py-3 px-4 font-semibold text-brown-800">Level</th>
                <th className="text-left py-3 px-4 font-semibold text-brown-800">Date</th>
              </tr>
            </thead>
            <tbody>
              {sortedScores.map((score, index) => {
                const isCurrentUser = address && score.player.toLowerCase() === address.toLowerCase();
                
                return (
                  <tr
                    key={`${score.player}-${score.level}-${index}`}
                    className={`border-b border-brown-200 hover:bg-brown-50 transition-colors ${
                      isCurrentUser ? 'bg-brown-100' : ''
                    }`}
                  >
                    <td className="py-3 px-4">
                      <span className="font-semibold text-brown-700">
                        #{index + 1}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-mono text-sm ${isCurrentUser ? 'font-semibold text-brown-800' : 'text-brown-600'}`}>
                        {shortenAddress(score.player)}
                        {isCurrentUser && <span className="ml-2 text-xs bg-brown-700 text-white px-2 py-1 rounded font-medium">You</span>}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-lg text-brown-800">{score.score.toLocaleString()}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium shadow-soft ${getLevelColor(score.level)}`}>
                        {score.level}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-brown-600 text-sm">
                      {formatDate(score.timestamp)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Info */}
      <div className="mt-6 p-4 bg-brown-200 border-l-4 border-brown-700 rounded shadow-soft">
        <p className="text-sm text-brown-800 leading-relaxed">
          <strong className="font-semibold">How it works:</strong> Scores are stored permanently on the blockchain. 
          Each player's best score per difficulty level is displayed. Rankings prioritize harder difficulties first.
        </p>
      </div>
    </div>
  );
}

export default Leaderboard;
