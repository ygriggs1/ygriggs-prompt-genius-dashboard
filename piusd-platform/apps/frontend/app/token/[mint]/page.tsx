interface TokenPageProps {
  params: Promise<{ mint: string }>;
}

export default async function TokenPage({ params }: TokenPageProps) {
  const { mint } = await params;
  return (
    <main>
      <h1>Token details</h1>
      <p>Mint: {mint}</p>
    </main>
  );
}
