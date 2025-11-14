# Onchain Sudoku - Project Overview

## 🎯 What This Project Does

An interactive Sudoku game that stores player scores permanently on the Ethereum blockchain. Players compete on a global leaderboard where scores are verified and immutable.

---

## 🏗️ Architecture

### Frontend (React)
- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Web3**: wagmi + RainbowKit for wallet connections
- **State**: React hooks for game state management

### Smart Contract (Solidity)
- **Language**: Solidity 0.8.20+
- **Network**: Ethereum (Sepolia testnet or Mainnet)
- **Storage**: Onchain score records with player address, score, level, timestamp

### Game Logic
- Pure JavaScript sudoku generation
- Client-side validation
- No backend required (fully decentralized)

---

## 📦 Project Structure

```
Sudoku/
├── contracts/
│   └── SudokuLeaderboard.sol          # Smart contract for score storage
│
├── src/
│   ├── components/
│   │   ├── SudokuGame.jsx             # Main game container
│   │   ├── SudokuBoard.jsx            # Game board, timer, controls
│   │   ├── DifficultySelector.jsx     # Level selection UI
│   │   ├── CompletionModal.jsx        # Score submission popup
│   │   └── Leaderboard.jsx            # Global rankings display
│   │
│   ├── config/
│   │   ├── wagmi.js                   # Wallet connection config
│   │   └── contract.js                # Contract ABI & address
│   │
│   ├── utils/
│   │   └── sudoku.js                  # Puzzle generation & validation
│   │
│   ├── App.jsx                        # Web3 providers wrapper
│   ├── main.jsx                       # Entry point
│   └── index.css                      # Global styles
│
├── public/                            # Static assets
├── .env.example                       # Environment template
├── package.json                       # Dependencies
├── vite.config.js                     # Vite configuration
├── tailwind.config.js                 # Tailwind setup
├── README.md                          # Full documentation
├── DEPLOYMENT_GUIDE.md                # Contract deployment
└── QUICKSTART.md                      # Quick setup guide
```

---

## 🔄 Data Flow

### Playing a Game
1. User selects difficulty (Easy/Medium/Hard/Expert)
2. Frontend generates sudoku puzzle
3. User solves puzzle (validated client-side)
4. Timer calculates completion time
5. Score computed based on difficulty + time

### Submitting Score
1. User clicks "Submit to Blockchain"
2. Web3 modal appears (MetaMask/WalletConnect)
3. Smart contract `submitScore()` called
4. Transaction confirmed on blockchain
5. Score permanently stored onchain
6. Leaderboard updates automatically

### Viewing Leaderboard
1. Frontend calls `getAllScores()` on contract
2. Scores fetched from blockchain
3. Frontend filters/sorts by level and score
4. Top 50 displayed with ranking

---

## 🎮 Game Features

### Core Mechanics
- ✅ Standard 9x9 Sudoku grid
- ✅ Auto-validation (highlights errors in red)
- ✅ Hint system (reveals correct number)
- ✅ Reset puzzle to starting state
- ✅ Generate new puzzle anytime
- ✅ Timer with real-time tracking

### Difficulty Levels
- **Easy**: 30 empty cells, 100 base points
- **Medium**: 40 empty cells, 250 base points
- **Hard**: 50 empty cells, 500 base points
- **Expert**: 60 empty cells, 1000 base points

### Scoring Algorithm
```
Final Score = Base Score + Time Bonus
Time Bonus = max(0, (1000 - seconds) * 0.5)
```

---

## ⛓️ Blockchain Integration

### Smart Contract Functions

**Write Functions** (require gas):
- `submitScore(uint256 _score, Level _level)` - Save score onchain

**Read Functions** (free):
- `getAllScores()` - Get all scores
- `getScoresByLevel(Level _level)` - Filter by difficulty
- `getPlayerScore(address, Level)` - Get player's best score
- `getTopScores(uint256 limit)` - Get top N scores

### Events
- `ScoreSubmitted` - Emitted when score saved (indexed by player)

### Storage
Each score stored as:
```solidity
struct Score {
    address player;    // Wallet address
    uint256 score;     // Points earned
    Level level;       // Difficulty (0-3)
    uint256 timestamp; // Block timestamp
}
```

---

## 🔐 Security

### Smart Contract
- No admin functions (fully decentralized)
- No pausability (always available)
- No upgrade mechanism (immutable)
- Players can submit unlimited scores (best per level tracked)

### Frontend
- Client-side validation only
- Users control their own wallets
- No private keys stored
- No server-side components

---

## 💰 Gas Costs

### Typical Transaction Costs
- **Submit Score**: ~50,000-80,000 gas
- **Read Leaderboard**: Free (view function)

### Network Comparison
| Network | Cost per Score | Time |
|---------|---------------|------|
| Sepolia (testnet) | Free | ~15 sec |
| Ethereum Mainnet | ~$1-5 | ~15 sec |

*Costs vary with gas prices*

---

## 🚀 Deployment Options

### Development
- Local node: Hardhat network
- Testnet: Sepolia (recommended)
- Get test ETH from faucets

### Production
- Mainnet: Real ETH required
- L2 Networks: Polygon, Arbitrum, Optimism (cheaper)
- Alternative chains: BSC, Avalanche

---

## 🛠️ Technologies Used

| Category | Technology | Purpose |
|----------|-----------|---------|
| Frontend Framework | React 18 | UI components |
| Build Tool | Vite | Fast dev server, HMR |
| Styling | Tailwind CSS | Utility-first CSS |
| Web3 Library | wagmi | React hooks for Ethereum |
| Wallet Connection | RainbowKit | Multi-wallet support |
| Ethereum Library | ethers.js | Contract interactions |
| Smart Contract | Solidity | Onchain logic |
| Query Client | TanStack Query | Data fetching |

---

## 📊 Leaderboard Logic

### Ranking Algorithm
1. Group scores by player + level
2. Keep only best score per player per level
3. Sort by:
   - Primary: Level priority (Expert > Hard > Medium > Easy)
   - Secondary: Score (highest first)
4. Display top 50

### Features
- Filter by difficulty level
- Highlight current user's scores
- Show medals for top 3 (🥇🥈🥉)
- Display shortened wallet addresses
- Show submission date
- Real-time blockchain data

---

## 🔮 Future Enhancements

Potential features to add:
- 🏅 NFT rewards for high scores
- 📅 Daily challenge mode
- 🎯 Achievement system
- 👥 Friend leaderboards
- 🎨 Theme customization
- 📱 Mobile app (React Native)
- ⚡ Layer 2 deployment (cheaper gas)
- 🎮 Multiplayer mode
- 💎 Token rewards
- 📈 Personal statistics dashboard

---

## 📝 Configuration Checklist

Before running:
- [ ] Node.js installed (v16+)
- [ ] npm dependencies installed
- [ ] WalletConnect Project ID obtained
- [ ] Project ID added to `src/config/wagmi.js`
- [ ] Smart contract deployed
- [ ] Contract address updated in `src/config/contract.js`
- [ ] MetaMask or compatible wallet installed
- [ ] Connected to correct network (Sepolia/Mainnet)
- [ ] Wallet has ETH/test ETH for transactions

---

## 🐛 Common Issues & Solutions

### Issue: "Module not found" errors
**Solution**: Run `npm install` again

### Issue: Wallet won't connect
**Solution**: Ensure correct network, check WalletConnect Project ID

### Issue: Transaction fails
**Solution**: Verify contract address, check wallet has ETH

### Issue: Leaderboard empty
**Solution**: Submit a score first, check contract address matches network

### Issue: Scores not appearing
**Solution**: Wait for transaction confirmation, refresh leaderboard

---

## 📄 License

MIT License - Free to use, modify, and distribute

---

## 🙏 Credits

Built with modern Web3 stack:
- RainbowKit for beautiful wallet UI
- wagmi for seamless React + Ethereum integration
- Vite for lightning-fast development
- Tailwind for rapid styling

---

**Ready to play? Follow QUICKSTART.md to get started in 5 minutes!**
