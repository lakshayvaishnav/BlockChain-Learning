const { ethers } = require("ethers");
const fs = require("fs");

const provider = new ethers.providers.JsonRpcProvider(
  `https://sepolia.infura.io/v3/76e8fe6f57c848819f79f2c4540f43d1`
);

const privateKey =
  "0fd84f5217ada1ba1f7e08899e9eff42051730cffea86477a94a1436161321ab";

const byteCode = fs.readFileSync("./simpleStorage_sol_SimpleStorage.bin");

const walletAddress = "0xc861354747099cd2D07512FAe3868e7D05677b07";

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

async function deployContract() {
  const wallet = new ethers.Wallet(privateKey, provider);
  const contractFactory = new ethers.ContractFactory(
    walletAbi,
    byteCode,
    wallet
  );
  const deployedContract = await contractFactory.deploy();
  await deployedContract.deployed(); // Wait for deployment to be confirmed
  console.log("Contract deployed at address:", deployedContract.address);
  return deployedContract;
}

async function contractInteraction() {
  const deployedContract = await deployContract();
  const walletContract = new ethers.Contract(
    deployedContract.address,
    walletAbi,
    provider
  );
  const contractName = await walletContract.name();
  console.log("Contract name:", contractName);
}

contractInteraction().catch(console.error);
