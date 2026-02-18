'use client';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { BalanceDashboard } from '../components/balance-dashboard';
import { SwapWidget } from '../components/swap-widget';
import { TokenOverview } from '../components/token-overview';

export default function HomePage() {
  return (
    <main className="card-grid">
      <WalletMultiButton />
      <TokenOverview />
      <BalanceDashboard />
      <SwapWidget />
    </main>
  );
}
