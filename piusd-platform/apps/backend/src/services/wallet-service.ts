import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import { connection, piusdMint, usdcMint } from '../config/solana.js';

export async function getWalletBalances(owner: PublicKey) {
  const [solLamports, piusdAta, usdcAta] = await Promise.all([
    connection.getBalance(owner),
    Promise.resolve(getAssociatedTokenAddressSync(piusdMint, owner, false)),
    Promise.resolve(getAssociatedTokenAddressSync(usdcMint, owner, false))
  ]);

  const [piusdBal, usdcBal] = await Promise.all([
    connection.getTokenAccountBalance(piusdAta).catch(() => ({ value: { uiAmount: 0 } })),
    connection.getTokenAccountBalance(usdcAta).catch(() => ({ value: { uiAmount: 0 } }))
  ]);

  return {
    wallet: owner.toBase58(),
    sol: solLamports / 1_000_000_000,
    piusd: piusdBal.value.uiAmount ?? 0,
    usdc: usdcBal.value.uiAmount ?? 0,
    piusdAta: piusdAta.toBase58(),
    usdcAta: usdcAta.toBase58()
  };
}
