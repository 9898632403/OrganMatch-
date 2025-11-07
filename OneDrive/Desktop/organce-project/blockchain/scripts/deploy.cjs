const hre = require("hardhat");

async function main() {
  const OrganLedger = await hre.ethers.getContractFactory("OrganLedger");
  const organLedger = await OrganLedger.deploy();

  await organLedger.waitForDeployment();

  console.log("✅ Contract deployed to:", await organLedger.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
