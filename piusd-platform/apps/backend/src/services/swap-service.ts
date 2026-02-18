import { PublicKey } from '@solana/web3.js';
import { env } from '../config/env.js';
import { HttpError } from '../utils/http-error.js';

interface SwapQuoteInput {
  owner: PublicKey;
  amountIn: number;
  slippageBps: number;
  inputMint: string;
  outputMint: string;
}

export async function getSwapQuote(params: SwapQuoteInput) {
  if (params.amountIn <= 0) {
    throw new HttpError(400, 'amountIn must be greater than 0');
  }

  const url = `https://api-v3.raydium.io/pools/info/ids?ids=${env.RAYDIUM_POOL_ID}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new HttpError(502, 'Failed to fetch Raydium pool info', { status: response.status });
  }

  const payload = (await response.json()) as { data?: Array<Record<string, unknown>> };
  const pool = payload.data?.[0];

  if (!pool) {
    throw new HttpError(404, 'Pool not found on Raydium', { poolId: env.RAYDIUM_POOL_ID });
  }

  const mintA = String(pool.mintA ?? '');
  const mintB = String(pool.mintB ?? '');
  const reserveA = Number(pool.mintAmountA ?? 0);
  const reserveB = Number(pool.mintAmountB ?? 0);

  const isAIn = params.inputMint === mintA && params.outputMint === mintB;
  const isBIn = params.inputMint === mintB && params.outputMint === mintA;

  if (!isAIn && !isBIn) {
    throw new HttpError(400, 'Input/output mints do not match configured Raydium pool', {
      inputMint: params.inputMint,
      outputMint: params.outputMint,
      mintA,
      mintB
    });
  }

  const reserveIn = isAIn ? reserveA : reserveB;
  const reserveOut = isAIn ? reserveB : reserveA;
  const feeMultiplier = 0.9975;
  const amountInAfterFee = params.amountIn * feeMultiplier;
  const expectedOut = (amountInAfterFee * reserveOut) / (reserveIn + amountInAfterFee);
  const minimumOut = expectedOut * (1 - params.slippageBps / 10_000);

  return {
    owner: params.owner.toBase58(),
    poolId: env.RAYDIUM_POOL_ID,
    inputMint: params.inputMint,
    outputMint: params.outputMint,
    amountIn: params.amountIn,
    expectedOut,
    minimumOut,
    slippageBps: params.slippageBps,
    warning: 'Sign and send Raydium swap transaction client-side using current pool keys from /api/swap/pool-keys.'
  };
}

export async function getPoolKeys() {
  const response = await fetch(`https://api-v3.raydium.io/pools/key/ids?ids=${env.RAYDIUM_POOL_ID}`);
  if (!response.ok) {
    throw new HttpError(502, 'Unable to fetch Raydium pool keys', { status: response.status });
  }
  return response.json();
}
