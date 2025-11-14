import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'Sudoku',
  projectId: 'YOUR_PROJECT_ID', // Get from WalletConnect Cloud
  chains: [base], // Base mainnet only
  ssr: false,
});
