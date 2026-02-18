'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';
import { apiRequest } from '../lib/api';
import { PIUSD_MINT, USDC_MINT } from '../lib/config';

type Quote = {
  amountIn: number;
  expectedOut: number;
  minimumOut: number;
  slippageBps: number;
  warning: string;
};

export function SwapWidget() {
  const { publicKey } = useWallet();
  const [amount, setAmount] = useState('10');
  const [slippageBps, setSlippageBps] = useState('100');
  const [quote, setQuote] = useState<Quote | null>(null);
  const [error, setError] = useState('');

  const getQuote = async () => {
    setError('');
    setQuote(null);
    if (!publicKey) {
      setError('Connect wallet first.');
      return;
    }

    try {
      const data = await apiRequest<Quote>('/api/swap/quote', {
        method: 'POST',
        body: JSON.stringify({
          wallet: publicKey.toBase58(),
          inputMint: USDC_MINT,
          outputMint: PIUSD_MINT,
          amountIn: Number(amount),
          slippageBps: Number(slippageBps)
        })
      });
      setQuote(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to build quote');
    }
  };

  return (
    <div className="rounded-xl border p-4 space-y-3">
      <h3 className="font-semibold">Raydium Swap (USDC → PIUSD)</h3>
      <input value={amount} onChange={(e) => setAmount(e.target.value)} className="border rounded p-2 w-full" placeholder="Amount in" />
      <input value={slippageBps} onChange={(e) => setSlippageBps(e.target.value)} className="border rounded p-2 w-full" placeholder="Slippage bps" />
      <button onClick={getQuote} className="bg-black text-white px-3 py-2 rounded">Get Quote</button>
      {error && <p className="text-red-500">{error}</p>}
      {quote && (
        <div className="text-sm space-y-1">
          <p>Expected Out: {quote.expectedOut.toFixed(6)} PIUSD</p>
          <p>Min Out ({quote.slippageBps} bps): {quote.minimumOut.toFixed(6)} PIUSD</p>
          <p className="text-xs text-amber-700">{quote.warning}</p>
        </div>
      )}
    </div>
  );
}
