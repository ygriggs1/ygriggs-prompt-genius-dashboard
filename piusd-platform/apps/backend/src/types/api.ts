export interface ApiErrorShape {
  error: string;
  details?: unknown;
}

export interface BalanceResponse {
  wallet: string;
  sol: number;
  piusd: number;
  usdc: number;
  piusdAta: string;
}
