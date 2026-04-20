import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { PublicKey, TransactionInstruction } from '@solana/web3.js';
import { createAssociatedTokenAccountInstruction } from '@solana/spl-token';
import { piusdMint } from '../config/solana.js';

export async function createAtaInstruction(owner: PublicKey): Promise<{ ata: string; instruction: TransactionInstruction }> {
  const ata = getAssociatedTokenAddressSync(piusdMint, owner, false);

  const instruction = createAssociatedTokenAccountInstruction(owner, ata, owner, piusdMint);

  return { ata: ata.toBase58(), instruction };
}
