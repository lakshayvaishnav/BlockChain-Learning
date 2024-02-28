import { ethers } from "ethers";
import "./App.css";
require("dotenv").config();
function App() {
  const walletAddress = process.env.WALLET_ADRESS;
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
  useEffect(() => {
    const writeContract = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(walletAddress, walletAbi, signer);
      // await contract.setValue(2);
      //await contract.sendEthContract({ value: ethers.utils.parseEther("0.1") });
      await contract.sendEthUser(process.env.ACCOUNT_ADRESS, {
        //acount address u want to send eth to.
        value: ethers.utils.parseEther("0.1"),
      });
    };
    console.log(process.env.WALLET_ADRESS);
    console.log(process.env.ACCOUNT_ADRESS);
    writeContract();
  }, []);

  return <div className="App"></div>;
}

export default App;
