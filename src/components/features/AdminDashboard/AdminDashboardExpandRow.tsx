"use client";

import { useEffect, useState } from "react";
import { fetchProtocols, Protocol, Requirement } from "@/lib/data";

interface AdminDashboardExpandRowProps {
  projectId: string;
}

const AdminDashboardExpandRow: React.FC<AdminDashboardExpandRowProps> = ({
  projectId,
}) => {
  const [protocol, setProtocol] = useState<Protocol | null>(null);
  const [selectedOppId, setSelectedOppId] = useState("");
  const [selectedRequirements, setSelectedRequirements] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const protocols = await fetchProtocols();
        const foundProtocol = protocols.find(p => p.id === projectId);
        
        if (foundProtocol) {
          setProtocol(foundProtocol);
          if (foundProtocol.opportunities.length > 0) {
            const firstOpp = foundProtocol.opportunities[0];
            setSelectedOppId(firstOpp.id);
            setSelectedRequirements(firstOpp.requirements);
          }
        } else {
          setError("Protocol not found");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [projectId]);

  useEffect(() => {
    if (!protocol || !selectedOppId) {
      setSelectedRequirements([]);
      return;
    }

    const opportunity = protocol.opportunities.find(opp => opp.id === selectedOppId);
    if (opportunity) {
      setSelectedRequirements(opportunity.requirements);
    }
  }, [selectedOppId, protocol]);

  if (loading) {
    return (
      <div className="p-4">
        <div className="text-sm opacity-70">Loading protocol data…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="text-sm text-red-500">{error}</div>
      </div>
    );
  }

  if (!protocol) {
    return (
      <div className="p-4">
        <div className="text-sm opacity-70">Protocol not found</div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium">Opportunity</label>
        {protocol.opportunities.length === 0 ? (
          <span className="text-sm opacity-70">No opportunities</span>
        ) : (
          <select
            value={selectedOppId}
            onChange={(e) => setSelectedOppId(e.target.value)}
            className={[
              "text-sm rounded-xl border border-white/10 bg-white/5",
              "px-3 py-2 outline-none focus:ring-2 focus:ring-white/20",
            ].join(" ")}
          >
            {protocol.opportunities.map((opp) => (
              <option key={opp.id} value={opp.id}>
                {opp.type} · {opp.status}
              </option>
            ))}
          </select>
        )}
      </div>

      {selectedRequirements.length > 0 && (
        <div className="space-y-3">
          {selectedRequirements.map((req, index) => (
            <div
              key={`${selectedOppId}-${req.tier}-${req.entry}-${index}`}
              className="rounded-2xl border border-white/10 bg-white/5 p-3 md:p-4"
            >
              <div className="flex items-center gap-2 text-sm font-medium">
                <span>Requirement:</span>
                <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-xs uppercase">
                  {req.tier}
                </span>
                <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-xs uppercase">
                  {req.entry}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                <Field label="CPU Cores" value={req.hardware.cpuCores} />
                <Field label="RAM (GB)" value={req.hardware.ramGb} />
                <Field label="Storage (GB)" value={req.hardware.storageGb} />
                <Field label="Storage Media" value={req.hardware.storageMedia} />
                <Field label="IOPS Read" value={req.hardware.iopsRead || "—"} />
                <Field label="IOPS Write" value={req.hardware.iopsWrite || "—"} />
                <Field label="Up (Mbps)" value={req.hardware.upMbps} />
                <Field label="Down (Mbps)" value={req.hardware.downMbps} />
                <Field
                  label="Static IP Pref."
                  value={req.hardware.staticIpPreferred ? "Yes" : "No"}
                />
                <Field
                  label="UPS Required"
                  value={req.hardware.upsRequired ? "Yes" : "No"}
                />
                <Field label="Notes" value={req.hardware.notes || "—"} />
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedRequirements.length === 0 && (
        <div className="text-sm opacity-70">No requirements for this opportunity.</div>
      )}
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Field({ label, value }: { label: string; value: any }) {
  const show = value !== null && value !== undefined && value !== "";
  return (
    <div>
      <div className="text-[11px] uppercase opacity-60">{label}</div>
      <div className="text-sm">{show ? String(value) : "—"}</div>
    </div>
  );
}

export default AdminDashboardExpandRow;
