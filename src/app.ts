import * as dotenv from "dotenv"; // Environment variables
import Sniper from "./sniper"; // Sniper

// Setup env
dotenv.config();

(async () => {
  // Token address
  const tokenAddress: string | undefined = process.env.TOKEN_ADDRESS;
  // Factory address
  const factoryAddressV2: string | undefined = process.env.FACTORY_ADDRESSV2;
  const factoryAddressV3: string | undefined = process.env.FACTORY_ADDRESSV3;

  // RPC endpoint
  const rpcEndpoint: string =
    process.env.RPC_ENDPOINT ?? "http://localhost:8545";
  // Wallet private key
  const privateKey: string | undefined = process.env.PRIVATE_KEY;
  // Purchase amount in chain base token
  const purchaseAmount: string = process.env.AMOUNT ?? "0.01"; // 0.01 eth/matic/etc.
  // Gas price to send
  const gasPrice: string = process.env.GAS_PRICE ?? "2000"; // 2,000 gwei
  // Slippage tolerance
  const slippage: number = Number(process.env.SLIPPAGE) ?? 0.1; // 10%
  // Testnet?
  const testnet: boolean = Boolean(process.env.TESTNET) ?? false;

  // Throw if missing necessary params
  if (!tokenAddress || !privateKey || !factoryAddressV2 || !factoryAddressV3) {
    throw new Error("Missing necessary parameters");
  }

  // Initialize sniper
  const sniper = new Sniper(
    tokenAddress,
    factoryAddressV2,
    rpcEndpoint,
    privateKey,
    purchaseAmount,
    gasPrice,
    slippage,
    testnet,
    factoryAddressV3
  );
  // Wait and snipe pool
  await Promise.all([sniper.snipeV2(), sniper.snipeV3()]);
})();
