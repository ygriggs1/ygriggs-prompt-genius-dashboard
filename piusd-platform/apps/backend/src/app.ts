import cors from 'cors';
import express from 'express';
import pinoHttp from 'pino-http';
import { env } from './config/env.js';
import { logger } from './config/logger.js';
import { errorHandler } from './middleware/error-handler.js';
import { airdropRouter } from './routes/airdrop.js';
import { balancesRouter } from './routes/balances.js';
import { healthRouter } from './routes/health.js';
import { historyRouter } from './routes/history.js';
import { swapRouter } from './routes/swap.js';

export const app = express();

app.use(cors({ origin: env.BACKEND_CORS_ORIGIN }));
app.use(express.json({ limit: '500kb' }));
app.use(pinoHttp({ logger }));

app.use('/health', healthRouter);
app.use('/api/balances', balancesRouter);
app.use('/api/airdrop', airdropRouter);
app.use('/api/swap', swapRouter);
app.use('/api/history', historyRouter);

app.use(errorHandler);
