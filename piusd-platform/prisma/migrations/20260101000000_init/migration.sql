CREATE TABLE "SwapHistory" (
  "id" TEXT PRIMARY KEY,
  "wallet" TEXT NOT NULL,
  "txSignature" TEXT NOT NULL UNIQUE,
  "inputMint" TEXT NOT NULL,
  "outputMint" TEXT NOT NULL,
  "amountIn" DOUBLE PRECISION NOT NULL,
  "amountOut" DOUBLE PRECISION NOT NULL,
  "slippageBps" INTEGER NOT NULL,
  "status" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX "SwapHistory_wallet_createdAt_idx" ON "SwapHistory"("wallet", "createdAt");
