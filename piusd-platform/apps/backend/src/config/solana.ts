import { Commitment, Connection, PublicKey } from '@solana/web3.js';
import { env } from './env.js';

export const connection = new Connection(env.SOLANA_RPC_URL, env.SOLANA_COMMITMENT as Commitment);
export const piusdMint = new PublicKey(env.PIUSD_MINT);
export const usdcMint = new PublicKey(env.USDC_MINT);
export const raydiumPoolId = new PublicKey(env.RAYDIUM_POOL_ID);
