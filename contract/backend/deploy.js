import fs from "fs";
import TronWeb from "tronweb";
import dotenv from "dotenv";
dotenv.config();

const PRIVATE_KEY = process.env.TRON_PRIVATE_KEY;
const FULLNODE = process.env.TRON_FULLNODE || "https://api.trongrid.io";
const SOLIDITY = process.env.TRON_SOLIDITY || "https://api.trongrid.io";
const EVENT = process.env.TRON_EVENT || "https://api.trongrid.io";

if (!PRIVATE_KEY) {
  console.error("ضع TRON_PRIVATE_KEY في ملف .env");
  process.exit(1);
}

const artifact = JSON.parse(fs.readFileSync("./../contract/FlatDriveVault.json", "utf8"));
const abi = artifact.abi;
const bytecode = artifact.bytecode;

(async () => {
  const tronWeb = new TronWeb(FULLNODE, SOLIDITY, EVENT, PRIVATE_KEY);
  console.log("🚀 Deploying contract...");
  const contract = await tronWeb.contract().new({
    abi,
    bytecode,
    parameters: [
      process.env.USDT_TOKEN,
      process.env.PLAYER_ADDRESS
    ],
    feeLimit: 100_000_000
  });
  console.log("✅ Contract deployed at:", contract.address);
})();
