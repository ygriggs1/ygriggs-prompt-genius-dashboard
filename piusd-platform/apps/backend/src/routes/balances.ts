import { Router } from 'express';
import { PublicKey } from '@solana/web3.js';
import { z } from 'zod';
import { getWalletBalances } from '../services/wallet-service.js';

const paramsSchema = z.object({ wallet: z.string().min(32) });

export const balancesRouter = Router();

balancesRouter.get('/:wallet', async (req, res, next) => {
  try {
    const { wallet } = paramsSchema.parse(req.params);
    const balances = await getWalletBalances(new PublicKey(wallet));
    res.json(balances);
  } catch (error) {
    next(error);
  }
});
