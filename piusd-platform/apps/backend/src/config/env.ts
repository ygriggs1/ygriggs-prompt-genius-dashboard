import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config({ path: process.env.ENV_FILE ?? '.env' });

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(8080),
  DATABASE_URL: z.string().min(1),
  SOLANA_RPC_URL: z.string().url(),
  SOLANA_COMMITMENT: z.enum(['processed', 'confirmed', 'finalized']).default('confirmed'),
  PIUSD_MINT: z.string().min(32),
  USDC_MINT: z.string().min(32),
  RAYDIUM_POOL_ID: z.string().min(1),
  BACKEND_CORS_ORIGIN: z.string().default('http://localhost:3000')
});

export const env = envSchema.parse(process.env);
