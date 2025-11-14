# Onchain Sudoku Game

A blockchain-based Sudoku game with multiple difficulty levels and an onchain leaderboard system.

## Features

- 🎮 Classic 9x9 Sudoku gameplay
- 📊 Four difficulty levels: Easy, Medium, Hard, Expert
- ⛓️ Scores stored permanently on blockchain
- 🏆 Global leaderboard ranked by level and score
- 🔐 Wallet integration (MetaMask, WalletConnect)
- ✨ Auto-validation and hints system
- ⏱️ Time tracking and score calculation

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Web3**: wagmi + RainbowKit + ethers.js
- **Smart Contract**: Solidity (EVM-compatible)
- **Blockchain**: Ethereum (Sepolia testnet / Mainnet)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Wallet Connection

1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Create a new project and get your Project ID
3. Update `src/config/wagmi.js` with your Project ID:

```javascript
projectId: 'YOUR_PROJECT_ID_HERE',
```

### 3. Deploy Smart Contract

#### Option A: Using Remix IDE (Recommended for beginners)

1. Open [Remix IDE](https://remix.ethereum.org/)
2. Create a new file `SudokuLeaderboard.sol`
3. Copy the contract from `contracts/SudokuLeaderboard.sol`
4. Compile with Solidity version 0.8.20+
5. Deploy to Sepolia testnet using MetaMask
6. Copy the deployed contract address

#### Option B: Using Hardhat

```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npx hardhat init
```

Then deploy:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### 4. Update Contract Address

Update `src/config/contract.js` with your deployed contract address:

```javascript
export const CONTRACT_ADDRESS = '0xYourContractAddressHere';
```

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173`

## How to Play

1. **Connect Wallet**: Click "Connect Wallet" in the top right
2. **Select Difficulty**: Choose from Easy, Medium, Hard, or Expert
3. **Play Sudoku**: 
   - Click a cell to select it
   - Use number pad or keyboard (1-9) to fill in numbers
   - Invalid moves are highlighted in red
   - Use hints if you get stuck
4. **Complete & Submit**: 
   - Upon completion, you'll see your score
   - Approve the transaction to save your score onchain
   - Your score appears on the leaderboard!

## Smart Contract Functions

- `submitScore(uint256 _score, Level _level)` - Submit a new score
- `getAllScores()` - Get all submitted scores
- `getScoresByLevel(Level _level)` - Get scores filtered by difficulty
- `getPlayerScore(address _player, Level _level)` - Get player's best score for a level
- `getTopScores(uint256 limit)` - Get top N scores

## Scoring System

- **Base Score** (by difficulty):
  - Easy: 100 points
  - Medium: 250 points
  - Hard: 500 points
  - Expert: 1000 points
  
- **Time Bonus**: Up to 500 additional points based on completion speed

## Leaderboard

- Shows top 50 scores across all levels
- Can filter by difficulty level
- Sorted by level priority (Expert > Hard > Medium > Easy) then by score
- Your scores are highlighted
- Updates in real-time from blockchain data

## Development

### Project Structure

```
src/
├── components/
│   ├── SudokuGame.jsx        # Main game container
│   ├── SudokuBoard.jsx        # Game board and logic
│   ├── Leaderboard.jsx        # Leaderboard display
│   ├── DifficultySelector.jsx # Difficulty selection
│   └── CompletionModal.jsx    # Score submission modal
├── config/
│   ├── wagmi.js              # Wallet configuration
│   └── contract.js           # Contract ABI and address
├── utils/
│   └── sudoku.js             # Sudoku generation and validation
├── App.jsx                   # App wrapper with providers
└── main.jsx                  # Entry point
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Gas Costs

- Submitting a score: ~50,000-80,000 gas
- On Sepolia testnet: Free (use faucet for test ETH)
- On Ethereum mainnet: Check current gas prices

## Get Test ETH

For Sepolia testnet:
- [Alchemy Sepolia Faucet](https://sepoliafaucet.com/)
- [Infura Sepolia Faucet](https://www.infura.io/faucet/sepolia)

## License

MIT

## Contributing

Feel free to submit issues and pull requests!

## Support

For issues or questions:
- Open a GitHub issue
- Check existing documentation
- Review smart contract code in `contracts/`
