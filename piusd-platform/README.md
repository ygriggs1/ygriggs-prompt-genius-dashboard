# PIUSD Solana Platform (Production Blueprint)

## A) Requirements & Dependencies

```bash
# from piusd-platform/
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

Production:

```bash
docker compose up --build -d
```

Core stack:
- Frontend: Next.js 15 App Router + Solana Wallet Adapter
- Backend: Express + Zod + Pino
- DB: PostgreSQL + Prisma
- Chain: Solana SPL Token + ATA logic
- Swap: Raydium pool data + quote/min-out calculation

## B) Architecture Diagram (ASCII)

```text
┌────────────────────────┐
│      Next.js UI        │
│ Wallet + Swap + Token  │
└───────────┬────────────┘
            │ REST
┌───────────▼────────────┐
│     Express Backend    │
│ balances/airdrop/swap  │
│ history + error guard  │
└───────┬────────┬───────┘
        │        │
        │        └──────────────┐
┌───────▼────────┐      ┌────────▼─────────┐
│   PostgreSQL   │      │ Solana RPC +     │
│ Prisma model   │      │ Raydium API V3   │
└────────────────┘      └──────────────────┘
```

## C) Environment
Use `.env.example` as baseline.

## D) Backend
- `GET /api/balances/:wallet`: SOL + PIUSD + USDC balances and ATA.
- `POST /api/airdrop`: devnet/test RPC airdrop.
- `POST /api/swap/quote`: pool-aware quote + min out from slippage.
- `GET /api/swap/pool-keys`: current Raydium pool keys.
- `GET/POST /api/history`: swap persistence.

## E) Frontend
- App Router homepage with wallet connect.
- Balance dashboard wired to backend.
- Swap widget with slippage control and API fallback handling.
- Dynamic token route: `/token/[mint]`.

## F) Solana Integration
- RPC URL and commitment configurable.
- ATA derivation using SPL token program (`getAssociatedTokenAddressSync`).
- Wallet adapter for Phantom + Solflare.

## G) Swap Integration
- Pool metadata fetched from Raydium API.
- Mint pair validation against pool keys.
- Constant-product expected out + minimum out from slippage bps.
- Frontend shows warning to sign/send final swap txn client-side.

## H) Automated Fixes Included
- Input validation via Zod.
- Central async error handling middleware.
- API fallback parser for malformed JSON.
- Clipboard fallback utility for unsupported `navigator.clipboard`.
- Defensive token balance fetch fallback for missing ATA.

## I) DevOps
- `Dockerfile.backend`, `Dockerfile.frontend`, `docker-compose.yml`.
- GitHub Actions CI (`.github/workflows/ci.yml`).

## J) Deployment Steps
1. Set `.env` with production RPC and database URL.
2. Run migrations: `npm run prisma:migrate`.
3. Build artifacts: `npm run build`.
4. Deploy containers with `docker compose up --build -d`.
5. Set reverse proxy / TLS for ports 3000 and 8080.

## Common Pitfalls & Fixes
- **Wrong network**: ensure pool ID and RPC cluster match.
- **ATA missing**: call ATA creation transaction before token transfer/swap settlement.
- **Slippage too tight**: increase bps to prevent failed confirmation.
- **CORS issue**: set `BACKEND_CORS_ORIGIN` to frontend domain.
