const { ethers, run } = require("hardhat");

const hre = require("hardhat");

async function main() {
  const simpleStorageContractFactory = await ethers.getContractFactory(
    "SimpleStorageNew"
  );
  console.log("Deploying contracts");
  const simpleStorage = await simpleStorageContractFactory.deploy();
  console.log("contract deployed");

  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    //if on main chain then verify....
    console.log("waiting for block conformation ...");
    await simpleStorage.deploymentTransaction().wait(6);
    await verify(simpleStorage.target, []);
  }

  // retrieving the value
  const currentValue = await simpleStorage.retrieve();
  console.log(`the current values is:- ${currentValue}`);

  // update the current value
  const transactionResponse = await simpleStorage.store(7);
  await transactionResponse.wait(1);
  const updatedValue = await simpleStorage.retrieve();
  console.log("the updated value is :- ", updatedValue);

  console.log("contract deployed succesfully at :- ", simpleStorage.target);
  // console.log(network.config);
}

const verify = async (contractAddress, args) => {
  console.log("verifying the contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguements: args,
    });
  } catch (error) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified");
    } else {
      console.log(error);
    }
  }
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
