"use client";

import { useState, useEffect } from "react";
import { OperatorViewHeader, OperatorViewContent } from ".";
import { fetchProtocols, Protocol } from "@/lib/data";

interface OperatorViewProps {
  protocolId: string;
}

const OperatorView: React.FC<OperatorViewProps> = ({ protocolId }) => {
  const [protocol, setProtocol] = useState<Protocol | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProtocol() {
      try {
        setLoading(true);
        const protocols = await fetchProtocols();
        const foundProtocol = protocols.find(p => p.id === protocolId);
        
        if (foundProtocol) {
          setProtocol(foundProtocol);
        } else {
          setError("Protocol not found");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load protocol');
      } finally {
        setLoading(false);
      }
    }

    loadProtocol();
  }, [protocolId]);

  if (loading) {
    return (
      <div className="flex flex-col px-16 py-12 md:px-32 md:py-16 lg:px-[176px] lg:py-[80px] border border-[var(--color-medium-gray)] rounded-[8px]">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-light-orange)] mx-auto mb-4"></div>
            <p className="text-white/60 animate-pulse">Loading protocol...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !protocol) {
    return (
      <div className="flex flex-col px-16 py-12 md:px-32 md:py-16 lg:px-[176px] lg:py-[80px] border border-[var(--color-medium-gray)] rounded-[8px]">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-red-400 mb-2">Protocol not found</p>
            <p className="text-white/60 text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col px-16 py-12 md:px-32 md:py-16 lg:px-[176px] lg:py-[80px]
                 border border-[var(--color-medium-gray)] rounded-[8px]"
    >
      <OperatorViewHeader className="mb-[18px]" protocol={protocol} />

      <OperatorViewContent protocol={protocol} />
    </div>
  );
};

export default OperatorView;
