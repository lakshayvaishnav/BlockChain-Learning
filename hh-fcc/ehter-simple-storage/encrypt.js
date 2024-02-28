const fs = require("fs-extra");
const ethers = require("ethers");
require("dotenv").config();

async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
  console.log("private key is here -> ", process.env.PRIVATE_KEY);
  const encryptJsonKey = await wallet.encrypt(
    process.env.PRIVATE_KEY_PASSWORD,
    process.env.PRIVATE_KEY
  );
  console.log("encrypted key :- ", encryptJsonKey);
}

main();
