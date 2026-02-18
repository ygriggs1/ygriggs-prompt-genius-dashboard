import { Router } from 'express';
import { PublicKey } from '@solana/web3.js';
import { z } from 'zod';
import { getPoolKeys, getSwapQuote } from '../services/swap-service.js';

const quoteSchema = z.object({
  wallet: z.string().min(32),
  inputMint: z.string().min(32),
  outputMint: z.string().min(32),
  amountIn: z.number().positive(),
  slippageBps: z.number().int().min(1).max(3000).default(100)
});

export const swapRouter = Router();

swapRouter.post('/quote', async (req, res, next) => {
  try {
    const input = quoteSchema.parse(req.body);
    const quote = await getSwapQuote({
      owner: new PublicKey(input.wallet),
      inputMint: input.inputMint,
      outputMint: input.outputMint,
      amountIn: input.amountIn,
      slippageBps: input.slippageBps
    });
    res.json(quote);
  } catch (error) {
    next(error);
  }
});

swapRouter.get('/pool-keys', async (_req, res, next) => {
  try {
    const keys = await getPoolKeys();
    res.json(keys);
  } catch (error) {
    next(error);
  }
});
