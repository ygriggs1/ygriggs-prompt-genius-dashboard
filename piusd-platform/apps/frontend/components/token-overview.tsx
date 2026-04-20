import { PIUSD_MINT } from '../lib/config';

export function TokenOverview() {
  return (
    <div className="rounded-xl border p-4 space-y-1">
      <h1 className="font-bold text-2xl">PIUSD Dashboard</h1>
      <p className="text-sm">SPL token mint:</p>
      <p className="text-xs break-all">{PIUSD_MINT}</p>
    </div>
  );
}
