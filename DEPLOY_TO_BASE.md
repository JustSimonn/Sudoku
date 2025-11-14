# Deploy to Base Blockchain

## Quick Deploy

### Deploy to Base Sepolia (Testnet - Recommended First)
```bash
npm run deploy:base-sepolia
```

### Deploy to Base Mainnet
```bash
npm run deploy:base
```

## After Deployment

1. Copy the contract address from the terminal output
2. Update `src/config/contract.js`:
   ```javascript
   export const CONTRACT_ADDRESS = 'YOUR_DEPLOYED_ADDRESS';
   ```

## Get Base Sepolia ETH

Free testnet ETH for Base Sepolia:
- https://www.coinbase.com/faucets/base-ethereum-goerli-faucet
- Bridge from Ethereum Sepolia: https://bridge.base.org/

## Network Details

**Base Sepolia (Testnet):**
- Chain ID: 84532
- RPC: https://sepolia.base.org
- Explorer: https://sepolia.basescan.org

**Base Mainnet:**
- Chain ID: 8453
- RPC: https://mainnet.base.org
- Explorer: https://basescan.org

## Verify Contract (Optional)

After deployment, verify on Basescan:
```bash
npx hardhat verify --network baseSepolia YOUR_CONTRACT_ADDRESS
```

## Farcaster Frame Setup

1. Deploy your app to a public URL (Vercel, Netlify, etc.)
2. Update `index.html` meta tags with your domain
3. Create an OG image (1200x630px) for the frame
4. Share your app URL on Farcaster - it will auto-render as a frame!

## Important Notes

- Your private key is configured in `hardhat.config.js`
- **NEVER commit hardhat.config.js to git** (it's in .gitignore)
- Keep your private key secure
- Test on Base Sepolia before mainnet deployment
