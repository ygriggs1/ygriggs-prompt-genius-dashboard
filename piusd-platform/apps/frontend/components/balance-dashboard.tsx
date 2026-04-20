'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { apiRequest } from '../lib/api';

type Balances = {
  wallet: string;
  sol: number;
  piusd: number;
  usdc: number;
  piusdAta: string;
};

export function BalanceDashboard() {
  const { publicKey } = useWallet();
  const [balances, setBalances] = useState<Balances | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!publicKey) {
      setBalances(null);
      return;
    }

    apiRequest<Balances>(`/api/balances/${publicKey.toBase58()}`)
      .then(setBalances)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Failed to fetch balances'));
  }, [publicKey]);

  if (!publicKey) return <p>Connect wallet to load balances.</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!balances) return <p>Loading balances…</p>;

  return (
    <div className="rounded-xl border p-4 space-y-2">
      <h3 className="font-semibold">Balance Dashboard</h3>
      <p>SOL: {balances.sol.toFixed(4)}</p>
      <p>PIUSD: {balances.piusd.toFixed(4)}</p>
      <p>USDC: {balances.usdc.toFixed(4)}</p>
      <p className="text-xs break-all">PIUSD ATA: {balances.piusdAta}</p>
    </div>
  );
}
