import hre from "hardhat";

async function main() {
  console.log("Deploying SudokuLeaderboard to Base...");

  const SudokuLeaderboard = await hre.ethers.getContractFactory("SudokuLeaderboard");
  const sudoku = await SudokuLeaderboard.deploy();

  await sudoku.waitForDeployment();

  const address = await sudoku.getAddress();
  console.log("SudokuLeaderboard deployed to:", address);
  console.log("\nUpdate src/config/contract.js with this address:");
  console.log(`export const CONTRACT_ADDRESS = '${address}';`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
