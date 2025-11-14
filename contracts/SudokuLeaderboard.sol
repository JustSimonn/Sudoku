// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SudokuLeaderboard {
    enum Level { Easy, Medium, Hard, Expert }
    
    struct Score {
        address player;
        uint256 score;
        Level level;
        uint256 timestamp;
    }
    
    // Mapping from player address to their best scores per level
    mapping(address => mapping(Level => Score)) public playerScores;
    
    // Array to store all scores for leaderboard display
    Score[] public allScores;
    
    // Events
    event ScoreSubmitted(address indexed player, uint256 score, Level level, uint256 timestamp);
    
    // Submit a new score
    function submitScore(uint256 _score, Level _level) external {
        Score memory newScore = Score({
            player: msg.sender,
            score: _score,
            level: _level,
            timestamp: block.timestamp
        });
        
        // Update player's best score for this level if it's higher
        if (playerScores[msg.sender][_level].score < _score || playerScores[msg.sender][_level].timestamp == 0) {
            playerScores[msg.sender][_level] = newScore;
        }
        
        // Add to all scores array
        allScores.push(newScore);
        
        emit ScoreSubmitted(msg.sender, _score, _level, block.timestamp);
    }
    
    // Get player's best score for a specific level
    function getPlayerScore(address _player, Level _level) external view returns (Score memory) {
        return playerScores[_player][_level];
    }
    
    // Get total number of scores submitted
    function getTotalScores() external view returns (uint256) {
        return allScores.length;
    }
    
    // Get all scores (for leaderboard - frontend will sort)
    function getAllScores() external view returns (Score[] memory) {
        return allScores;
    }
    
    // Get scores for a specific level
    function getScoresByLevel(Level _level) external view returns (Score[] memory) {
        uint256 count = 0;
        
        // Count scores for this level
        for (uint256 i = 0; i < allScores.length; i++) {
            if (allScores[i].level == _level) {
                count++;
            }
        }
        
        // Create array of scores for this level
        Score[] memory levelScores = new Score[](count);
        uint256 index = 0;
        
        for (uint256 i = 0; i < allScores.length; i++) {
            if (allScores[i].level == _level) {
                levelScores[index] = allScores[i];
                index++;
            }
        }
        
        return levelScores;
    }
    
    // Get top scores across all levels (limited to avoid gas issues)
    function getTopScores(uint256 limit) external view returns (Score[] memory) {
        uint256 length = allScores.length < limit ? allScores.length : limit;
        Score[] memory topScores = new Score[](length);
        
        for (uint256 i = 0; i < length; i++) {
            topScores[i] = allScores[allScores.length - 1 - i];
        }
        
        return topScores;
    }
}
