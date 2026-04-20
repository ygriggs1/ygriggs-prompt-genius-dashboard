import type { Metadata } from 'next';
import { SolanaWalletProvider } from '../providers/wallet-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'PIUSD Platform',
  description: 'Solana PIUSD wallet + swap platform'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SolanaWalletProvider>{children}</SolanaWalletProvider>
      </body>
    </html>
  );
}
