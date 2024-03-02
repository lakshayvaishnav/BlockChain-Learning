const { task } = require("hardhat/config");

task("block-number", "gives the current numnber of block").setAction(
  async (taskArgshre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber();
    console.log(`the current block number is : - ${blockNumber}`);
  }
);
module.exports = {};
