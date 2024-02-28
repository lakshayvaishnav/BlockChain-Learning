const { ethers } = require("ethers");
const fs = require("fs");

const provider = new ethers.providers.JsonRpcProvider(
  `https://sepolia.infura.io/v3/76e8fe6f57c848819f79f2c4540f43d1`
);

const walletAddress = "0x6c8111485775c57c216cc76cf1e1455e65adeb29";

const walletAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "accountBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "contractBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getValue",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "sendEthContract",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "sendEthUser",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_num",
        type: "uint256",
      },
    ],
    name: "setValue",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// provider can help you access read function of contract ....

async function contractInteraction() {
  const walletContract = new ethers.Contract(
    walletAddress,
    walletAbi,
    provider
  );
  const contractName = await walletContract.name();
  console.log("Contract name:", contractName);

  const num = await walletContract.getValue();
  console.log("number :", String(num));

  const balance = await walletContract.contractBalance();
  const fbalance = ethers.utils.formatEther(balance);
  console.log("contract balance:-", fbalance);

  // const userBalance = await walletContract.accountBalance(
  //   " 0xc861354747099cd2d07512fae3868e7d05677b07"
  // );

  // console.log("user balance:", userBalance);
}

contractInteraction().catch(console.error);

// smartcontract address = 0x6c8111485775c57c216cc76cf1e1455e65adeb29
// my address = 0xc861354747099cd2D07512FAe3868e7D05677b07
