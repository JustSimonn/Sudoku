# Smart Contract Deployment Guide

## Quick Deployment with Remix (Easiest Method)

### Step 1: Open Remix IDE
Visit https://remix.ethereum.org/

### Step 2: Create Contract File
1. In the file explorer, create a new file: `SudokuLeaderboard.sol`
2. Copy the entire content from `contracts/SudokuLeaderboard.sol` and paste it

### Step 3: Compile
1. Go to the "Solidity Compiler" tab (left sidebar)
2. Select compiler version: `0.8.20` or higher
3. Click "Compile SudokuLeaderboard.sol"
4. Ensure there are no errors

### Step 4: Deploy
1. Go to the "Deploy & Run Transactions" tab
2. Environment: Select "Injected Provider - MetaMask"
3. Connect your MetaMask wallet (make sure you're on Sepolia testnet)
4. Contract: Select "SudokuLeaderboard"
5. Click "Deploy"
6. Confirm the transaction in MetaMask

### Step 5: Copy Contract Address
1. After deployment, you'll see the contract under "Deployed Contracts"
2. Copy the contract address (it will look like `0x123abc...`)
3. Update `src/config/contract.js`:
   ```javascript
   export const CONTRACT_ADDRESS = '0xYourContractAddressHere';
   ```

### Step 6: Get Test ETH
If you need Sepolia test ETH:
- https://sepoliafaucet.com/
- https://www.infura.io/faucet/sepolia
- https://sepolia-faucet.pk910.de/

---

## Alternative: Deploy with Hardhat

### Step 1: Install Hardhat
```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npx hardhat init
```

Select "Create a JavaScript project" and accept defaults.

### Step 2: Configure Network
Edit `hardhat.config.js`:

```javascript
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_KEY`,
      accounts: ['YOUR_PRIVATE_KEY'] // Never commit this!
    }
  }
};
```

### Step 3: Create Deployment Script
Create `scripts/deploy.js`:

```javascript
async function main() {
  const SudokuLeaderboard = await ethers.getContractFactory("SudokuLeaderboard");
  const sudoku = await SudokuLeaderboard.deploy();
  await sudoku.waitForDeployment();
  
  console.log("SudokuLeaderboard deployed to:", await sudoku.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

### Step 4: Copy Contract
Copy `contracts/SudokuLeaderboard.sol` to `contracts/` in your Hardhat project.

### Step 5: Deploy
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### Step 6: Verify Contract (Optional)
```bash
npx hardhat verify --network sepolia DEPLOYED_CONTRACT_ADDRESS
```

---

## Testnet vs Mainnet

### For Testing (Recommended First)
- Network: **Sepolia Testnet**
- Cost: Free (test ETH from faucets)
- Risk: None
- Good for: Development and testing

### For Production
- Network: **Ethereum Mainnet**
- Cost: Real ETH for gas fees
- Risk: Real money involved
- Good for: Live production app

---

## After Deployment Checklist

- [ ] Contract deployed successfully
- [ ] Contract address copied
- [ ] Updated `src/config/contract.js` with contract address
- [ ] Updated `src/config/wagmi.js` with WalletConnect Project ID
- [ ] Tested on local development server
- [ ] Verified contract can receive transactions
- [ ] Tested submitting a score
- [ ] Verified score appears on leaderboard

---

## Troubleshooting

### "Insufficient funds" error
- Make sure your wallet has ETH (or test ETH for testnet)
- Get test ETH from faucets listed above

### Transaction fails
- Check you're on the correct network (Sepolia/Mainnet)
- Ensure contract address is correct
- Try increasing gas limit

### Leaderboard shows no scores
- Verify contract address is correct
- Check you're connected to the same network where contract is deployed
- Look for transactions on Etherscan

### Contract won't compile
- Ensure Solidity version is 0.8.20 or higher
- Check for any syntax errors in the contract

---

## View on Block Explorer

After deployment, view your contract:

**Sepolia Testnet:**
```
https://sepolia.etherscan.io/address/YOUR_CONTRACT_ADDRESS
```

**Mainnet:**
```
https://etherscan.io/address/YOUR_CONTRACT_ADDRESS
```

You can see all transactions, scores submitted, and contract interactions here.
