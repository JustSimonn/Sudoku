# Quick Start Guide - Onchain Sudoku

## ⚡ Fast Setup (5 minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Get WalletConnect Project ID
1. Visit https://cloud.walletconnect.com/
2. Sign in with GitHub
3. Create a new project
4. Copy your Project ID

### Step 3: Update Configuration
Open `src/config/wagmi.js` and replace:
```javascript
projectId: 'YOUR_PROJECT_ID', // Replace with your actual Project ID
```

### Step 4: Deploy Smart Contract

**Option A - Remix IDE (Easiest):**
1. Go to https://remix.ethereum.org/
2. Create new file: `SudokuLeaderboard.sol`
3. Copy code from `contracts/SudokuLeaderboard.sol`
4. Compile (version 0.8.20+)
5. Deploy to Sepolia testnet
6. Copy contract address

**Option B - Use Test Mode:**
- Leave contract address as is for testing UI only
- Features requiring blockchain won't work

### Step 5: Update Contract Address
Open `src/config/contract.js` and update:
```javascript
export const CONTRACT_ADDRESS = '0xYourDeployedContractAddress';
```

### Step 6: Run the App
```bash
npm run dev
```

Open http://localhost:5173

---

## 🎮 How to Use

1. **Connect Wallet**
   - Click "Connect Wallet" button
   - Choose MetaMask or other wallet
   - Ensure you're on Sepolia testnet

2. **Play Sudoku**
   - Select difficulty level
   - Click cells and use number pad or keyboard
   - Complete the puzzle

3. **Submit Score**
   - When complete, click "Submit to Blockchain"
   - Approve transaction in your wallet
   - Score appears on leaderboard!

4. **View Leaderboard**
   - Click "Leaderboard" tab
   - Filter by difficulty
   - See global rankings

---

## 🔧 Troubleshooting

### No wallet detected
- Install MetaMask: https://metamask.io/

### Wrong network
- Switch to Sepolia testnet in MetaMask
- Add Sepolia: Network ID 11155111

### Need test ETH
- https://sepoliafaucet.com/
- https://www.infura.io/faucet/sepolia

### Transaction fails
- Make sure you have test ETH
- Check contract address is correct
- Verify you're on Sepolia network

---

## 📁 Key Files to Configure

1. `src/config/wagmi.js` - WalletConnect Project ID
2. `src/config/contract.js` - Contract address
3. `contracts/SudokuLeaderboard.sol` - Smart contract (deploy this)

---

## 🚀 Next Steps

- Deploy contract (see DEPLOYMENT_GUIDE.md)
- Customize styling in component files
- Add more difficulty levels
- Implement daily challenges
- Add NFT rewards

---

## 📚 Documentation

- Full README: `README.md`
- Deployment Guide: `DEPLOYMENT_GUIDE.md`
- Smart Contract: `contracts/SudokuLeaderboard.sol`

---

## ❓ Need Help?

Check the documentation files or review the code comments for detailed explanations.

Happy coding! 🎉
