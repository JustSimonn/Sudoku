# Troubleshooting Guide

## Installation Issues

### npm install is slow
**Symptom**: Installation takes a long time  
**Solution**: 
- Be patient, initial install can take 2-5 minutes
- Try using `npm install --legacy-peer-deps` if there are conflicts
- Clear npm cache: `npm cache clean --force`

### Module not found errors
**Symptom**: Error: Cannot find module 'X'  
**Solution**:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## Wallet Connection Issues

### Wallet button does nothing
**Symptom**: Click "Connect Wallet" but nothing happens  
**Solution**:
1. Check console for errors (F12)
2. Verify WalletConnect Project ID is set in `src/config/wagmi.js`
3. Ensure MetaMask or compatible wallet is installed
4. Try refreshing the page

### Wrong network detected
**Symptom**: "Switch Network" message appears  
**Solution**:
1. Open MetaMask
2. Click network dropdown at top
3. Select "Sepolia" or add custom network:
   - Network Name: Sepolia
   - RPC URL: https://sepolia.infura.io/v3/
   - Chain ID: 11155111
   - Currency: SepoliaETH
   - Explorer: https://sepolia.etherscan.io

### Wallet won't connect
**Symptom**: Connection fails or times out  
**Solution**:
- Refresh page and try again
- Disconnect wallet in MetaMask settings, then reconnect
- Try a different browser
- Update MetaMask to latest version

---

## Transaction Issues

### "Insufficient funds" error
**Symptom**: Transaction fails with insufficient funds  
**Solution**:
- For Sepolia testnet: Get free test ETH from:
  - https://sepoliafaucet.com/
  - https://www.infura.io/faucet/sepolia
  - https://sepolia-faucet.pk910.de/
- For Mainnet: Add ETH to your wallet

### Transaction stuck pending
**Symptom**: Transaction shows pending for a long time  
**Solution**:
- Wait 1-2 minutes (network might be congested)
- Check Etherscan to see transaction status
- If stuck, try speeding up in MetaMask
- If failed, retry the transaction

### Gas too high error
**Symptom**: MetaMask says gas is too high  
**Solution**:
- This is normal, contract writes cost gas
- On testnet, gas is free (test ETH)
- On mainnet, adjust gas price in MetaMask
- Wait for lower network congestion

### Transaction reverted
**Symptom**: "Transaction reverted" or "execution reverted"  
**Solution**:
1. Verify contract address is correct
2. Ensure you're on the right network
3. Check contract is deployed properly
4. View error on Etherscan for details

---

## Smart Contract Issues

### Leaderboard shows "No scores yet"
**Symptom**: Leaderboard is empty even after submitting  
**Solution**:
1. Verify transaction was confirmed (check Etherscan)
2. Ensure contract address in `src/config/contract.js` is correct
3. Verify you're on same network where contract is deployed
4. Click "Refresh" button on leaderboard
5. Check browser console for errors

### Contract address error
**Symptom**: "Invalid address" or contract errors  
**Solution**:
- Verify contract address format: `0x...` (42 characters)
- Ensure contract is deployed to current network
- Check address matches Etherscan deployment

### Can't read contract
**Symptom**: Errors when loading leaderboard  
**Solution**:
1. Verify contract ABI in `src/config/contract.js` is correct
2. Ensure contract is deployed at the address
3. Check network connection
4. Try refreshing page

---

## Game Issues

### Puzzle won't generate
**Symptom**: Board stays empty or shows error  
**Solution**:
- Refresh the page
- Clear browser cache
- Check console for JavaScript errors
- Try different difficulty level

### Numbers won't input
**Symptom**: Can't type or click numbers  
**Solution**:
- Ensure you've selected a cell (click it first)
- Don't try to edit pre-filled cells (gray background)
- Use keyboard 1-9 or on-screen number pad
- Refresh page if stuck

### Completion modal stuck
**Symptom**: Modal won't close or won't submit  
**Solution**:
- Click "Skip" to close without submitting
- If submitting, wait for wallet confirmation
- Refresh page to reset (score won't be saved)

### Timer won't start
**Symptom**: Timer shows 00:00  
**Solution**:
- Wait a moment, it starts automatically
- Try generating a new puzzle
- Refresh the page

---

## Build & Development Issues

### Vite won't start
**Symptom**: `npm run dev` fails  
**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules .vite
npm install
npm run dev
```

### Port already in use
**Symptom**: "Port 5173 is already in use"  
**Solution**:
- Close other Vite instances
- Use different port: `npm run dev -- --port 3000`
- Kill process using port (Windows): `netstat -ano | findstr :5173` then `taskkill /F /PID <PID>`

### Build fails
**Symptom**: `npm run build` has errors  
**Solution**:
1. Check all files for syntax errors
2. Ensure all imports are correct
3. Run `npm run dev` first to see detailed errors
4. Check TypeScript errors if any

### Hot reload not working
**Symptom**: Changes don't appear automatically  
**Solution**:
- Refresh browser manually
- Restart dev server: Ctrl+C, then `npm run dev`
- Clear browser cache

---

## Browser Issues

### Console errors
**Symptom**: Red errors in browser console  
**Solution**:
- Read the error message carefully
- Common issues:
  - Missing Project ID → Update wagmi.js
  - Invalid contract → Check contract.js
  - Network mismatch → Switch network in wallet

### White screen
**Symptom**: Blank page, nothing renders  
**Solution**:
1. Open browser console (F12)
2. Check for errors
3. Verify all dependencies installed
4. Try different browser
5. Clear cache and hard reload (Ctrl+Shift+R)

### Styling looks broken
**Symptom**: No colors, bad layout  
**Solution**:
- Ensure Tailwind CSS is properly configured
- Check `tailwind.config.js` exists
- Verify `index.css` has Tailwind imports
- Restart dev server

---

## Network Issues

### RPC errors
**Symptom**: "Failed to fetch" or RPC errors  
**Solution**:
- Check internet connection
- Try different RPC endpoint in wagmi.js
- Infura, Alchemy, or public RPCs
- Wait and retry (RPC might be down)

### MetaMask can't connect to network
**Symptom**: Network errors in MetaMask  
**Solution**:
- Switch to different network and back
- Update MetaMask
- Try custom RPC URL
- Check network status on provider website

---

## Data Issues

### Scores show wrong values
**Symptom**: Leaderboard shows incorrect scores  
**Solution**:
- Verify score calculation in `src/utils/sudoku.js`
- Check contract reads proper values
- Ensure no BigInt conversion errors
- Compare with Etherscan contract data

### My score doesn't appear
**Symptom**: Submitted but not on leaderboard  
**Solution**:
1. Wait for transaction confirmation (15-30 sec)
2. Click "Refresh" on leaderboard
3. Check transaction on Etherscan
4. Verify contract address is same
5. Ensure you're filtering correct difficulty

---

## Performance Issues

### App is slow
**Symptom**: Lag or stuttering  
**Solution**:
- Close other browser tabs
- Disable browser extensions
- Use modern browser (Chrome, Firefox, Edge)
- Check CPU usage

### Leaderboard takes long to load
**Symptom**: Loading spinner for a long time  
**Solution**:
- Normal if many scores exist (reading from blockchain)
- RPC endpoint might be slow, try different one
- Implement pagination (code modification needed)

---

## Advanced Debugging

### Check Contract on Etherscan

1. Get contract address from `src/config/contract.js`
2. Visit Sepolia Etherscan: `https://sepolia.etherscan.io/address/YOUR_ADDRESS`
3. View:
   - Contract code
   - All transactions
   - Read contract (query scores)
   - Write contract (submit scores)

### Browser Console Debugging

```javascript
// In browser console, check:

// 1. Wallet connected?
window.ethereum?.selectedAddress

// 2. Network ID
window.ethereum?.networkVersion // Should be "11155111" for Sepolia

// 3. Contract address
console.log(CONTRACT_ADDRESS)

// 4. Test contract read
// (requires ethers.js - check network tab for actual calls)
```

### Network Tab Debugging

1. Open DevTools (F12)
2. Go to Network tab
3. Filter by "Fetch/XHR"
4. Look for RPC calls to see actual requests/responses

---

## Getting Help

If none of these solutions work:

1. **Check GitHub Issues**: Others might have same problem
2. **Review Documentation**: 
   - README.md
   - QUICKSTART.md
   - DEPLOYMENT_GUIDE.md
3. **Check Contract**: View on Etherscan to verify deployment
4. **Test Components**: Isolate which part fails (game? wallet? contract?)
5. **Share Error**: Copy exact error message for debugging

---

## Preventive Measures

Before starting development:

- ✅ Use latest Node.js (v16+)
- ✅ Update MetaMask to latest version
- ✅ Get valid WalletConnect Project ID
- ✅ Deploy contract properly
- ✅ Test on Sepolia before mainnet
- ✅ Keep backup of contract address
- ✅ Note which network you deployed to

---

## Emergency Reset

If everything is broken:

```bash
# Nuclear option - fresh start
rm -rf node_modules package-lock.json .vite
npm install
npm run dev
```

Then:
1. Reconnect wallet
2. Verify contract address
3. Check network
4. Test basic features first

---

**Still having issues? Check the browser console (F12) - errors there will tell you exactly what's wrong!**
