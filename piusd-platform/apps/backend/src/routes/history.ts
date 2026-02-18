import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../config/prisma.js';

const querySchema = z.object({ wallet: z.string().min(32) });
const bodySchema = z.object({
  wallet: z.string().min(32),
  txSignature: z.string().min(32),
  inputMint: z.string().min(32),
  outputMint: z.string().min(32),
  amountIn: z.number().positive(),
  amountOut: z.number().positive(),
  slippageBps: z.number().int().min(1).max(5000),
  status: z.enum(['submitted', 'confirmed', 'failed']).default('submitted')
});

export const historyRouter = Router();

historyRouter.get('/', async (req, res, next) => {
  try {
    const { wallet } = querySchema.parse(req.query);
    const records = await prisma.swapHistory.findMany({
      where: { wallet },
      orderBy: { createdAt: 'desc' },
      take: 50
    });
    res.json(records);
  } catch (error) {
    next(error);
  }
});

historyRouter.post('/', async (req, res, next) => {
  try {
    const input = bodySchema.parse(req.body);
    const created = await prisma.swapHistory.create({ data: input });
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});
