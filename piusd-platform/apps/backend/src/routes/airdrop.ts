import { Router } from 'express';
import { PublicKey } from '@solana/web3.js';
import { z } from 'zod';
import { connection } from '../config/solana.js';

const bodySchema = z.object({ wallet: z.string().min(32), lamports: z.number().int().positive().max(2_000_000_000) });

export const airdropRouter = Router();

airdropRouter.post('/', async (req, res, next) => {
  try {
    const { wallet, lamports } = bodySchema.parse(req.body);
    const signature = await connection.requestAirdrop(new PublicKey(wallet), lamports);
    res.json({ signature });
  } catch (error) {
    next(error);
  }
});
