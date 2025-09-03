import { OperatorView } from "@/components/features/OperatorView";
import { fetchProtocolsServer } from "@/lib/server-data";

interface OperatorPageProps {
  params: Promise<{
    protocol: string;
  }>;
}

// Generate static params from JSON at build time
export async function generateStaticParams() {
  const protocols = await fetchProtocolsServer();
  
  return protocols.map((protocol) => ({
    protocol: protocol.id,
  }));
}

export default async function OperatorPage({ params }: OperatorPageProps) {
  const { protocol } = await params;
  return <OperatorView protocolId={protocol} />;
}
